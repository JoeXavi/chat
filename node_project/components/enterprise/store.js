const Model = require ('./model');

function addEnterprise(enterprise){
    const myEnterprise = new Model(enterprise)
    return myEnterprise.save();   
}


async function getEnterprises(){
    let result = await Model.find({
        status:'Active'
    });
    return result
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
    update: update
}

