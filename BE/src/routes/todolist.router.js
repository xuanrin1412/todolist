const todolistController = require('../controllers/todolistController')
const express = require('express')
const router = express.Router()

// [GET] /api/v1/todolist/:id
router.get('/:id', todolistController.getToDolist)

module.exports = router