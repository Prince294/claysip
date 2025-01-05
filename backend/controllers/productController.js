import productModel from "../models/productModel.js"
import AWS from "aws-sdk"
import fs from "fs"



// function for add product
const addProduct = async (req, res) => {
    try {

        const { name, description, price, category, subCategory, sizes, bestseller } = req.body

        const image1 = req.files.image1 && req.files.image1[0]
        const image2 = req.files.image2 && req.files.image2[0]
        const image3 = req.files.image3 && req.files.image3[0]
        const image4 = req.files.image4 && req.files.image4[0]

        const images = [image1, image2, image3, image4].filter((item) => item !== undefined)


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

        let imagesUrl = await Promise.all(
            images.map((item) => uploadToS3(item))
        );

        console.log('Uploaded image URLs:', imagesUrl);
        
        const productData = {
            name,
            description,
            category,
            price: Number(price),
            subCategory,
            bestseller: bestseller === "true" ? true : false,
            sizes: JSON.parse(sizes),
            image: imagesUrl,
            date: Date.now()
        }

        console.log(productData);

        const product = new productModel(productData);
        await product.save()

        res.json({ success: true, message: "Product Added" })

    } catch (error) {
        console.log("Error while add product", error)
        res.json({ success: false, message: error.message })
    }
}

// function for list product
const listProducts = async (req, res) => {
    try {
        
        const products = await productModel.find({});
        res.json({success:true,products})

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}


// function for filter category
const filterCategory = async (req, res) => {
    try {
        
        const result = await productModel.aggregate([
            {
                $group: {
                    _id: null,
                    categories: { $addToSet: "$category" },
                    subCategories: { $addToSet: "$subCategory" }
                }
            },
            {
                $project: {
                    _id: 0,
                    categories: 1,
                    subCategories: 1
                }
            },
            {
                $project: {
                    categories: { $sortArray: { input: "$categories", sortBy: 1 } },
                    subCategories: { $sortArray: { input: "$subCategories", sortBy: 1 } },
                }
            }
        ]);

        res.json({success:true,categories: result[0]['categories'], subCategories: result[0]['subCategories']})

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

// function for removing product
const removeProduct = async (req, res) => {
    try {
        
        await productModel.findByIdAndDelete(req.body.id)
        res.json({success:true,message:"Product Removed"})

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

// function for single product info
const singleProduct = async (req, res) => {
    try {
        
        const { productId } = req.body
        const product = await productModel.findById(productId)
        res.json({success:true,product})

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

export { listProducts, addProduct, removeProduct, singleProduct, filterCategory }