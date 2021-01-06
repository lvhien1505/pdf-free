const {uploadBook,uploadCourse} = require("./upload");
const path = require('path')
const {UPLOAD_FAILED,NO_FILE_SELECT} =require("../../utils/notify")

const createImageBook=(req,res)=>{
    return uploadBook(req,res,async (err)=>{
     if (err) res.status(500).json(UPLOAD_FAILED);
     if (req.file === undefined) res.status(400).json(NO_FILE_SELECT);
     return res.status(200).json({
         error: false,
         name: req.file.filename,
         message: "File uploaded!",
         status: "done",
         url: path.join(__dirname, '../../public/uploads/books', req.file.filename)
    })
 })
}

const createImageCourse=(req,res)=>{
    return uploadCourse(req,res,async (err)=>{
     if (err) res.status(500).json(UPLOAD_FAILED);
     if (req.file === undefined) res.status(400).json(NO_FILE_SELECT);
     return res.status(200).json({
         error: false,
         name: req.file.filename,
         message: "File uploaded!",
         status: "done",
         url: path.join(__dirname, '../../public/uploads/courses', req.file.filename)
    })
 })
}


module.exports = {
    createImageBook,
    createImageCourse
};