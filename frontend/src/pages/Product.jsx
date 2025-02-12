import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { ShopContext } from '../context/ShopContext';
import { assets } from '../assets/assets';
import RelatedProducts from '../components/RelatedProducts';

const Product = () => {

  const { productId } = useParams();
  const { products, currency, addToCart } = useContext(ShopContext);
  const [productData, setProductData] = useState(false);
  const [image, setImage] = useState('')
  const [productType, setProductType] = useState('')
  const [size, setSize] = useState('')
  const [expand, setExpand] = useState(false)

  const fetchProductData = async () => {

    products.map((item) => {
      if (item._id === productId) {
        setProductData(item)
        setImage(item.image.length ? item.image[0] : assets?.logo)
        return null;
      }
    })

  }

  useEffect(() => {
    fetchProductData();
  }, [productId, products])

  useEffect(() => {
    if (productType != "") {
      setSize("");
      if (productType?.image && productType?.image[0]) {
        setImage(productType.image[0]);
      } else {
        setImage("");
      }
    }
  }, [productType])

  return productData ? (
    <div className="py-16">
      <div className="container">
        <div className='lg:pt-10 transition-opacity ease-in duration-500 opacity-100'>
          {/*----------- Product Data-------------- */}
          <div className='flex gap-8 sm:gap-12 flex-col sm:flex-row'>

            {/*---------- Product Images------------- */}
            <div className='flex-1 flex flex-col-reverse gap-3 sm:flex-row'>
              <div className='flex sm:flex-col overflow-x-auto sm:overflow-y-scroll lg:justify-between lg:gap-2 sm:justify-normal sm:w-[18.7%] w-full pr-2'>
                {
                  productType === "" && productData?.image.length > 0 ? (
                    productData?.image.map((item, index) => (
                      item !== "" ? <img
                        onClick={() => setImage(item)}
                        src={item}
                        alt=""
                        key={index}
                        className="w-[24%] sm:w-full sm:mb-3 flex-shrink-0 cursor-pointer border p-3"
                        /> : <></>
                    ))
                  ) : productType !== "" && productType.image.length > 0 ? (
                    productType.image.map((item, index) => (
                      item != "" ? <img
                        onClick={() => setImage(item)}
                        src={item}
                        alt=""
                        key={index}
                        className="w-[24%] sm:w-full sm:mb-3 flex-shrink-0 cursor-pointer border p-3"
                      /> : ""
                    ))
                  ) : (
                    <img
                      src={assets?.logo}
                      alt="logo"
                      onClick={() => setImage(assets?.logo)}
                      className="w-[24%] sm:w-full sm:mb-3 flex-shrink-0 cursor-pointer border p-3"
                    />
                  )
                }
              </div>
              <div className='w-full sm:w-[80%] flex justify-center items-center px-2 border'>
                <img className='w-full h-auto' src={image} alt="" />
              </div>
            </div>

            {/* -------- Product Info ---------- */}
            <div className='flex-1'>
              <h1 className='text-secondary capitalize font-semibold text-3xl mt-2'>{productData?.name}</h1>
              {/* <div className=' flex items-center gap-1 mt-2'>
              <img src={assets.star_icon} alt="" className="w-3 5" />
              <img src={assets.star_icon} alt="" className="w-3 5" />
              <img src={assets.star_icon} alt="" className="w-3 5" />
              <img src={assets.star_icon} alt="" className="w-3 5" />
              <img src={assets.star_dull_icon} alt="" className="w-3 5" />
              <p className='pl-2'>(122)</p>
          </div> */}
              <p className='mt-5 text-3xl font-medium'>{currency}{productData?.price}</p>
              {<p className='text-sm text-secondary capitalize mt-2'>{productData?.description?.length < 250 || expand ? productData?.description : productData?.description.substring(0,250) + "..."}  {productData?.description?.length > 250 ? <span className='text-blue-500 cursor-pointer hover:text-blue-700' onClick={()=> setExpand(prev => !prev)}>{productData?.description?.length > 250 && expand ? "Show Less" : "Show More"}</span> : <></>}</p>}


              <div className='flex flex-col gap-4 my-6'>
                {productData?.product_type_data.length > 0 ? 
                  <>
                    <p className='text-base text-secondary capitalize font-medium'>Select Product Type</p>
                    <div className='flex gap-2'>
                      {productData?.product_type_data?.map((item, index) => (
                        <button onClick={() => {
                          if (productType == item) {
                            setSize("");
                            setProductType("");
                            setImage(productData.image.length ? productData.image[0] : assets?.logo)
                          } else {
                            setProductType(item);
                          }
                        }} className={`border py-2 px-4 bg-gray-100 ${item === productType ? 'border-primary' : ''}`} key={index}>
                          {item?.image && item?.image[0]?.length ? <img src={item?.image[0]} alt="" className='w-16' /> : <img src={assets?.logo} alt={"logo"} className='w-16' />}
                        </button>
                      ))}
                    </div>
                  </>
               : <></>}</div>
              {productType?.size_available && <div className='flex flex-col gap-4 my-8'>
                <p className='text-base text-secondary capitalize font-medium'>Select Size</p>
                <div className='flex gap-2'>
                  {productType?.sizes?.map((item, index) => (
                    <button onClick={() => setSize(item)} className={`border py-2 px-4 bg-gray-100 ${item === size ? 'border-primary' : ''}`} key={index}>{item}</button>
                  ))}
                </div>
              </div>}
              <button onClick={() => addToCart(productData._id, productType, size, productType?.size_available)} className='bg-black text-white px-8 py-3 text-sm active:bg-gray-700'>ADD TO CART</button>
              <hr className='mt-8 sm:w-4/5' />
              {productData?.full_description && <div className='text-sm text-gray-500 mt-5 flex flex-col gap-1'>
                {productData?.full_description.split("\n").map((description, index)=>{
                  return <p>{description}</p>
                })}
              </div>}
            </div>
          </div>



          {/* --------- display related products ---------- */}

          <RelatedProducts category={productData.category} subCategory={productData.subCategory} />

        </div>
      </div>
    </div>
  ) : <div className=' opacity-0'></div>
}

export default Product
