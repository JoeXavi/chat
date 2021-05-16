const Model = require ('./model');
const Adviser = require('../adviser/model')


function add(data){
    const myData = new Model(data)
    return myData.save();   
}

function list(user_id, enterprise_id, room = null, last = false){
    let result = new Promise(function(resolve, reject){
        let toFind = {
            // enterprise: { _id:enterprise_id},
            // sender: {_id:user_id}
        }
        
        if(room){
            toFind = {
                ...toFind,
                room: { _id: room}
            }
        }

        if(!last){
            Model.find(toFind)
            .populate('enterprise')
            .populate('sender')      
            .exec(function(err, res){
                if(err)
                return reject(err)
        
                return resolve(res)
            });
        }   else    {
            Model.find(toFind)
            .populate('enterprise')
            .populate('sender') 
            .sort({ _id: -1 })
            .limit(1)     
            .exec(function(err, res){
                if(err)
                return reject(err)
        
                return resolve(res)
            });   
        }
    })
    return result
}



function show(id){
    return new Promise(function(resolve, reject){
        Model.find({ _id:id })
        .populate('enterprise')
        .populate('sender')
        .exec(function(err, res){
            if(err)
            return reject(err)

            return resolve(res)
        })
    })
}

function update(id, data){
    return new Promise(function (resolve, reject){
        console.log(data)
        Model.findOneAndUpdate({_id:id}, data, {new: true},function(err, doc){
        if(err)
            reject(err)
        
        resolve(doc)
        })
    })

}

module.exports = {
    add,
    list,
    update,
    show,
}

