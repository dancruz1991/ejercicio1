const mongoose = require('mongoose');
const { Schema } = mongoose;

const productSchema = new Schema({
    name: { type: String, required: true },
    cost: { type: Number, required: true },
    img: { type: String, required: true }
});

module.exports = mongoose.model('Product', productSchema);