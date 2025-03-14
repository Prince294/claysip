import axios from "axios";
import CryptoJS from "crypto-js";

const SECRET_KEY = import.meta.env.VITE_SECRET_KEY;
const URL = import.meta.env.VITE_BACKEND_URL;
const http = axios?.create();

http.interceptors.request.use(config => {
    if (config.url !== URL + "/api/product/add" && config.url !== URL + "/api/product/update" && config.url !== URL + "/api/banner/add" && config.data) {
        const data = encryptData(config.data);
        config.data = { encryptedData: data }
    }
    return config;
}, error => {
    return Promise.reject(error);
});

// Response interceptor
http.interceptors.response.use(response => {
    if (response.data && response.data.encryptedData) {
        const data = decryptData(response.data.encryptedData);
        return { data: data };
    }

    return response;
}, error => {
    return Promise.reject(error);
});

// Encrypt function
export const encryptData = (data) => {
    const jsonString = JSON.stringify(data);
    return CryptoJS.AES.encrypt(jsonString, SECRET_KEY).toString();
};

// Decrypt function
export const decryptData = (encryptedData) => {
    try {
        const bytes = CryptoJS.AES.decrypt(encryptedData, SECRET_KEY);
        return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
    } catch (error) {
        console.error("Decryption error:", error);
        return null;
    }
};


export default http;
