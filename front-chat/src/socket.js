import SocketIO from "socket.io-client"

function connect (url = ""){
    if(url !== ""){
        const socket = SocketIO(url)
        return socket
        }
}

export default connect

