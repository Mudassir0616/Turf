import mongoose from "mongoose";

const bookSchema = mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true
    },
    number:{
        type: Number,
        required: true
    },
    address:{
        type: String,
        required: true
    },
    sport:{
        type: String
    },
    players:{
        type: Number
    },
    date:{
        type: Date,
        default: new Date()   
    },
    time:{
        type: String,
        default: new Date().getHours()
    },
    price:{
        type: String,
        default: 1700
    }
})

export default mongoose.model('booking', bookSchema)