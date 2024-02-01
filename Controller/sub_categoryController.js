const sub_category  = require('../Model/sub_cat_model')
const { CategoryModel } = require('../Model/category');


const Sub_categories = async (req, res) => {
    try {
        const category_id = req.body.category_id;

        // Check if the category exists
        let cat_data = await CategoryModel.findById(category_id);
        if (!cat_data) {
            res.status(404).send({ message: "Category not found" });
            return;
        }

        // Check if the sub-category already exists
        let find_cat = await sub_category.findOne({
            category_id: category_id,
            sub_category_name: req.body.sub_category_name.toLowerCase()
        });

        if (find_cat) {
            res.status(200).send({ message: "Already exists" });
        } else {
            // Create a new sub-category
            let save_category = new sub_category({
                category_id: category_id,
                sub_category_name: req.body.sub_category_name.toLowerCase()
            });

            // Save the sub-category to the database
            const save_cat = await save_category.save();
            res.status(200).send({ message: true, data: save_cat });
        }
    } catch (mongoError) {
        console.error(mongoError);
        res.status(500).send('MongoDB Error');
    }
};

module.exports = {
    Sub_categories
}
