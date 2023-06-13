import mongoose from 'mongoose';

const ChatSchema = new mongoose.Schema({
    idFrom:{
        type: String,
        required: true,
    },
    idTo:{
        type: String,
        required: true,
    },
    nameFrom:{
        type: String,
        required: true,
    },
    nameTo:{
        type: String,
        required: true,
    },
    message:{
        type: String,
        required: true,
    }
}, {timestamps:false})

export default mongoose?.models?.Chat || mongoose.model("Chat", ChatSchema) 