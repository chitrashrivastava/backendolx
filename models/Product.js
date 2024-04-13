const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    productname: {
        type: String
    },
    price: {
        type: Number
    },
    description: {
        type: String,
    },
    
    image: {
        type: Object,
        default: {
            fieldId: "",
            url: ""
        }
    },
    categories:{
      type:String
    }
});

const productdata = mongoose.model("product", productSchema); // Notice the use of mongoose.model() here

module.exports = productdata;
