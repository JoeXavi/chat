const path = require('path')

const _envFilePath = (process.env.NODE_ENV == 'development' ? '.env.development' : '.env')

require('dotenv').config(
    {
      path: path.join(__dirname, `../${_envFilePath}`)
    }
)

const config = {
    mongo:process.env.MONGO_CONECTION
}

module.exports = { config }

