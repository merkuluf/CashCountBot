const API_BASE_URL = `https://v6.exchangerate-api.com/v6/`
import axios from 'axios'
import { StatusCodes } from 'http-status-codes'
import { ApiError } from '../../utils/classes/ApiError.js'
import prisma from '../../prisma/client.js'

function recordOutdated(created_at, minutesDiff) {
    const currentTime = new Date()
    const createdAtTime = new Date(created_at)
    const minutesInMs = minutesDiff * 60 * 1000

    const timeDiff = currentTime - createdAtTime
    return timeDiff >= minutesInMs
}

export async function fetchRates(req, res, next) {
    try {
        const recentRecord = await prisma.rates.findFirst({
            orderBy: {
                created_at: 'desc',
            },
        })

        if (!recentRecord) {
            throw new ApiError('No recent record', StatusCodes.NOT_FOUND)
        }

        if (!recordOutdated(recentRecord.created_at, 60)) {
            return res.status(StatusCodes.OK).json(recentRecord.record)
        }

        console.log('Fetching new record')
        const rates = await axios.get(
            API_BASE_URL + process.env.API_KEY + '/latest/USD'
        )

        if (!rates.status === StatusCodes.OK) {
            throw new ApiError(
                'Unable to fetch recent rates',
                StatusCodes.INTERNAL_SERVER_ERROR
            )
        }
        if (!rates.data.result === 'success') {
            throw new ApiError(
                'Unable to fetch recent rates',
                StatusCodes.INTERNAL_SERVER_ERROR
            )
        }

        const newRatesRecord = await prisma.rates.create({
            data: {
                record: rates.data.conversion_rates,
            },
        })
        return res.status(StatusCodes.OK).json(newRatesRecord.record)
    } catch (e) {
        next(e)
    }
}
