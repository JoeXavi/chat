'use strict';

const fs = require('fs');
const path = require('path');
const mongoose = require('mongoose');
const basename = path.basename(__filename);
const db = {};

mongoose.connect('mongodb+srv://dbUser:dbUserMongodb@cluster0-sojmf.mongodb.net/multiEnterpriseChat?retryWrites=true&w=majority', {userNewUrlParser: true})
.catch(error => console.log(error));
console.log(mongoose)

fs
  .readdirSync(__dirname)
  .filter(file => {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
  })
  .forEach(file => {
    const model = sequelize['import'](path.join(__dirname, file));
    db[model.name] = model;
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);    
  }
});

module.exports = db;
