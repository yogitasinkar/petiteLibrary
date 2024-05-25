const express = require('express');
const router = express.Router();
const Book = require('../models/Books');

// GET /api/books
// Fetch all books
router.get('/', async (req, res) => {
  try {
    console.log('here', Book);
    const books = await Book.find();
    console.log('books', books);
    res.json(books);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
// u1Uz1wQvROFzNcL7