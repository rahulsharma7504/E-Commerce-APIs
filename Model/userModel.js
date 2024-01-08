const mongoose = require('mongoose');

const schema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    mobile: {
        type: Number,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    type: { // Changed from 'Type' to 'type'
        type: String,
        required: true
    },
});

const User_model = mongoose.model('User', schema);
module.exports = User_model;
