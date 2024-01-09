const express = require('express')
const { readFile } = require('fs')
const server = express()
const multer = require('multer')
const port = 3000
const path = require('path')
const fs = require('fs')//file system


server.use(express.urlencoded({ extended: false }));
//disk kai upr files ko kaise store krna hai fullcontro dega//storage object bnaya
//destination and filename is a callback function //destination ---kon se folder kai andr humein particular file ko store krna hai//
//req,cb --apna kaaam krne kai baad callback ko call kr do.
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        return cb(null, path.resolve("upload/"))
    },
    filename: function (req, file, cb) {
        return cb(null, `${Date.now()}`)
    },
});

const upload = multer({ storage })//instance cretae

server.get("/", (req, res) => {
    res.sendFile(path.resolve("fileupload.html"));
})


server.post("/upload", upload.single("photo"), (req, res) => {
    console.log(req.file.filename);
    // fs.readFile(path.resolve(req.file.filename), (err, data) => {
    //     if (err) {
    //         res.send(err)
    //         return
    //     }
    //     res.sendFile(data)
    // })
   // res.sendFile(path.resolve("upload/"+req.file.filename))
})


server.listen(port, (err) => {
    if (err) {
        console.log(err);
    }
    console.log(`server started at ${port} successfully`);
})

