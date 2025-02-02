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

        <div className='max-w-[1050px] mx-auto'>
          <div className='text-center'>
            <Title text1={'about'} text2={'us'} />
            <img className="w-[150px] mx-auto" src={assets.underline} alt="" />
          </div>

          <div className='my-10 flex flex-col md:flex-row gap-12 items-start content-center'>
            <img className='w-full max-w-[460px] max-h-[800px] rounded-md' src={assets.about_img} alt="" />
            <div className='flex flex-col justify-center gap-4 md:w-2/4 text-secondary'>
              <p>At Claysip, we believe in bringing sustainability and tradition back to modern living. Our mission is to redefine the way people enjoy their beverages—by offering eco-friendly, handcrafted clay products that enhance taste, preserve health, and promote a greener planet.</p>
              <p>Rooted in heritage yet inspired by innovation, Claysip combines the artistry of skilled potters with contemporary design to create 100% natural, biodegradable, and chemical-free clay drinkware. Every sip from our products is a step toward sustainability, reducing plastic waste while reconnecting you with the purity of nature.</p>
              <p>Join us on our journey to sip responsibly, embrace sustainability, and celebrate the timeless charm of earthenware.</p>
              <b className='text-secondary text-xl font-semibold'>Our Mission</b>
              <p>To inspire a shift towards sustainable living by offering eco-friendly, handcrafted clay drinkware that enhances the drinking experience while protecting the environment. We are committed to preserving traditional craftsmanship, reducing plastic waste, and promoting healthier, chemical-free choices for a better tomorrow.</p>
              <p>Claysip - Sip Naturally, Live Sustainably.</p>
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
    {/* <NewsletterBox /> */}
    </>
  )
}

export default About
