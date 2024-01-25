const {CategoryModel}=require('../Model/category');


const categoryData= async(req,res)=>{
try {
    const existCategory= await CategoryModel.findOne({category:req.body.category.toLowerCase()});
        if(existCategory){
            res.status(400).json({
                error:"Category already exist"
            }) 
        }else{
            
            const categoryData=new CategoryModel({
                    category:req.body.category.toLowerCase(),
                    description:req.body.description
            })
           let saved= await categoryData.save()

        
            res.status(200).json({
                message:"Category added successfully",
                Data:saved
            })
        }
   

    
} catch (error) {
    if(error ){
        res.status(500).json({
            error:error.message
        })
    }
    
}
}

module.exports={
    categoryData
}