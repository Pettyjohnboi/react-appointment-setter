const { Schema, model } = require('mongoose');
 

const appointmentSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
    },
    dateTime: {
        type: Date, 
        required: true,
    },
    address: {
        type:String,
        required: false,

    },
    phone: {
        type:String,
        required: false,

    },
    email: {
        type:String,
        required: false,

    },
    userId: {
        type: String,
        ref: 'User', 
        required: true,
    }
}, {
    timestamps: true,
});
const Appointment = model('Appointment', appointmentSchema);
module.exports = Appointment;