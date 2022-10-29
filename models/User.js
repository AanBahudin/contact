const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const validator = require('validator')

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: [true, 'name value cannot be empty'],
        minglength: 2,
        maxlength: 30
    },
    email: {
        type: String,
        required: [true, 'please provide email'],
        unique: true,
        validate: {
            validator: validator.isEmail,
            message: 'Please provide proper email'
        }
    },
    password: {
        type: String,
        minglength: 8,
        required: [true, 'Please Provide Password']
    }
}, {timestamps: true})


UserSchema.pre("save", async function () {
    this.password = await bcrypt.hash(this.password, 10)
})

UserSchema.methods.comparePassword = async function (candidatePassword) {
    const isMatch = await bcrypt.compare(candidatePassword, this.password)
    return isMatch;
}
module.exports = mongoose.model('user', UserSchema)