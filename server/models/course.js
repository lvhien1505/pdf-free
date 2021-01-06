const mongoose = require("../config/dbConnect");

let courseSchema = mongoose.Schema(
  {
    code: {
      type: String,
      unique: true,
    },
    name: {
      type: String,
      required: true,
    },
    description: String,
    image: {
      type: String,
    },
    path: {
      type: String,
      default: "",
      required: true,
    },
    tags: [
      {
        type: String,
        ref: "tags",
      },
    ],
    categories: [
      {
        type: String,
        ref: "categories",
      },
    ],
    time: {
      type: String,
      required: true,
    },
    view: Number,
    download: Number,
  },
  {
    timestamps: true,
  }
);

let CourseModel = mongoose.model("courses", courseSchema);
module.exports = CourseModel;
