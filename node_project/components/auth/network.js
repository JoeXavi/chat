const express = require('express');
const response = require('../../network/response')
const controller = require('./controller')
const router = express.Router();

router.post('/', function (req, res) {
    controller.identification(req.body)
        .then(data =>{
            response.success(req, res, data, 200)
        })
        .catch(err=>{
            response.error(req, res, 'Internal error', 500, err)
        })
})

module.exports = router