const express = require("express")
const fileUpload = require("express-fileupload")
const path = require('path')

const fileSizeLimiter = require( "./middleware/filesSizeLimiter")
const filesPayloadExists =require( "./middleware/filesPayloadExis")
const fileExtLimiter =require  ( "./middleware/fileExtLimiter")

require("./db")
const app = express();
const Port = process.env.Port || 3500;


app.get("/", (req,res) =>{
  res.sendFile(path.join(__dirname, "index.html"))
  // res.json({message: "success" , status: "ok", data: {}})
})


app.post("/upload", fileUpload({
  createParentPath : true
}),filesPayloadExists, fileExtLimiter(['.png', '.jpg','.jpeg']), fileSizeLimiter,
  (req,res,next) =>{
  const files = req.files
  console.log(files);

  Object.keys(files).forEach(key=>{
    const filepath = path.join(__dirname, 'files', files[key].name)
    files[key].mv(filepath, (err) => {
      if(err) return res.status(500).json({ status: "error" , message: err})
    })

  })

  return res.json({status: 'success', message: Object.keys(files).toString() , data : Object.keys(files)})
})

app.listen(Port , () => console.log(`Server is running on port ${Port}`))