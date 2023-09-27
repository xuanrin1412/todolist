require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const todolistRouter = require('./routes/todolist.router')
const authController = require('./routes/auth.router')
const app = express()
const port = process.env.PORT

//config middleware
app.use(express.json())
app.use(express.urlencoded({ extended: true }))


// Database
const mongoURL = process.env.MONGO_DB
mongoose.connect(mongoURL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Conencted to MongoDB'))
    .catch(err => console.log('Error conecting to mongoDB', err))

// router
app.use('/api/v1/todolist', todolistRouter)
app.use('/api/v1/auth', authController)

// middleware handle
app.use((err, req, res, next) => {
    const errorStatus = err.status || 500
    const errorMessage = err.message || "Something went wrong"
    return res.status(errorStatus).json({
        success: false,
        status: errorStatus,
        message: errorMessage,
        stack: err.stack
    })
})

app.listen(port, () => {
    console.log(`app listen on port: ${port}`)
})