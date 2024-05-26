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
    required: true,
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
    required: true,
  },
  section: {
    type: String,
    required: true,
  },
  segment: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    required: true,
  },
  publisher: {
    type: String,
    required: true,
  },
  pages: {
    type: Number,
    required: true,
  },
  isIssued: {
    type: Boolean,
    default: false
  }
});

const Book = mongoose.model('Book', BookSchema);

module.exports = Book;
