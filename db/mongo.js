import mongoose from 'mongoose'
import { MONGO_URL } from '../common/config'

async function connectMongoDB (logger) {
  await mongoose.connect(
    MONGO_URL,
    { useNewUrlParser: true }
  )
  logger.info('Connect to MongoDB success')
}

module.exports = connectMongoDB
