const todolistController = require('../controllers/todolistController')
const express = require('express')
const { checkLogin } = require('../util/verifyToken')
const router = express.Router()

// [GET] /api/v1/todolist
router.get('/', checkLogin, todolistController.getToDolist)

// [POST] /api/v1/todolist
router.post('/', checkLogin, todolistController.createToDo)

// [UPDATE] /api/v1/todolist/:id
router.put('/:id', checkLogin, todolistController.updateToDo)

// [DELETE] /api/v1/todolist/:id
router.delete('/:id', checkLogin, todolistController.deleteToDo)

// [DELETE] /api/v1/todolist/delete-all-complated
router.get('/delete-all-complated', checkLogin, todolistController.deleteAllCompatedToDo)

module.exports = router