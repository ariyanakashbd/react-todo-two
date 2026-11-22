const mongoose = require('mongoose');
const {Schema} = mongoose;

let newTodo = new Schema({
    task :{
        type: String,
        required : true,
    },
    priority :{
        type : String,
        required : true,
        enum : ['none','High','Meduim','Low'],

    },
    description : {
        type : String,
        required : true,
        default : '',
    },
    status :{
        type : String,
        required : true,
        enum : ['pending','completed'],
        default : 'pending',
    },
},{
    timestamps : true,
});

module.exports = mongoose.model('Page',newTodo);
