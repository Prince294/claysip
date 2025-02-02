import mongoose from "mongoose";

const paymentSchema = new mongoose.Schema({
    order_id: { type: String, unique: true },
    userId: { type: String, required: true },
    date: {type: Number, required:true},
    razorpayData: { type: Object, default: {} },
}, { minimize: false })

const paymentModel = mongoose.models.paymentInfo || mongoose.model('paymentInfo',paymentSchema);

export default paymentModel