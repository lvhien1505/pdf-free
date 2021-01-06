const TagModel=require("../models/tag");
const {ERROR_SERVER,CREATE_TAG_SUCCESS,UPDATE_TAG_SUCCESS,DELETE_TAG_SUCCESS} = require("../utils/notify")

const create = async (req,res)=>{
    try {
        let name = req.body.name;
        let tag ={name}
        let data = await TagModel.create(tag)
        if (data) {
            return res.status(200).json(CREATE_TAG_SUCCESS)
        }
    } catch (error) {
        res.status(500).json(ERROR_SERVER)
    }
}

const getAllTag = async (req,res)=>{
    try {
        let data = await TagModel.find()
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
        let tag={}
        if (req.body.name) {
            tag.name = req.body.name;
        }
        let data = await TagModel.findByIdAndUpdate({_id:id},tag)
        if (data) {
            return res.status(200).json(UPDATE_TAG_SUCCESS)
        }
    } catch (error) {
        res.status(500).json(ERROR_SERVER)
    }
}

const remove = async (req,res)=>{
    try {
        let id = req.params.id;
        let data = await TagModel.findOneAndDelete({_id:id});
        if (data) {
            return res.status(200).json(DELETE_TAG_SUCCESS)
        }
    } catch (error) {
        res.status(500).json(ERROR_SERVER)
    }
}

module.exports={
    create,
    getAllTag,
    update,
    remove
}