import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    full_description: { type: String, required: true },
    price: { type: Number, required: true },
    weight: { type: Number, required: true },
    image: { type: Array, required: true },
    category: { type: String, required: true },
    no_of_product_types: { type: String, required: true },
    product_type_data: { type: Array, required: true },
    bestseller: { type: Boolean },
    date: { type: Number, required: true },
    is_deleted: { type: Boolean, default: false },
})

const productModel  = mongoose.models.product || mongoose.model("product",productSchema);

export default productModel