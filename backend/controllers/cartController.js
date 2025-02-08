import userModel from "../models/userModel.js"
import productModel from "../models/productModel.js"


// add products to user cart
const addToCart = async (req,res) => {
    try {
        
        const { userId, itemId, product_type, size } = req.body

        const userData = await userModel.findById(userId)
        let cartData = await userData.cartData;

        if (cartData[itemId]) {
            if(!product_type){
                if(cartData[itemId]['main']){
                    if (cartData[itemId]['main'][size]) {
                        cartData[itemId]['main'][size] += 1;
                    }
                    else {
                        cartData[itemId]['main'][size] = 1;
                    }
                } else {
                    cartData[itemId] = {...cartData[itemId], 'main' : {[size] : 1}};
                }
            } else {
                if(cartData[itemId][product_type.index]){
                    if (cartData[itemId][product_type.index][size]) {
                        cartData[itemId][product_type.index][size] += 1;
                    }
                    else {
                        cartData[itemId][product_type.index][size] = 1;
                    }
                } else {
                    cartData[itemId] = {...cartData[itemId], [product_type.index] : {[size] : 1}};
                }
            }
        } else {
            cartData[itemId] = {}
            if(!product_type){
                cartData[itemId] = {'main' : {[size] : 1}};
            } else {
                cartData[itemId] = {[product_type.index] : {[size] : 1}};
            }
        }

        await userModel.findByIdAndUpdate(userId, {cartData})

        res.json({ success: true, message: "Added To Cart" })

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

// update user cart
const updateCart = async (req,res) => {
    try {
        
        const { userId ,itemId, product_type, size, quantity } = req.body

        const userData = await userModel.findById(userId)
        let cartData = await userData.cartData;

        cartData[itemId][product_type][size] = quantity

        await userModel.findByIdAndUpdate(userId, {cartData})
        res.json({ success: true, message: "Cart Updated" })

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}


// get user cart data
const getUserCart = async (req,res) => {

    try {
        
        const { userId } = req.body
        
        const userData = await userModel.findById(userId)
        let cartData = await userData.cartData;
        const products = await productModel.find({});
        
        const validProductIds = new Set(products.map(product => product._id.toString()));
        for(const cartKey in cartData){
            if (!validProductIds.has(cartKey)) {
                delete cartData[cartKey];
            }
        }
        userData.cartData = cartData;

        userData.markModified('cartData');
        await userData.save();

        res.json({ success: true, cartData, pinCode: userData?.delivery_pin_code })

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }

}

export { addToCart, updateCart, getUserCart }