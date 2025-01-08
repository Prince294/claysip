import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import axios from 'axios'
import { backendUrl, currency } from '../App'
import { toast } from 'react-toastify'
import { assets } from '../assets/assets'
import { useLocation } from "react-router-dom";

const OrderData = ({ token }) => {
  const location = useLocation();
  const { data } = location.state;

  const [order, setOrder] = useState("")

  useEffect(() => {
    if(data){
      setOrder(data)
    }
  }, [data])
  

  return (
    <div>
      <h3>Order Detail for Order ID: {order?._id}</h3>
      <div>
        {order?.items && order.items.map((item, index)=>{
          return (<div className='grid grid-cols-1 sm:grid-cols-[0.5fr_2fr_1fr_1fr] gap-3 items-start border-2 border-gray-200 p-5 md:p-8 my-3 md:my-4 text-xs sm:text-sm text-gray-700'>
            <img className='w-12' src={item?.image?.length && item.image[0] != "" ? item.image[0] : assets.parcel_icon} alt="" />
            <div>
              <div className='flex max-w-50 gap-2'>
                <p className='py-0.5'> {item?.name} {item?.index ? <span>(Type-{item?.index+1})</span> : ""} x {item.quantity} {item.size != "_" && <span> {item?.size} </span>} </p>
              </div>
              <p className='mt-4 mb-1 font-medium'>{order.address.firstName + " " + order.address.lastName}</p>
              <div>
                <p>{order.address.street + ","}</p>
                <p>{order.address.city + ", " + order.address.state + ", " + order.address.country + ", " + order.address.zipcode}</p>
              </div>
              <p>{order.address.phone}</p>
            </div>
            <div>
              <p className='text-sm sm:text-[15px]'>Items : {item?.quantity}</p>
              <p className='mt-3'>Method : {order.paymentMethod}</p>
              <p>Payment : { order.payment ? 'Done' : 'Pending' }</p>
              <p>Date : {new Date(order.date).toLocaleDateString()}</p>
            </div>
            <p className='text-sm sm:text-[15px]'>Price: {currency}{item.price}</p>
          </div>)
        })}
      </div>
    </div>
  )
}

export default OrderData