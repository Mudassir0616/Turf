import mongoose from "mongoose";

const ConversationSchema = mongoose.Schema({
    members :{
      type: Array
    },
}, 
{ timestamps: true}
);

export default mongoose.model('conversation', ConversationSchema)