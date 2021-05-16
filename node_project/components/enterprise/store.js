const Model = require ('./model');
const UIDGenerator = require('uid-generator');
const uidgen = new UIDGenerator(512, UIDGenerator.BASE62);

async function addEnterprise(enterprise){
    let toSave = {
        ...enterprise,
        token: await uidgen.generate()
    }
    const myEnterprise = new Model(toSave)
    return myEnterprise.save();   
}

async function showByToken(token){
    return Model.findOne({ token })
}

async function getEnterprises(){
    let result = await Model.find({
        status:'Active'
    });
    return result
}

async function showById(id){
    return Model.find({ _id:id })
}

async function showByDomain(domain){
    return Model.find({ domain })
}

async function update(id, enterprise){
    return new Promise(function (resolve, reject){
        Model.findOneAndUpdate(id, enterprise, {new: true},function(err, doc){
        if(err)
            reject(err)
        
        resolve(doc)
        })
    })

}

module.exports = {
    add: addEnterprise,
    list: getEnterprises,
    update: update,
    showByDomain,
    showById,
    showByToken
}

