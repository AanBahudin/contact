const { StatusCodes } = require("http-status-codes")

const checkPermission = (userId, requestedUserId) => {
    if(userId.toString() !== requestedUserId) {
        res.status(StatusCodes.UNAUTHORIZED).json({success: false, msg: 'Not Found'})
    }
    return
}

module.exports = checkPermission