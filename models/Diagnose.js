import mongoose from 'mongoose';

const DiagnoseSchema = new mongoose.Schema({
    symptoms:{
        type: String,
        required: true,
    },
    name:{
        type: String,
        required: true,
        unique: true
    },
    propsocre:{
        type: String,
        required: true,
    }
}, {timestamps:false})

export default mongoose?.models?.Diagnose || mongoose.model("Diagnose", DiagnoseSchema) 