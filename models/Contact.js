const mongoose = require('mongoose')

const ContactSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please Provide Contact Name'],
        trim: true,
        minlength: 2,
    },
    email: {
        type: String,
        required: [true, 'Please Provide Contact`s Email'],
        default: '-'
    },
    phone: {
        type: String,
        trim: true,
    }
}, {timestamps: true})

module.exports = mongoose.model('contact', ContactSchema)