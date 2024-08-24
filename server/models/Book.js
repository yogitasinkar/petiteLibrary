const mongoose = require('mongoose');

const BookSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  language: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
  oldNo: {
    type: Number,
    required: false,
  },
  newNo: {
    type: String,
    required: true,
  },
  qty: {
    type: Number,
    required: true,
  },
  location: {
    type: String,
    required: false,
  },
  section: {
    type: String,
    required: false,
  },
  segment: {
    type: String,
    required: false,
  },
  status: {
    type: String,
    required: false,
  },
  publisher: {
    type: String,
    required: false,
  },
  pages: {
    type: Number,
    required: false,
  },
  isIssued: {
    type: Boolean,
    default: false
  }
});

const Book = mongoose.model('Book', BookSchema);

module.exports = Book;
