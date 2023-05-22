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
    type: String
  },
  players:{
    type: Number
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
  turf: {
    type: String
  },
  price:{
    type: String
}
})

export default mongoose.model('corporate Booking', corporateSchema)