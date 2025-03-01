import mongoose from 'mongoose'
import AutoIncrementFactory from "mongoose-sequence";

const AutoIncrement = AutoIncrementFactory(mongoose);

const homePageBannerSchema = new mongoose.Schema({
    banner_id: { type: Number, unique: true },
    image: { type: String, required: true },
})

// Apply the auto-increment plugin to the "banner_id" field
homePageBannerSchema.plugin(AutoIncrement, { inc_field: "banner_id" });

const homePageBannerModel = mongoose.models.homePageBanner || mongoose.model('homePageBanner',homePageBannerSchema)
export default homePageBannerModel;