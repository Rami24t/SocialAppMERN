import Post from '../models/Post.js'

export const addComment = async (req, res) => {
    try {
        const post = await Post.findByIdAndUpdate(
        req.body.postId,
        {
            $push: {
                comments: {
                    comment: req.body.comment,
                    author: req.user
                }
            }
        },
        {new: true}
       )
        .populate({
            path: 'comments.author',
            select: 'username email image'
        })
        res.send({success: true, comments: post.comments})        
    } catch (error) {
        console.log("add error:", error.message)
        res.send({success: false, error: error.message})
    }
}

export const deleteComment = async (req, res) => {
    try {
       const post = await Post.findByIdAndUpdate(
        req.params.postId,
        {
            $pull: {
                comments: {
                    _id: req.params.commentId
                }
            }
        },
        {new: true}
       ).populate({path: 'comments.author', select: 'username image email'})
        res.send({success: true, comments: post.comments})
    } catch (error) {
        console.log("deleteComment error:", error.message)
        res.send({success: false, error: error.message})       
    }
}

export const editComment = async (req, res) => {
    try {
       const post = await Post.findByIdAndUpdate(
        req.body.postId,
        {
            $set: {
                'comments.$[elem].comment': req.body.comment
            }
        },
        {
            arrayFilters: [{'elem._id': req.body.commentId}],
            new: true
        }
       ).populate({path: 'comments.author', select: 'username image email'})
       console.log("editComment ~ post:", post)
        res.send({success: true, comments: post.comments})        
    } catch (error) {
        console.log("editComment ~ error:", error.message)
        res.send({success: false, error: error.message})
    }
}

export const editCommentJS = async (req, res) => {

    try {
       const post = await Post.findById(req.body.postId)
       const commentIdx = post.comments.findIndex(item => item._id.toString() === req.body.commentId)
       post.comments[commentIdx].comment = req.body.comment
       const newPost = await Post.findByIdAndUpdate(
        req.body.postId,
        {
            comments: post.comments
        },
        {
            new: true
        }
       ).populate({path: 'comments.author', select: 'username image email'})
       console.log("editCommentJS ~ post", commentIdx)
        res.send({success: true, comments: newPost.comments})
    } catch (error) {
        console.log("editComment ~ error:", error.message)
        res.send({success: false, error: error.message})   
    }
}
