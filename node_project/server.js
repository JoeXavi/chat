const express = require('express');
const bodyParser = require('body-parser')

const response = require ('./network/response')
const routes = require('./network/routes')

const { config } = require('./config/index')
const db = require('./db')
db(config.mongo)

const app = express();

app.use(bodyParser.urlencoded({ limit: '900mb', extended: true }))
app.use(bodyParser.json({ limit: '900mb' }))

app.set('view engine', 'ejs');
app.use(express.static(__dirname +'/public'));

routes(app);

/////Chat
console.log("Test")
server = app.listen(3000)
const io = require("socket.io")(server)

io.on('connection', (socket) => {
  console.log(('New user connected'))
  socket.username = "Anonymus";
  socket.on('change_username', (data) => {
    socket.username = data.username
  })

  socket.on('new_message',(data)=>{
    io.sockets.emit('new_message',{message:data.message,username:socket.username});
  })

  socket.on('typing',(data)=>{
    socket.broadcast.emit('typing',{username:socket.username})
  })
})
