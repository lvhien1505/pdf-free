const express = require("express");
const asyncHandler = require('express-async-handler')
const {checkAuth,checkAdmin} = require("../middlewares/auth");
const {create,update,remove,getAllCategory}=require("../services/category");
const router = express.Router();

//POST get category
router.post("/",asyncHandler(getAllCategory))

//POST create category
router.post("/create",checkAuth,checkAdmin,asyncHandler(create))

//PUT update category
router.put("/:id",checkAuth,checkAdmin,asyncHandler(update))

//DELETE update category
router.delete("/:id",checkAuth,checkAdmin,asyncHandler(remove))

module.exports = router;