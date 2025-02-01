import React from 'react'
import { assets } from '../assets/assets'
import Title from './Title'

const OurPolicy = () => {
  return (
    <>
      <div className='bg-white py-16 text-secondary'>
      <div className='container'>
        <div className="text-center mb-16 privacy-policy-title">
          <Title text1={"why"} text2={"claysip"}  />
          <img
              src={assets.underline}
              className="w-[150px] mx-auto"
              alt=""
            />
        </div>
        <div className="grid grid-cols-1 sm:gird-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10 text-center">
          <div className="w-full">
            <img
              src={assets.delivery_truck}
              className="w-16 m-auto mb-5"
              alt=""
            />
            <p className="font-bold text-lg mb-5">Express Delivery</p>
            <p className="text-base">
              We offer fasy and reliable shipping to ensure your order reaches you
              promptly, no matter where your are.
            </p>
          </div>
          <div className="w-full">
            <img src={assets.box} className="w-16 m-auto mb-5" alt="" />
            <p className="font-bold text-lg mb-5">Secure & Durable Packing</p>
            <p className="text-base">
              We ensure that all our products are securely and carefully packed to
              prevent any damage during transit, ensuring that they reach you in
              perfect condition.
            </p>
          </div>
          <div className="w-full">
            <img src={assets.quality_icon} className="w-16 m-auto mb-5" alt="" />
            <p className="font-bold text-lg mb-5">Best-in-Quality Products</p>
            <p className="text-base">
              Discover the finest products handcrafted with superior quality and
              attention to detail.
            </p>
          </div>
          <div className="w-full">
            <img src={assets.support_img} className="w-16 m-auto mb-5" alt="" />
            <p className="font-bold text-lg mb-5">Support for Local Artisans</p>
            <p className="text-base">
              Evert purchase supports local artisans, helping to preserve
              traditional crafts and empower communities.
            </p>
          </div>
        </div>
      </div>
      </div>

    </>
  );
}

export default OurPolicy
