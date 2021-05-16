const store = require('./store')

async function addEnterprise(domain, name, description = ""){
    if(!name){
        return Promise.resolve('Invalid name')
    }

    let enterprise = await store.showByDomain(domain)

    //return Object.keys(enterprise).length
    if(Object.keys(enterprise).length !== 0)
        return Promise.resolve('Dominio ya asociado') 
    
    enterprise = {
        name,
        description,
        domain
    }
    return store.add(enterprise)
}

function getEnterprises(){
    return store.list()
}

function getEnterprise(id){
    
    return store.showById(id)
}  

function updateEnterprise(id, data){
    let enterprise = {
        ...data
    }
    //return enterprise;
    return store.update(id, enterprise)
}

module.exports = {
    addEnterprise,
    getEnterprises,
    updateEnterprise,
    getEnterprise
}