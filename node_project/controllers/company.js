var db = require('../requires/mysqlquerys');
var company = {}

company.list = function(req,res){
    db.executeQuery("select * from company",function(error,data){
        if(error===true)
            res.status(500).json({"error":data})
        else
            res.status(200).json({"data":data})
    });
    
    
}

module.exports = company