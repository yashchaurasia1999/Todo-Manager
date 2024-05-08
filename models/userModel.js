const mongoose=require('mongoose')
const { Schema } = mongoose;

const userModel=new Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    confirmPassword:{
        type:String,
        required:true
    },
    createdAt:{
        type:Date,
        default:Date.now
    }
}, { collection: 'User', database: 'TaskManager' })

module.exports=mongoose.model('User',userModel)