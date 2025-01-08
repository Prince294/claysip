import React, { useContext, useState, useEffect } from "react";
import { ShopContext } from "../context/ShopContext";
import { assets } from '../assets/assets';
import { Link, NavLink } from 'react-router-dom';

const Sidebar = () => {
  const { getCartAmount, cartItems, products, currency, updateQuantity, sidebar, toggleSidebar } = useContext(ShopContext);

  const [cartData, setCartData] = useState([]);

  useEffect(() => {
    settingCartData();
  }, [cartItems, products]);

  const settingCartData = ()=>{
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
                  size: size,
                  quantity: cartItems[items][item][size],
                  name: product_info.name,
                  description: product_info.description,
                  ...productTypeData
                  });
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
                  size: size,
                  quantity: cartItems[items][item][size],
                  ...product_info
                  });
                }
              }
            }
          }
        }
      }
      setCartData(tempData);
    }
  }

  return (
    <div
      className={
        `fixed flex flex-col w-96 h-full top-0 right-0 p-4 font-base px-12 bg-white shadow-2xl transition-transform duration-300 ease-in-out  ${!sidebar ? 'translate-x-96' : ''}`
      }
    >
        {sidebar && <div onClick={()=>toggleSidebar(false)} className='-left-12 top-2 rounded-full absolute inline cursor-pointer px-5 py-3 bg-white w-10 h-10 flex items-center justify-center'>X</div>}
        
      <h1 className="prata-regular text-3xl sm:py-3 leading-relaxed">Cart</h1>
      {getCartAmount() > 100 && <p className="mb-6">You are eligible for free delivery</p>}

      <div className="flex-row w-full">
        {cartData.length ? cartData?.map((item, index)=>{
            return (
            <React.Fragment key={index}>
                <div className="flex gap-4 items-start justify-start">
                    {item?.image && item?.image[0]?.length ? <img src={item?.image[0]} alt={item?.name} className='w-16' /> : <img src={assets?.logo} alt={"logo"} className='w-16' />}
                    <div className="flex-row gap-4 w-full">
                        <h3>{item?.name}</h3>
                        <p>{item?.description?.length > 40 ? item?.description?.substring(0,40) + "..." : item?.description}</p>
                        <div className="flex justify-between items-center w-full mt-2">
                            <div className="border border-black w-16 grid grid-cols-3 items-center">
                                <span className="px-2 cursor-pointer" onClick={()=> updateQuantity(item._id, item.index, item.size, item?.quantity - 1)}>-</span>
                                <span className="text-center">{item?.quantity}</span>
                                <span className="px-2 cursor-pointer" onClick={()=> updateQuantity(item._id, item.index, item.size, item?.quantity + 1)}>+</span>
                            </div>
                            <span>{currency}{item?.price}</span>
                        </div>
                    </div>
                </div>
                <hr className="w-full h-[2px] bg-black m-4"/>
            </React.Fragment>
            )
        }) : <div className="flex flex-col w-full gap-4 items-center justify-center mt-8">
          <img src={assets.cart_icon} className="w-20" alt="" />
          Cart is empty!
          </div>}
      </div>
        <Link to='/cart' className="mt-auto">
          <button className='w-full bg-black text-white px-8 py-3 text-sm active:bg-gray-700' onClick={()=>toggleSidebar(false)}>Proceed to checkout</button>
        </Link>
    </div>
  );
};

export default Sidebar;
