import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
    username:{
        type: String,
        required: true,
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    password:{
        type: String,
        required: true,
    },
    role:{
        type: String,
        required: true,
    },
    imageUrl:{
        type: String,
        required: false
    },
    category:{
        type: String,
        required: false
    }
}, {timestaps:true})

export default mongoose?.models?.User || mongoose.model("User", UserSchema) 