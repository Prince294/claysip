import React, { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom';

const ThankYou = () => {
  const location = useLocation();
  const data = location.state;
  const [orderId, setOrderId] = useState("");

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [])

  useEffect(() => {
    if(data?.orderId){
      setOrderId(data?.orderId);
    }
  }, [data])
  

  return (
    <div className="flex h-screen items-start justify-center pt-16">
      <div>
          <div className="flex flex-col items-center gap-3">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-28 w-28 text-green-600" fill="none" viewBox="0 0 24 24"
                  stroke="currentColor" stroke-width="1">
                  <path stroke-linecap="round" stroke-linejoin="round"
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <h1 className="text-4xl font-bold">Thank You !</h1>
              <h2 className="text-2xl">Your Order has been received</h2>
              <p className='text-lg'>Your order id is: <span className='font-bold'>#{orderId}</span></p>
              <p className="text-lg">You will receive an order confirmation email with details of your order and a link to track your process.</p>
              <Link to='/' className="inline-flex items-center rounded border border-indigo-600 bg-orange-800 px-4 py-2 text-white hover:bg-orange-900 focus:outline-none focus:ring mt-8">
                  <svg xmlns="http://www.w3.org/2000/svg" className="mr-2 h-3 w-3" fill="none" viewBox="0 0 24 24"
                      stroke="currentColor" stroke-width="2">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M7 16l-4-4m0 0l4-4m-4 4h18" />
                  </svg>
                  <span className="text-sm font-medium px-4"> Home </span>
              </Link>
          </div>
      </div>
    </div>
  )
}

export default ThankYou
