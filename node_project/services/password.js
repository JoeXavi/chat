const bcrypt = require('bcrypt');

function crypt(password) {
    return new Promise (function(resolve, reject ){
        bcrypt.genSalt(10, function(err, salt) {
            if (err) 
              return reject(err);
        
            bcrypt.hash(password, salt, function(err, hash) {
                if (err) 
                    return reject(err);
                
                return resolve(hash)
            });
        });
    })
   
};

function compare (plainPass, hashword) {
    return new Promise(function(resolve, reject){
        bcrypt.compare(plainPass, hashword, function(err, isPasswordMatch) {   
            return err == null ?
                resolve(isPasswordMatch) :
                reject(err);
        });
    })  
};

module.exports = {
    crypt,
    compare
}