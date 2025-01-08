import React from 'react'
import { assets } from '../assets/assets'
import { NavLink } from 'react-router-dom'

const Footer = () => {
  return (
    <div>
      <div className='flex flex-col sm:grid grid-cols-[2fr_1fr_1fr] gap-14 my-10 mt-40 text-sm'>

        <div>
            <img src={assets.logo} className='mb-5 w-32' alt="" />
            <p className='w-full md:w-2/3 text-gray-600 max-w-80'>
            529/3 New Sarvodya Nagar
            Sikheda Riad Hapur Pilkhuwa
            Uttar Pradesh, 245304
            </p>
        </div>

        <div>
            <p className='text-xl font-medium mb-5'>COMPANY</p>
            <ul className='flex flex-col gap-1 text-gray-600'>
                <NavLink to='/'><li className='hover:text-gray-950'>Home</li></NavLink>
                <NavLink to='/about'><li className='hover:text-gray-950'>About us</li></NavLink>
                {/* <NavLink to='/collection'><li>Delivery</li></NavLink>
                <NavLink to='/collection'><li>Privacy policy</li></NavLink> */}
            </ul>
        </div>

        <div>
            <p className='text-xl font-medium mb-5'>GET IN TOUCH</p>
            <ul className='flex flex-col gap-1 text-gray-600'>
                <li>+91 9412660412</li>
                <li>info.claysip@gmail.com</li>
            </ul>
        </div>

      </div>

        <div>
            <hr />
            <p className='py-5 text-sm text-center'>Copyright 2024 @ claysip.com - All Right Reserved.</p>
        </div>

    </div>
  )
}

export default Footer
