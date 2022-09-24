import mongoose from "mongoose";

const OtpSchema = mongoose.Schema({
    email: String,
    code: String,

})

export default mongoose.model('Otp', OtpSchema)