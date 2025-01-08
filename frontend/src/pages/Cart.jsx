import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from '../components/Title';
import { assets } from '../assets/assets';
import CartTotal from '../components/CartTotal';

const Cart = () => {

  const { products, currency, cartItems, updateQuantity, navigate } = useContext(ShopContext);

  const [cartData, setCartData] = useState([]);

  useEffect(() => {



    if (products.length > 0) {
      const tempData = [];
      for (const items in cartItems) {
        for (const item in cartItems[items]) {
          if(item !== 'main'){
            for (const size in cartItems[items][item]) {
              if (cartItems[items][item][size] > 0) {
                
                var product_info = products.find(e => e._id === items);
                if(product_info){
                  let productTypeData = product_info.product_type_data.find(ptd => ptd.index == item);
                  tempData.push({
                    _id: items,
                    size: size != "_" ? size : "Main",
                    quantity: cartItems[items][item][size],
                    price: productTypeData.price
                  })
                }
              }
            }
          } else {
            for (const size in cartItems[items][item]) {
              if (cartItems[items][item][size] > 0) {
                
                var product_info = products.find(e => e._id === items);
                if(product_info){
                  tempData.push({
                    _id: items,
                    size: size != "_" ? size : "Main",
                    quantity: cartItems[items][item][size],
                    price: product_info.price
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
    <div className='border-t pt-14'>

      <div className=' text-2xl mb-3'>
        <Title text1={'YOUR'} text2={'CART'} />
      </div>

      <div>
        {
          cartData?.map((item, index) => {
            const productData = products.find((product) => product._id === item._id);
            if(productData){
              return (
                <div key={index} className='py-4 border-t border-b text-gray-700 grid grid-cols-[4fr_0.5fr_0.5fr] sm:grid-cols-[4fr_2fr_0.5fr] items-center gap-4'>
                  <div className=' flex items-start gap-6'>
                    {productData?.image?.length ? <img src={productData.image[0]} alt={productData?.name} className='w-16 sm:w-20' /> : <img src={assets?.logo} alt={"logo"} className='w-16' />}
                    <div>
                      <p className='text-xs sm:text-lg font-medium'>{productData?.name}</p>
                      <div className='flex items-center gap-2 mt-2'>
                        <p>{currency}{item.price}</p>
                        <span className='ml-5'>Size:</span><p className='px-5 border bg-slate-50 rounded-2xl'>{item.size}</p>
                      </div>
                    </div>
                  </div>
                  <div className='flex justfy-center items-center gap-4'>
                    <span>Qty:</span>
                    {/* <input onChange={(e) => e.target.value === '' || e.target.value === '0' ? null : updateQuantity(item._id, item.size, Number(e.target.value))} className='border max-w-10 sm:max-w-20 px-1 sm:px-2 py-1 ml-3' type="number" min={1} defaultValue={item.quantity} /> */}
                    <p className='px-5 border bg-slate-50 rounded-2xl'>{item.quantity}</p>


                  </div>
                  <img onClick={() => updateQuantity(item._id, item.size, 0)} className='w-4 mr-4 sm:w-5 cursor-pointer' src={assets.bin_icon} alt="" />
                </div>
              )
            }

          })
        }
      </div>

      <div className='flex justify-end my-20'>
        <div className='w-full sm:w-[450px]'>
          <CartTotal />
          <div className=' w-full text-end'>
            <button onClick={() => navigate('/place-order')} className='bg-black text-white text-sm my-8 px-8 py-3'>PROCEED TO CHECKOUT</button>
          </div>
        </div>
      </div>

    </div>
  )
}

export default Cart
