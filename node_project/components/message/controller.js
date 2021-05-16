const store = require('./store')
const store_user = require('../user/store')
const store_enterprise = require('../enterprise/store')
const store_adviser = require('../adviser/store')
const socket = require('../../socket')
const store_room = require('../room/store')

async function add(data){
    if(!data.sender || !data.enterprise || !data.message || !data.room){
        return Promise.reject('Faltan datos')
    }
    const verId = (id)=>{return id.match(/^[0-9a-fA-F]{24}$/)}
    if (!verId(data.sender) || !verId(data.enterprise) || !verId(data.room)) {
        return Promise.resolve('Id invalido')
    }

    const user = await store_user.showById(data.sender)
    const enterprise = await store_enterprise.showById(data.enterprise)
    const room = await store_room.show(data.room) 

    if(Object.keys(user).length === 0 || Object.keys(enterprise).length === 0 || Object.keys(room).length === 0){
        return Promise.resolve('No existe empresa o agente o usuario o room')
    }
    

    const message = {
        ...data
    }

    return store.add(message)
}


function list(data){
    //return Promise.resolve(data)
    if(!data.room){
        return Promise.resolve('Faltan datos')
    }
    // if(!data.user || !data.enterprise){
    //     return Promise.resolve('Faltan datos')
    // }

    // 
    // if (!verId(data.user) || !verId(data.enterprise)) {
    //     return Promise.resolve('Id invalido')
    // }

    let verId = (id)=>{return id.match(/^[0-9a-fA-F]{24}$/)}
    if(data.room)
        if(!verId(data.room))
            return Promise.resolve('Id invalido')

    return store.list(data.user, data.enterprise, data.room, data.last)
}



function show(id){
    return store.show(id)
}



async function update(id, data){
    console.log(socket)
    return store.update(id, data)
}

module.exports = {
    add,
    list,
    update,
    show
}