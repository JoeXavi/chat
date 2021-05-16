const socketIO = require('socket.io')
const user = require('./components/user/store')
const adviser = require('./components/adviser/store')

const socket = {}
let users = []

function connect(server){
    io = socketIO(server);
    const workspaces = io.of(/^\/\w+$/);
   
    workspaces.on('connection', socket => {
        const workspace = socket.nsp;
        console.log('New user connected to workspace: ', workspace.name)
        
        socket.on("knownuser",async (data)=>{
            //console.log("known user data", data)
            console.log(ifIssetAnotherRoom(data))

            users.push({
                ...data.room,
                socket_id: socket.id,
                status: "waiting"
            })

            socket.join(`${workspace.name}_${data.user.role}`)
            if(data.user.role === "Client"){
                const usersWaiting = users.filter(user => user.status === "waiting")
                io.in(`${workspace.name}_Adviser`).emit('New Client',usersWaiting)
            }
            
            if(data.role === 'Adviser'){

            }
                console.log("Clients: ", users)
        })

        socket.emit('message',JSON.stringify({ author: 'Support', type: 'text', data: { text:"Welcome", status: "Waiting" } }));
        
        socket.on('message',(data)=>{
            console.log("new Message",data)
            socket.emit('message',JSON.stringify({ author: 'Support', type: 'text', data: { text:"recibí un mensaje" } }));
            //socket.broadcast.emit('message',{ author: 'Support', type: 'text', data: { text:"recibí un mensaje" } });
        })

        socket.on('disconnect', () => {
            console.log(`Socker disconnected ${socket.id}`)
            let userDisconnected = users.filter(user => {
                return (user.socket_id === socket.id)
            })
            users = users.filter(user => {
                return (user.socket_id !== socket.id)
            })
            
            io.in(`${workspace.name}_Adviser`).emit('Client disconnected')
            //io.emit('status-front',clients)
          })
    });
    
};

function ifIssetAnotherRoom(data){
    return users.findIndex(item=> item.users.includes(data.user._id) === true)
}

module.exports = {
    socket,
    connect,
    users
}