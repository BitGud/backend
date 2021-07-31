import dotenv from 'dotenv'

dotenv.config()

const config = {
  PORT: process.env.PORT || 4000,
}

export { config }
