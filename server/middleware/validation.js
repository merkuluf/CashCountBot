import { StatusCodes } from 'http-status-codes'
import { ApiError } from '../utils/classes/ApiError.js'
import validationFunction from '../utils/telegramValidate.js'
import { isStringDigit, isCurrency, isValidUsername } from '../utils/regexp.js'
import RESPONSES from '../utils/RESPONSES.js'

function telegramIdValidate(telegram_id) {
    if (!telegram_id) {
        throw new ApiError(
            RESPONSES.ERROR.PARAM_REQUIRED('telegram_id'),
            StatusCodes.BAD_REQUEST
        )
    }

    if (!isStringDigit(telegram_id)) {
        throw new ApiError(
            RESPONSES.ERROR.PARAM_TYPE('telegram_id', 'str of digits'),
            StatusCodes.BAD_REQUEST
        )
    }
}

export const createUser = async (req, res, next) => {
    try {
        telegramIdValidate(req.body.telegram_id)
        const username = req.body.username
        if (!username) {
            throw new ApiError(
                RESPONSES.ERROR.PARAM_REQUIRED('username'),
                StatusCodes.BAD_REQUEST
            )
        }

        if (!isValidUsername(username)) {
            throw new ApiError(
                RESPONSES.ERROR.PARAM_PATTERN(
                    'username',
                    'start with @, be string of english letters and/or digits type, with 4-15 characters'
                ),
                StatusCodes.CONFLICT
            )
        }

        next()
    } catch (e) {
        next(e)
    }
}

export const getUser = async (req, res, next) => {
    try {
        telegramIdValidate(req.params.telegram_id)
        next()
    } catch (e) {
        next(e)
    }
}

export const initData = async (req, res, next) => {
    try {
        if (!req.body.initData) {
            throw new ApiError(
                RESPONSES.ERROR.PARAM_REQUIRED('initData'),
                StatusCodes.BAD_REQUEST
            )
        }

        const validationResult = await validationFunction(req.body.initData)
        return res.status(StatusCodes.OK).json(validationResult)
    } catch (e) {
        next(e)
    }
}
