const express = require("express");
const asyncHandler = require('express-async-handler')
const {checkAuth,checkAdmin} = require("../middlewares/auth");
const {create,update,remove,uploadImage,getCoursesUpdate,getCoursesWithCategory,getCoursesWithSort,getCoursesWithTag,getCourseWithId}=require("../services/course")
const router = express.Router();

//LIST course with query category
router.post("/category/:id/",asyncHandler(getCoursesWithCategory))

//LIST course with query category
router.post("/category/tag/:idTag",asyncHandler(getCoursesWithTag))

//LIST course with sort course
router.post("/show",asyncHandler(getCoursesWithSort))

//LIST course with sort course
router.post("/show/update",asyncHandler(getCoursesUpdate))

//POST upload image course
router.post("/upload/image",checkAuth,checkAdmin,asyncHandler(uploadImage))

//POST create course
router.post("/create",checkAuth,checkAdmin,asyncHandler(create))

//POST get course with id
router.post("/:id", asyncHandler(getCourseWithId))

//PUT update course
router.put("/:id",checkAuth,checkAdmin, asyncHandler(update))

//DELETE remove course
router.delete("/:id",checkAuth,checkAdmin,asyncHandler(remove))

module.exports = router;