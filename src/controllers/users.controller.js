const User = require('../models/users.model')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const salt = 10
require('dotenv').config()
const JWT_TOKEN = process.env.JWT_TOKEN

var token

const register = async (req, res) => {
    let {userName, userEmail, userPassword:plainTextPassword} = req.body

    let userPassword = await bcrypt.hash(plainTextPassword, salt)

    let user = new User({
        userName: userName,
        userEmail: userEmail,
        userPassword: userPassword
    })
    user = await user.save()

    res.status(201).send({
        message:'Create user success',
        user: user
    })
}

const login = async (req, res) => {
    let {userEmail, userPassword} = req.body
    let response = await verifyUserLogin(userEmail, userPassword)
    if(response.status === 'ok'){
        res.cookie('token', token, {
            maxAge: 2 * 60 * 60 * 1000, httpOnly: true
        })
        res.status(201).send({response:response})
    }else{
        res.send({response:response})
    }
}

const verifyUserLogin = async (userEmail, userPassword) => {
    const user = await User.findOne({userEmail}).lean()

    if(!user){
        return {status:'error', error:'email not found'}
    }

    let verify = await bcrypt.compare(userPassword, user.userPassword)

    if(verify){
        token = jwt.sign({
            id:user._id,
            userName: user.userName,
            userEmail: user.userEmail,
            type: 'user'
        }, JWT_TOKEN, {
            expiresIn: '2h'
        })
        return {status:'ok', data:token}
    }else{
        return {status:'error', error:'password is invalid'}
    }
}

module.exports = {register, login}