const ErrorResponse = require('../utils/errorResponse')
const logger = require('nirmitee-logger')

const errorHandler = (err, req, res, next) => {
  let error = { ...err }

  error.message = err.message

  // Log to console for dev
  logger.error({ message: 'Inside error handler', ...error })

  // Mongoose bad ObjectId
  if (err.name === 'CastError') {
    const message = `Resource not found`
    error = new ErrorResponse(message, 404)
  }

  // Mongoose duplicate key
  if (err.code === 11000) {
    const message = 'Duplicate field value entered'
    error = new ErrorResponse(message, 400)
  }

  // Mongoose validation error
  if (err.name === 'ValidationError') {
    const message = Object.values(err.errors).map(val => val.message)
    error = new ErrorResponse(message, 400)
  }
  logger.error({
    success: false,
    error: error.message || 'Server Error'
  })
  res.status(error.statusCode || 500).json({
    success: false,
    error: error.message || 'Server Error'
  })
}

module.exports = errorHandler
