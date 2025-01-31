import React from 'react';
import { assets } from '../assets/assets';
import { NavLink } from 'react-router-dom';

// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
// import required modules
import { Pagination } from 'swiper/modules';
import 'swiper/css/autoplay';
import { Autoplay } from 'swiper/modules';

const Hero = () => {
  return (

    <div className='bg-white overflow-hidden'>
      <Swiper
        pagination={{
          dynamicBullets: true,
          clickable: true
        }}
        modules={[Pagination,Autoplay]}
        autoplay={{
          delay: 3000, 
          disableOnInteraction: true,
        }}
        loop={true}
        className="mySwiper"
      >
       { [1].map((index)=>{
          return(

        <SwiperSlide key={index}>
          <div  className='flex flex-col sm:flex-row'>
            {/* Hero Left Side */}
            <div className='order-1 sm:order-0 w-full sm:w-1/2 flex items-center justify-center py-10 sm:py-0'>
              <div className='flex flex-col justify-center md:justify-start md:items-start'>
                <p className='text-center sm:text-left font-semibold text-base md:text-base uppercase text-primary'>our bestseller</p>
                <h1 className='text-center sm:text-left text-5xl sm:py-3 lg:text-7xl leading-relaxed font-semibold'>Latest Arrivals</h1>
                <NavLink to='/collection' className="bg-secondary text-center p-3 px-8 mt-4 text-base text-white rounded-sm hover:bg-primary transition duration-200">
                  SHOP NOW
                </NavLink>
              </div>
            </div>
            {/* Hero Right Side */}
            <img className='order-0 sm:order-1 w-full sm:w-1/2' src={assets.hero_pot1} alt="" />
          </div>
        </SwiperSlide>
         )
        })}


      </Swiper>




    </div>

  )
}

export default Hero
