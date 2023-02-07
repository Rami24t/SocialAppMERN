import express from 'express'
import dotenv from 'dotenv'
import userRoutes from './routes/userRoutes.js'
import postRoutes from './routes/postRoutes.js'
import dbConnect from './config/db.js'
import cookieParser from 'cookie-parser'
import cors from 'cors'
// import { OAuth2Client } from "google-auth-library"

dotenv.config()
const app = express()
dbConnect()

app.use(cors({
    origin: process.env.NODE_ENV === 'production' ? 'https://social-app-client.vercel.app' : 'http://localhost:3000',
    credentials: true,
    preflightContinue: true,
}))
app.use(express.json())
app.use(cookieParser())
app.use('/users', userRoutes)
app.use('/posts', postRoutes)

const port = process.env.PORT || 5001
app.listen(port, () => console.log('Server is up and running at port: ', port))
