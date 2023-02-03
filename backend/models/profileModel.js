import mongoose from "mongoose";

const profileSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    number:{
        type: String,
    },
    userImg: {
        type: String,
        default: ''
    },
    admin:{
        type: Boolean,
        default: false
    }
})

export default mongoose.model('profile', profileSchema)