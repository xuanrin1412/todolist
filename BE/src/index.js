require('dotenv').config()
const express = require('express')
const app = express()
const port = process.env.PORT

app.use('/', (req, res) => {
    res.send('Hello word')
})

app.listen(port, () => {
    console.log(`app listen on port: ${port}`)
})