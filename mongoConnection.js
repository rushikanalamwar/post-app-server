const mongoose = require('mongoose')
// const redis = require('./redis/redis')

const config = require('./app/config/db.config')
mongoose.Promise = global.Promise
let isConnected

module.exports = connectToDatabase = () => {
  if (isConnected) {
    console.log('=> using existing database connection')
    return Promise.resolve()
  }

  console.log('=> using new database connection')
  return mongoose
    .connect(config.dbConnect, {
      bufferCommands: false,
      bufferMaxEntries: 0,
      keepAlive: true,
      useCreateIndex: true,
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: true
    })
    .then(db => {
      isConnected = db.connections[0].readyState
    })
}
