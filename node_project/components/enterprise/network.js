const express = require('express');
const response = require('../../network/response')
const controller = require('./controller')
const router = express.Router();

router.post('/', function (req, res) {
    controller.addEnterprise(req.body.name,req.body.description)
        .then(data =>{
            response.success(req, res, data, 201)
        })
        .catch(err=>{
            response.error(req, res, 'Internal error', 500, err)
        })
})

router.get('/', function(req,res){
    controller.getEnterprises()
        .then(data=>{
            response.success(req,res,data,200)
        })
        .catch(e=>{
            response.error(req,res,'Error inesperado',500,e)
        })
})

router.put('/:id', function (req, res) {
    
    controller.updateEnterprise(req.params.id, req.body)
        .then(data => {
            response.success(req, res, data, 200)
        })
        .catch(e => {
            response.error(req, res, 'Error interno', 500, e)
        })
})

module.exports = router