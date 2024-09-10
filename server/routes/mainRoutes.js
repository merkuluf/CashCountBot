import express from 'express'
import * as validate from '../middleware/validation.js'
import * as ctr from '../controllers/user.js'
import { fetchRates, showCurrencies } from '../controllers/services/rates.js'
const router = express.Router()

// Validation
router.post('/validate', validate.initData)

// Registration
router.get('/user/:telegram_id', validate.getUser, ctr.getUser)
router.post('/user', validate.createUser, ctr.registerUser)

export default router
