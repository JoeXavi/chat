const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const mySchema = new Schema({
    adviser:[{
        type: Schema.Types.ObjectId,
        ref:'advisers'
    }],
    adviser:[{
        type: Schema.Types.ObjectId,
        ref:'users'
    }],
    message:{
        type: String,
        required: true
    },
    enterprise:[{
        type: Schema.Types.ObjectId,
        ref:'enterprises'
    }],
    date_time: {
        type: Date,
        default: new Date
    },
  })

  const model = mongoose.model('messages',mySchema);
  module.exports = model
