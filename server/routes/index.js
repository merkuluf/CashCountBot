import express from 'express'
import mainRoutes from './mainRoutes.js'

const router = express.Router()

router.use('/api', mainRoutes)

export default router
