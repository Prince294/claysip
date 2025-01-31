import React, { useContext } from 'react'
import { ShopContext } from '../context/ShopContext'
import { Link } from 'react-router-dom'
import { assets } from '../assets/assets';

const ProductItem = ({ id, image, name, price }) => {

  const { currency } = useContext(ShopContext);

  return (
    <>
      <Link onClick={() => scrollTo(0, 0)} className='text-gray-700 cursor-pointer' to={`/product/${id}`}>
        <div className='overflow-hidden'>
          <img className='hover:scale-110 w-[260px] transition ease-in-out object-contain' src={image.length && image[0] != "" ? image[0] : assets.logo} alt="" />
        </div>
        <p className='text-base font-normal text-secondary capitalize mt-3'>{name}</p>
        <p className='text-lg font-semibold text-secondary mt-2'>{currency}{price}</p>
      </Link>
    </>

  )
}

export default ProductItem
