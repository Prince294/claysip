import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";
import paymentModel from "../models/paymentInfoModel.js";
import razorpay from 'razorpay'
import axios from 'axios';
import nodemailer from "nodemailer";
import validator from "validator";


// global variables
const currency = 'inr'
const deliveryCharge = 10

const razorpayInstance = new razorpay({
    key_id : process.env.RAZORPAY_KEY_ID,
    key_secret : process.env.RAZORPAY_KEY_SECRET,
})

// Placing orders using COD Method
const placeOrder = async (req,res) => {
    
    try {
        
        const { userId, items, amount, address} = req.body;
        const user = await userModel.findById(userId);

        const orderData = {
            userId,
            items,
            address,
            amount,
            paymentMethod:"COD",
            payment:false,
            date: Date.now()
        }        

        const newOrder = new orderModel(orderData)
        await newOrder.save()

        await userModel.findByIdAndUpdate(userId,{cartData:{}})
        await sendEmail('order-placed', user.email, newOrder.order_id, '');

        res.json({success:true,message:"Order Placed"})


    } catch (error) {
        console.log("placeOrder", error)
        res.json({success:false,message:error.message})
    }

}


// Placing orders using Razorpay Method
const placeOrderRazorpay = async (req,res) => {
    try {
        
        const { userId, items, amount, address} = req.body

        const orderData = {
            userId,
            items,
            address,
            amount,
            paymentMethod:"Razorpay",
            payment:false,
            date: Date.now()
        }

        const newOrder = new orderModel(orderData)
        await newOrder.save()

        const options = {
            amount: amount * 100,
            currency: currency.toUpperCase(),
            receipt : newOrder._id.toString()
        }

        await razorpayInstance.orders.create(options, (error,order)=>{
            if (error) {
                console.log(error)
                return res.json({success:false, message: error})
            }
            res.json({success:true,order})
        })

    } catch (error) {
        console.log("placeOrderRazorpay", error)
        res.json({success:false,message:error.message})
    }
}

const verifyRazorpay = async (req,res) => {
    try {
        
        const { userId, razorpay_order_id  } = req.body
        const user = await userModel.findById(userId);

        const orderInfo = await razorpayInstance.orders.fetch(razorpay_order_id)
        if (orderInfo.status === 'paid') {
            const paymentData = {
                order_id: orderInfo.receipt,
                userId,
                date: Date.now(),
                razorpayData: orderInfo
            }
            const newPayment = new paymentModel(paymentData)
            await newPayment.save()

            await orderModel.findByIdAndUpdate(orderInfo.receipt,{payment:true});
            const orderData = await orderModel.findById(orderInfo.receipt);

            await userModel.findByIdAndUpdate(userId,{cartData:{}})
            await sendEmail('order-placed', user.email, orderData.order_id, '');
            res.json({ success: true, message: "Payment Successful", order_id: orderData.order_id })
        } else {
            await orderModel.findByIdAndDelete(orderInfo.receipt);
            res.json({ success: false, message: 'Payment Failed' });
        }

    } catch (error) {
        console.log("verifyRazorpay", error)
        res.json({success:false,message:error.message})
    }
}


// All Orders data for Admin Panel
const allOrders = async (req,res) => {

    try {
        
        const orders = await orderModel.find({}).sort({ date: -1 });
        res.json({success:true,orders})

    } catch (error) {
        console.log(error)
        res.json({success:false,message:error.message})
    }

}

// User Order Data For Forntend
const userOrders = async (req,res) => {
    try {
        
        const { userId } = req.body

        const orders = await orderModel.find({ userId }).sort({ date: -1 });
        res.json({success:true,orders})

    } catch (error) {
        console.log(error)
        res.json({success:false,message:error.message})
    }
}

// update order status from Admin Panel
const updateStatus = async (req,res) => {
    try {
        
        const { orderId, status } = req.body
        const order = await orderModel.findOne({ _id: orderId });
        const user = await userModel.findById(order.userId);
        if(status == "Out for delivery"){
            await sendEmail('out-for-delivery', user.email, order.order_id, order.tracking_id);
        } else if(status == "Canceled"){
            await sendEmail('canceled', user.email, order.order_id, '');
        } else if(status == "Delivered"){
            await sendEmail('delivered', user.email, order.order_id, '');
        }

        await orderModel.findByIdAndUpdate(orderId, { status })
        res.json({success:true,message:'Status Updated'})

    } catch (error) {
        console.log(error)
        res.json({success:false,message:error.message})
    }
}


