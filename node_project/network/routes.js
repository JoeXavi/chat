
const enterprise = require('../components/enterprise/network')
const adviser = require('../components/adviser/network')
const user = require('../components/user/network')

const routes = function(server){
    server.use('/enterprise',enterprise)
    server.use('/adviser',adviser)
    server.use('/user',user)
}

module.exports = routes