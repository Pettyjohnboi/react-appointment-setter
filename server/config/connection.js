const mongoose = require('mongoose');



mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/apointmentsetter_DB');

module.exports = mongoose.connection;
