const store = require('./store')
const store_enterprise = require('../enterprise/store')
const store_user = require('../user/store')

async function add(data){
    if(!data.user || !data.text  || !data.enterprise){
        return Promise.resolve('missing data')
    }
    if (!data.enterprise.match(/^[0-9a-fA-F]{24}$/) && !data.user.match(/^[0-9a-fA-F]{24}$/)) {
        return Promise.resolve('invalid id - user or enterprise')
    }
    let enterprise = await store_enterprise.showById(data.enterprise)
    let user = await store_user.showById(data.user)

    if(Object.keys(enterprise).length === 0 || Object.keys(user).length === 0)
        return Promise.resolve("not exist enterprise or user")
    
    const toCreate = {
        ...data
    }

    return store.add(toCreate)
}

function list(data){
    if(!data.enterprise){
        return Promise.resolve('missing enterprise')
    }
    let verId = (id) => {return id.match(/^[0-9a-fA-F]{24}$/)}
    if (!verId(data.enterprise)) {
        return Promise.resolve('invalid id')
    }
    let toSearch = {
        enterprise: { _id : data.enterprise }
    }

    if(data.user){
        if (!verId(data.user)) {
            return Promise.resolve('invalid id')
        }

        toSearch = {
            user: { _id : data.user }
        }
    }

    
    return store.list(toSearch)
}

function show(id){
    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
        return Promise.resolve('invalid id')
    }
    return store.showById(id)
}

async function update(id, data){
    let res = await store.update(id, data)
    return res ? res : {}
}

module.exports = {
    add,
    list,
    update,
    show
}