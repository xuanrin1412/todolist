const authController = require('../controllers/authController')
const express = require('express')
const { checkLogin } = require('../util/verifyToken')
const router = express.Router()

// [POST] /api/v1/auth/register
router.post('/register', authController.register)

// [POST] /api/v1/auth/login
router.post('/login', authController.login)

// [POST] /api/v1/auth/logout
router.post('/logout', checkLogin, authController.logout)


module.exports = router