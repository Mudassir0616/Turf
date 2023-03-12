import mongoose from "mongoose";

const reviewSchema = mongoose.Schema({
    name: String,
    testimonial: String,
    date: {
        type: Date,
        default: Date.now()
    }
})

export default mongoose.model('review', reviewSchema)