const store = require('./store')

async function add(name, email, enterprise){
    if(!name || !email  || !enterprise){
        return Promise.reject('Faltan datos')
    }

    const data = {
        name,
        email,
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

    return store.update(id, data)
}

module.exports = {
    add,
    list,
    update,
    show
}