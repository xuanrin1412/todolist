const mongoose = require('mongoose')

const toDoSchema = new mongoose.Schema({
    title: { type: String, required: true },
    desc: { type: String },
    complated: { type: Boolean, default: false },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
})

const ToDo = mongoose.model('ToDo', toDoSchema)

module.exports = ToDo