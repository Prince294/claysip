import React, { useEffect } from 'react'
import { assets } from '../assets/assets'
import Title from '../components/Title'

const ShippingPolicy = () => {

  useEffect(() => {
      window.scrollTo(0, 0);
  }, [])
    
  return (
    <>
      <div className='bg-white py-12 text-secondary flex flex-col gap-32'>
        <div className='container flex flex-col gap-1 items-start'>
          <div className="text-center w-full mb-4 privacy-policy-title">
            <Title text1={"Shipping"} text2={"Policy"} />
            <img
                src={assets.underline}
                className="w-[150px] mx-auto"
                alt=""
              />
          </div>
          <p className='mb-6'>At Claysip, we take pride in delivering handcrafted pottery with the utmost care and efficiency. Our goal is to ensure your orders reach you safely and on time.</p>

          <Title text1={"Packaging"} text2={"& Safety Measures"} />
          <li>We are committed to delivering your orders within 7-8 business days from the date of purchase. While we strive to maintain this timeline, unforeseen circumstances such as weather conditions, holidays, or logistical delays may slightly affect delivery schedules.</li>

          <li>Each product is wrapped in multiple protective layers to absorb shocks during transit.</li>

          <li className='mb-6'>We use high-quality, eco-friendly cushioning materials to prevent breakage.
          Our packaging undergoes multiple quality checks before dispatch to minimize any risk of damage.</li>

          <Title text1={"Damaged or"} text2={"Broken Deliveries"}  />
          <li>In the rare event that your order arrives damaged, we request you to:</li>
          <ul style={{listStyleType:"circle"}} className='ml-10 mb-6'>
            <li>Take clear photos of the damaged product and packaging.</li>
            <li>Email us at <span className='text-orange-800'>info.claysip@gmail.com</span> within 24 hours of receiving the order.</li>
            <li>Our team will assess the issue and provide a replacement or refund as per our policy.</li>
          </ul>

          <Title text1={"Shipping"} text2={"Locations"}  />
          <li className='mb-6'>Currently, we deliver across PAN India. For international shipping inquiries, please contact our support team.
          </li>

          <Title text1={"Order"} text2={"Tracking"}  />
          <li className='mb-6'>Once your order is shipped, you will receive a tracking number via email to monitor its progress until delivery.</li>

          
          <p className='text-center w-full mt-4'>For any further queries, feel free to contact us at <span className='text-orange-800'>+91 8791433405, +91 9412660412, +91 9627567273</span> or email us at <span className='text-orange-800'>info.claysip@gmail.com</span></p>
          <p className='text-center w-full'>Thank you for choosing Claysip! We appreciate your trust in our craftsmanship.</p>
          
        </div>
      </div>

    </>
  );
}

export default ShippingPolicy
