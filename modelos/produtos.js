const mongoose = require('mongoose');

const ProdutoSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  qty: {
    type: Number,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  status: {
    type: Boolean,
    default: 1
  }
});

const Produto = mongoose.model('Produto', ProdutoSchema);

module.exports = Produto;