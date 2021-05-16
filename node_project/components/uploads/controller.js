const uploadFile = require('./upload')

async function add(req, res){
    try{ 
        let resUpload = await uploadFile(req,res);         
        return req.file.filename       
    }
    catch (error){ 
        return error
    }
}

module.exports = {
    add
}