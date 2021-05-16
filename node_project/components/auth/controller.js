const store = require('../enterprise/store')

async function identification(data){
    if(!data.token){
        return Promise.resolve('Invalid data')
    }

    return store.showByToken(data.token)
}

module.exports = {
    identification
}