const jwt = require('jsonwebtoken')
const createError = require('./error')

const checkLogin = (req, res, next) => {
    const token = req.cookies.user_token
    // console.log(token)
    if (!token) {
        return next(createError(404, 'Bạn chưa đăng nhập'))
    }

    jwt.verify(token, process.env.SECRECT, (err, user) => {
        if (err) {
            return next(createError(401, "Mã token không chính xác"))
        }
        console.log('User id when login:', user)
        req.user = user
        next()
    })
}

module.exports = { checkLogin }