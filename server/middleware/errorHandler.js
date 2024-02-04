import { StatusCodes } from 'http-status-codes'

function errorHandler(err, req, res, next) {
    console.log('\n=== ERROR ===\n', err.message, '\n=== ===== ===\n')
    return res.status(err.status || StatusCodes.INTERNAL_SERVER_ERROR).json({
        error: err.message || 'Internal Server Error',
    })
}

export default errorHandler
