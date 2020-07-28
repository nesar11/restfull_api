
const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
  
    name: String
})

module.exports = mongoose.model('Category', categorySchema);

// const mongoose = require('mongoose');

// const categorySchema = new mongoose.Schema({
//     // _id: mongoose.Schema.Types.ObjectId,
//     name: { type: String, required: true}
   
// });

// module.exports = mongoose.model('Category', categorySchema);