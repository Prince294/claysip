import express from 'express'
import { listBanner, addBanner, removeBanner } from '../controllers/homePageBannerController.js'
import upload from '../middleware/multer.js';
import adminAuth from '../middleware/adminAuth.js';

const bannerRouter = express.Router();

bannerRouter.post('/add',adminAuth,upload.fields([
    {name:'image',maxCount:1}
]),addBanner);

bannerRouter.post('/remove',adminAuth,removeBanner);
bannerRouter.get('/list',listBanner)


export default bannerRouter