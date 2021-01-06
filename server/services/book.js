const BookModel = require("../models/book");
const {
  ERROR_SERVER,
  CREATE_BOOK_SUCCESS,
  UPDATE_BOOK_SUCCESS,
  DELETE_BOOK_SUCCESS,
} = require("../utils/notify");
const { getTime } = require("../utils/time");
const { checkDir, reNameImageBook } = require("./uploadImage/checkDir");
const { createImageBook } = require("./uploadImage");

const getBooksUpdate= async (req, res) => {
  try {
    let books = await BookModel.find()
      .limit(12)
      .sort({ updatedAt: -1 })
      .populate("tags categories");
    res.status(200).json(books);
  } catch (error) {
    res.status(500).json(ERROR_SERVER);
  }
};

const getBooksView= async (req, res) => {
  try {
    let books = await BookModel.find()
      .limit(12)
      .sort({ view: -1 })
      .populate("tags categories");
    res.status(200).json(books);
  } catch (error) {
    res.status(500).json(ERROR_SERVER);
  }
};

const getBooksDownload= async (req, res) => {
  try {
    let books = await BookModel.find()
      .limit(12)
      .sort({ download: -1 })
      .populate("tags categories");
    res.status(200).json(books);
  } catch (error) {
    res.status(500).json(ERROR_SERVER);
  }
};


const getBooksWithCategory = async (req, res) => {
  try {
    let idCategory = req.params.id;
    let limit = parseInt(req.query.limit);
    let listBook = await BookModel.find({ categories: idCategory }).populate(
      "tags categories"
    );
    if (limit) {
      if (limit >= listBook.length) {
        let books = [...listBook];
        res.status(200).json(books);
      } else {
        let arrRandom = [];
        let books = [];
        let status = 0;
        for (let i = 0; i < limit; i++) {
          status = 0;
          if (i == 0) {
            let numFirst = Math.floor(Math.random() * listBook.length);
            arrRandom.push(numFirst);
          } else {
            while (status == 0) {
              let num = Math.floor(Math.random() * listBook.length);
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
          books.push(listBook[e]);
        });
        res.status(200).json(books);
      }
    } else {
      let books = [...listBook];
      res.status(200).json(books);
    }
  } catch (error) {
    res.status(500).json(ERROR_SERVER);
  }
};

const getBooksWithTag = async (req, res) => {
  let id = req.params.idTag;
  try {
    let books = await BookModel.find({tags:id})
      .sort({ updatedAt: -1 })
      .populate("tags categories");
    res.status(200).json(books);
  } catch (error) {
    res.status(500).json(ERROR_SERVER);
  }
};

const getBooksWithSort = async (req, res) => {
  try {
    let books = await BookModel.find()
      .sort({ updatedAt: -1 })
      .populate("tags categories");
    res.status(200).json(books);
  } catch (error) {
    res.status(500).json(ERROR_SERVER);
  }
};

const getBookWithId = async (req, res) => {
  let id = req.params.id;
  try {
    let book = await BookModel.findById({ _id: id }).populate(
      "tags categories"
    );
    res.status(200).json(book);
  } catch (error) {
    res.status(500).json(ERROR_SERVER);
  }
};

const create = async (req, res) => {
  try {
    let name = req.body.name || "";
    let description = req.body.description || "";
    let path = req.body.path || "";
    let author = req.body.author || "";
    let tags = req.body.tags || [];
    let categories = req.body.categories || [];
    let pageNumber = req.body.pageNumber || "";
    let time = getTime();
    let view = req.body.view || "";
    let download = req.body.download || "";
    let book = {
      name,
      description,
      path,
      author,
      categories,
      tags,
      view,
      download,
      pageNumber,
      time,
    };
    let data = await BookModel.create(book);
    if (data) {
      let image = reNameImageBook(data._id);
      if (image) {
        await BookModel.findByIdAndUpdate({ _id: data._id }, { image: image });
      }
      return res.status(200).json(CREATE_BOOK_SUCCESS);
    }
  } catch (error) {
    res.status(500).json(ERROR_SERVER);
  }
};

const update = async (req, res) => {
  try {
    let id = req.params.id;
    let image = reNameImageBook(id);
    let book = {};
    if (req.body.name) {
      book.name = req.body.name;
    }
    if (req.body.description) {
      book.description = req.body.description;
    }
    if (req.body.path) {
      book.path = req.body.path;
    }
    if (req.body.author) {
      book.author = req.body.author;
    }
    if (req.body.categories.length > 0) {
      book.categories = req.body.categories;
    }
    if (req.body.tags.length > 0) {
      book.tags = req.body.tags;
    }
    if (req.body.pageNumber) {
      book.pageNumber = req.body.pageNumber;
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
    let data = await BookModel.findByIdAndUpdate({ _id: id }, book);
    if (data) {
      return res.status(200).json(UPDATE_BOOK_SUCCESS);
    }
  } catch (error) {
    res.status(500).json(ERROR_SERVER);
  }
};

const remove = async (req, res) => {
  try {
    let id = req.params.id;
    let data = await BookModel.findByIdAndDelete({ _id: id });
    if (data) {
      return res.status(200).json(DELETE_BOOK_SUCCESS);
    }
  } catch (error) {
    res.status(500).json(ERROR_SERVER);
  }
};

const uploadImage = async (req, res) => {
  checkDir();
  createImageBook(req, res);
};

module.exports = {
  create,
  update,
  remove,
  getBooksWithCategory,
  getBooksWithSort,
  getBookWithId,
  getBooksWithTag,
  uploadImage,
  getBooksUpdate,
  getBooksView,
  getBooksDownload
};
