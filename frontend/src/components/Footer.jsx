import React from 'react'
import { assets } from '../assets/assets'
import { NavLink } from 'react-router-dom'

const Footer = () => {
  return (


    <div className='bg-lightstone pt-16 px-4 md:px-7 text-secondary mt-4'>
      <div className="container">
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-14 mb-14 text-base justify-items-start'>

          <div>
            <img src={assets.logo} className='mb-5 w-32' alt="" />
            {/* <p className='w-full md:w-2/3 text-secondary max-w-80'>
              529/3 New Sarvodya Nagar
              Sikheda Road Hapur Pilkhuwa
              Uttar Pradesh, 245304
            </p> */}
          </div>

          <div>
            <p className='text-xl font-bold mb-4 capitalize' >explore</p>
            <ul className='flex flex-col gap-1 text-secondary'>
              <NavLink to='/'><li className='hover:text-primary'>Home</li></NavLink>
              <NavLink to='/about'><li className='hover:text-primary'>About us</li></NavLink>
              <NavLink to='/contact'><li className='hover:text-primary'>Contact us</li></NavLink>
              <NavLink to='/shipping-policy'><li className='hover:text-primary'>Shipping Policy</li></NavLink>
              <NavLink to='/return-policy'><li className='hover:text-primary'>Return Policy</li></NavLink>
              <a href="https://www.delhivery.com/tracking" target='_blank'><li className='hover:text-primary'>Track your order</li></a>
              {/* <NavLink to='/collection'><li>Delivery</li></NavLink>
                <NavLink to='/collection'><li>Privacy policy</li></NavLink> */}
            </ul>
          </div>

          <div>
            <p className='text-xl font-bold mb-4 capitalize'>get in touch</p>
            <ul className='flex flex-col text-secondary'>
              <li>Phone Number:</li>
              <li className='mb-2'>+91 9412660412</li>
              <li>Email:</li>
              <li className='mb-3'>info.claysip@gmail.com</li>
              <li><a href='https://www.instagram.com/clay_sip' target='_blank' title='Claysip - Instagram'><img src={assets.instagram} alt="" className='max-w-[24px]' /></a></li>
            </ul>
          </div>
        </div>

        <div className='text-center'>
          <hr className='border-primary' />
          <p className='py-5 text-sm text-center text-light text-secondary'>Copyright 2024 @ claysip.com - All Right Reserved.</p>
        </div>


      </div>


    </div>
  )
}

export default Footer
