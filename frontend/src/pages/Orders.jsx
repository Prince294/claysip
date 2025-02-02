import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from '../components/Title';
import axios from 'axios';
import { assets } from '../assets/assets';
import { toast } from 'react-toastify';

const Orders = () => {

  const { backendUrl, token , currency, gettingInformationFromCartData, products} = useContext(ShopContext);

  const [orderData,setorderData] = useState([])
  const [orderData1,setorderData1] = useState([])

  const loadOrderData = async () => {
    try {
      if (!token) {
        return null
      }

      const response = await axios.post(backendUrl + '/api/order/userorders',{},{headers:{token}})
      if (response.data.success) {
        let allOrdersItem = []
        await response.data.orders.map(async (order)=>{
          await order.items.forEach(async item => {
            item['status'] = order.status;
            item['_id'] = order._id;
            item['payment'] = order.payment;
            item['paymentMethod'] = order.paymentMethod;
            item['date'] = order.date;
            item['tracking_id'] = order?.tracking_id;
            var cartData = await gettingInformationFromCartData(item);
            item['items'] = cartData;
            allOrdersItem.push(item)
          });
        })
        
        setorderData1(allOrdersItem.reverse())
      }
      
    } catch (error) {
      
    }
  }

  const cancelOrder = async (order_id) => {
    try {
      if (!token) {
        return null
      }

      const response = await axios.post(backendUrl + '/api/order/cancel-order',{orderId: order_id},{headers:{token}})
      if (response.data.success) {
        loadOrderData()
        toast.success(response.data.message);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  }

  useEffect(()=>{
    if(products.length){
      loadOrderData()
    }
  },[products, token])

  useEffect(()=>{
    if(orderData1.length){
      const transformed = orderData1.flatMap(({ items, ...other }) => 
        items.map((obj) => {
          // if(obj.size == "_"){
          //   obj.size = "Main Size"
          // }
          return { ...obj, ...other }
        })
      )
      setorderData(transformed)
  }
  },[orderData1])

  return (
    <div className='border-t pt-16 px-20'>

        <div className='text-2xl'>
            <Title text1={'MY'} text2={'ORDERS'}/>
        </div>

        <div>
            {orderData.length ? 
              orderData.map((item,index) => (
                <div key={index} className='py-4 border-t border-b text-gray-700 flex flex-col md:flex-row md:items-center md:justify-between gap-4'>
                    <div className='flex items-start gap-6 text-sm'>
                        <img className='w-16 sm:w-20' src={item.image && item.image.length && item.image[0] != "" ? item?.image[0] : assets.logo} alt="" />
                        <div>
                          <p className='sm:text-base font-medium'>Name: {item.name}</p>
                          <div className='flex items-center gap-3 mt-1 text-base text-gray-700'>
                            <p>Price: {currency}{item.price}</p>
                            <p>Quantity: {item.quantity}</p>
                            {item.size != '_' && <p>Size: {item.size}</p>}
                          </div>
                          <p className='mt-1'>Date: <span className=' text-gray-400'>{new Date(item.date).toDateString()}</span></p>
                          <p className='mt-1'>Payment: <span className=' text-gray-400'>{item.paymentMethod}</span></p>
                        </div>
                    </div>
                    <div className='md:w-1/2 flex justify-between items-center pr-16'>
                        <div className='flex items-start gap-2 flex-col -ml-16'>
                            <p className='text-sm md:text-base'>{item.status}</p>
                            <p className='mt-1'>Payment Status: <span className='text-gray-600 font-medium'>{!item.payment ? "Pending" : 'Payment Success'}</span></p>
                        </div>
                        {item?.tracking_id ?
                          <div className='flex flex-col gap-2'>
                            <p className='text-sm'>Tracking Id: <span className='font-bold text-base'>#{item?.tracking_id}</span></p>
                            <a href="https://www.delhivery.com/tracking" target='_blank'>
                              <button onClick={loadOrderData} className='border px-4 py-2 text-sm font-medium rounded-sm'>Track Order</button>
                            </a>
                            {item.status != "Cancelled" && item.status == "Order Placed" ? <button onClick={()=>cancelOrder(item._id)} className='border px-4 py-2 bg-orange-800 hover:bg-orange-900 text-white text-sm font-medium rounded-sm'>Cancel Order</button> : <></>}
                          </div>
                        : <></>}
                        {!item?.tracking_id && item.status != "Cancelled" && item.status == "Order Placed" ? <button onClick={()=>cancelOrder(item._id)} className='border px-4 py-2 bg-orange-800 hover:bg-orange-900 text-white text-sm font-medium rounded-sm'>Cancel Order</button> : <></>}
                    </div>
                </div>
              )) : 
              <div className='mb-10 w-full text-center mt-4 text-xl'>No Order Found!</div>
            }
        </div>
    </div>
  )
}

export default Orders
