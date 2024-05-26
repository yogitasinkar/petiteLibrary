const express = require("express");
const router = express.Router();
const Book = require("../models/Book");

// GET /api/books
// Fetch All Books, Filter Books by name, author & publisher
router.get('/', async (req, res) => {
  const { name, author, publisher, filterIssued } = req.query;
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const skip = (page - 1) * limit;

  try {
    let query = {};

    if (name) {
      query.name = new RegExp(name, 'i');
    }

    if (author) {
      query.author = new RegExp(author, 'i');
    }

    if (publisher) {
      query.publisher = new RegExp(publisher, 'i');
    }

    if (filterIssued === 'true') {
      query.isIssued = true;
    } else if (filterIssued === 'false') {
      query.isIssued = false;
    }

    const books = await Book.find(query).skip(skip).limit(limit);
    const totalCount = await Book.countDocuments(query);

    res.json({
      books,
      totalPages: Math.ceil(totalCount / limit),
      currentPage: page,
    });
  } catch (err) {
    console.error('Error fetching books:', err);
    res.status(500).json({ message: 'Failed to fetch books' });
  }
});


// POST /api/books
// Create multiple Book entries based on qty
router.post("/", async (req, res) => {
  try {
    const data = req.body;
    const qty = data.qty;
    const books = [];

    // Create multiple entries based on the qty value
    for (let i = 0; i < qty; i++) {
      const book = new Book(data);
      books.push(book.save());
    }

    // Wait for all book entries to be created
    const createdBooks = await Promise.all(books);

    res.json(createdBooks);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


// GET /api/books/:id
// Get BookById
router.get("/:id", async (req, res) => {
  try {
    const bookId = req.params.id;
    const data = req.body;
    const book = await Book.findOne({ _id: bookId });
    res.json(book);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
// u1Uz1wQvROFzNcL7
