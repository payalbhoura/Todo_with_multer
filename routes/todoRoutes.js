const express=require("express")
const todoRoutes = express();
const path=require('path');
const { getTodos, makeTodo, markTodo, deleteTodo, editTodo, loadLoginPage, postlogin, loadSignupPage, postsignup, addfolder }=require("../controllers/todoControllers")

todoRoutes.get("/",(req,res)=>{
  res.sendFile(path.join(__dirname,"..","views/home.html"))
})
todoRoutes.post("/todofolder",addfolder)

todoRoutes.route("/todofile")
.get(getTodos)
.post(makeTodo)
.patch(markTodo)
.delete(deleteTodo)
.put(editTodo)

todoRoutes.route("/login")
.get(loadLoginPage)
.post(postlogin)

todoRoutes.route("/signup")
.get(loadSignupPage)
.post(postsignup)


module.exports=todoRoutes