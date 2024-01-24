const mongoose=require('mongoose');

const storeSchema = mongoose.Schema({
    vendor_id:{
        type:String,
        required:true
    },
    vendor_email:{
        type:String,
        required:true
    },
    logo:{
        type:String,
        required:true
    },
    address:{
        type:String,
        required:true
    },
    pin:{
        type:Number,
        required:true
    },
    location:{
        type:{type:String, required:true},
        coordinates:[]
    }
})

storeSchema.index({location:'2dsphere'})

 const store_model=mongoose.model('store',storeSchema)
 module.exports={
    store_model
 };