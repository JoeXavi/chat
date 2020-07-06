var express = require('express');
var router = express.Router();

var company = require('../controllers/company.js');

router.get('/', company.list);

module.exports = router;