const mongoose=require("mongoose")
const todoSchema=mongoose.Schema({
 foldername:String,
//  userid:String,
 files:[{
    task:String,
    status:Boolean
 }]
 })
const Todo=mongoose.model("list",todoSchema);
module.exports=Todo;


