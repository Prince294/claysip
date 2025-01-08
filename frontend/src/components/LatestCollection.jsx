import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from './Title';
import ProductItem from './ProductItem';
import { useNavigate } from 'react-router-dom';
import { assets } from '../assets/assets';


const LatestCollection = () => {
    const navigate = useNavigate();

    const { products } = useContext(ShopContext);
    const [latestProducts,setLatestProducts] = useState([]);

    useEffect(()=>{
        setLatestProducts(products.slice(0,10));
    },[products])

  return (
    <div className='my-10 flex flex-col'>
      <div className='text-center my-8 text-3xl'>
          <Title text1={'PRODUCT'} text2={'CATEGORIES'} />
          {/* <p className='w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600'>
          Discover the art of cooking with terracotta pots.
          </p> */}
      </div>

      {/* Rendering Products */}
      {/* <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6'> */}
      <div className="grid grid-cols-3 grid-rows-2 gap-4 w-9/12 h-[400px] self-center">
        <div className="row-span-2 cursor-pointer" onClick={()=>{
          navigate('/collection', { state: { data: "Glasses" } })
        }}>
          <img src={assets.glasses} alt="" className="h-full w-full object-cover hover:scale-105 transition ease-in-out" />
        </div>
        <div className="cursor-pointer" onClick={()=>{
          navigate('/collection', { state: { data: "Jugs" } })
        }}>
          <img src={assets.jugs} alt="" className="h-full w-full object-cover hover:scale-105 transition ease-in-out" />
        </div>
        <div className="row-span-2 cursor-pointer" onClick={()=>{
          navigate('/collection', { state: { data: "Bottles" } })
        }}>
          <img src={assets.bottle} alt="" className="h-full w-full object-cover hover:scale-105 transition ease-in-out" />
        </div>
        <div className="cursor-pointer" onClick={()=>{
          navigate('/collection', { state: { data: "Pots" } })
        }}>
          <img src={assets.pot} alt="" className="h-full w-full object-cover hover:scale-105 transition ease-in-out" />
        </div>

        {/* {
          latestProducts.map((item,index)=>(
            <ProductItem key={index} id={item._id} image={item.image} name={item.name} price={item.price} />
          ))
        } */}
      </div>
    </div>
  )
}

export default LatestCollection
