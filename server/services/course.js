const CourseModel = require("../models/course");
const {
  ERROR_SERVER,
  CREATE_COURSE_SUCCESS,
  UPDATE_COURSE_SUCCESS,
  DELETE_COURSE_SUCCESS,
} = require("../utils/notify");
const { getTime } = require("../utils/time");
const { checkDir, reNameImageCourse } = require("./uploadImage/checkDir");
const { createImageCourse } = require("./uploadImage");

const getCoursesUpdate= async (req, res) => {
  try {
    let courses = await CourseModel.find()
      .limit(6)
      .sort({ updatedAt: -1 })
      .populate("tags categories");
    res.status(200).json(courses);
  } catch (error) {
    res.status(500).json(ERROR_SERVER);
  }
};

const getCoursesWithCategory = async (req, res) => {
  try {
    let idCategory = req.params.id;
    let limit = parseInt(req.query.limit);
    let listCourse = await CourseModel.find({ categories: idCategory }).populate(
      "tags categories"
    );
    if (limit) {
      if (limit >= listCourse.length) {
        let courses = [...listCourse];
        res.status(200).json(courses);
      } else {
        let arrRandom = [];
        let courses = [];
        let status = 0;
        for (let i = 0; i < limit; i++) {
          status = 0;
          if (i == 0) {
            let numFirst = Math.floor(Math.random() * listCourse.length);
            arrRandom.push(numFirst);
          } else {
            while (status == 0) {
              let num = Math.floor(Math.random() * listCourse.length);
              let count = 0;
              for (let i = 0; i < arrRandom.length; i++) {
                if (num == arrRandom[i]) {
                  count++;
                }
              }
              if (count == 0) {
                arrRandom.push(num);
                status++;
              }
            }
          }
        }

        arrRandom.forEach((e) => {
          courses.push(listCourse[e]);
        });
        res.status(200).json(courses);
      }
    } else {
      let courses = [...listCourse];
      res.status(200).json(courses);
    }
  } catch (error) {
    res.status(500).json(ERROR_SERVER);
  }
};

const getCoursesWithTag = async (req, res) => {
  let id = req.params.idTag;
  try {
    let courses = await CourseModel.find({tags:id})
      .sort({ updatedAt: -1 })
      .populate("tags categories");
    res.status(200).json(courses);
  } catch (error) {
    res.status(500).json(ERROR_SERVER);
  }
};

const getCoursesWithSort = async (req, res) => {
  try {
    let courses = await CourseModel.find()
      .sort({ updatedAt: -1 })
      .populate("tags categories");
    res.status(200).json(courses);
  } catch (error) {
    res.status(500).json(ERROR_SERVER);
  }
};

const getCourseWithId = async (req, res) => {
  let id = req.params.id;
  try {
    let course = await CourseModel.findById({ _id: id }).populate(
      "tags categories"
    );
    res.status(200).json(course);
  } catch (error) {
    res.status(500).json(ERROR_SERVER);
  }
};

const create = async (req, res) => {
  try {
    let name = req.body.name || "";
    let code = req.body.code || "";
    let description = req.body.description || "";
    let path = req.body.path || "";
    let tags = req.body.tags || [];
    let categories = req.body.categories || [];
    let time = getTime();
    let view = req.body.view || "";
    let download = req.body.download || "";
    let course = {
      code,
      name,
      description,
      path,
      categories,
      tags,
      view,
      download,
      time,
    };
    let data = await CourseModel.create(course);
    if (data) {
      let image = reNameImageCourse(data._id);
      if (image) {
        await CourseModel.findByIdAndUpdate({ _id: data._id }, { image: image });
      }
      return res.status(200).json(CREATE_COURSE_SUCCESS);
    }
  } catch (error) {
    res.status(500).json(ERROR_SERVER);
  }
};

const update = async (req, res) => {
  try {
    let id = req.params.id;
    let image = reNameImageCourse(id);
    let book = {};
    if (req.body.code) {
      book.code = req.body.code;
    }
    if (req.body.name) {
      book.name = req.body.name;
    }
    if (req.body.description) {
      book.description = req.body.description;
    }
    if (req.body.path) {
      book.path = req.body.path;
    }
    if (req.body.categories.length > 0) {
      book.categories = req.body.categories;
    }
    if (req.body.tags.length > 0) {
      book.tags = req.body.tags;
    }
    if (req.body.view) {
      book.view = req.body.view;
    }
    if (req.body.download) {
      book.download = req.body.download;
    }
    if (image) {
      book.image = image;
    }

    let time = getTime();
    book.time = time;
    let data = await CourseModel.findByIdAndUpdate({ _id: id }, book);
    if (data) {
      return res.status(200).json(UPDATE_COURSE_SUCCESS);
    }
  } catch (error) {
    res.status(500).json(ERROR_SERVER);
  }
};

const remove = async (req, res) => {
  try {
    let id = req.params.id;
    let data = await CourseModel.findByIdAndDelete({ _id: id });
    if (data) {
      return res.status(200).json(DELETE_COURSE_SUCCESS);
    }
  } catch (error) {
    res.status(500).json(ERROR_SERVER);
  }
};

const uploadImage = async (req, res) => {
  checkDir();
  createImageCourse(req, res);
};

module.exports = {
  create,
  update,
  remove,
  uploadImage,
  getCoursesUpdate,
  getCoursesWithCategory,
  getCoursesWithTag,
  getCoursesWithSort,
  getCourseWithId
};
