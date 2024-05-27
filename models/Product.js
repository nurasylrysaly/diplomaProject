const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const productSchema = new Schema({
    name: {
        type: String,
        required: true,
        default: ''
    },
    description: {
        type: String,
        default: ''
    },
    gender: {
        type: String,
        default: ''
    },
    productImg: {
        type: String
    }
});

module.exports =  mongoose.model("Products", productSchema)