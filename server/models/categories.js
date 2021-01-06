const mongoose=require("../config/dbConnect");

let categorySchema = mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    tags:[{
            type:String,
            ref:"tags"
        }]
},{
    timestamps: true,
});

let CategoriesModel = mongoose.model("categories", categorySchema);
module.exports = CategoriesModel;