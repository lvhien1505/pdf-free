const multer=require("multer");
const path=require("path");
const {checkFileType} = require("./checkDir")

const storageBook = multer.diskStorage({
    destination: path.join(__dirname,"../../public/uploads/books"),
    filename: function(req, file, cb) {
        cb(null, "upload" + path.extname(file.originalname))
    }
})

const uploadBook= multer({
    storage: storageBook,
    limits: { fileSize: 1000000 },
    fileFilter: function(req, file, cb) {
        checkFileType(file, cb);
    }
}).single('file')

const storageCourse = multer.diskStorage({
    destination: path.join(__dirname,"../../public/uploads/courses"),
    filename: function(req, file, cb) {
        cb(null, "upload" + path.extname(file.originalname))
    }
})

const uploadCourse= multer({
    storage: storageCourse,
    limits: { fileSize: 1000000 },
    fileFilter: function(req, file, cb) {
        checkFileType(file, cb);
    }
}).single('file')

module.exports={
    uploadBook,
    uploadCourse
};
