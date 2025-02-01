import React, { useEffect } from 'react'
import { assets } from '../assets/assets'
import Title from '../components/Title'

const ShippingPolicy = () => {

  useEffect(() => {
      window.scrollTo(0, 0);
  }, [])
    
  return (
    <>
      <div className='bg-white py-16 text-secondary flex flex-col gap-32'>
        <div className='container flex flex-col gap-4 items-center'>
          <div className="text-center mb-4 privacy-policy-title">
            <Title text1={"Mudflare Mugs"} text2={"- Handcrafted Terracotta Glasses"}  />
            <img
                src={assets.underline}
                className="w-[150px] mx-auto"
                alt=""
              />
          </div>
          <p>Celebrate the beauty of nature and tradition with our Mudflare Mugs, a set of handcrafted terracotta glasses designed to bring a rustic elegance to your everyday moments. Each piece is uniquely shaped and adorned, showcasing the craftsmanship and warmth of earthy materials. Perfect for any beverage, these mugs combine functionality, style, and wellness.</p>

          <div className="text-center mt-20 mb-2 privacy-policy-title">
            <Title text1={"Why Choose"} text2={"Mudflare Mugs?"}  />
            <img
                src={assets.underline}
                className="w-[150px] mx-auto"
                alt=""
              />
          </div>
          <p>Terracotta glasses like the Mudflare Mugs are not just drinkware - they're a lifestyle upgrade:</p>

          <div className="grid grid-cols-1 sm:gird-cols-2 md:grid-cols-3 gap-10 text-center mt-10">
            <div className="w-full">
              <img
                src={assets.cooling}
                className="w-16 m-auto mb-5"
                alt=""
              />
              <p className="font-bold text-lg mb-5">Natural Cooling Properties</p>
              <p className="text-base">
              Keep your drinks naturally cool, offering a refreshing experience with every sip.
              </p>
            </div>
            <div className="w-full">
              <img src={assets.box} className="w-16 m-auto mb-5" alt="" />
              <p className="font-bold text-lg mb-5">Health Benefits</p>
              <p className="text-base">
              Alkaline clay helps balance pH levels in beverages, contributing to improved digestion and overall health.
              </p>
            </div>
            <div className="w-full">
              <img src={assets.eco_friendly} className="w-16 m-auto mb-5" alt="" />
              <p className="font-bold text-lg mb-5">Eco-Friendly</p>
              <p className="text-base">
              Crafted sustainably by skilled artisans, these mugs are biodegradable and a conscious choice for your home.
              </p>
            </div>
          </div>
        </div>



        <div className='container flex flex-col gap-4 items-center'>
          <div className="text-center mb-4 privacy-policy-title">
            <Title text1={"Versatile"} text2={"Uses"}  />
            <img
                src={assets.underline}
                className="w-[150px] mx-auto"
                alt=""
              />
          </div>
          <p>From morning tea to evening cocktails, Mudflare Mugs enhance every drink: Perfect for water, tea, coffee, lassi, or even chilled beverages. Adds a touch of tradition to your table during gatherings or daily meals. Doubles as a charming decor element for your kitchen or dining space.</p>

          <div className="text-center mt-20 mb-2 privacy-policy-title">
            <Title text1={"How They Are"} text2={"Made"}  />
            <img
                src={assets.underline}
                className="w-[150px] mx-auto"
                alt=""
              />
          </div>

          <p>Each Mudflare Mug undergoes a meticulous crafting process to ensure quality and uniqueness:</p>

          <div className="grid grid-cols-1 sm:gird-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10 text-center mt-10">
            <div className="w-full">
              <img
                src={assets.selection}
                className="w-16 m-auto mb-5"
                alt=""
              />
              <p className="font-bold text-lg mb-5">Clay Selection</p>
              <p className="text-base">
              Premium, all-natural clay is handpicked to ensure purity and durability.
              </p>
            </div>
            <div className="w-full">
              <img src={assets.box} className="w-16 m-auto mb-5" alt="" />
              <p className="font-bold text-lg mb-5">Artisanal Shaping</p>
              <p className="text-base">
              Skilled artisans mold each mug by hand, giving it its distinctive flare and character.
              </p>
            </div>
            <div className="w-full">
              <img src={assets.quality_icon} className="w-16 m-auto mb-5" alt="" />
              <p className="font-bold text-lg mb-5">Detailed Finishing</p>
              <p className="text-base">
              Once shaped, the mugs are air-dried, hand-decorated with traditional patterns, and kiln-fired for strength and longevity.
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


        <div className='container flex flex-col gap-4 items-center'>
          <div className="text-center mb-4 privacy-policy-title">
            <Title text1={"Care"} text2={"Instructions"}  />
            <img
                src={assets.underline}
                className="w-[150px] mx-auto"
                alt=""
              />
          </div>
          <p>To keep your Mudflare Mugs in perfect condition:</p>

          <div className="grid grid-cols-1 sm:gird-cols-2 md:grid-cols-3 gap-10 text-center mt-10">
            <div className="w-full">
              <img
                src={assets.washing}
                className="w-16 m-auto mb-5"
                alt=""
              />
              <p className="font-bold text-lg mb-5">Washing</p>
              <p className="text-base">
              Rinse with warm water and clean with a soft sponge. Avoid using harsh detergents to retain the clay’s natural properties.
              </p>
            </div>
            <div className="w-full">
              <img src={assets.handling} className="w-16 m-auto mb-5" alt="" />
              <p className="font-bold text-lg mb-5">Handling</p>
              <p className="text-base">
              Handle with care to avoid chipping or breakage, especially when full.
              </p>
            </div>
            <div className="w-full">
              <img src={assets.seasoning} className="w-16 m-auto mb-5" alt="" />
              <p className="font-bold text-lg mb-5">Seasoning</p>
              <p className="text-base">
              Before first use, soak the mugs in water for a few hours to enhance durability and performance.
              </p>
            </div>
          </div>

          <p className='mt-16'>Infuse your daily rituals with the timeless appeal of Mudflare Mugs. With their earthy tones and health benefits, these mugs are a perfect blend of tradition and modern utility. Make every sip a celebration of heritage and sustainability. Order your set today and rediscover the joy of drinking with Mudflare Mugs!</p>
        </div>
      </div>

    </>
  );
}

export default ShippingPolicy
