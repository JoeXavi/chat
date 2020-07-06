const store = require('./store')

function addEnterprise(name, description = ""){
    if(!name){
        return Promise.reject('Invalid name')
    }
    const enterprise = {
        name,
        description
    }

    return store.add(enterprise)
}

function getEnterprises(){
    return store.list()
}

function updateEnterprise(id, data){
    if(!data.name && !data.description && !data.status){
        return Promise.reject('Invalid data')
    }
    let enterprise = {
        _id:id
    }
    if(data.name)
        enterprise = {
            ...enterprise,
            name:data.name
        }
    if(data.description)
        enterprise = {
            ...enterprise,
            description: data.description
        }
    if(data.status)
        enterprise = {
            ...enterprise,
            status: data.status
        }

    return store.update(id, enterprise)
}

module.exports = {
    addEnterprise,
    getEnterprises,
    updateEnterprise
}