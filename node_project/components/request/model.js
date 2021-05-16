const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schemaOptions = {
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
  }

const mySchema = new Schema({
    user:{
        type: Schema.Types.ObjectId,
        ref:'users'
    },
    text:{
        type: String,
        require: true,
    },
    enterprise:{
        type: Schema.Types.ObjectId,
        ref:'enterprises'
    },
    status:{
        type: String,
        default: "waiting"
    }
  },schemaOptions)

  const model = mongoose.model('requests',mySchema);
  module.exports = model
