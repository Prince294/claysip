import React, { useEffect, useState } from 'react';
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
import { toast } from 'react-toastify'
import http from '../../../admin/src/services/utility';
import { backendUrl } from '../../../admin/src/App';

const Hero = () => {
  const [list, setList] = useState([])

  useEffect(() => {
    fetchList()
  }, [])

  const fetchList = async () => {
    try {

      const response = await http.get(backendUrl + '/api/banner/list')
      if (response.data.success) {
        setList(response.data.banners);
      }
      else {
        toast.error(response.data.message)
      }

    } catch (error) {
      console.log(error)
      toast.error(error.message)
    }
  }

  return (

    <div className='bg-white overflow-hidden w-full'>
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
        <SwiperSlide>
          <div  className='flex flex-col sm:flex-row w-full justify-center'>
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
            <img className='order-1 max-h-[470px] object-cover px-16' src={assets.hero_pot1} alt="" />
          </div>
        </SwiperSlide>

        {list.map((data,index)=>{
          return(
            <SwiperSlide key={index}>
              <NavLink to='/collection' className='flex flex-col sm:flex-row w-full justify-center' title="Latest Arrivals">
                <img className='w-[95%] max-h-[480px] object-cover' src={data.image} alt="" />
              </NavLink>
            </SwiperSlide>
         )
        })}
      </Swiper>

    </div>
  )
}

export default Hero
