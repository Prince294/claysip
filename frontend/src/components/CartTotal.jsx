import React, { useContext } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from './Title';

const CartTotal = ({type}) => {

  const { currency, delivery_fee, getCartAmount, cod_charge } = useContext(ShopContext);

  return (
    <div className='w-full'>
      <div className='mb-3'>
        <Title cla text1={'cart'} text2={'totals'} />
        {/* <p className='text-xl font-semibold text-secondary capitalize -ml-0.5'>Cart total</p> */}
      </div>

      <div className='flex flex-col gap-2 mt-2 text-sm md:text-base text-secondary'>
        <div className='flex justify-between'>
          <p>Subtotal</p>
          <p>{currency} {getCartAmount()?.toFixed(2)}</p>
        </div>
        <hr />
        {type == "cod" ? <><div className='flex justify-between'>
          <p>Shipping Fee</p>
          <p>{currency} {(delivery_fee - cod_charge)?.toFixed(2)}</p>
        </div>
        <hr />
        <div className='flex justify-between'>
          <p>Cash on delivery charge</p>
          <p>{currency} {cod_charge?.toFixed(2)}</p>
        </div>
        </>
        :
        <div className='flex justify-between'>
          <p>Shipping Fee</p>
          <p>{currency} {delivery_fee}</p>
        </div>
      }
        <hr />
        <div className='flex justify-between font-semibold text-bse text-primary capitalize'>
          <p>Total</p>
          <p>{currency} {getCartAmount() === 0 ? 0 : (getCartAmount() + delivery_fee)?.toFixed(2)}</p>
        </div>
      </div>
    </div>
  )
}

export default CartTotal
