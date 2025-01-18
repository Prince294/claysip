import React from 'react'
import Title from './Title';
import { assets } from '../assets/assets';

const NewsletterBox = () => {

  const onSubmitHandler = (event) => {
    event.preventDefault();
  }

  return (
    <div className='py-16'>
      <div className='container relative border border-dashed border-primary py-8 m-4 rounded-md px-4'>
        <img className='absolute w-16 -top-6 left-5' src={assets.scissor} alt="" />
        <div className="flex flex-col items-center">
          <Title text1={'Sign up'} text2={'for newsletter'} />
          <p className='text-secondary mt-3'>
            To receive updates
          </p>
          <form onSubmit={onSubmitHandler} className='w-full sm:w-[75%] xl:w-1/2 flex items-center gap-3 mx-auto my-6 border border-primary rounded-sm pl-3'>
            <input className='w-full sm:flex-1 outline-none border-0 ring-0 focus:ring-0 focus:border-none' type="email" placeholder='Enter your email' required />
            <button type='submit' className="bg-secondary p-4 px-8 text-base text-white rounded-sm hover:bg-primary transition duration-200">SUBSCRIBE</button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default NewsletterBox
