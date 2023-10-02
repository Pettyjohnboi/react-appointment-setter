const { Schema } = require('mongoose');

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
    website: {
        type:String,
        required: false,
    },
}, {
    timestamps: true,
});

module.exports = appointmentSchema;