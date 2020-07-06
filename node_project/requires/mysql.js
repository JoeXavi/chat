var mysql  = require('mysql')
const pool = mysql.createPool({
    host     : 'mysql_node',
    user     : 'root',
    password : 'p0l1t3cn1c0',
    database : 'integracion_continua'
  });
module.exports = pool;
