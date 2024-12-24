const mongoose= require('mongoose');

const Schema= mongoose.Schema;

const todoSchema= new Schema({
    title : {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    dueDate: {
        type: String,
        required: true
    },
    status:{
        type: String,
        default: "pending"
    },
    creator: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    reminderSent: {
        type: Boolean,
        default: false
    }
}, {timestamps: true})

module.exports= mongoose.model('Todo',todoSchema);