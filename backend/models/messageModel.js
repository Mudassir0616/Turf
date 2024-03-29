import mongoose from "mongoose";

const MessageSchema = mongoose.Schema({
  conversationId:{
    type: String
  },
  sender:{
    type: String
  },
  text: {
    type: String
  }
}, 
{ timestamps: true}
);

export default mongoose.model('message', MessageSchema)