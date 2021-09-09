const awsServerlessExpress = require('aws-serverless-express')
const connectToDatabase = require('./mongoConnection')

const app = require('./server')
const logger = require('nirmitee-logger')

const server = awsServerlessExpress.createServer(app)
exports.handler = (event, context) => {
  context.callbackWaitsForEmptyEventLoop = false
  connectToDatabase()
    .then(db => {
      awsServerlessExpress.proxy(server, event, context)
    })
    .catch(err => {
      logger.error({ message: 'Mongo Error', ...err })
    })
}
