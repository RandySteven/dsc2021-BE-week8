const express = require('express')
const router = express.Router()

const PostController = require('../controllers/posts.controller')

const auth = require('../../auth')

router.post('/insert-post', auth, PostController.addPostData)
router.get('/', auth, PostController.getAllPostsData)
router.get('/:postId', PostController.getPostById)
router.patch('/update-post/:postId', PostController.updatePostById)
router.delete('/delete-post/:postId', PostController.deletePostById)

module.exports = {router}