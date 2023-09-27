const User = require('../models/User')
const createError = require('../util/error')
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt')
const dotenv = require('dotenv')

const register = async (req, res, next) => {
    let { email, password, password2, userName } = req.body
    const salt = bcrypt.genSaltSync()
    const hashingPassword = bcrypt.hashSync(password, salt)
    try {
        const checkEmailIsAvalible = await User.findOne({ email })
        if (checkEmailIsAvalible) {
            return next(createError(409, "Email đã được sủ dụng"))
        }
        if (password !== password2) {
            return next(createError(400, "Password không trùng khớp"))
        }
        await User.create({ email, password: hashingPassword, userName })
        res.status(200).json({ email: email, user: userName })
    }
    catch (err) {
        next(err)
    }
}

const login = async (req, res, next) => {
    let { email, password } = req.body

    try {
        const user = await User.findOne({ email })
        if (!user) {
            return next(createError(404, "Không tìm thấy người dùng"))
        }

        const checkPassword = bcrypt.compareSync(password, user.password)
        if (!checkPassword) {
            return next(createError(400, "Sai mật khẩu"))
        }
        const token = jwt.sign({ id: user._id }, process.env.SECRECT)

        res
            .cookie("user_token", token, {
                httpOnly: true,
            })
            .status(200)
            .json({ user: user.userName, email: user.email })
    }
    catch (err) {
        next(err)
    }
}
const logout = (req, res, next) => {
    res.clearCookie('user_token')
    res.status(200).json({ message: 'Bạn đã đăng xuất' })
}

module.exports = { register, login, logout }