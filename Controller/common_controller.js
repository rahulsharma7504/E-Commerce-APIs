const { productModel } = require('../Model/product_model');
const { store_model } = require('../Model/Store');
const sub_category = require('../Model/sub_cat_model');
const { CategoryModel } = require('../Model/category');

const Count_data = async (req, res) => {
    try {
        const data = [];
        
        // Use Promise.all for parallel database queries
        let store={
            Store: await store_model.countDocuments(),
            product: await productModel.countDocuments(),
            category: await CategoryModel.countDocuments(),
            subCategory: await sub_category.countDocuments()
        }
            

        data.push({
           count:store
        });

        res.status(200).json(data);
    } catch (error) {
        console.error(error);
        res.status(500).json({
            error: 'Internal Server Error'
        });
    }
};

module.exports = {
    Count_data
};
