const express = require('express');
const response = require('../../network/response')
const controller = require('./controller')
const router = express.Router();

router.post('/', function (req, res) {
    controller.add(req, res)
        .then(data =>{
            response.success(req, res, data, 201)
        })
        .catch(err=>{
            response.error(req, res, 'Internal error', 500, err)
        })
})




module.exports = router