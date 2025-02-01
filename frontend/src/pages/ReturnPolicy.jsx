import React, { useEffect } from 'react'
import { assets } from '../assets/assets'
import Title from '../components/Title'

const ReturnPolicy = () => {

  useEffect(() => {
      window.scrollTo(0, 0);
  }, [])
    
  return (
    <>
      <div className='bg-white py-16 text-secondary flex flex-col gap-16'>
        <div className='container flex flex-col gap-4 items-center'>
          <div className="text-center mb-4 privacy-policy-title">
            <Title text1={"Return"} text2={"Policy"}  />
            <img
                src={assets.underline}
                className="w-[150px] mx-auto"
                alt=""
              />
          </div>
          <p className='mx-8 text-center'>At Claysip, customer satisfaction is at the heart of everything we do. If you're not completely satisfied with your purchase, we're here to help. Please review our return and exchange policy below.</p>

          <div className="text-center mt-6 privacy-policy-title">
            <Title text1={"Eligibility for"} text2={"Returns"}  />
            <img
                src={assets.underline}
                className="w-[150px] mx-auto"
                alt=""
              />
          </div>

          <div className="grid grid-cols-1 sm:gird-cols-2 md:grid-cols-3 gap-10 text-center mt-8 mx-20">
            <div className="w-full">
              <img src={assets.box} className="w-16 m-auto mb-5" alt="" />
              <p className="font-bold text-lg mb-5">Condition</p>
              <p className="text-base">
              Items must be unused, in their original packaging, and in the same condition as when received. Items that show signs of use or damage may not qualify for a return.
              </p>
            </div>
            <div className="w-full">
              <img
                src={assets.time_frame}
                className="w-16 m-auto mb-5"
                alt=""
              />
              <p className="font-bold text-lg mb-5">Time Frame</p>
              <p className="text-base">
              Returns must be initiated within 30 days of receiving your order.
              </p>
            </div>
            <div className="w-full">
              <img src={assets.quality_icon} className="w-16 m-auto mb-5" alt="" />
              <p className="font-bold text-lg mb-5">Exclusions</p>
              <p className="text-base">
              Custom or personalized pottery items are not eligible for returns unless they arrive damaged or defective.
              </p>
            </div>
          </div>
        </div>



        <div className='container flex flex-col gap-4 items-center'>
          <div className="text-center mb-4 privacy-policy-title">
            <Title text1={"How to"} text2={"Initiate a Return"}  />
            <img
                src={assets.underline}
                className="w-[150px] mx-auto"
                alt=""
              />
          </div>
          
          <div className="grid grid-cols-1 sm:gird-cols-2 md:grid-cols-3 gap-10 text-center mt-4 mx-20">
            <div className="w-full">
              <img
                src={assets.support_img}
                className="w-16 m-auto mb-5"
                alt=""
              />
              <p className="font-bold text-lg mb-5">Contact Us</p>
              <p className="text-base">
              Email us at <span className='text-orange-800'>info.claysip@gmail.com</span> with your order number and reason for the return.
              </p>
            </div>
            <div className="w-full">
              <img src={assets.approved} className="w-16 m-auto mb-5" alt="" />
              <p className="font-bold text-lg mb-5">Approval</p>
              <p className="text-base">
              Once your return request is approved, you will receive instructions on how to ship the item back to us.
              </p>
            </div>
            <div className="w-full">
              <img src={assets.delivery_truck} className="w-16 m-auto mb-5" alt="" />
              <p className="font-bold text-lg mb-5">Shipping</p>
              <p className="text-base">
              Customers are responsible for return shipping costs unless the return is due to a damaged or defective product.
              </p>
            </div>
          </div>
        </div>


        <div className='container flex flex-col gap-4 items-center'>
          <div className="text-center mb-2 privacy-policy-title">
            <Title text1={"Damaged or"} text2={"Defective Items"}  />
            <img
                src={assets.underline}
                className="w-[150px] mx-auto"
                alt=""
              />
          </div>
          <p>If your item arrives damaged or defective, please notify us within 7 days of delivery. Send an email to Info.claysip@gmail.com with the following information:</p>

          <div className="grid grid-cols-1 sm:gird-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10 text-center mt-10">
            <div className="w-full">
              <img
                src={assets.to_do_list}
                className="w-16 m-auto mb-5"
                alt=""
              />
              <p className="font-bold text-lg mb-5">Order number</p>
              <p className="text-base">
              Photos of the damaged item and packaging we will arrange for a replacement or issue a full refund, including shipping costs.
              </p>
            </div>
            <div className="w-full">
              <img src={assets.exchange_icon} className="w-16 m-auto mb-5" alt="" />
              <p className="font-bold text-lg mb-5">Processing Time</p>
              <p className="text-base">
              Once we receive and inspect your returned item, we will notify you of the approval or rejection of your refund.
              </p>
            </div>
            <div className="w-full">
              <img src={assets.selection} className="w-16 m-auto mb-5" alt="" />
              <p className="font-bold text-lg mb-5">Refund Method</p>
              <p className="text-base">
              Approved refunds will be processed to your original method of payment within 5-10 business days.
              </p>
            </div>
            <div className="w-full">
              <img src={assets.partial_refund} className="w-16 m-auto mb-5" alt="" />
              <p className="font-bold text-lg mb-5">Partial Refunds</p>
              <p className="text-base">
              In some cases, partial refunds may be granted for items that show signs of wear or are missing parts.
              </p>
            </div>
          </div>
        </div>

        <div className='container flex flex-col gap-4 items-center'>
          <div className="text-center mb-4 privacy-policy-title">
            <Title text1={"Non-Returnable"} text2={"Items"}  />
            <img
                src={assets.underline}
                className="w-[150px] mx-auto"
                alt=""
              />
          </div>

          <div className="grid grid-cols-1 sm:gird-cols-2 md:grid-cols-3 gap-10 text-center mt-4 mx-32 mb-10">
            <div className="w-full">
              <img
                src={assets.gift_card}
                className="w-16 m-auto mb-5"
                alt=""
              />
              <p className="font-bold text-lg mb-5">Gift cards</p>
            </div>
            <div className="w-full">
              <img src={assets.personalized} className="w-16 m-auto mb-5" alt="" />
              <p className="font-bold text-lg mb-5">Custom or personalized products (unless defective or damaged)</p>
            </div>  
            <div className="w-full">
              <img src={assets.interface_ui} className="w-16 m-auto mb-5" alt="" />
              <p className="font-bold text-lg mb-5">Sale items</p>
            </div>
          </div>


          <div className="text-center mt-8 privacy-policy-title">
            <Title text1={"Contact"} text2={"Us"}  />
            <img
                src={assets.underline}
                className="w-[150px] mx-auto"
                alt=""
              />
          </div>
          <p className='mt-2 mx-12 text-center'>For questions or concerns regarding returns, please reach out to our support team at <span className='text-orange-800'>info.claysip@gmail.com</span> We're here to help ensure your experience with Claysip is seamless and enjoyable.</p>
        </div>
      </div>

    </>
  );
}

export default ReturnPolicy
