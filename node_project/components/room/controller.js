const store = require('./store')
const store_user = require('../user/store')
const store_enterprise = require('../enterprise/store')
const socket = require('../../socket')


async function add(data){
    if(!data.user || !data.enterprise || !data.request){
        return Promise.resolve('Faltan datos')
    }
    const verId = (id)=>{return id.match(/^[0-9a-fA-F]{24}$/)}
    if (!verId(data.user) || !verId(data.enterprise)) {
        return Promise.resolve('Id invalido')
    }

    const user = await store_user.showById(data.user)
    const enterprise = await store_enterprise.showById(data.enterprise)
        
    if(Object.keys(user).length === 0 || Object.keys(enterprise).length === 0){
        return Promise.resolve('No existe empresa o agente o usuario')
    }
    

    const message = {
        users: data.user,
        enterprise: data.enterprise,
        request: data.request,
    }

    return store.add(message)
}

function list(data){
    //return Promise.resolve(data)
    if(!data.user || !data.enterprise){
        return Promise.resolve('Faltan datos')
    }
    let verId = (id)=>{return id.match(/^[0-9a-fA-F]{24}$/)}
    if (!verId(data.user) || !verId(data.enterprise)) {
        return Promise.resolve('Id invalido')
    }

    //console.log(data.user)
    const toSearch = {
        $or:
            [{ $and : [{users: { _id : data.user }, enterprise: { _id : data.enterprise}, status: "Active"}]},
            {$and : [{status: "Waiting" , enterprise: { _id : data.enterprise}}]}]
    }
    return store.list(toSearch)
}

function show(id){
    return store.show(id)
}

async function update(id, data){
    
    return store.update(id, data)
}

module.exports = {
    add,
    list,
    update,
    show
}