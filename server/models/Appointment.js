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
}, {
    timestamps: true,
});

module.exports = appointmentSchema;