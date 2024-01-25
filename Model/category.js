const mongoose = require('mongoose');

const categorySchean = mongoose.Schema({
    category:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    }
})

const CategoryModel = mongoose.model('Category', categorySchean);
module.exports ={
    CategoryModel
}