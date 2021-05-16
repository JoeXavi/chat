<template>
    <div>
    </div>
</template>
<script>
    import Vue from 'vue'
    import VueSocketIOExt from 'vue-socket.io-extended';
    import SocketIO from "socket.io-client"
    const socket = SocketIO(process.env.VUE_APP_URL_SOCKET+"/test")
    Vue.use(VueSocketIOExt, socket);

export default {
    name:"socket",
    sockets: {
        connect: function(){
        console.log('Conected')
        this.$emit("socket-connect")
        },
        message: function (data) {
        console.log("Message",data)
        this.$emit("socket-message",data)
        }
    },
    methods: {
        sendMessage(message){
            this.$socket.emit("message", message)
        }
    }
}
</script>