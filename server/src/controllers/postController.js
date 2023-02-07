import Post from '../models/Post.js';

export const add = async (req, res) => {
    try {
        console.log("req body:", req.body)
        req.body.author = req.user
        if (req.file) 
            req.body.postImage = req.file.path
        const post = await Post.create(req.body)
        // .populate({path: 'author', select: 'username email profileImage'})
        res.send({success: true, post})
    } catch (error) {
        console.log("add error:", error.message)
        res.send({success: false, error: error.message})
    }
}

export const list = async (req, res) => {
    try {
        const posts = await Post
            .find()
            .select('-__v')
            .populate({path: 'author', select: 'name username email profileImage likes about phone title facebook twitter instagram'}) // post author
            // .populate({path: 'likes', select: 'username email profileImage', options: {sort: {createdAt: -1}} }) // post likes
            // .populate({path: 'comments', select: '-__v', options: {sort: {createdAt: -1}} })// post comments
            // .populate({path: 'comments.author', select: 'username email profileImage'}) // comment author
            // .populate({path: 'comments.likes', select: 'username email profileImage', options: {sort: {createdAt: -1}} }) // comment likes
            // .populate({path: 'comments.comments', select: '-__v', options: {sort: {createdAt: -1}} }) // comment comments
            // .populate({path: 'comments.comments.author', select: 'username email profileImage'}) // comment comments author
            // .populate({path: 'comments.comments.likes', select: 'username email profileImage', options: {sort: {createdAt: -1}} }) // comment comments likes
            // .populate({path: 'comments.comments.comments' , select: '-__v', options: {sort: {createdAt: -1}} }) // comment comments comments
            // .populate({path: 'comments.comments.comments.author', select: 'username email profileImage'}) // comment comments comments author
            // .populate({path: 'comments.comments.comments.likes', select: 'username email profileImage', options: {sort: {createdAt: -1}} }) // comment comments comments likes
            .sort({createdAt: -1})
        res.json({posts}).status(200)        
    } catch (error) {
        console.log("error:", error.message)
        res.send({success: false, error: error.message})
    }
}

export const deletePost = async (req, res) => {
    try {
        console.log("deletePost req.body:", req.body)
        const deletedPost = await Post.findByIdAndDelete(
            {
                _id: req.body.id,
                author: req.user
            }       
        )
        if (!deletedPost) return res.send({success: false, errorId: 401})
        res.send({success: true})        
    } catch (error) {
        console.log("deletePost error:", error.message)
        res.send({success: false, error: error.message})
    }
}

export const edit = async (req, res) => {
    try {
        const {postId: _id, author, text } = req.body
        if (req.user !== req.body.author) return res.send({success: false, errorId: 0})
       const newPost = await Post.findByIdAndUpdate(
        {
            _id,
            author
        },
        {text},
        {new: true}
       )
        res.send({success: true})        
    } catch (error) {
        console.log("edit post error:", error.message)
        res.send({success: false, error: error.message})
    }
}

export const like = async (req, res) => {
    try {
        const post = await Post.findById(req.body.postId)
        const liked = post.likes.includes(req.user)
        let newPost = {}
        if (liked) { // is in the likes array?
            newPost = await Post.findByIdAndUpdate(
                req.body.postId,
                {
                    $pull: { // deletes matching items
                        likes: req.user
                    }
                },
                {new: true}
            )
        } else {
            newPost = await Post.findByIdAndUpdate(
                req.body.postId,
                {
                    $addToSet: {
                        likes: req.user
                    }
                },
                {new: true}
            )
        }
        res.send({success: true, likes: newPost.likes})     
    } catch (error) {
        console.log("like error:", error.message)
        res.send({success: false, error: error.message})       
    }
}