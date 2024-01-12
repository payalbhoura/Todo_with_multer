const express = require("express")
const multer = require("multer")
const db=require("./models/db")
const server = express();
const port=2000

server.use(express.static("public/"))
server.use(express.urlencoded());
server.use(express.json());
const storage = multer.diskStorage({
    destination:function(req,file,cb){
        return cb(null,"uploads/")
    },
    filename:function(req,file,cb){
        return cb(null,`todo-${Date.now}`)
    }
})
const upload =multer({storage})//instance //middle ware

const todoRoutes=require('./routes/todoRoutes')//link with the controllers and the routers
server.use("/",upload.any(),todoRoutes);//use


db.connectToDb()//promise return krega//server is started only when server is connected to db
.then((result) => {
    server.listen(port ,(err)=>{
        if(err){
            console.log(err);
            return
        }
        console.log(`server started at port :${port} successfully `)    
    })    
}).catch((err) => {
    console.log(err);
})


