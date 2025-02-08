import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import axios from 'axios'

export const ShopContext = createContext();

const ShopContextProvider = (props) => {

    const currency = '₹ ';
    const backendUrl = import.meta.env.VITE_BACKEND_URL
    const [delivery_fee, setDeliveryFee] = useState(false);
    const [search, setSearch] = useState('');
    const [showSearch, setShowSearch] = useState(false);
    const [cartItems, setCartItems] = useState({});
    const [products, setProducts] = useState([]);
    const [filters, setFilters] = useState([]);
    const [token, setToken] = useState('')
    const [sidebar, setSidebar] = useState(false)
    const [userData, setUserData] = useState([])
    const [cartWeight, setCartWeight] = useState("")
    const [deliveryPinCode, setDeliveryPinCode] = useState(false)
    const navigate = useNavigate();

    const [isLoading, setIsLoading] = useState(false);


    const addToCart = async (itemId, product_type, size, is_size_available) => {
        if(!token){
            navigate("/login");
            return;
        }

        if (is_size_available && size == "") {
            toast.error('Select Product Size');
            return;
        }

        if(size == ""){
            size = "_";
        }

        toggleSidebar(true)

        let cartData = structuredClone(cartItems);

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
        }
        else {
            cartData[itemId] = {};
            if(!product_type){
                cartData[itemId] = {'main' : {[size] : 1}};
            } else {
                cartData[itemId] = {[product_type.index] : {[size] : 1}};
            }
        }
        setCartItems(cartData);

        if (token) {
            try {

                await axios.post(backendUrl + '/api/cart/add', { itemId, product_type, size }, { headers: { token } })
                getUserCart(token);
            } catch (error) {
                console.log(error)
                toast.error(error.message)
            }
        }

    }

    const gettingInformationFromCartData = async (cartItem) => {
        return new Promise((resolve, reject)=>{
            const tempData = [];
            for (const items in cartItem) {
                if(typeof cartItem[items] !== "object"){
                    continue;
                }
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

    const getCartCount = () => {
        let totalCount = 0;
        for (const items in cartItems) {
            for (const item in cartItems[items]) {
                for (const size in cartItems[items][item]) {
                    try {
                        
                        var product_info = products.find(e => e._id === items);
                        if(product_info){
                            if (cartItems[items][item][size] > 0) {
                                totalCount += cartItems[items][item][size];
                            }
                        }
                    } catch (error) {
                        
                    }
                }
            }
        }
        return totalCount;
    }

    const updateQuantity = async (itemId, product_type, size, quantity) => {
        let cartData = structuredClone(cartItems);

        if(!product_type){
            product_type = "main";
        }
        cartData[itemId][product_type][size] = quantity;

        setCartItems(cartData)

        if (token) {
            try {

                await axios.post(backendUrl + '/api/cart/update', { itemId, product_type, size, quantity }, { headers: { token } })
                getUserCart(token);
            } catch (error) {
                console.log(error)
                toast.error(error.message)
            }
        }

    }

    const getCartAmount = () => {
        let totalAmount = 0;
        for (const items in cartItems) {
            for (const item in cartItems[items]) {
                if(item != 'main'){
                    for (const size in cartItems[items][item]) {
                        try {
                            let itemInfo = products.find((product) => product._id === items);
                            if (cartItems[items][item][size] > 0) {
                                let productTypeData = itemInfo.product_type_data.find(ptd => ptd.index == item);
                                totalAmount += productTypeData.price * cartItems[items][item][size];
                            }
                        } catch (error) {
                            
                        }
                    }
                } else {
                    for (const size in cartItems[items][item]) {
                        try {
                            let itemInfo = products.find((product) => product._id === items);
                            if (cartItems[items][item][size] > 0) {
                                totalAmount += itemInfo.price * cartItems[items][item][size];
                            }
                        } catch (error) {
                            
                        }
                    }
                }
            }
        }
        return totalAmount;
    }

    const getCartWeight = () => {
        let totalWeight = 0;
        for (const items in cartItems) {
            for (const item in cartItems[items]) {
                for (const size in cartItems[items][item]) {
                    try {
                        let itemInfo = products.find((product) => product._id === items);
                        if (cartItems[items][item][size] > 0) {
                            totalWeight += itemInfo.weight * cartItems[items][item][size];
                        }
                    } catch (error) {
                        
                    }
                }
            }
        }
        setCartWeight(totalWeight);
    }

    const getProductsData = async () => {
        try {

            const response = await axios.get(backendUrl + '/api/product/list')
            if (response.data.success) {
                setProducts(response.data.products.reverse())
            } else {
                toast.error(response.data.message)
            }

        } catch (error) {
            console.log(error)
            toast.error(error.message)
        }
    }


    const getFiltersData = async () => {
        try {

            const response = await axios.get(backendUrl + '/api/product/filter-category')
            if (response.data.success) {
                setFilters(response.data)
            } else {
                toast.error(response.data.message)
            }

        } catch (error) {
            console.log(error)
            toast.error(error.message)
        }
    }

    const getUserCart = async ( token ) => {
        try {
            
            const response = await axios.post(backendUrl + '/api/cart/get',{},{headers:{token}})
            if (response.data.success) {
                setCartItems(response.data.cartData)
                if(response.data?.pinCode){
                    setDeliveryPinCode(response.data.pinCode)
                }
            }
        } catch (error) {
            console.log(error)
            toast.error(error.message)
        }
    }

    const getUserProfile = async () => {
        try {
            const response = await axios.get(backendUrl + '/api/user/user-data',{headers:{token}})
            if (response.data.success) {
                setUserData(response.data.data)
            }
        } catch (error) {
            console.log(error)
            toast.error(error.message)
        }
    }

    const checkPinCode = async(pinCode, refresh = false)=>{
        if(pinCode < 100000 || pinCode > 999999 || isNaN(pinCode)){
            if(!refresh){
                toast.error("Invalid Pincode");
            }
            return false;
        }
        try {
            const response = await axios.post(backendUrl + '/api/order/delivery-charge',{pinCode, weight: cartWeight},{headers:{token}});
            if (response.data.success) {
                if(!refresh){
                    toast.success("Items are deliverable on your location");
                }
                setDeliveryFee(response.data.data.total_amount);
                setIsLoading(false);
                return true;
            } else {
                toast.error(response.data.message);
                setIsLoading(false);
                return false;
            }
        } catch (error) {
            console.log(error);
            toast.error(error.message);
            setIsLoading(false);
            return false;
        }
    }

    const toggleSidebar = (val)=>{
        setSidebar(val);
    }

    useEffect(() => {
        setSidebar(false);
        getProductsData()
        getFiltersData()
    }, [])

    useEffect(() => {
        if (!token && localStorage.getItem('token')) {
            setToken(localStorage.getItem('token'))
            getUserCart(localStorage.getItem('token'))
        }
        if (token) {
            getUserCart(token)
            getUserProfile();
        }
    }, [token])

    useEffect(() => {
        if (cartItems) {
            getCartWeight()
        }
    }, [cartItems])

    useEffect(() => {
        if (cartWeight && deliveryPinCode) {
            setIsLoading(true);
            checkPinCode(deliveryPinCode, true);
        }
    }, [cartWeight, deliveryPinCode])

    const value = {
        products, currency, delivery_fee,
        search, setSearch, showSearch, setShowSearch,
        cartItems, addToCart,setCartItems,
        getCartCount, updateQuantity,
        getCartAmount, navigate, backendUrl,
        setToken, token, filters, toggleSidebar, sidebar, userData, gettingInformationFromCartData, setIsLoading, isLoading, getCartWeight, setDeliveryFee, deliveryPinCode, checkPinCode
    }

    return (
        <ShopContext.Provider value={value}>
            {props.children}
        </ShopContext.Provider>
    )

}

export default ShopContextProvider;