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
    },
    user_id: {
        type: mongoose.Schema.ObjectId,
        ref: 'user',
        required: [true, 'Please provide id user']
    }
}, {timestamps: true})

module.exports = mongoose.model('contact', ContactSchema)