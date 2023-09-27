const authController = require('../controllers/authController')
const express = require('express')
const router = express.Router()

// [GET] /api/v1/auth/register
router.post('/register', authController.register)
router.post('/login', authController.login)

module.exports = router