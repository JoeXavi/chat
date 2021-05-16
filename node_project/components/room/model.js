const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schemaOptions = {
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
}

const mySchema = new Schema({
    users:[{
        type: Schema.Types.ObjectId,
        ref:'users'
    }],
    enterprise:{
        type: Schema.Types.ObjectId,
        ref:'enterprises'
    },
    status:{
        type: String,
        default: "Waiting"
    },
    request:{
        type: String
    }
},schemaOptions)

  const model = mongoose.model('rooms',mySchema);
  module.exports = model
