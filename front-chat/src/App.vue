<template>
  <div id="app">
   <beautifulChat
      :participants="participants"
      :titleImageUrl="titleImageUrl"
      :onMessageWasSent="onMessageWasSent"
      :messageList="messageList"
      :newMessagesCount="newMessagesCount"
      :isOpen="isChatOpen"
      :close="closeChat"
      :icons="icons"
      :open="openChat"
      :showEmoji="true"
      :showFile="true"
      :showEdition="true"
      :showDeletion="true"
      :showTypingIndicator="showTypingIndicator"
      :showLauncher="true"
      :showCloseButton="true"
      :colors="colors"
      :alwaysScrollToBottom="alwaysScrollToBottom"
      :messageStyling="messageStyling"
      :token="token"
      @registered="onRegistered"
      @onType="handleOnType"
      @edit="editMessage" />
  </div>
</template>

<script>
import beautifulChat from './components/chat/Launcher'
import CloseIcon from 'vue-beautiful-chat/src/assets/close-icon.png'
import OpenIcon from 'vue-beautiful-chat/src/assets/logo-no-bg.svg'
import FileIcon from 'vue-beautiful-chat/src/assets/file.svg'
import CloseIconSvg from 'vue-beautiful-chat/src/assets/close.svg'
import connect from './socket'

