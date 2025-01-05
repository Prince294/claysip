import React, { useContext, useState, useEffect } from "react";
import { ShopContext } from "../context/ShopContext";
import { assets } from '../assets/assets';
import { Link, NavLink } from 'react-router-dom';

const Sidebar = () => {
  const { setCartItems, cartItems, products, currency, updateQuantity, sidebar, toggleSidebar } = useContext(ShopContext);

  const [cartData, setCartData] = useState([]);

  useEffect(() => {
    if (products.length > 0) {
      const tempData = [];
      for (const items in cartItems) {
        for (const item in cartItems[items]) {
          if (cartItems[items][item] > 0) {

            var product_info = products.find(e => e._id === items);

            if(product_info){
              tempData.push({
                _id: items,
                size: item,
                quantity: cartItems[items][item],
                ...product_info
              });
            }
          }
        }
      }
      setCartData(tempData);
      console.log(tempData);
    }
  }, [cartItems, products]);

  return (
    <div
      className={
        `fixed flex flex-col w-96 h-full top-0 right-0 p-4 font-base px-12 bg-white shadow-2xl transition-transform duration-300 ease-in-out  ${!sidebar ? 'translate-x-96' : ''}`
      }
    >
        {sidebar && <div onClick={()=>toggleSidebar(false)} className='-left-12 top-2 rounded-full absolute inline cursor-pointer px-5 py-3 bg-white w-10 h-10 flex items-center justify-center'>X</div>}
        
      <h1 className="prata-regular text-3xl sm:py-3 leading-relaxed">Cart</h1>
      <p className="mb-6">You are eligible for free delivery</p>

      <div className="flex-row w-full">
        {cartData?.map((item, index)=>{
            return (
            <>
                <div className="flex gap-4 items-start justify-start">
                    {item?.image?.length ? <img src={item?.image[0]} alt={item?.name} className='w-16' /> : <img src={assets?.logo} alt={"logo"} className='w-16' />}
                    <div className="flex-row gap-4">
                        <h3>{item?.name}</h3>
                        <p>{item?.description?.length > 40 ? item?.description?.substring(0,40) + "..." : item?.description}</p>
                        <div className="flex justify-between items-center">
                            <div className="border border-black w-16 grid grid-cols-3 items-center">
                                <span className="px-2 cursor-pointer" onClick={()=> updateQuantity(item._id, item.size, item?.quantity - 1)}>-</span>
                                <span className="text-center">{item?.quantity}</span>
                                <span className="px-2 cursor-pointer" onClick={()=> updateQuantity(item._id, item.size, item?.quantity + 1)}>+</span>
                            </div>
                            <span>{currency}{item?.price}</span>
                        </div>
                    </div>
                </div>
                <hr className="w-full h-[2px] bg-black m-4"/>
            </>
            )
        })}
      </div>
        <Link to='/cart' className="mt-auto">
          <button className='w-full bg-black text-white px-8 py-3 text-sm active:bg-gray-700'>Proceed to checkout</button>
        </Link>
    </div>
  );
};

export default Sidebar;
