import mongoose from "mongoose";

const otpSchema = new mongoose.Schema({
    email: { type: String, required: true },
    type: { type: String, required: true },
    otp: { type: Number, required: true },
    date: { type: Number, required: true },
    expiredOn: { type: Number, required:true },
}, { minimize: false })

const otpModel = mongoose.models.otp || mongoose.model('otp', otpSchema);

export default otpModel