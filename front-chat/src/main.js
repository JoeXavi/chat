import Vue from 'vue'
import App from './App.vue'
//import Chat from 'vue-beautiful-chat'
//import VueSocketIOExt from 'vue-socket.io-extended';
import { BootstrapVue, IconsPlugin, BootstrapVueIcons } from 'bootstrap-vue'
import VTooltip from 'v-tooltip'
import 'bootstrap-vue/dist/bootstrap-vue-icons.min.css'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

import axios from 'axios'
import VueAxios from 'vue-axios'
 
Vue.use(VueAxios, axios)

Vue.use(VTooltip)

//const options = { path: "/test"}; //Options object to pass into SocketIO


//Vue.use(Chat)
Vue.config.productionTip = false


Vue.use(BootstrapVue)
Vue.use(IconsPlugin)
Vue.use(BootstrapVueIcons)

new Vue({
  render: h => h(App),
}).$mount('#app')
