import Post from "../model/post"
import { IP } from "../utils/utils"

export const getAllPost = async (req, res) => {
    try {
        const posts = await Post.find().limit(30);

        let filtered = []

        posts.map(item => filtered.unshift(item.toJSON()))
        return res.status.json({
            ...posts
        })
    } catch (error) {
        return res.status(404).json({
            msg: 'No post found'
        })
    }
}


export const createPost = async (req, res) => {
    const body = req.body;
    const file = req.file.filename;
    const file_url = `http:${IP}:${process.env.PORT}/media/${file}`
    try {
        const post = new Post({ ...req.body, file_url: file_url })
        await post.save()

        const result = post.toJSON()
        return res.status(200).json({
            ...result
        })

    } catch (error) {
        return res.status(400).json({
            msg: 'Failed to create post'
        })
    }
}

export const deletePost = async (req, res) => {
    const id = req.params.id
    try {
        await Post.findByIdAndDelete(id)
        return res.status(200).json({
            msg: 'Post deleted'
        })
    } catch (error) {
        return res.status(400).json({
            msg: 'Failed to delete post'
        })
    }
}

export const likePost = async (req, res) => {
    const id = req.params.id
    try {
        let post = await Post.findOne({ _id: id })
        let likes = post.likes;
        if (!likes.includes(req.body.uid)) {
            likes.push(req.body.uid)
            post.likes = likes
            await post.save()

            const result = post.toJSON()
            return res.staus(200).json({
                msg: 'like added'
            })
        }
        else {
            return res.status(400).json({
                msg: 'already liked'
            })
        }

    } catch (error) {
        return res.status(400).json({
            msg: 'Failed to add like'
        })
    }
}

export const commentPost = async (req, res) => {
    const id = req.params.id
    try {
        let post = await Post.findOne({ _id: id })
        let comments = post.comments;

        comments.push({ ...req.body })
        post.comments = comments
        const result = await post.save()
        const filtered = result.toJSON()
        
        return res.status(200).json({
            ...filtered
        })
    } catch (error) {
        return res.status(400).json({
            msg: 'Failed to add comment'
        })
    }
}