import mongoose from 'mongoose'
import AutoIncrementFactory from "mongoose-sequence";

const AutoIncrement = AutoIncrementFactory(mongoose);

const orderSchema = new mongoose.Schema({
    order_id: { type: Number, unique: true },
    userId: { type: String, required: true },
    items: { type: Array, required: true },
    amount: { type: Number, required: true },
    address: { type: Object, required: true },
    status: { type: String, required: true, default:'Order Placed' },
    paymentMethod: { type: String, required: true },
    payment: { type: Boolean, required: true , default: false },
    date: {type: Number, required:true},
    tracking_id: { type: String },
})

// Apply the auto-increment plugin to the "order_id" field
orderSchema.plugin(AutoIncrement, { inc_field: "order_id" });

const orderModel = mongoose.models.order || mongoose.model('order',orderSchema)
export default orderModel;