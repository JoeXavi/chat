var mysql  = require('mysql');
var connection = mysql.createConnection({
  host     : 'mysql_node',
  user     : 'root',
  password : 'p0l1t3cn1c0',
  database : 'integracion_continua'
});
console.log("Hello world")
connection.connect(function(err) { if (err) { console.error('Error connecting: ' + err.stack); return; } console.log('Connected as id ' + connection.threadId); });

