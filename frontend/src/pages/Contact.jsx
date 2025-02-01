import React, { useEffect } from 'react'
import Title from '../components/Title'
import { assets } from '../assets/assets'
import NewsletterBox from '../components/NewsletterBox'

const Contact = () => {

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [])

  return (
    
    <>
    <div className='py-16 pb-0'>
      <div className='container'>

        <div className='text-center text-2xl'>
          <Title text1={'contact'} text2={'us'} />
          <img className="w-[150px] mx-auto" src={assets.underline} alt="" />
        </div>

        <div className='my-10 flex flex-col justify-center md:flex-row gap-10'>
          <img className='w-full md:max-w-[480px] rounded-md' src={assets.contact_img} alt="" />
          <div className='flex flex-col justify-center items-start gap-2'>
            <h4 className='font-semibold text-2xl text-secondary mb-4'> Our Store</h4>
            <p className=' text-secondary'> <span><img className='w-12 mb-2' src={assets.location} alt="" /></span> 529/3 New Sarvodya Nagar<br /> Sikheda Road Hapur Pilkhuwa<br />Uttar Pradesh, 245304</p>
            <p className=' text-secondary'> <span><img className='w-12 mb-2' src={assets.phone} alt="" /></span>  Tel: +91 8791433405, +91 9412660412, +91 9627567273</p>
            <p className=' text-secondary'> <span><img className='w-12 mb-2' src={assets.gmail} alt="" /></span>   Email: info.claysip@gmail.com</p>
            {/* <p className='font-semibold text-xl text-gray-600'>Careers at Claysip</p> */}
            {/* <p className=' text-gray-500'>Learn more about our teams and job openings.</p>
          <button className='border border-black px-8 py-4 text-sm hover:bg-black hover:text-white transition-all duration-500'>Explore Jobs</button> */}
          </div>
        </div>
      </div>
    </div>
     {/* <NewsletterBox /> */}
     </>
  )
}

export default Contact
