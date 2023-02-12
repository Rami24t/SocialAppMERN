import express from 'express'
// import multerMiddleware from '../config/multer-cloudinary.js'
import auth from '../middleware/auth.js'
const router = express.Router()
import {deleteComment, getComment , likeComment, reply} from '../controllers/commentController.js'

router.patch('/like/:id', auth, likeComment)
router.post('/reply/:id', auth, reply)
router.get('/:id', auth, getComment)

export default router