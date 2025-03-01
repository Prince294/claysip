import homePageBannerModel from "../models/homePageBannerModel.js"
import AWS from "aws-sdk"
import fs from "fs"


// function for add homec Page Banner
const addBanner = async (req, res) => {
    try {
        console.log(req.files)
        const image = req.files?.image && req.files?.image[0]
        console.log(image)
        const s3 = new AWS.S3({
            accessKeyId: process.env.AWS_ACCESS_KEY_ID,
            secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
            region: process.env.AWS_REGION
        });
        const uploadToS3 = async (file) => {
            const fileStream = fs.createReadStream(file.path);
            const params = {
                Bucket: process.env.AWS_BUCKET_NAME,
                Key: `uploads/${file.filename}`,
                Body: fileStream,
                ContentType: file.mimetype
            };
        
            try {
                const data = await s3.upload(params).promise();
                return data.Location;
            } catch (error) {
                console.error('Error uploading to S3:', error);
                throw error;
            }
        };

        let imageUrl = await uploadToS3(image);

        console.log('Uploaded Banner URL:', imageUrl);
        
        const bannerData = {
            image: imageUrl
        }

        const banner = new homePageBannerModel(bannerData);
        await banner.save()

        res.json({ success: true, message: "Banner Added" })

    } catch (error) {
        console.log("Error while add Banner", error)
        res.json({ success: false, message: error.message })
    }
}

// function for list Banner
const listBanner = async (req, res) => {
    try {
        
        const banner = await homePageBannerModel.find();
        res.json({success:true, banners: banner})

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

// function for removing Banner
const removeBanner = async (req, res) => {
    try {
        await homePageBannerModel.findByIdAndDelete(req.body.id)
        res.json({success:true,message:"Banner Removed"})

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}


export { listBanner, addBanner, removeBanner }