import express from 'express'
import dotenv from 'dotenv'
import apiRoutes from './routes/index.js'
import errorHandler from './middleware/errorHandler.js'
dotenv.config()

const app = express()

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE')
    res.header('Access-Control-Allow-Headers', 'Content-Type')
    next()
})

app.use(express.json())

app.use(apiRoutes)
app.use(errorHandler)

export default app
