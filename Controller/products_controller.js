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
module.exports = {
    productController,
    getProducts
};