export default {
  name: 'app',
  components:{
    beautifulChat,
  },
  data() {
    return {
      waiting:true,
      socket: {
        on:()=>{}
      },
      toke:"",
      enterprise:"",
      room:{},
      icons:{
        open:{
          img: OpenIcon,
          name: 'default',
        },
        close:{
          img: CloseIcon,
          name: 'default',
        },
        file:{
          img: FileIcon,
          name: 'default',
        },
        closeSvg:{
          img: CloseIconSvg,
          name: 'default',
        },
      },
      user:{},
      participants: [
        // {
        //   id: '0',
        //   name: 'Matteo',
        //   imageUrl: 'https://avatars3.githubusercontent.com/u/1915989?s=230&v=4'
        // },
      ], // the list of all the participant of the conversation. `name` is the user name, `id` is used to establish the author of a message, `imageUrl` is supposed to be the user avatar.
      titleImageUrl: 'https://a.slack-edge.com/66f9/img/avatars-teams/ava_0001-34.png',
      messageList: [
          /*{ type: 'text', author: `me`, data: { text: `Say yes!` } },
          */
      ], // the list of the messages to show, can be paginated and adjusted dynamically
      newMessagesCount: 0,
      isChatOpen: false, // to determine whether the chat window should be open or closed
      showTypingIndicator: '', // when set to a value matching the participant.id it shows the typing indicator for the specific user
      colors: {
        header: {
          bg: '#4e8cff',
          text: '#ffffff'
        },
        launcher: {
          bg: '#4e8cff'
        },
        messageList: {
          bg: '#ffffff'
        },
        sentMessage: {
          bg: '#4e8cff',
          text: '#ffffff'
        },
        receivedMessage: {
          bg: '#eaeaea',
          text: '#222222'
        },
        userInput: {
          bg: '#f4f7f9',
          text: '#565867'
        }
      }, // specifies the color scheme for the component
      alwaysScrollToBottom: false, // when set to true always scrolls the chat to the bottom when new events are in (new message, user starts typing...)
      messageStyling: true // enables *bold* /emph/ _underline_ and such (more info at github.com/mattezza/msgdown)
    }
  },
  created() {
    this.token = this.getMeta("token-chat")
    this.enterprise = this.getMeta("enterprise-chat")
    this.axios.defaults.baseURL = process.env.VUE_APP_BASE_URL

  },
  beforeDestroy() {
    if(this.socket.emit)
      this.socket.emit('disconnect',{"message":"desconnect"})
  },
  methods: {
    getMeta(metaName) {
      const metas = document.getElementsByTagName('meta');
      for (let i = 0; i < metas.length; i++) {
        if (metas[i].getAttribute('name') === metaName) {
          return metas[i].getAttribute('content');
        }
      }
      return '';
    },
    async onRegistered(data){
      
      this.user = data.user
      this.room = data.room
      this.socket = connect(`${process.env.VUE_APP_URL_SOCKET}/${data.room.enterprise}`)
      this.socket.on('connect',()=>{
        this.socket.emit('knownuser',data)
      })
      
      this.socket.on('message',(data)=>{
        if(data.status === "with-Adviser")
          this.waiting = false

        this.receivedMessage(data)
      })
    },
    receivedMessage(message){
      const int_message = JSON.parse(message)
      
      if(int_message.author === "Support"){
        console.log(this.participants.findIndex(participant => participant.name === "Support"))
        if(this.participants.findIndex(participant => participant.name === "Support") === -1){
          this.participants.push({
            id: '0',
            name: 'Support',
            imageUrl: 'https://avatars3.githubusercontent.com/u/1915989?s=230&v=4'
          })
        }
      }
      console.log(this.participants)
      this.messageList.push(int_message)
    },
    sendMessage (text) {

      if (text.length > 0) {
        this.newMessagesCount = this.isChatOpen ? this.newMessagesCount : this.newMessagesCount++
        //this.onMessageWasSent({ author: 'me', type: 'text', data: { text } })
      }
    },
    onMessageWasSent (message) {
      // called when the user sends a message

      console.log("Message:",message)
      let toCreate = {
				sender: this.user._id,
				message:{
					type:"text",
					data: message.data
				},
				room: this.room._id,
				enterprise: this.enterprise,
			}

      if(message.type == "file")
        toCreate = {
          ...toCreate,
          message:{
            type:"file",
            data:"",
            file:{
              size:message.data.file.size,
              type:message.data.file.type
            }
          }
        }

      if(!this.waiting){
        this.messageList = [ ...this.messageList, message ]
        this.axios.post(`/message`, toCreate, {
          headers: {'Authorization': this.token }
        }).then(result => {
            if(result.data.body === "Faltan datos" || result.data.body === "Id invalido" || result.data.body === "No existe empresa"){
                this.errors.show = true,
                this.errors.data = "Registro incorrecto de datos - comunicar a soporte tecnico"
            }   else    {
                this.$emit("registered",result)
                this.uploadFile({ file:message.data.file, messageId:result.data.body._id})
            }      
        }).catch(e => {
            console.log(e)
        })
      } else  {
        //console.log("Waiting - Adviser")
        this.messageList = [ ...this.messageList, { type: 'text', author: `me`, data: { text: `Waiting Adviser` }} ]
      }
      // this.socket.emit('message',{message},(res)=>{
      //   console.log("Send message: ", res)
      // })
      
    },
    async uploadFile({ file, messageId }) {
			console.log("file: ",file)
			let final_form = new FormData()
        final_form.append('file', file)

			const res = await this.axios.post(`/upload`,final_form, 
				{
					headers: {
						'Content-Type': 'multipart/form-data',
            headers: {'Authorization': this.token }
					},
					onUploadProgress: function( progressEvent ) { 
						this.uploadPercentTotal( parseInt( Math.round( ( progressEvent.loaded / progressEvent.total ) * 100 ) )) 
						}.bind(this)
					}
				)
			//const url = await uploadFileRef.getDownloadURL()
			console.log(res.data)
			await this.axios.put(`/message/${messageId}`,{
				"message.data" : res.data.body	
			})
			
		},
    openChat () {
      // called when the user clicks on the fab button to open the chat
      this.isChatOpen = true
      this.newMessagesCount = 0
    },
    closeChat () {
      // called when the user clicks on the botton to close the chat
      this.isChatOpen = false
    },
    handleScrollToTop () {
      // called when the user scrolls message list to top
      // leverage pagination for loading another page of messages
    },
    handleOnType () {
      console.log('Emit typing event')
    },
    editMessage(message){
      const m = this.messageList.find(m=>m.id === message.id);
      m.isEdited = true;
      m.data.text = message.data.text;
    }
}
}
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
