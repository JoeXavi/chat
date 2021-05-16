const express = require('express')

const enterprise = require('../components/enterprise/network')
const adviser = require('../components/adviser/network')
const message = require('../components/message/network')
const user = require('../components/user/network')
const auth = require('../components/auth/network')
const request = require('../components/request/network')
const room = require('../components/room/network')
const upload = require('../components/uploads/network')

const routes = function(server){

    server.use('/static', express.static('uploads'));

    server.use('/enterprise',enterprise)
    server.use('/adviser',adviser)
    server.use('/message',message)
    server.use('/user',user)
    server.use('/identification', auth)
    server.use('/request', request)
    server.use('/room', room)
    server.use('/upload',upload)
}

module.exports = routes