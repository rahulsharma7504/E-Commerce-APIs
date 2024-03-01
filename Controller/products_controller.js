const { productModel } = require('../Model/product_model');

const categorController=require('../Controller/categoryController')

const productController = async (req, res) => {
    try {
        const saveProduct = new productModel({
            vendor_id: req.body.vendor_id,
            category_id: req.body.category_id,
            sub_category_id: req.body.sub_category_id,
            store_id: req.body.store_id,
            name: req.body.name,
            price: req.body.price,
            discount: req.body.discount,
            image: req.file.filename  // Assuming req.file.buffer contains the binary image data
        });

        let product_Data = await saveProduct.save();
        res.status(200).send({ data: product_Data, message: "Data has been saved successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
};
                       
//For Get All Products

const getProducts =async (req, res) => {
    try {
        let cateData=[]
        

        let categoryData=await categorController.categoryModel()
        if(categoryData){
        for(let i=0; i<categoryData.length; i++) {
             cateData.push(categoryData[i])
        }

       
            let data=await productModel.find()
        res.status(200).send({category:categoryData, data: data, message: "Data has been fetched successfully" });

        }
          
        
    } catch (error) {
        if(error) throw error
        res.status(404).send('Internal Server Error')
        
    }


}

 

const searchProducts = async (req, res) => {
    try {
        let product=req.body.product;
        const name = await productModel.find({name:{$regex:new RegExp(product,"i")}})

        if(name.length>0) {
            res.status(200).send({data: name, message: "Data has been fetched successfully" });

        }
    } catch (error) {
      if(error) throw error
      res.status(404).send('Internal Server Error')
      
    }
  }

  // for Sorting and searching databases
  const Pagination = async (req, res) => {
    try {
        let page=req.body.page;
        let sort=req.body.sort;

        let data=await productModel.find().skip((page-1)*2).limit(3).sort(sort)
        res.status(200).send({data: data, message: "Data has been fetched successfully" });
    }catch(err){    
        console.log(err);
        res.status(500).json({message:"Error in sorting the data."})
    }
}


module.exports = {
    productController,
    getProducts,
    searchProducts,
    Pagination
};
