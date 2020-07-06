const express = require('express')
const enterprise = require('../components/enterprise/network')
const adviser = require('../components/adviser/network')

const routes = function(server){
    server.use('/enterprise',enterprise)
    server.use('/adviser',adviser)
}

module.exports = routes