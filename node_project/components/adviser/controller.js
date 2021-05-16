const store = require('./store')
const store_enterprise = require('../enterprise/store')
const password = require('../../services/password')

async function add(name, email, pass, enterprise_id){
    if(!name || !email || !pass || !enterprise_id){
        return Promise.resolve('Faltan datos')
    }
    if (!enterprise_id.match(/^[0-9a-fA-F]{24}$/)) {
        return Promise.resolve('Id invalido')
    }
    let enterprise = await store_enterprise.showById(enterprise_id)
    
    if(Object.keys(enterprise).length === 0)
        return Promise.resolve('No existe empresa')
    
    let user = await store.showbyEmail(email)
    if(Object.keys(user).length !== 0)
        return Promise.resolve('Usuario ya existe')
    
    pw = await password.crypt(pass)
    const data = {
        name,
        email,
        password:pw,
        enterprise:enterprise_id
    }
    //return data
    return store.add(data)
}

function list(){
    return store.list()
}

function show(id){
    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
        return Promise.resolve('Id invalido')
    }
    return store.show(id)
}

async function update(id, data){
    let datatmp = {
        _id:id,
        ...data
    }
    
    if(data.password){
        let pw = await password.crypt(data.password)
        datatmp = {
            ...datatmp,
            password: pw     
        }
    }
    let res = await store.update(id, datatmp)
    
    return res ? res : {}
}

module.exports = {
    add,
    list,
    update,
    show
}