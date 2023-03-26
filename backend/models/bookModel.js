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
    sportType:{
        type: String
    },
    players:{
        type: Number
    },
    date:{
      type: Date,
      required: true
    },
    from:{
      type: String,
      required: true
    },
    to:{
      type: String,
      required: true
    },
    price:{
      type: String
    }
})

export default mongoose.model('booking', bookSchema)