import mongoose from "mongoose";

const corporateSchema = mongoose.Schema({
  purpose:{
    type: String    
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
  enquirer:{
    type:String
  },
  email:{
    type: String
  },
  number:{
    type: Number
  },
  company:{
    type: String
  },
  sportsType:{
    type: String,
    required: true
  },
  price:{
    type: Number
}
})

export default mongoose.model('corporate Booking', corporateSchema)