const { StatusCodes } = require("http-status-codes");
const { createToken, attachCookiesToResponse } = require("../utils/jwt");
const Contact = require('../models/Contact')
const User = require('../models/User')

const getProfile = async(req, res) => {

    const contact = await Contact.find({user_id: req.user.userId});
    res.status(StatusCodes.OK).json({
        status: {
            success: true,
            msg: 'Successfully get user infomation',
            response_codes: 200
        },
        results: {
            user: req.user,
            contacts: contact
        },
        total_contacts: contact.length
    })
}

const updateEmailAndName = async(req, res) => {
    const {email, name} = req.body;

    const duplicatedEmail = await User.findOne({email})
    if(duplicatedEmail) {
        res.status(StatusCodes.BAD_REQUEST).json({
            status: {
                success: false,
                msg: 'Email has already used, try to use different Email',
                response_codes: 400
            },
        })
    }

    const user = await User.findOne({_id: req.user.userId})

    // UPDATING INFORMATION
    user.name = name ? name : user.name;
    user.email = email ? email : user.email;

    await user.save()

    const payload = {name: user.name, email: user.email, userId: user._id}
    const token = createToken(payload)
    attachCookiesToResponse(res, payload)

    req.user = {name: user.name, email: user.email, userId: user._id}

    res.status(StatusCodes.OK).json({
        status: {
            success: true,
            msg: 'Successfully updating user information',
            response_codes: 200
        },
        data: req.user
    })

}

const updatePassword = async(req, res) => {
    const {oldPass, newPass} = req.body
    console.log(req.user.userId);

    if(!oldPass || !newPass) {
        res.status(StatusCodes.BAD_REQUEST).json({
            status: {
                success: false,
                msg: 'Update password required new password & old password, Please provide it',
                response_codes: 400
            }
        })
    }

    const user = await User.findOne({_id: req.user.userId})

    const isPasswordMatch = await user.comparePassword(oldPass)
    if(!isPasswordMatch) {
        res.status(StatusCodes.BAD_REQUEST).json({
            status: {
                success: false,
                msg: 'Wrong password ! Try again using correct password',
                response_codes: 400
            }
        })
    } else {
        user.password = newPass
        await user.save()
        res.status(StatusCodes.OK).json({
            status: {
                success: true,
                msg: 'Successfully update password',
                response_codes: 200
            },
            user: user
        })
    }

}

const deleteAccount = async(req, res) => {
    const user = await User.findOne({_id: req.user.userId})
    const contact = await Contact.deleteMany({user_id: req.user.userId})

    if(!user) {
        res.status(StatusCodes.NOT_FOUND).json({
            status: {
                success: false,
                msg: `Cannot find user`,
                response_codes: 404
            }
        })
    }

    res.cookie('token', 'logout', {
        expires: new Date(Date.now()),
        httpOnly: true
    })
    
    res.status(StatusCodes.OK).json({
        status: {
            success: true,
            msg: 'Sucessfully delete account',
            response_codes: 200
        }
    })


}

module.exports = {
    getProfile,
    updateEmailAndName,
    updatePassword,
    deleteAccount
}