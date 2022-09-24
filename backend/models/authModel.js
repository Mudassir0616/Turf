import mongoose from "mongoose";

const usersSchema = mongoose.Schema({
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
    password: {
        type: String,
        required: true
    },
    admin:{
        type: Boolean,
        default: false
    }
})

export default mongoose.model('turfUser', usersSchema)