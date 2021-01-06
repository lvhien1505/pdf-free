const CategoryModel=require("../models/categories");
const {ERROR_SERVER,CREATE_CATEGORY_SUCCESS,UPDATE_CATEGORY_SUCCESS,DELETE_CATEGORY_SUCCESS} = require("../utils/notify")

const create = async (req,res)=>{
    try {
        let category={}
        if (req.body.name) {
            category.name = req.body.name;
        }
        if (req.body.tags) {
            category.tags = req.body.tags;
        }
        let data = await CategoryModel.create(category)
        if (data) {
            return res.status(200).json(CREATE_CATEGORY_SUCCESS)
        }
    } catch (error) {
        res.status(500).json(ERROR_SERVER)
    }
}

const getAllCategory = async (req,res)=>{
    try {
        let data = await CategoryModel.find().populate("tags")
        if (data) {
            return res.status(200).json(data)
        }
    } catch (error) {
        res.status(500).json(ERROR_SERVER)
    }
}

const update = async (req,res)=>{
    try {
        let id = req.params.id;
        let category={}
        if (req.body.name) {
            category.name = req.body.name;
        }
        if (req.body.tags) {
            category.tags = req.body.tags;
        }
        let data = await CategoryModel.findByIdAndUpdate({_id:id},category)
        if (data) {
            return res.status(200).json(UPDATE_CATEGORY_SUCCESS)
        }
    } catch (error) {
        res.status(500).json(ERROR_SERVER)
    }
}

const remove = async (req,res)=>{
    try {
        let id = req.params.id;
        let data = await CategoryModel.findOneAndDelete({_id:id});
        if (data) {
            return res.status(200).json(DELETE_CATEGORY_SUCCESS)
        }
    } catch (error) {
        res.status(500).json(ERROR_SERVER)
    }
}

module.exports={
    create,
    getAllCategory,
    update,
    remove
}