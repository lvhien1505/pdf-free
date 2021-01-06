const mongoose=require("../config/dbConnect");

let tagSchema = mongoose.Schema({
    name:{
        type:String,
        required:true
    }
},{
    timestamps: true,
});

let TagModel = mongoose.model("tags", tagSchema);
module.exports = TagModel;