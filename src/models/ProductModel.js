const mongoose = require('mongoose')

const productSchema = new mongoose.Schema(
    {
        name: { type: String, required: true, unique: true },
        description: { type: String },
        new_price: { type: Number, required: true },
        old_price: { type: Number, required: true },

        image: { type: String, required: true },
        type: { type: String, required: true },
        countInStock: { type: Number, required: true },
        rating: { type: Number, required: true },
        discount: { type: Number },
        selled: { type: Number }
    },
    {
        timestamps: true,
    }
);
const Product = mongoose.model('Product', productSchema);

module.exports = Product;