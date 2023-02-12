import express from 'express'
import dotenv from 'dotenv'
import userRoutes from './src/routes/userRoutes.js'
import postRoutes from './src/routes/postRoutes.js'
import commentRoutes from './src/routes/commentRoutes.js'
import dbConnect from './src/config/db.js'
import cookieParser from 'cookie-parser'
import cors from 'cors'
// import { OAuth2Client } from "google-auth-library"
// import mongoose from 'mongoose'
// import Post from './src/models/Post.js'
// import User from './src/models/User.js'
// ...rest of the initial code omitted for simplicity.
import { check, body, validationResult } from 'express-validator'

dotenv.config()
const app = express()
dbConnect()

app.use('/*', body('*').trim().escape())

app.use(cors({
    origin: process.env.NODE_ENV === 'production' ? 'https://social-app-client-mern.vercel.app' : 'http://localhost:3000',
    credentials: true,
    preflightContinue: true,
    // "methods": "GET,HEAD,PUT,PATCH,POST,DELETE, OPTIONS"
}))
// app.options(cors());
app.use(express.json())
app.use(cookieParser())
app.use('/users', userRoutes)
app.use('/posts', postRoutes)
app.use('/comment', commentRoutes)

const port = process.env.PORT || 5001
app.listen(port, () => console.log('Server is up and running at port: ', port))

// Script to randomize the number of likes and comments on the posts
