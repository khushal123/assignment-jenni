const { errorResponse } = require("../utils/response")
const passport = require("passport");



const checkAdmin = (req, res, next) => {
    if (!req.user) {
        return errorResponse(res, "Unauthorized access", 401)
    }
    if (req.user.role !== "admin") {
        return errorResponse(res, "Unauthorized access", 401)
    }
    next()
}
module.exports = {
    checkAdmin
}