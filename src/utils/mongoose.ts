import mongoose from 'mongoose'
import { config } from '../config/config'

mongoose.set('useCreateIndex', true)
mongoose.set('useFindAndModify', false)

const bitgudMongoose = mongoose.createConnection(config.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
bitgudMongoose.once('open', function () {
  console.log('MongoDB database connection established successfully')
})

export { bitgudMongoose }
