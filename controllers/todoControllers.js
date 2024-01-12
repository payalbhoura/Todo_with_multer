const Todo = require("../models/todos.js");

function getTodos(req,res){
   Todo.find({})
   .then((result) => {
      res.json(result)
      
   }).catch((err) => {
      req.status(500).send(err);
   });
}

function makeTodo(req,res){//todocreate
    const task=req.body.task;
    const  fid=req.body.fid;
    console.log(task,fid);
    Todo.updateOne({_id:fid},
      {'$push':{files:{task:task,status:false}}},
      {new:true})
    .then((result) => {
         console.log(result);
      }).catch((err) => {
         console.log(err);
      });   
   }
  

function addfolder(req,res){
   const todofolder = req.body.todofolder
   console.log( todofolder );
   Todo.create({
         foldername:todofolder,
         files:[]

   }).then((result) => {
      console.log(result);
      res.json(result)

      
   }).catch((err) => {
       console.log(err);
       res.status(500).end(err)      
   });
}

function deleteTodo(req,res){

}

function markTodo(req,res){
   console.log(req.query);
   const id = req.query.todo;
   Todo.updateOne({"files._id":id},{"$set":{"files.status":true}})
   .then((result) => {
      console.log(result);  
   }).catch((err) => {
      console.log(err);
   });//mongoose fucntion
 }

function editTodo(req,res){

}

function loadLoginPage(req,res){
 
}

function loadSignupPage(req,res){


}
function postlogin(req,res){

}
function postsignup(req,res){

}



    module.exports={
    addfolder,getTodos,makeTodo,deleteTodo,editTodo,markTodo,loadLoginPage,loadSignupPage,postlogin,postsignup
}