const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schemaOptions = {
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },  
  }

const file = new Schema({
    size: String,
    type: String,
    audio: String,
    duration: String
},
{ _id : false })

const replyMessage = new Schema({
    message_id: Schema.Types.ObjectId,
    sender_id: Schema.Types.ObjectId,
    
},
{ _id : false })

const mySchema = new Schema({
    room:{
        type: Schema.Types.ObjectId,
        ref: 'rooms'
    },
    sender:{
        type: Schema.Types.ObjectId,
        ref: 'users'
    },
    message:{
        type: {
            type: String,
        },
        data:{
            type: String,
        },
        file: file,
        replyMessage: replyMessage
    },
    
    status:{
        type: String,
        require: true,
        default: 'saved'
    },
    enterprise:{
        type: Schema.Types.ObjectId,
        ref:'enterprises'
    },
  },schemaOptions)


  const model = mongoose.model('messages',mySchema);
  module.exports = model
