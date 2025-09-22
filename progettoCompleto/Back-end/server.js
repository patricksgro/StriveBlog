import express from 'express'
import cors from 'cors'
import "dotenv/config"
import { connectDB } from './db.js'
import authorRouter from './routes/authors.js'
import postsRouter from './routes/posts.js'
import { errorHandler } from './middlewares/common/errorHandler.js'
import commentRouter from './routes/comments.js'
import authRouter from './routes/auth.js'
import { authVerify } from './middlewares/common/authVerify.js'
import passport from 'passport'
import googleStrategy from './helpers/passportConfig.js'


const server = express()
server.use(cors())
server.use(express.json())

passport.use(googleStrategy)

server.use('/auth', authRouter)
server.use('/authors', authVerify, authorRouter)
server.use('/posts', authVerify, postsRouter)
server.use('/posts', authVerify, commentRouter)

//GESTIONE CENTRALIZZATA ERRORI
server.use(errorHandler)

connectDB()

server.listen(process.env.PORT, () => {
    console.log(`Server avviato alla porta ${process.env.PORT}`)
})