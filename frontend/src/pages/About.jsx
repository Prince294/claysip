import React, { useEffect } from 'react'
import Title from '../components/Title'
import { assets } from '../assets/assets'
import NewsletterBox from '../components/NewsletterBox'

const About = () => {

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [])
  
  return (
    <>
    <div className='py-16 pb-0 md:pb-6'>
      <div className='container'>

        <div className='max-w-[900px] mx-auto'>
          <div className='text-center'>
            <Title text1={'about'} text2={'us'} />
            <img className="w-[150px] mx-auto" src={assets.underline} alt="" />
          </div>

          <div className='my-10 flex flex-col md:flex-row gap-16'>
            <img className='w-full md:max-w-[450px] rounded-md' src={assets.about_img} alt="" />
            <div className='flex flex-col justify-center gap-6 md:w-2/4 text-secondary'>
              <p>Claysip was born out of a passion for innovation and a desire to revolutionize the way people shop online. Our journey began with a simple idea: to provide a platform where customers can easily discover, explore, and purchase a wide range of products from the comfort of their homes.</p>
              <p>Since our inception, we've worked tirelessly to curate a diverse selection of high-quality products that cater to every taste and preference. From fashion and beauty to electronics and home essentials, we offer an extensive collection sourced from trusted brands and suppliers.</p>
              <b className='text-secondary text-xl font-semibold'>Our Mission</b>
              <p>Our mission at Claysip is to empower customers with choice, convenience, and confidence. We're dedicated to providing a seamless shopping experience that exceeds expectations, from browsing and ordering to delivery and beyond.</p>
            </div>
          </div>
        </div>

        <div className='py-8 mt-16 text-center'>
          <Title text1={'why'} text2={'choose us'} />
          <img className="w-[150px] mx-auto" src={assets.underline} alt="" />
        </div>

        <div className='flex flex-col md:flex-row text-sm mb-10'>
          <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-4'>
            <img
              src={assets.quality_icon}
              className="w-16"
              alt=""
            />
            <h4 className='font-semibold text-lg md:text-xl text-secondary'>Quality Assurance</h4>
            <p className=' text-secondary text-base'>We meticulously select and vet each product to ensure it meets our stringent quality standards.</p>
          </div>
          <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-4'>
            <img
              src={assets.interface_ui}
              className="w-16"
              alt=""
            />
            <h4 className='font-semibold text-lg md:text-xl text-secondary'>Convenience</h4>
            <p className=' text-secondary text-base'>With our user-friendly interface and hassle-free ordering process, shopping has never been easier.</p>
          </div>
          <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
            <img
              src={assets.support_img}
              className="w-16"
              alt=""
            />
            <h4 className='font-semibold text-lg md:text-xl text-secondary'>Exceptional Customer Service</h4>
            <p className=' text-secondary text-base'>Our team of dedicated professionals is here to assist you the way, ensuring your satisfaction is our top priority.</p>
          </div>
        </div>
      </div>
    </div>
    <NewsletterBox />
    </>
  )
}

export default About
