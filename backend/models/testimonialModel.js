import mongoose from "mongoose";

const reviewSchema = mongoose.Schema({
    name: String,
    testimonial: String,
    date: {
        type: Date,
        default: new Date()
    }
})

export default mongoose.model('review', reviewSchema)