import mongoose from 'mongoose'

const contactSchema = mongoose.Schema({
    firstName: String,
    lastName: String,
    email: String,
    number: Number,
    query: String
})

export default mongoose.model('contact', contactSchema)