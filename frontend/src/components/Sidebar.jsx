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

  const settingCartData = () => {
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
                if (product_info) {
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
        `z-[99] fixed flex flex-col w-80 sm:w-96 h-full top-0 right-0 p-4 font-base bg-white shadow-2xl transition-transform duration-300 ease-in-out  ${!sidebar ? 'translate-x-96' : ''}`
      }
    >
      {sidebar && <div onClick={() => toggleSidebar(false)} className='-left-12 top-2 rounded-full absolute cursor-pointer px-5 py-3 bg-primary text-white w-10 h-10 flex items-center justify-center'>X</div>}

      <h1 className="text-2xl sm:py-3 font-medium mb-2">Cart</h1>

      {getCartAmount() > 100 && <p className="mb-6">You are eligible for free delivery</p>}

      <div className="flex-row w-full overflow-y-auto">
        {cartData.length ? cartData?.map((item, index) => {
          return (
            <React.Fragment key={index}>
              <div className="flex gap-4 items-start justify-start">
                {item?.image && item?.image[0]?.length ? <img src={item?.image[0]} alt={item?.name} className='w-16' /> : <img src={assets?.logo} alt={"logo"} className='w-16' />}
                <div className="flex-1 gap-4 w-full">
                  <h3 className="text-base font-semibold capitalize">{item?.name}</h3>
                  <p className="text-sm text-secondary" >{item?.description?.length > 40 ? item?.description?.substring(0, 40) + "..." : item?.description}</p>
                  <div className="flex justify-between items-center w-full mt-2">
                    <div className="border border-black w-16 grid grid-cols-3 items-center">
                      <span className="px-2 cursor-pointer" onClick={() => updateQuantity(item._id, item.index, item.size, item?.quantity - 1)}>-</span>
                      <span className="text-center">{item?.quantity}</span>
                      <span className="px-2 cursor-pointer" onClick={() => updateQuantity(item._id, item.index, item.size, item?.quantity + 1)}>+</span>
                    </div>
                    <span>{currency}{item?.price}</span>
                  </div>
                </div>
              </div>
              <hr className="w-full h-[1px] my-4 bg-lightstone" />
            </React.Fragment>
          )
        }) : <div className="flex flex-col w-full gap-4 items-center justify-center mt-8">
          <img src={assets.shoping_cart} className="w-[220px]" alt="" />
          Cart is empty!
        </div>}
      </div>

      <Link to='/cart' className="mt-auto">
        <button className='rounded-sm w-full bg-black text-white px-8 py-3 text-sm hover:bg-primary uppercase' onClick={() => toggleSidebar(false)}>Proceed to checkout</button>
      </Link>

    </div>
  );
};

export default Sidebar;
