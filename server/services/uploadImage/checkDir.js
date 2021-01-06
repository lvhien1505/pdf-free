const fs = require("fs");
const path = require("path");

const dir = {
  urlIndex: "public/uploads",
  urlBook: "public/uploads/books",
  urlCourse: "public/uploads/courses",
};

const checkDir = () => {
  const dirIndex = path.join(__dirname, `../../${dir.urlIndex}`);
  const dirBook = path.join(__dirname, `../../${dir.urlBook}`);
  const dirCourse = path.join(__dirname, `../../${dir.urlCourse}`);
  if (!fs.existsSync(dirIndex)) {
    fs.mkdirSync(dirIndex, { recursive: true });
  }
  if (!fs.existsSync(dirBook)) {
    fs.mkdirSync(dirBook, { recursive: true });
  }
  if (!fs.existsSync(dirCourse)) {
    fs.mkdirSync(dirCourse, { recursive: true });
  }
  return;
};

const checkFileType = (file, cb) => {
  const filetypes = /jpeg|jpg|png/;
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = filetypes.test(file.mimetype);

  if (extname && mimetype) {
    return cb(null, true);
  } else {
    cb("Error: Image Only!");
  }
};

const clearImageOld = (path, file) => {
  if (file) {
    return fs.unlinkSync(`${path}/${file}`);
  }
};

const reNameImageBook = (id) => {
  var url = "";
  var fileOld = "";
  var status = false;
  var count = 0;
  const dirBook = path.join(__dirname, `../../${dir.urlBook}`);
  const files = fs.readdirSync(dirBook);
  files.forEach((file) => {
    if (file.split(".")[0] === id) {
      fileOld = file;
    }
    if (file.split(".")[0] === "upload") {
      let changeUrl = `${dirBook}/${id}.${file.split(".")[1]}`;
      fs.renameSync(`${dirBook}/${file}`, changeUrl);
      count = 0;
    } else {
      count++;
    }
    if (count === 0) {
      status = true;
      url = `public/uploads/books/${id}.${file.split(".")[1]}`;
      return;
    }
  });
  if (status) {
    clearImageOld(dirBook, fileOld);
  }
  return url;
};

const reNameImageCourse = (id) => {
  var url = "";
  var fileOld = "";
  var status = false;
  var count = 0;
  const dirCourse = path.join(__dirname, `../../${dir.urlCourse}`);
  const files = fs.readdirSync(dirCourse);
  files.forEach((file) => {
    if (file.split(".")[0] === id) {
      fileOld = file;
    }
    if (file.split(".")[0] === "upload") {
      let changeUrl = `${dirCourse}/${id}.${file.split(".")[1]}`;
      fs.renameSync(`${dirCourse}/${file}`, changeUrl);
      count = 0;
    } else {
      count++;
    }
    if (count === 0) {
      status = true;
      url = `public/uploads/courses/${id}.${file.split(".")[1]}`;
      return;
    }
  });
  if (status) {
    clearImageOld(dirCourse, fileOld);
  }
  return url;
};

module.exports = {
  checkDir,
  checkFileType,
  reNameImageBook,
  reNameImageCourse
};