// update order tracking id from Admin Panel
const updateTrackingId = async (req,res) => {
    try {
        
        const { orderId, tracking_id } = req.body;
        const order = await orderModel.findOne({ _id: orderId });
        const user = await userModel.findById(order.userId);

        await orderModel.findByIdAndUpdate(orderId, { tracking_id })
        await sendEmail('tracking-id', user.email, order.order_id, tracking_id);
        
        res.json({success:true,message:'Status Updated'})

    } catch (error) {
        console.log(error)
        res.json({success:false,message:error.message})
    }
}

// cancel order status from user
const cancelOrder = async (req,res) => {
    try {
        
        const { orderId, userId } = req.body
        
        const order = await orderModel.findOne({ _id: orderId, userId: userId });
        if(!order){
            return res.json({success:false,message:'No order found'})
        }
        const user = await userModel.findById(userId);

        await orderModel.findOneAndUpdate({_id: orderId, userId: userId}, { status: "Canceled" })
        await sendEmail('canceled', user.email, order.order_id, '');
        res.json({success:true,message:'Order canceled successfully'})

    } catch (error) {
        console.log(error)
        res.json({success:false,message:error.message})
    }
}

// Route for generate Otp
const sendEmail = async (type, email, order_id, tracking_id) => {
    try {
        if(!email || email == "" || !validator.isEmail(email)){
            return res.json({ success: false, message: "Invalid email" })
        }

        const smtp_host = process.env.SMTP_HOST;
        const smtp_port = process.env.SMTP_PORT;
        const smtp_user = process.env.SMTP_USER;
        const smtp_pass = process.env.SMTP_PASSWORD;
    
        const to = email;
        var subject = "", message = "";
        if(type == "order-placed"){
            subject = "Order Placed";
            message = `<div style="padding: 20px; background-color: rgb(255, 255, 255);">
            <div style="color: rgb(0, 0, 0); text-align: left;">
            <h1 style="margin: 1rem 0">Order Placed</h1>
            <p style="padding-bottom: 12px">Thank you for your order! We're thrilled to have you as a valued customer. Your order <b>#${order_id}</b> has been successfully processed and is now being prepared for shipment.</p>
            <p style="padding-bottom: 12px">You'll receive another email with tracking details once your order has shipped. If you have any questions, feel free to reach out to us at ${process.env.PORTAL_EMAIL}.</p>
            <p style="padding-bottom: 12px">We appreciate your trust in us and look forward to serving you again!</p>
            <p style="padding-bottom: 12px">Thanks,<br>The ClaySip Team</p>
            </div>
            </div>`;   
        } else if(type == "canceled"){
            subject = "Order Canceled";
            message = `<div style="padding: 20px; background-color: rgb(255, 255, 255);">
            <div style="color: rgb(0, 0, 0); text-align: left;">
            <h1 style="margin: 1rem 0">Order Canceled</h1>
            <p style="padding-bottom: 12px">We regret to inform you that your order <b>#${order_id}</b> has been canceled.</p>
            <p style="padding-bottom: 12px">If you've already been charged for this order, you will receive a full refund, credited to your source account in the next 5-7 business days.</p>
            <p style="padding-bottom: 12px">We apologize for any inconvenience this may have caused you.</p>
            <p style="padding-bottom: 12px">If you have any questions or need further assistance, please feel free to contact us at ${process.env.PORTAL_EMAIL}.</p>
            <p style="padding-bottom: 12px">Thanks,<br>The ClaySip Team</p>
            </div>
            </div>`;
        } else if(type == "tracking-id"){
            subject = "Tracking Details";
            message = `<div style="padding: 20px; background-color: rgb(255, 255, 255);">
            <div style="color: rgb(0, 0, 0); text-align: left;">
            <h1 style="margin: 1rem 0">Tracking Details</h1>
            <p style="padding-bottom: 12px">Your order <b>#${order_id}</b> has been shipped and is on its way to you.</p>
            <p style="padding-bottom: 12px">Your order is being shipped via <b>Delhivery</b> with the tracking number <b>${tracking_id}</b>.</p>
            <p style="padding-bottom: 12px">Please keep an eye on your delivery, and feel free to track your order using this <a href="https://www.delhivery.com/tracking" target="_blank">link</a></p>
            <p style="padding-bottom: 12px">If you have any questions or need assistance, feel free to contact us at ${process.env.PORTAL_EMAIL}.</p>
            <p style="padding-bottom: 12px">Thank you for shopping with us! We appreciate your trust and support.</p>
            <p style="padding-bottom: 12px">Thanks,<br>The ClaySip Team</p>
            </div>
            </div>`;
        } else if(type == "out-for-delivery"){
            subject = "Order Status Update";
            message = `<div style="padding: 20px; background-color: rgb(255, 255, 255);">
            <div style="color: rgb(0, 0, 0); text-align: left;">
            <h1 style="margin: 1rem 0">Order Out for delivery</h1>
            <p style="padding-bottom: 12px">Your order <b>#${order_id}</b> is out for delivery and should be arriving soon.</p>
            <p style="padding-bottom: 12px">Your order is being shipped via <b>Delhivery</b> with the tracking number <b>${tracking_id}</b>.</p>
            <p style="padding-bottom: 12px">Please keep an eye out for the delivery, and feel free to track your order using this <a href="https://www.delhivery.com/tracking" target="_blank">link</a></p>
            <p style="padding-bottom: 12px">If you have any questions or need assistance, feel free to contact us at ${process.env.PORTAL_EMAIL}.</p>
            <p style="padding-bottom: 12px">Thank you for shopping with us! We appreciate your trust and support.</p>
            <p style="padding-bottom: 12px">Thanks,<br>The ClaySip Team</p>
            </div>
            </div>`;
        } else if(type == "delivered"){
            subject = "Order Status Update";
            message = `<div style="padding: 20px; background-color: rgb(255, 255, 255);">
            <div style="color: rgb(0, 0, 0); text-align: left;">
            <h1 style="margin: 1rem 0">Order Delivered</h1>
            <p style="padding-bottom: 12px">We're happy to inform you that your order <b>#${order_id}</b> has been successfully delivered! We hope you're excited about your purchase.</p>
            <p style="padding-bottom: 12px">If you have any questions or need assistance, feel free to contact us at ${process.env.PORTAL_EMAIL}.</p>
            <p style="padding-bottom: 12px">Thank you for shopping with us! We truly appreciate your business and look forward to serving you again soon.</p>
            <p style="padding-bottom: 12px">Thanks,<br>The ClaySip Team</p>
            </div>
            </div>`;
        }
        const transporter = nodemailer.createTransport({
            host: smtp_host,
            port: smtp_port,
            auth: {
                user: smtp_user,
                pass: smtp_pass
            }
        });
    
        const mail = await transporter.sendMail({
            from: `"ClaySip" <${smtp_user}>`,
            to: [to, process.env.PORTAL_EMAIL],
            subject: subject,
            html: message
        });

    } catch (error) {
        console.log(error);
    }
}

