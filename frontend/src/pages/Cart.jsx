import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from '../components/Title';
import { assets } from '../assets/assets';
import CartTotal from '../components/CartTotal';
import { toast } from 'react-toastify';

const Cart = () => {

  const { products, currency, cartItems, updateQuantity, navigate, getCartCount } = useContext(ShopContext);

  const [cartData, setCartData] = useState([]);

  useEffect(() => {
    if (products.length > 0) {
      const tempData = [];
      for (const items in cartItems) {
        for (const item in cartItems[items]) {
          if (item !== 'main') {
            for (const size in cartItems[items][item]) {
              if (cartItems[items][item][size] > 0) {

                var product_info = products.find(e => e._id === items);
                if (product_info) {
                  let productTypeData = product_info.product_type_data.find(ptd => ptd.index == item);
                  if(productTypeData.price == ""){
                    productTypeData['price'] = product_info.price;
                  }
                  tempData.push({
                    _id: items,
                    size: size != "_" ? size : "Main",
                    quantity: cartItems[items][item][size],
                    price: productTypeData.price,
                    image: productTypeData.image
                  })
                }
              }
            }
          } else {
            for (const size in cartItems[items][item]) {
              if (cartItems[items][item][size] > 0) {

                var product_info = products.find(e => e._id === items);
                if (product_info) {
                  tempData.push({
                    _id: items,
                    size: size != "_" ? size : "Main",
                    quantity: cartItems[items][item][size],
                    price: product_info.price,
                    image: product_info.image
                  })
                }
              }
            }
          }
        }
      }
      setCartData(tempData);
    }
  }, [cartItems, products])

  return (

    <div className='py-16'>
      <div className='container'>
        <div className="flex flex-col lg:flex-row justify-between max-w-[1100px] mx-auto">


          <div className="w-full lg:w-[60%] cart-items mb-8 lg:mb-0">

            <div className='text-left mb-3'>
              <Title text1={'your'} text2={'cart'} />
            </div>

            <div>
              {
                cartData?.map((item, index) => {
                  const productData = products.find((product) => product._id === item._id);
                  if (productData) {
                    return (
                      <div key={index} className='py-4 border-b flex justify-between'>
                        <div className='flex items-start gap-6'>
                          {item?.image?.length && item?.image[0] != "" ? <img src={item.image[0]} alt={productData?.name} className='w-16 sm:w-20' /> : <img src={assets?.logo} alt={"logo"} className='w-16' />}
                          <div>
                            <p className='text-base sm:text-xl font-semibold capitalize'>{productData?.name}</p>
                            <div className='flex items-center gap-2 mt-4'>
                              <p className='text-lg md:text-xl text-secondary'>{currency}{item.price}</p>
                              <p className='text-sm text-secondary'>Size: <span className='font-bold'>{item.size}</span></p>
                               <span>|</span>
                              <p className='text-sm text-secondary'>Qty: <span className='font-bold'>{item.quantity}</span></p>
                            </div>
                          </div>
                        </div>
                       
                          
                          {/* <input onChange={(e) => e.target.value === '' || e.target.value === '0' ? null : updateQuantity(item._id, item.size, Number(e.target.value))} className='border max-w-10 sm:max-w-20 px-1 sm:px-2 py-1 ml-3' type="number" min={1} defaultValue={item.quantity} /> */}
                         


                        
                        
                        <button onClick={() => updateQuantity(item._id, item.index, item.size, 0)} className='font-semibold delete top-2 rounded-full cursor-pointer p-4 bg-lightstone text-primary w-6 h-6 flex items-center justify-center'>
                            X
                        </button>

                        {/* <img onClick={() => updateQuantity(item._id, item.size, 0)} className='w-4 mr-4 sm:w-5 cursor-pointer' src={assets.bin_icon} alt="" /> */}
                      </div>
                    )
                  }

                })
              }
            </div>
          </div>


          <div className='w-[1px] h-auto bg-secondary'></div>

          <div className="w-full lg:w-[34%] flex justify-end">
            <div className='w-full cart-total'>
              <CartTotal />
              <div className=' w-full text-end'>
                <button onClick={() => {
                  if(getCartCount() > 0){
                    navigate('/place-order');
                  } else {
                    toast.error("No Item in the cart")
                  }
                }} className='rounded-sm w-full bg-black text-white px-8 py-3 text-sm mt-12 hover:bg-primary uppercase'>PROCEED TO CHECKOUT</button>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}

export default Cart
