const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema({
    title: {
        type: String,
        require: true
    },
    subcategory: [{
        subTitle: {
            type: String,
            require: true
        },
        options: [String]
        ,
        navbarShow: {
            type: Boolean,
            default: false,
        }
    }, ],

});

module.exports = mongoose.model("Category", categorySchema);