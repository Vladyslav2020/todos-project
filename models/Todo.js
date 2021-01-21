const { Schema, model, Types } = require('mongoose');

const Todo = new Schema({
    text: {
        type: String,
        required: true
    },
    date: {
        type: Number,
        required: true
    },
    completed:{
        type: Boolean,
        default: false
    },
    id: {
        type: Types.ObjectId,
        required: true,
        ref: 'User'
    }
});

module.exports = model('Todo', Todo);