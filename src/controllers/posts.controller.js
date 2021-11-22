const Post = require('../models/posts.model')

/**
 * 
 * @param {import("express").Request} req 
 * @param {import("express").Response} res 
 */
const addPostData = async (req, res) => {
    let {postTitle, postDesc} = req.body

    let post = new Post({
        postTitle: postTitle,
        postDesc: postDesc
    })

    post = await post.save()

    res.status(201).send({
        message:'Create data success',
        data: post
    })
}

const getAllPostsData = async (req, res) =>{
    let posts = await Post.find()

    if(posts.length > 0){
        res.status(200).send({message:'Get all posts data', posts:posts})
    }else{
        res.status(200).send({message:'Data post masih kosong'})
    }
}

/**
 * 
 * @param {import("express").Request} req 
 * @param {import("express").Response} res 
 */
const getPostById = async (req, res) => {
    let postId = req.params.postId
    let post = await Post.findById(postId)

    if(post){
        res.status(200).send({message:'Get post', data:post})
    }else{
        res.status(404).send({message:'Post data is not found'})
    }
    
}

/**
 * 
 * @param {import("express").Request} req 
 * @param {import("express").Response} res 
 */
 const updatePostById = async (req, res) => {
    let postId = req.params.postId
    let postTitle = req.body.postTitle
    let postDesc = req.body.postDesc
   
    let post = Post.findById(postId)

    if(post){
        post = await post.update({
            postTitle: postTitle,
            postDesc: postDesc
        })
        res.status(200).send({message:'Update post success', post:post})
    }else{
        res.status(404).send({message:'Post data is not found'})
    }
    
}

/**
 * 
 * @param {import("express").Request} req 
 * @param {import("express").Response} res 
 */
 const deletePostById = async (req, res) => {
    let postId = req.params.postId
    let post = await Post.findByIdAndRemove(postId)
    let posts = await Post.find()
    if(post){
        res.status(200).send({message:'Delete post success', post:post, posts:posts})
    }else{
        res.status(404).send({message:'Post data is not found'})
    }
}

module.exports = {
    addPostData,
    getAllPostsData,
    getPostById,
    updatePostById,
    deletePostById
}