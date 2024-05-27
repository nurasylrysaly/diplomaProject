const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema({
    owner : {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    items: [{
        productId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Product"
        },
        name: String,
        quantity: {
            type: Number,
            min: 1,
            default: 1
        }
    }]
});

const Cart = mongoose.model('Carts', cartSchema);
module.exports = Cart;

