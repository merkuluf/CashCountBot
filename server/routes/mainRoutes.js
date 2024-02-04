import express from 'express'
import * as mw from '../middleware/validation.js'
import * as ctr from '../controllers/user.js'
import { fetchRates } from '../controllers/services/rates.js'
const router = express.Router()

router.get('/test', fetchRates)
router.get('/user/:telegram_id', mw.validateGetUser, ctr.getUser)

router.post('/user/wallet', mw.validateWalletCreation, ctr.createWallet)
router.post('/user', mw.validate, ctr.registerUser)
router.post('/validate', mw.initDataCheck)

export default router
