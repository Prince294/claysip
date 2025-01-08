import React from 'react'
import { assets } from '../assets/assets'
import Title from './Title'

const OurPolicy = () => {
  return (
    <>
      <div className="text-center py-8 text-3xl pt-20">
        <Title text1={"WHY"} text2={"SWADESHI BLESSINGS"} />
      </div>
      <div className="flex flex-col sm:flex-row justify-around gap-10 text-center pb-20 text-xs sm:text-sm md:text-base text-gray-700">
        <div className="w-80">
          <img
            src={assets.delivery_truck}
            className="w-12 m-auto mb-5"
            alt=""
          />
          <p className=" font-semibold">Express Delivery</p>
          <p className=" text-gray-400">
            We offer fasy and reliable shipping to ensure your order reaches you
            promptly, no matter where your are.
          </p>
        </div>
        <div className="w-80">
          <img src={assets.box} className="w-12 m-auto mb-5" alt="" />
          <p className=" font-semibold">Secure & Durable Packing</p>
          <p className=" text-gray-400">
            We ensure that all our products are securely and carefully packed to
            prevent any damage during transit, ensuring that they reach you in
            perfect condition.
          </p>
        </div>
        <div className="w-80">
          <img src={assets.quality_icon} className="w-12 m-auto mb-5" alt="" />
          <p className=" font-semibold">Best-in-Quality Products</p>
          <p className=" text-gray-400">
            Discover the finest products handcrafted with superior quality and
            attention to detail.
          </p>
        </div>
        <div className="w-80">
          <img src={assets.support_img} className="w-12 m-auto mb-5" alt="" />
          <p className=" font-semibold">Support for Local Artisans</p>
          <p className=" text-gray-400">
            Evert purchase supports local artisans, helping to preserve
            traditional crafts and empower communities.
          </p>
        </div>
      </div>
    </>
  );
}

export default OurPolicy
