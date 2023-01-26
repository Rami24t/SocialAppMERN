import express from 'express'
import dotenv from 'dotenv'
import userRoutes from './routes/userRoutes.js'
import postRoutes from './routes/postRoutes.js'
import dbConnect from './config/db.js'
import cookieParser from 'cookie-parser'

dotenv.config()
const app = express()
dbConnect()

app.use(express.json())
app.use(cookieParser())
app.use('/users', userRoutes)
app.use('/posts', postRoutes)

const port = process.env.PORT || 5001
app.listen(port, () => console.log('Server is up and running at port: ', port))
