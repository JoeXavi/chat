const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const mySchema = new Schema({
    name: {
      type: String,
      required: true
    },
    domain:{
      type: String,
      unique:true,
      index:true,
      sparse:true
    },
    token:{
      type: String,
      unique:true,
      index:true,
      sparse:true
    },
    description: String,
    status: {
      type: String,
      default: 'Active'
    }
  })

  const model = mongoose.model('enterprises',mySchema);
  module.exports = model
