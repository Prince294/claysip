import validator from "validator";
import bcrypt from "bcrypt"
import jwt from 'jsonwebtoken'
import userModel from "../models/userModel.js";
import otpModel from "../models/otpModel.js";
import nodemailer from "nodemailer";


const createToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET)
}

// Route for user login
const loginUser = async (req, res) => {
    try {

        const { email, password } = req.body;

        const user = await userModel.findOne({ email });

        if (!user) {
            return res.json({ success: false, message: "User doesn't exists" })
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (isMatch) {

            const token = createToken(user._id)
            res.json({ success: true, token })

        }
        else {
            res.json({ success: false, message: 'Invalid credentials' })
        }

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message })
    }
}

// Route for user register
const registerUser = async (req, res) => {
    try {

        const { name, phone, email, password, otp } = req.body;

        // checking user already exists or not
        const exists = await userModel.findOne({ email });
        const exists1 = await userModel.findOne({ phone });
        if (exists || exists1) {
            return res.json({ success: false, message: "User already exists with same phone number or email" })
        }

        // validating email format & strong password
        if (!validator.isEmail(email)) {
            return res.json({ success: false, message: "Please enter a valid email" })
        }

        if (!validator.isMobilePhone(phone)) {
            return res.json({ success: false, message: "Please enter a valid email" })
        }

        if (password.length < 8) {
            return res.json({ success: false, message: "Please enter a strong password" })
        }

        // hashing user password
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)
        
        const verified = await verifyOtp(otp, email, "signup");

        if(!verified.success){
            return res.json(verified);
        }

        const newUser = new userModel({
            name,
            phone,
            email,
            is_verified: verified.success,
            password: hashedPassword
        })

        const user = await newUser.save()

        const token = createToken(user._id)

        res.json({ success: true, token })

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message })
    }
}

// Route for admin login
const adminLogin = async (req, res) => {
    try {
        
        const {email,password} = req.body

        if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {
            const token = jwt.sign(email+password,process.env.JWT_SECRET);
            res.json({success:true,token})
        } else {
            res.json({success:false,message:"Invalid credentials"})
        }

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message })
    }
}


// Route for user data
const userData = async (req, res) => {
    try {

        const { email, password } = req.body;

        const user = await userModel.findOne({ email });

        if (!user) {
            return res.json({ success: false, message: "User doesn't exists" })
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (isMatch) {

            const token = createToken(user._id)
            res.json({ success: true, token })

        }
        else {
            res.json({ success: false, message: 'Invalid credentials' })
        }

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message })
    }
}

// Route for user data
const getUserData = async (req, res) => {
    try {

        const _id = req.body.userId;
        const user = await userModel.findOne({ _id });

        if (!user) {
            return res.json({ success: false, message: "User doesn't exists" })
        }

        const userObject = user.toObject();
        delete userObject.cartData;
        delete userObject._id;
        delete userObject.password;

        res.json({ success: true, data: userObject })


    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message })
    }
}

// Route for generate Otp
const generateOtp = async (req, res) => {
    try {
        const email = req.body?.email;
        const type = req.body?.type;

        if(!email || email == "" || !validator.isEmail(email)){
            return res.json({ success: false, message: "Invalid email" })
        } 
        const otp = Math.floor(100000 + Math.random() * 900000).toString();

        const expiredOn = new Date();
        expiredOn.setMinutes(expiredOn.getMinutes() + 10);
        
        const newOtp = new otpModel({
            email,
            type,
            otp,
            date: Date.now(),
            expiredOn
        })
        
        const otpData = await newOtp.save();

        const smtp_host = process.env.SMTP_HOST;
        const smtp_port = process.env.SMTP_PORT;
        const smtp_user = process.env.SMTP_USER;
        const smtp_pass = process.env.SMTP_PASSWORD;
    
        const to = email;
        const subject = "SignUp OTP";
        const message = `<div style="padding: 20px; background-color: rgb(255, 255, 255);">
                        <div style="color: rgb(0, 0, 0); text-align: left;">
                        <h1 style="margin: 1rem 0">Verification code</h1>
                        <p style="padding-bottom: 16px">Please use the verification code below to sign up.</p>
                        <p style="padding-bottom: 16px"><strong style="font-size: 130%">${otp}</strong></p>
                        <p style="padding-bottom: 16px">If you didn't request this, you can ignore this email.</p>
                        <p style="padding-bottom: 16px">Thanks,<br>The ClaySip Team</p>
                        </div>
                        </div>`;
    
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
            to: to,
            subject: subject,
            html: message
        });

        res.json({ success: true, message: "OTP Sent Successfully" })
        
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message })
    }
}

// verify Otp
const verifyOtp = async (otp, email, type) => {
    try {
        const userOtp = await otpModel.findOne({
            email: email,
            otp: otp,
            expiredOn: { $gt: new Date() },
            type: type
          });

        if (!userOtp) {
            return { success: false, message: "Invalid OTP" }
        }

        await otpModel.findOneAndDelete({ 
            email: email,
            otp: otp,
            type: type
        });
        return { success: true, message: "OTP Verfied" }

    } catch (error) {
        console.log(error);
        return { success: false, message: error.message }
    }
}


export { loginUser, registerUser, adminLogin, userData, getUserData, generateOtp, verifyOtp }