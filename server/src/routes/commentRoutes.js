import express from 'express'
// import multerMiddleware from '../config/multer-cloudinary.js'
import auth from '../middleware/auth.js'
const router = express.Router()
import {deleteComment, likeComment} from '../controllers/commentController.js'

router.patch('/like/:id', auth, likeComment)

export default router