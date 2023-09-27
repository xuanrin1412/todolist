const createError = require('../util/error')
const User = require('../models/User')
const ToDo = require('../models/ToDo')

// [POST] /api/v1/todolist
const createToDo = async (req, res, next) => {
    const userId = req.user.id
    let { title, desc } = req.body
    try {
        if (!userId) {
            return next(createError(400, "Bạn chưa đăng nhập hoặc người dùng không tồn tại. Mời đăng nhập lại"))
        }
        const createToDo = await ToDo.create({
            title, desc, userId
        })
        return res.json({ createToDo })
    }
    catch (err) {
        next(err)
    }
}

// [GET] /api/v1/todolist/:id
const getToDolist = async (req, res, next) => {
    // Lấy được từ middleware checkLogin với req.user = user
    const userId = req.user.id
    try {
        if (!userId) {
            return next(createError(400, "Bạn chưa đăng nhập hoặc người dùng không tồn tại. Mời đăng nhập lại"))
        }
        const toDoList = await ToDo.find({ userId })
        return res.status(200).json({ toDoList })
    }
    catch (err) {
        next(err)
    }
}

// [PUT] /api/v1/todolist/:id
const updateToDo = async (req, res, next) => {
    const userId = req.user.id
    const idToDo = req.params.id
    const { title, desc, complated } = req.body
    try {
        if (!userId) {
            return next(createError(400, "Bạn chưa đăng nhập hoặc người dùng không tồn tại. Mời đăng nhập lại"))
        }
        const updateToDo = await ToDo.findByIdAndUpdate(idToDo, {
            title, desc, complated
        }, { new: true })
        res.status(200).json({ updateToDo })
    }
    catch (err) {
        next(err)
    }
}

// [DELETE] /api/v1/todolist/:id
const deleteToDo = async (req, res, next) => {
    const userId = req.user.id
    const idToDo = req.params.id
    try {
        if (!userId) {
            return next(createError(400, "Bạn chưa đăng nhập hoặc người dùng không tồn tại. Mời đăng nhập lại"))
        }
        const deleteToDo = await ToDo.findByIdAndDelete(idToDo)
        res.status(200).json(deleteToDo)
    }
    catch (err) {
        next(err)
    }
}

// [DELETE] /api/v1/todolist/delete-all-complated
const deleteAllCompatedToDo = async (req, res, next) => {
    const userId = req.user.id
    try {
        if (!userId) {
            return next(createError(400, "Bạn chưa đăng nhập hoặc người dùng không tồn tại. Mời đăng nhập lại"))
        }
        const toDoList = await ToDo.find({ userId, complated: true })

        if (!toDoList.length === 0) {
            return res.status(200).json({ message: "Không có to do nào để xóa" })
        }

        const deleleAllComplated = await ToDo.deleteMany({ userId, complated: true })
        res.json({ deleleAllComplated })
    }
    catch (err) {

    }
}

module.exports = {
    getToDolist, createToDo, updateToDo, deleteToDo, deleteAllCompatedToDo
}