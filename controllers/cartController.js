const ProductModel = require("../models/Product");
const CartModel = require("../models/Cart");

module.exports.addToCart = async (req, res, next) => {
    const addedProduct = {
        gender: req.body.gender,
        name: req.body.name,
        productImg: req.body.productImg,
        price: req.body.price
    };
    console.log(`This id ${req.body.productId}`);
    res.render('cart', {product: addedProduct});
}

