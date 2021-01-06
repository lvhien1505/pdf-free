const mongoose = require("../config/dbConnect");

let bookSchema = mongoose.Schema(
  {
    name: {
      type:String,
      required:true
    },
    description: String,
    image: {
      type: String,
    },
    path: {
      type: String,
      default: "",
      required:true
    },
    author:{
      type:String,
      default:"Admin",
      required:true
    },
    tags: [
      {
        type:String,
        ref:"tags",
      }
    ],
    categories: [
      {
        type:String,
        ref:"categories",
      }
    ],
    time:{
      type:String,
      required:true
    },
    view:Number,
    download:Number,
    pageNumber: {
      type:Number,
      required:true
    },
  },
  {
    timestamps: true,
  }
);

let BookModel = mongoose.model("books", bookSchema);
module.exports = BookModel;
