const mongoose = require('mongoose');

  
mongoose.Promise = global.Promise

async function connect(url){
   await mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false  })
   .then(data=>{
       console.log('Conexion realizada')
   })
   .catch(error => console.log(error)); 
    
}

module.exports = connect;