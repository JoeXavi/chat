const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const mySchema = new Schema({
    name: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true,
      unique: true
    },
    password: String,
    status: {
      type: String,
      default: 'Active'
    },
    enterprise:{
      type: Schema.Types.ObjectId,
      ref:'enterprises'
    },
  })

  const model = mongoose.model('adviser',mySchema);
  module.exports = model
