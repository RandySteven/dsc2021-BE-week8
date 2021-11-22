require('dotenv').config()

const express = require('express')
const mongoose = require('mongoose')
const app = express()
const PORT = 3000
const cookieParser = require('cookie-parser')
const PostRouter = require('./src/routes/posts.route')
const MONGO_URL = process.env.MONGO_URL
const UserRouter = require('./src/routes/users.route')

app.use(cookieParser())
app.use(express.urlencoded({extended:true}))

app.use('/v1/users/', UserRouter.router)
app.use('/v1/posts/', PostRouter.router)

app.get('/', (req, res) => {
    res.send({message:'Hello My New Master'})
})

mongoose.connect(MONGO_URL)
    .then(() => {
        app.listen(PORT, (error) => {
            if(error) process.exit(1)
            console.log('Server sudah jalan pada PORT http://localhost:3000')
        })
    })
    .catch(error => console.log(error))
