const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const newsSchema = new Schema({
    name: {
        type: String,
        required: true,
        default: ''
    },
    description: {
        type: String,
        default: ''
    },
    productImg: {
        type: String
    }
});

module.exports =  mongoose.model("News", newsSchema)