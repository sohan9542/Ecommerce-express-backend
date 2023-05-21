const mongoose = require("mongoose");

const promoSchema = new mongoose.Schema({
    title: {
        type: String,
        require: true
    },
    deadline: {
        type: String,
        require: true
    },
    discount: {
        type: Number,
        require: true
    }

});

module.exports = mongoose.model("Promo", promoSchema);