// get delivery charge
const getDeliveryCharge = async (req,res) => {
    try {
        
        const { pinCode, weight, userId } = req.body;

        if(pinCode < 100000 || pinCode > 999999 || isNaN(pinCode)){
            res.json({success:false,message:"Invalid Pincode"})
        }

        const url = `${process.env.DELHIVERY_ENDPOINT}/c/api/pin-codes/json/?filter_codes=${pinCode}`;
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': `Token ${process.env.DELHIVERY_TOKEN}`
        };
        const response = await axios.get(url, { headers });
        const data = response.data;

        if(!data.delivery_codes.length){
            res.json({success:false,message:'Delivery is not available on your location'})
        } else {
            const url1 = `${process.env.DELHIVERY_ENDPOINT}/api/kinko/v1/invoice/charges/.json?md=S&ss=Delivered&d_pin=${pinCode}&o_pin=245304&cgm=${weight}&pt=Pre-paid&cod=0`;
            const chargeResp = await axios.get(url1, { headers });

            let data_to_send = data.delivery_codes[0].postal_code;
            data_to_send['total_amount'] = chargeResp.data[0].total_amount;

            await userModel.findByIdAndUpdate(userId, {delivery_pin_code: pinCode})

            res.json({success:true,data: data_to_send})
        }
    } catch (error) {
        console.log(error)
        res.json({success:false,message:error.message})
    }
}

export {verifyRazorpay ,placeOrder, placeOrderRazorpay, allOrders, userOrders, updateStatus, updateTrackingId, cancelOrder, getDeliveryCharge}