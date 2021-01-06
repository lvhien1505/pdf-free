const express = require("express");
const asyncHandler = require('express-async-handler')
const {checkAuth,checkAdmin} = require("../middlewares/auth");
const {create,update,remove,getBooksWithCategory,getBooksWithSort,uploadImage,getBookWithId,getBooksWithTag,getBooksUpdate,getBooksView,getBooksDownload}=require("../services/book")
const router = express.Router();

//LIST book with query category
router.post("/category/:id/",asyncHandler(getBooksWithCategory))

//LIST book with query category
router.post("/category/tag/:idTag",asyncHandler(getBooksWithTag))

//LIST book with sort book
router.post("/show",asyncHandler(getBooksWithSort))

//LIST book with sort book
router.post("/show/update",asyncHandler(getBooksUpdate))

//LIST book with sort book
router.post("/show/view",asyncHandler(getBooksView))

//LIST book with sort book
router.post("/show/download",asyncHandler(getBooksDownload))

//POST upload image book
router.post("/upload/image",checkAuth,checkAdmin,asyncHandler(uploadImage))

//POST create book
router.post("/create",checkAuth,checkAdmin,asyncHandler(create))

//POST get book with id
router.post("/:id", asyncHandler(getBookWithId))

//PUT update book
router.put("/:id",checkAuth,checkAdmin, asyncHandler(update))

//DELETE remove book
router.delete("/:id",checkAuth,checkAdmin,asyncHandler(remove))

module.exports = router;