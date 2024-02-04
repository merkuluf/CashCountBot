import { StatusCodes } from 'http-status-codes'
import prisma from '../prisma/client.js'
import { ApiError } from '../utils/classes/ApiError.js'

export const createWallet = async (req, res, next) => {
    try {
        const telegram_id = req.body.telegram_id
        const currency = req.body.currency
        console.log(telegram_id, currency)
    } catch (e) {
        next(e)
    }
}

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
                `username ${username} is already taken`,
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
                `telegram_id ${telegram_id} is already taken`,
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
                'Unable to create user, please contact support',
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
            include: {
                wallets: true,
                transactions: true,
            },
        })

        if (!user) {
            throw new ApiError(
                `user with telegram_id ${telegram_id} not found`,
                StatusCodes.NOT_FOUND
            )
        }

        return res.status(StatusCodes.OK).json(user)
    } catch (e) {
        next(e)
    }
}
