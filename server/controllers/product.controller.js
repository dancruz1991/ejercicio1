const Product = require('../models/product');

const fs = require("fs");

const productCtrl = {};

productCtrl.getProducts = async(req, res, next) => {
    const products = await Product.find();
    res.json(products);
};

productCtrl.createProduct = async(req, res, next) => {
    const product = new Product({
        name: req.body.name,
        cost: req.body.cost,
        img: req.body.img
    });
    await product.save();
    res.json({ status: 'Product created' });
};

productCtrl.getProduct = async(req, res, next) => {
    const { id } = req.params;
    const product = await Product.findById(id);
    res.json(product);
};

productCtrl.editProduct = async(req, res, next) => {
    const { id } = req.params;
    const product = {
        name: req.body.name,
        cost: req.body.cost,
        img: { data: fs.readFileSync(req.files.userPhoto.path), contentType: "image/png" }
    };
    await Product.findByIdAndUpdate(id, { $set: product }, { new: true });
    res.json({ status: 'Product Updated' });
};

productCtrl.deleteProduct = async(req, res, next) => {
    await Product.findByIdAndRemove(req.params.id);
    res.json({ status: 'Product Deleted' });
};

module.exports = productCtrl;