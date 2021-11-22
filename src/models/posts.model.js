const mongoose = require('mongoose')
const Schema = mongoose.Schema

const PostSchema = new Schema({
    postTitle: {
        type: String,
        required: true
    },
    postDesc: {
        type: String,
        required: true
    }
}, {
    timestamps: true
})

module.exports = mongoose.model("Post", PostSchema)