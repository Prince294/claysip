import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from './Title';
import ProductItem from './ProductItem';
import { assets } from '../assets/assets';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
import { Link } from 'react-router-dom'


// Import Swiper styles
import 'swiper/css';
import "swiper/css/navigation";
import 'swiper/css/autoplay';
import { Autoplay, Navigation, Mousewheel, Keyboard } from 'swiper/modules';
import { } from 'swiper/modules';

const BestSeller = () => {
  const { products, currency } = useContext(ShopContext);
  const [bestSeller, setBestSeller] = useState([]);

  useEffect(() => {
    const bestProduct = products.filter((item) => (item.bestseller));
    setBestSeller(bestProduct.slice(0, 5))
  }, [products])

  return (
    <div className='py-16'>
      <div className="container bg-lightstone px-2">
        <div className='text-center py-8'>
          <Title text1={'best'} text2={'sellers'} />
          <img
            src={assets.underline}
            className="w-[150px] mx-auto"
            alt=""
          />
          <p className='w-3/4 m-auto text-sm md:text-base text-secondary'>
            Discover the art of cooking with terracotta pots.
          </p>
        </div>

        <Swiper
        modules={[Autoplay,Navigation, Mousewheel, Keyboard]}
        navigation={true}
        mousewheel={true}
        keyboard={true}
        spaceBetween={15}
        breakpoints={{
          // When window width is >= 640px
          640: {
            slidesPerView: 1,
          },
          // When window width is >= 768px
          768: {
            slidesPerView: 3,
          },
          // When window width is >= 1024px
          1024: {
            slidesPerView: 4,
          },
        }}
       
        className="mySwiper"
      >
        
       
       
          {bestSeller.length > 0 ? bestSeller.map((item, index) => {
            return (<>
              <SwiperSlide>
                <Link onClick={() => scrollTo(0, 0)} className='w-full cursor-pointer' to={`/product/${item?._id}`} key={index}>
                  <a href="#" className='w-full'>
                    <img className="p-2 w-full rounded-t-lg" src={item?.image?.length && item?.image[0] != "" ? item?.image[0] : assets.logo} alt="product image" />
                  </a>
                  <div className="p-4 rounded-md">
                    <a href="#">
                      <p className="text-base font-normal text-secondary">{item.name}</p>
                    </a>
                    <p className="text-lg font-semibold text-secondary mt-2">{currency}{item.price}</p>
                  </div>
                </Link>
              </SwiperSlide>
            </>)
          })
          :
          <div className='text-xl text-center col-span-full mt-2 mb-3'>No Product Found</div>
        }
       

      </Swiper>






      </div>
    </div>
  )
}

export default BestSeller
