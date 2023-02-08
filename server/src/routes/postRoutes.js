import express from 'express'
import {list, add, deletePost, edit, like} from '../controllers/postController.js'
import {addComment, deleteComment, editComment} from '../controllers/commentController.js'
import multerMiddleware from '../config/multer-cloudinary.js'
import auth from '../middleware/auth.js'
const router = express.Router()

// Main Posts
router.post('/add', auth, multerMiddleware.single('image'), add)
router.get('/list', auth, list)
router.put('/edit', auth, edit)
router.patch('/likes', auth, like)
router.delete('/delete/:postId', auth, deletePost)

// Comments
router.post('/comments/add', auth, addComment)
router.patch('/comments/edit', auth, editComment)
router.delete('/comments/delete/:postId/:commentId', auth, deleteComment)

export default router