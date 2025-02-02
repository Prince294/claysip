import React, { useContext, useState } from 'react'
import Title from '../components/Title'
import CartTotal from '../components/CartTotal'
import { assets } from '../assets/assets'
import { ShopContext } from '../context/ShopContext'
import axios from 'axios'
import { toast } from 'react-toastify'

const PlaceOrder = () => {

    const [method, setMethod] = useState('cod');
    const [razorPayResponse, setRazorPayResponse] = useState(false);
    const { navigate, backendUrl, token, cartItems, setCartItems, getCartAmount, delivery_fee, products, setIsLoading } = useContext(ShopContext);
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        street: '',
        city: '',
        state: '',
        zipcode: '',
        country: '',
        phone: ''
    })

    const onChangeHandler = (event) => {
        const name = event.target.name
        const value = event.target.value
        setFormData(data => ({ ...data, [name]: value }))
    }

    const initPay = (order) => {
        const options = {
            key: import.meta.env.VITE_RAZORPAY_KEY_ID,
            amount: order.amount,
            currency: order.currency,
            name: 'Order Payment',
            description: 'Order Payment',
            order_id: order.id,
            receipt: order.receipt,
            handler: async (response) => {
                // console.log(response)
                try {

                    const { data } = await axios.post(backendUrl + '/api/order/verifyRazorpay', response, { headers: { token } })
                    if (data.success) {
                        setRazorPayResponse(false);
                        setIsLoading(false);
                        navigate('/order-complete', { state: { orderId: data.order_id } })
                        setCartItems({})
                    } else {
                        setIsLoading(false);
                    }
                } catch (error) {
                    setIsLoading(false);
                    console.log(error)
                    toast.error(error)
                }
            }
        }
        const rzp = new window.Razorpay(options)
        rzp.open()
    }

    const onSubmitHandler = async (event) => {
        setIsLoading(true);
        event.preventDefault()
        try {
            let orderData = {
                address: formData,
                items: cartItems,
                amount: getCartAmount() + delivery_fee
            }


            switch (method) {

                // API Calls for COD
                case 'cod':
                    const response = await axios.post(backendUrl + '/api/order/place', orderData, { headers: { token } })
                    if (response.data.success) {
                        setIsLoading(false);
                        setCartItems({})
                        toast.success("Order Has Been Placed")
                        navigate('/orders')
                    } else {
                        setIsLoading(false);
                        toast.error(response.data.message)
                    }
                    break;


                case 'razorpay':
                    if(razorPayResponse){
                        initPay(razorPayResponse)
                    } else {
                        const responseRazorpay = await axios.post(backendUrl + '/api/order/razorpay', orderData, { headers: { token } })
                        if (responseRazorpay.data.success) {
                            setRazorPayResponse(responseRazorpay.data.order);
                            initPay(responseRazorpay.data.order)
                        } else {
                            setIsLoading(false);
                        }
                    }

                    break;

                default:
                    break;
            }


        } catch (error) {
            console.log(error)
            toast.error(error.message)
        }
    }


    return (
        <div className="py-16">
            <div className="container">
                <form onSubmit={onSubmitHandler} className='flex flex-col max-w-[600px] mx-auto gap-8'>
                   
                    <div className='flex flex-col gap-4 w-full'>

                        <div className='mb-3'>
                            <Title text1={'delivery'} text2={'information'} />
                        </div>
                        <div className='flex flex-col md:flex-row gap-3'>
                            <input required onChange={onChangeHandler} name='firstName' value={formData.firstName} className='w-full border-1 border-primary focus:ring-primary focus:border-primary rounded-1 text-base px-2 rounded-sm' type="text" placeholder='First name' />
                            <input required onChange={onChangeHandler} name='lastName' value={formData.lastName} className='w-full border-1 border-primary focus:ring-primary focus:border-primary rounded-1 text-base px-2 rounded-sm' type="text" placeholder='Last name' />
                        </div>
                        <input required onChange={onChangeHandler} name='email' value={formData.email} className='w-full border-1 border-primary focus:ring-primary focus:border-primary rounded-1 text-base px-2 rounded-sm' type="email" placeholder='Email address' />
                        <input required onChange={onChangeHandler} name='street' value={formData.street} className='w-full border-1 border-primary focus:ring-primary focus:border-primary rounded-1 text-base px-2 rounded-sm' type="text" placeholder='Street' />
                        <div className='flex flex-col md:flex-row gap-3'>
                            <input required onChange={onChangeHandler} name='city' value={formData.city} className='w-full border-1 border-primary focus:ring-primary focus:border-primary rounded-1 text-base px-2 rounded-sm' type="text" placeholder='City' />
                            <input onChange={onChangeHandler} name='state' value={formData.state} className='w-full border-1 border-primary focus:ring-primary focus:border-primary rounded-1 text-base px-2 rounded-sm' type="text" placeholder='State' />
                        </div>
                        <div className='flex flex-col md:flex-row gap-3'>
                            <input required onChange={onChangeHandler} name='zipcode' value={formData.zipcode} className='w-full border-1 border-primary focus:ring-primary focus:border-primary rounded-1 text-base px-2 rounded-sm' type="number" placeholder='Zipcode' />
                            <input required onChange={onChangeHandler} name='country' value={formData.country} className='w-full border-1 border-primary focus:ring-primary focus:border-primary rounded-1 text-base px-2 rounded-sm' type="text" placeholder='Country' />
                        </div>
                        <input required onChange={onChangeHandler} name='phone' value={formData.phone} className='w-full border-1 border-primary focus:ring-primary focus:border-primary rounded-1 text-base px-2 rounded-sm' type="number" placeholder='Phone' />
                    </div>

                    <CartTotal />
                   
                   


                        <div className='payment-method'>
                            <div className='mb-3'>
                                <Title text1={'payment'} text2={'method'} />
                            </div>
                            {/* --------------- Payment Method Selection ------------- */}
                            <div className='flex gap-3 flex-col xl:flex-row'>
                                <div onClick={() => setMethod('razorpay')} className='flex-1 flex items-center gap-3 border rounded-sm p-3 cursor-pointer'>
                                    <p className={` flex-shrink-0 w-4 h-4 border rounded-full ${method === 'razorpay' ? 'bg-primary border-primary' : ''}`}></p>
                                    <img className='h-5' src={assets.razorpay_logo} alt="" />
                                </div>
                                <div onClick={() => setMethod('cod')} className='flex-1 flex items-center gap-3 border p-3 cursor-pointer'>
                                    <p className={`flex-shrink-0 w-4 h-4 border rounded-full ${method === 'cod' ? 'bg-primary border-primary' : ''}`}></p>
                                    <p className='text-secondary text-sm font-medium'>CASH ON DELIVERY</p>
                                </div>
                            </div>

                            <div className='w-full text-end mt-8'>
                                <button type='submit' className='rounded-sm w-full bg-black text-white px-8 py-3 text-sm hover:bg-primary uppercase'>PLACE ORDER</button>
                            </div>
                        </div>
                    
                </form>
            </div>
        </div>
    )
}

export default PlaceOrder
