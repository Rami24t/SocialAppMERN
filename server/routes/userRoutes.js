import express from 'express'
import {register, login, emailConfirm, forgotPass, changePass, logout, updateCover, updateProfile} from '../controllers/userController.js'
import auth from '../middleware/auth.js'
import multerMiddleware from '../config/multer-cloudinary.js'
const router = express.Router()

router.post('/register', register)
router.post('/emailconfirm', emailConfirm)
router.post('/login', login)
router.get('/logout', logout)

router.post('/forgotpass', forgotPass)
router.post('/changepassword', changePass)

router.put('/profile', auth, multerMiddleware.single('image'), updateProfile)
router.put('/cover', auth, multerMiddleware.single('image'), updateCover)

export default router