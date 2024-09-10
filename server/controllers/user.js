import { StatusCodes } from 'http-status-codes'
import prisma from '../prisma/client.js'
import { ApiError } from '../utils/classes/ApiError.js'
import RESPONSES from '../utils/RESPONSES.js'

export const registerUser = async (req, res, next) => {
    try {
        const telegram_id = req.body.telegram_id
        const username = req.body.username

        const usernameTaken = await prisma.user.findFirst({
            where: {
                username: username,
            },
        })

        if (usernameTaken) {
            throw new ApiError(
                RESPONSES.ERROR.CREATE_RESOURCE_CONFLICT(
                    'user',
                    'username',
                    username
                ),
                StatusCodes.CONFLICT
            )
        }

        const telegramidTaken = await prisma.user.findFirst({
            where: {
                telegram_id: telegram_id,
            },
        })

        if (telegramidTaken) {
            throw new ApiError(
                RESPONSES.ERROR.CREATE_RESOURCE_CONFLICT(
                    'user',
                    'telegram_id',
                    telegram_id
                ),
                StatusCodes.CONFLICT
            )
        }

        const newUser = await prisma.user.create({
            data: {
                username: username,
                telegram_id: telegram_id,
            },
        })

        if (!newUser) {
            throw new ApiError(
                RESPONSES.ERROR.DB_ERROR('user'),
                StatusCodes.INTERNAL_SERVER_ERROR
            )
        }

        return res.status(StatusCodes.OK).json(newUser)
    } catch (e) {
        next(e)
    }
}

export const getUser = async (req, res, next) => {
    try {
        const telegram_id = req.params.telegram_id
        const user = await prisma.user.findFirst({
            where: {
                telegram_id: telegram_id,
            },
        })

        if (!user) {
            throw new ApiError(
                RESPONSES.ERROR.RESOURCE_NOT_FOUND(
                    'user',
                    'telegram_id',
                    telegram_id
                ),
                StatusCodes.NOT_FOUND
            )
        }

        return res.status(StatusCodes.OK).json(user)
    } catch (e) {
        next(e)
    }
}
