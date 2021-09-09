const config = require('./index')

const dbConfig = {
  username: config.mongo.username,
  password: config.mongo.password,
  host: config.mongo.host,
  DB: config.mongo.db
}
module.exports = {
  dbConnect: `mongodb+srv://${dbConfig.username}:${dbConfig.password}@${dbConfig.host}/${dbConfig.DB}?retryWrites=true&w=majority`
}
