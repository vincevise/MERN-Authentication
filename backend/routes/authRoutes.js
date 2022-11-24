const express = require('express')
const {userRegistration, userLogin, changePassword} = require('../controllers/authController') 
const checkIsUserAuthenticated = require('../middlewares/authMiddleware')
const authRoute = express.Router()

authRoute.post('/users/register', userRegistration)
authRoute.post('/users/login',userLogin)
authRoute.post(
    '/change-password',
    checkIsUserAuthenticated,
    changePassword)

module.exports = {
    authRoute
}