const store = require('./store')
const password = require('../../services/password')



async function add(name, email, pass, enterprise){
    if(!name || !email || !pass || !enterprise){
        return Promise.reject('Faltan datos')
    }
    pw = await password.crypt(pass)
    const data = {
        name,
        email,
        password:pw,
        enterprise
    }

    return store.add(data)
}

function list(){
    return store.list()
}

function show(id){
    return store.show(id)
}

async function update(id, data){
    let datatmp = {
        _id:id
    }
    if(data.name)
        datatmp = {
            ...datatmp,
            name:data.name
        }
    if(data.email)
        datatmp = {
            ...datatmp,
            email: data.email
        }
    if(data.status)
        datatmp = {
            ...datatmp,
            status: data.status
        }
    
    if(data.password){
        let pw = await password.crypt(data.password)
        datatmp = {
            ...datatmp,
            password: pw
            
        }}

    return store.update(id, datatmp)
}

module.exports = {
    add,
    list,
    update,
    show
}