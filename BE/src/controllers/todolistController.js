const createError = require('../util/error')

const getToDolist = (req, res) => {
    res.json({
        todolist: ['ăn cơm', 'rửa bát', 'lau nhà']
    })
}

module.exports = {
    getToDolist
}