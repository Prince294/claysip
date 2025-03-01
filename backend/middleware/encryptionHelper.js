import CryptoJS from "crypto-js";

const SECRET_KEY = process.env.SECRET_KEY;

export const encryptData = (data) => {
    const jsonString = JSON.stringify(data);
    return CryptoJS.AES.encrypt(jsonString, SECRET_KEY).toString();
};

export const decryptData = (encryptedData) => {
    try {
        const bytes = CryptoJS.AES.decrypt(encryptedData, SECRET_KEY);
        return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
    } catch (error) {
        console.error("Decryption error:", error);
        return null;
    }
};

export const decryptMiddleware = (req, res, next) => {
    if (req.path === "/api/product/add" || req.path === "/api/product/update" || req.path === "/api/banner/add") {
        return next();
    }

    if (Object.keys(req.body).length !== 0 && req.body.encryptedData) {
        req.body = decryptData(req.body.encryptedData);
        if (!req.body) {
            return res.status(400).json({ error: "Invalid encrypted data" });
        }
    }
    next();
};

export const encryptMiddleware = (req, res, next) => {
    const originalJson = res.json.bind(res);
    res.json = (data) => {
        const encryptedData = encryptData(data);
        originalJson({ encryptedData });
    };
    next();
}