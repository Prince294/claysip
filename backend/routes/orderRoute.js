import express from 'express'
import {placeOrder, placeOrderRazorpay, allOrders, userOrders, updateStatus, verifyRazorpay, updateTrackingId, cancelOrder} from '../controllers/orderController.js'
import adminAuth  from '../middleware/adminAuth.js'
import authUser from '../middleware/auth.js'

const orderRouter = express.Router()

// Admin Features
orderRouter.post('/list',adminAuth,allOrders)
orderRouter.post('/status',adminAuth,updateStatus)
orderRouter.post('/tracking_id',adminAuth,updateTrackingId)

// Payment Features
orderRouter.post('/place',authUser,placeOrder)
orderRouter.post('/razorpay',authUser,placeOrderRazorpay)

// User Feature 
orderRouter.post('/userorders',authUser,userOrders)
orderRouter.post('/cancel-order',authUser,cancelOrder)

// verify payment
orderRouter.post('/verifyRazorpay',authUser, verifyRazorpay)

export default orderRouter