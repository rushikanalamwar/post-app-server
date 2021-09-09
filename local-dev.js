const dotenv = require('dotenv')
dotenv.config({ path: 'app/config/.env' })
const config = require('./app/config')
const app = require('./server')
const dbConfig = require('./app/config/db.config')
const db = require('./app/models')
const logger = require('nirmitee-logger')

db.mongoose
  .connect(dbConfig.dbConnect, {
    bufferCommands: false,
    bufferMaxEntries: 0,
    keepAlive: true,
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: true,
  })
  .then(() => {
    logger.info({
      message: 'Successfully connect to MongoDB.',
    })
  })
  .catch((err) => {
    logger.error({
      message: 'Connection error',
      ...err,
    })
    process.exit()
  })
//set port, listen for requests
const PORT = process.env.PORT || 8080
app.listen(PORT, () => {
  logger.info({
    message: `Local Server is running on port ${PORT}.`,
  })
})
