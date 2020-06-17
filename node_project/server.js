console.log("Hello world Nodejs Server")

var mysql  = require('mysql');
const connection = mysql.createConnection({
  host     : 'mysql_node',
  user     : 'root',
  password : 'p0l1t3cn1c0',
  database : 'integracion_continua'
});

connection.connect(function(err) { 
  if (err) { console.error('Error connecting: ' + err.stack); return; }
  console.log("Conection MYSQL id:"+connection.threadId)
  })

const express = require('express');
const app = express();


app.set('view engine', 'ejs');

app.use(express.static(__dirname +'/public'));

app.get('/',(req, res) => {
  // res.send("Hello world<br>"+"Conection MYSQL id:"+connection.threadId);
  res.render('index')
})
console.log("Hello World con webhook 200");

server = app.listen(3000)
const io = require("socket.io")(server)
io.on('connection', (socket) => {
  console.log(('New user connected'))

  socket.username = "Anonymus";

  socket.on('change_username', (data) => {
    socket.username = data.username
  })

  socket.on('new_message',(data)=>{
    io.sockets.emit('new_message',{message:data.message,userna:socket.username});
  })

  socket.on('typing',(data)=>{
    console.log("typing")
    socket.broadcast.emit('typing',{username:socket.username})
  })
})
