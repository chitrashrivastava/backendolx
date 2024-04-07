const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
    producname: {
        type: String
    },
    price: {
        type: Number
    },
    description: {
        type: String,
    },
    seller: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    image: {
        type: Object,
        default: {
            fieldId: "",
            url: ""
        }
    }
});

const Item = mongoose.model("Item", itemSchema); // Notice the use of mongoose.model() here

module.exports = Item;
