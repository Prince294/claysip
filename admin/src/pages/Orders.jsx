import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { backendUrl, currency } from '../App'
import { toast } from 'react-toastify'
import { assets } from '../assets/assets'
import { useNavigate } from 'react-router-dom'
import http from '../services/utility'


const Orders = ({ token }) => {
  const navigate = useNavigate();
  const [orders, setOrders] = useState([])
  const [products, setProducts] = useState([])
  const [trackingId, setTrackingId] = useState([])
  

  const fetchProducts = async () => {
    try {

      const response = await http.get(backendUrl + '/api/product/list')
      if (response.data.success) {
        setProducts(response.data.products.reverse());
      }
      else {
        toast.error(response.data.message)
      }

    } catch (error) {
      console.log(error)
      toast.error(error.message)
    }
  }

  const submitTrackingId = async (index)=>{
    try {
      const response = await http.post(backendUrl + '/api/order/tracking_id', {orderId: orders[index]._id, tracking_id: trackingId[index]?.tracking_id}, { headers: { token } })
      if (response.data.success) {
        toast.success(response.data.message)
        fetchAllOrders()
      } else {
        toast.error(response.data.message)
      }
    } catch (error) {
      console.log(error)
      toast.error(error)
    }
  }

  const fetchAllOrders = async () => {

    if (!token) {
      return null;
    }

    try {

      const response = await http.post(backendUrl + '/api/order/list', {}, { headers: { token } })
      if (response.data.success) {
        let allOrdersItem = []
        setTrackingId(Array(parseInt(response.data.orders?.length)).fill({}).map((_, index)=> ({
            tracking_id: response.data.orders[index]?.tracking_id ? response.data.orders[index]?.tracking_id : "",
          })
        ));

        await response.data.orders.map(async (order)=>{
          var {items, ...OtherKeys} = order;
          await items.forEach(async item => {
            var cartData;
            if(!item.name){
              cartData = await gettingInformationFromCartData(item);
            } else {
              cartData = [item];
            }
            const mergedData = {...OtherKeys, items: cartData}
            allOrdersItem.push(mergedData)
          });
        })
        setOrders(allOrdersItem.reverse())
      } else {
        toast.error(response.data.message)
      }

    } catch (error) {
      toast.error(error.message)
    }


  }

  const statusHandler = async ( event, orderId ) => {
    try {
      const response = await http.post(backendUrl + '/api/order/status' , {orderId, status:event.target.value}, { headers: {token}})
      if (response.data.success) {
        await fetchAllOrders()
      }
    } catch (error) {
      console.log(error)
      toast.error(response.data.message)
    }
  }

  const gettingInformationFromCartData = async (cartItem) => {
    return new Promise((resolve, reject)=>{
        const tempData = [];
        for (const items in cartItem) {
            for (const item in cartItem[items]) {
                if (item !== 'main') {
                    for (const size in cartItem[items][item]) {
                        if (cartItem[items][item][size] > 0) {

                            var product_info = products.find(e => e._id === items);
                            if (product_info) {
                                let productTypeData = product_info.product_type_data.find(ptd => ptd.index == item);
                                if(productTypeData.price == ""){
                                  productTypeData['price'] = product_info.price;
                                }
                                tempData.push({
                                    _id: items,
                                    size: size,
                                    quantity: cartItem[items][item][size],
                                    name: product_info.name,
                                    description: product_info.description,
                                    ...productTypeData
                                });
                            }
                        }
                    }
                } else {
                    for (const size in cartItem[items][item]) {
                        if (cartItem[items][item][size] > 0) {

                            var product_info = products.find(e => e._id === items);
                            if (product_info) {
                                tempData.push({
                                    _id: items,
                                    size: size,
                                    quantity: cartItem[items][item][size],
                                    ...product_info
                                });
                            }
                        }
                    }
                }
            }
        }
        resolve(tempData);
    })
  }

  useEffect(() => {
    fetchProducts();
  }, [token])

  useEffect(() => {
    if(products.length){
      fetchAllOrders();
    }
  }, [products])

  return (
    <div>
      <h3>Order Page</h3>
      <div>
        {
          orders.map((order, index) => (
            <div className={`grid grid-cols-1 sm:grid-cols-[0.5fr_2fr_1fr] lg:grid-cols-[0.5fr_2fr_1fr_1fr_1fr] gap-3 items-start border-[2.5px] ${order.payment ? 'border-green-200' : 'border-gray-200' } p-5 md:p-8 my-3 md:my-4 text-xs sm:text-sm text-gray-700 cursor-pointer hover:shadow-md`} key={index}  onClick={()=>{
              navigate(`/order/${order._id}`, { state: { data: order } });
            }}>
              <img className='w-12' src={assets.parcel_icon} alt="" />
              <div>
                <div className='flex gap-x-2 flex-wrap mb-4'>
                  {order?.items && order.items.length && order.items.map((item, index) => {
                    if (index === order.items.length - 1) {
                      return <p className='py-0.5 whitespace-nowrap' key={index}> {item.name} {item?.index ? <span>(Type-{item?.index+1})</span> : ""} x {item.quantity} {item.size != "_" && <span> {item.size} </span>} </p>
                    }
                    else {
                      return <p className='py-0.5 whitespace-nowrap' key={index}> {item.name} {item?.index ? <span>(Type-{item?.index+1})</span> : ""} x {item.quantity} {item.size != "_" && <span> {item.size} </span>} ,</p>
                    }
                  })}
                </div>
                <p className='mt-4 mb-1 font-medium'>{order.address.firstName + " " + order.address.lastName}</p>
                <div>
                  <p>{order.address.street + ","}</p>
                  <p>{order.address.city + ", " + order.address.state + ", " + order.address.country + ", " + order.address.zipcode}</p>
                </div>
                <p>{order.address.phone}</p>
                <p>{order.address.email}</p>
              </div>
              <div>
                <p className='text-sm sm:text-[15px]'>Items : {order?.items?.length}</p>
                <p className='mt-3'>Method : {order.paymentMethod}</p>
                <p>Payment : { order.payment ? 'Done' : 'Pending' }</p>
                <p>Date : {new Date(order.date).toLocaleDateString()}</p>
              </div>
              <p className='text-sm sm:text-[15px]'>{currency}{order.amount}</p>
              <div>
                <select onChange={(event)=>statusHandler(event,order._id)} value={order.status} className='p-2 font-semibold' onClick={(e)=> e.stopPropagation() }>
                  <option value="Canceled">Canceled</option>
                  <option value="Order Placed">Order Placed</option>
                  <option value="Packing">Packing</option>
                  <option value="Shipped">Shipped</option>
                  <option value="Out for delivery">Out for delivery</option>
                  <option value="Delivered">Delivered</option>
                </select>
                <div className='mt-4' onClick={(e)=> e.stopPropagation() }>
                  <input onChange={(e)=>{
                    var ids = [...trackingId];
                    ids[index]['tracking_id'] = e.target.value;
                    setTrackingId(ids)

                  }} value={trackingId[index]?.tracking_id} className='rounded-md w-full px-3 py-2 border border-gray-300 outline-none' type="text" placeholder='Enter Tracking Id' required />
                  <button className='mt-2 w-full py-2 px-4 rounded-md text-white bg-black' onClick={()=>submitTrackingId(index)}> Submit </button>
                </div>
              </div>
            </div>
          ))
        }
      </div>
    </div>
  )
}

export default Orders