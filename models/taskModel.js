const mongoose=require('mongoose')
const { Schema } = mongoose;
const checklistItemSchema = new mongoose.Schema({
    description: {
      type: String,
      required: true,
    },
    completed: {
      type: Boolean,
      default: false,
    },
  });
const taskModel=new Schema({
    title:{
        type:String,
        required:true
    },
    
    priority:{
        type: String,
        enum: ['High', 'Moderate', 'Low'],
        required: true,
    },
    createdBy: {
      type:mongoose.Schema.ObjectId,
      ref: 'User',
      required: true,
  },
    date: {
        type: Date,
        required: true,
      },
 
    checkList:[checklistItemSchema],
    backlog:{
      type:[]
    },
    progress:{
      type:[]
    },
    todo:{
      type:[]
    },
    done:{
      type:[]
    },
      
    createdAt:{
        type:Date,
        default:Date.now
    }
}, { collection: 'Task', database: 'TaskManager' })

module.exports=mongoose.model('Task',taskModel)