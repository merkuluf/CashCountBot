import { StatusCodes } from 'http-status-codes'
import { ApiError } from '../utils/classes/ApiError.js'
import validationFunction from '../utils/telegramValidate.js'
import { isStringDigit, isCurrency, isValidUsername } from '../utils/regexp.js'

export const validateWalletCreation = async (req, res, next) => {
    try {
        const telegram_id = req.body.telegram_id
        const currency = req.body.currency

        if (!telegram_id || !isStringDigit(telegram_id)) {
            throw new ApiError(
                'telegram_id param required and must be string of digits type',
                StatusCodes.BAD_REQUEST
            )
        }

        if (!currency || !isCurrency(currency)) {
            throw new ApiError(
                'currency param required and must be string of 3 uppercase english letters (example: USD)',
                StatusCodes.BAD_REQUEST
            )
        }

        next()
    } catch (e) {
        next(e)
    }
}

export const validate = async (req, res, next) => {
    try {
        const telegram_id = req.body.telegram_id
        const username = req.body.username

        if (!telegram_id || !isStringDigit(telegram_id)) {
            throw new ApiError(
                'telegram_id param required and must be string of digits type',
                StatusCodes.BAD_REQUEST
            )
        }

        if (!username || !isValidUsername(username)) {
            throw new ApiError(
                'username param required and must start with @, be string of english letters and/or digits type, with 4-15 characters limit',
                StatusCodes.BAD_REQUEST
            )
        }
        next()
    } catch (e) {
        next(e)
    }
}

export const validateGetUser = async (req, res, next) => {
    try {
        const telegram_id = req.params.telegram_id
        if (!telegram_id) {
            throw new ApiError(
                'telegram_id param required',
                StatusCodes.BAD_REQUEST
            )
        }

        if (!isStringDigit(telegram_id)) {
            throw new ApiError(
                'telegram_id param must be string of digits',
                StatusCodes.BAD_REQUEST
            )
        }

        next()
    } catch (e) {
        next(e)
    }
}

export const initDataCheck = async (req, res, next) => {
    try {
        if (!req.body.initData) {
            throw new ApiError(
                'No telegram init data found',
                StatusCodes.NOT_FOUND
            )
        }

        const validationResult = await validationFunction(req.body.initData)
        return res.status(StatusCodes.OK).json(validationResult)
    } catch (e) {
        next(e)
    }
}
