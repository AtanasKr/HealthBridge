import mongoose from 'mongoose';

const AppointmentSchema = new mongoose.Schema({
    docId:{
        type: String,
        required: true,
    },
    patientId:{
        type: String,
        required: true,
    },
    docName:{
        type: String,
        required: true,
    },
    docCat:{
        type: String,
        required: true,
    },
    patientName:{
        type: String,
        required: true,
    },
    appointmentDate:{
        type: String,
        required: true,
    },
    appointmentTime:{
        type: String,
        required: true,
    }
}, {timestamps:false})

export default mongoose?.models?.Appointment || mongoose.model("Appointment", AppointmentSchema) 