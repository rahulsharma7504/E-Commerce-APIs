const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
    vendor_id: {
        type: String,
        required: true,
    },
    category_id: {
        type: String,
        required: true,
    },
    sub_category_id: {
        type: String,
        required: true,
    },
    store_id: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    discount: {
        type: Number,
        required: true,
    },
    image: {
        type: String,  // Change to Buffer for binary image data
        required: true,
    },
});

const productModel = mongoose.model('product', productSchema);

module.exports = {
    productModel,
};
