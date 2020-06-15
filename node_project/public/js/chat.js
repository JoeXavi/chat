$(function(){
    let socket = io.connect('http://localhost:3000');

    let message = $("#btn-input")
    let username = $("#username");
    let send_message = $("#btn-chat")
    let send_username = $("#send_username")
    let chatroom = $("#chatroom")

    message.keypress(()=>{
        socket.emit('typing')
    })

    socket.on('typing',(data)=>{
        feedback.html("<p><i>"+data.username+" is typing a message..."+"</i></p>")
    })

    send_message.click(function(){
        //console.log("Click nuevo mensaje")
        socket.emit('new_message',{message:message.val()})
    })

    socket.on("new_message",(data)=>{
        //console.log(data)
        chatroom.append('<li class="left clearfix"><span class="chat-img pull-left"><img src="http://placehold.it/50/55C1E7/fff&text=U" alt="User Avatar" class="img-circle" /> </span> <div class="chat-body clearfix"> <div class="header"> <strong class="primary-font">'+data.username+'</strong> <small class="pull-right text-muted">  <span class="glyphicon glyphicon-time"></span>14 mins ago</small> </div> <p> '+data.message+' </p> </div> </li>')    })
    
    send_username.click(function(){
        //console.log(username.val())
        socket.emit('change_username',{username:username.val()})
    })


})
