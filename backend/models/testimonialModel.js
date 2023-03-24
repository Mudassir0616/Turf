import mongoose from "mongoose";

const reviewSchema = mongoose.Schema({
    name: String,
    testimonial: String,
    userImg: String,
    date: {
        type: Date,
    }
})

export default mongoose.model('review', reviewSchema)