import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { ShopContext } from '../context/ShopContext';
import { assets } from '../assets/assets';
import RelatedProducts from '../components/RelatedProducts';

const Product = () => {

  const { productId } = useParams();
  const { products, currency ,addToCart } = useContext(ShopContext);
  const [productData, setProductData] = useState(false);
  const [image, setImage] = useState('')
  const [productType,setProductType] = useState('')
  const [size,setSize] = useState('')

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
  }, [productId,products])

  useEffect(() => {
    if(productType != ""){
      setSize("");
      if(productType?.image && productType?.image[0]){
        setImage(productType.image[0]);
      } else {
        setImage("");
      }
    }
  }, [productType])

  return productData ? (
    <div className='border-t-2 pt-10 transition-opacity ease-in duration-500 opacity-100'>
      {/*----------- Product Data-------------- */}
      <div className='flex gap-12 sm:gap-12 flex-col sm:flex-row'>

        {/*---------- Product Images------------- */}
        <div className='flex-1 flex flex-col-reverse gap-3 sm:flex-row'>
          <div className='flex sm:flex-col overflow-x-auto sm:overflow-y-scroll justify-between sm:justify-normal sm:w-[18.7%] w-full pr-2'>
          {
            productType === "" && productData.image.length > 0 ? (
              productData.image.map((item, index) => (
                <img
                  onClick={() => setImage(item)}
                  src={item}
                  alt=""
                  key={index}
                  className="w-[24%] sm:w-full sm:mb-3 flex-shrink-0 cursor-pointer border p-3"
                />
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
          <h1 className='font-medium text-2xl mt-2'>{productData.name}</h1>
          {/* <div className=' flex items-center gap-1 mt-2'>
              <img src={assets.star_icon} alt="" className="w-3 5" />
              <img src={assets.star_icon} alt="" className="w-3 5" />
              <img src={assets.star_icon} alt="" className="w-3 5" />
              <img src={assets.star_icon} alt="" className="w-3 5" />
              <img src={assets.star_dull_icon} alt="" className="w-3 5" />
              <p className='pl-2'>(122)</p>
          </div> */}
          <p className='mt-5 text-3xl font-medium'>{currency}{productData.price}</p>
          <p className='mt-5 text-gray-500 md:w-4/5'>{productData.description}</p>
          <div className='flex flex-col gap-4 my-8'>
              <p>Select Product Type</p>
              <div className='flex gap-2'>
                {productData?.product_type_data?.map((item,index)=>(
                  <button onClick={()=>{
                    if(productType == item){
                      setSize("");
                      setProductType("");
                      setImage(productData.image.length ? productData.image[0] : assets?.logo)
                    } else {
                      setProductType(item);
                    }
                    }} className={`border py-2 px-4 bg-gray-100 ${item === productType ? 'border-orange-500' : ''}`} key={index}>
                    {item?.image && item?.image[0]?.length ? <img src={item?.image[0]} alt="" className='w-16' /> : <img src={assets?.logo} alt={"logo"} className='w-16' />}
                    </button>
                ))}
              </div>
          </div>
          {productType?.size_available && <div className='flex flex-col gap-4 my-8'>
              <p>Select Size</p>
              <div className='flex gap-2'>
                {productType?.sizes?.map((item,index)=>(
                  <button onClick={()=>setSize(item)} className={`border py-2 px-4 bg-gray-100 ${item === size ? 'border-orange-500' : ''}`} key={index}>{item}</button>
                ))}
              </div>
          </div>}
          <button onClick={()=>addToCart(productData._id,productType, size, productType?.size_available)} className='bg-black text-white px-8 py-3 text-sm active:bg-gray-700'>ADD TO CART</button>
          <hr className='mt-8 sm:w-4/5' />
          {productData?.full_description && <div className='text-sm text-gray-500 mt-5 flex flex-col gap-1'>
            {productData?.full_description.split("\n").map((description, index)=>{
              return <p>{description}</p>
            })}
          </div>}
        </div>
      </div>

      {/* ---------- Description & Review Section ------------- */}
      {
      // productData?.full_description ? <div className='mt-20'>
      //   <div className='flex'>
      //     <b className='border px-5 py-3 text-sm'>Description</b>
      //     {/* <p className='border px-5 py-3 text-sm'>Reviews (122)</p> */}
      //   </div>
      //   <div className='flex flex-col gap-4 border px-6 py-6 text-sm text-gray-500'>
      //     <p>{productData?.full_description}</p>
      //   </div>
      // </div> : ""
      }

      {/* --------- display related products ---------- */}

      <RelatedProducts category={productData.category} subCategory={productData.subCategory} />

    </div>
  ) : <div className=' opacity-0'></div>
}

export default Product
