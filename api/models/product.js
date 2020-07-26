const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    category: {type: mongoose.Schema.Types.ObjectId, ref:'Category', required: true},
    // product: { type: mongoose.Schema.Types.ObjectId, ref:'Product', required: true },
    name: { type: String, required: true},
    price: {type: Number, required: true}
},{timestamps:true});

module.exports = mongoose.model('Product', productSchema);