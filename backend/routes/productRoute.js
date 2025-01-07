import express from 'express'
import { listProducts, addProduct, removeProduct, singleProduct, filterCategory } from '../controllers/productController.js'
import upload from '../middleware/multer.js';
import adminAuth from '../middleware/adminAuth.js';

const productRouter = express.Router();

productRouter.post('/add',adminAuth,upload.fields([
    {name:'image1',maxCount:1},{name:'image2',maxCount:1},{name:'image3',maxCount:1},{name:'image4',maxCount:1},
    {name:'image1_1',maxCount:1},{name:'image1_2',maxCount:1},{name:'image1_3',maxCount:1},{name:'image1_4',maxCount:1},
    {name:'image2_1',maxCount:1},{name:'image2_2',maxCount:1},{name:'image2_3',maxCount:1},{name:'image2_4',maxCount:1},
    {name:'image3_1',maxCount:1},{name:'image3_2',maxCount:1},{name:'image3_3',maxCount:1},{name:'image3_4',maxCount:1},
    {name:'image4_1',maxCount:1},{name:'image4_2',maxCount:1},{name:'image4_3',maxCount:1},{name:'image4_4',maxCount:1}
]),addProduct);
productRouter.post('/remove',adminAuth,removeProduct);
productRouter.post('/single',singleProduct);
productRouter.get('/list',listProducts)

productRouter.get('/filter-category',filterCategory)


export default productRouter