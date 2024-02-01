const mongoose = require('mongoose');

const sub_catalog = mongoose.Schema({
    category_id:{
        type:String,
        required:true
    },
    sub_category_name:{
        type:String,
        required:true
    }
    // sub_category_description:{
    //     type:String,
    //     required:true
    // },
    // sub_category_image:{
    //     type:String,
    //     required:true
    // }
})
const sub_category=mongoose.model('SubCategory',sub_catalog)
module.exports = sub_category