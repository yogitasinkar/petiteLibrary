const express = require("express");
const router = express.Router();
const Issue = require("../models/Issue");
const Book = require("../models/Book");


// GET /api/issues
// Fetch All Issues
router.get('/', async (req, res) => {
  try {
    const issues = await Issue.find({ returnDate: null })
      .populate('book')
      .populate('member');
    res.json(issues);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


// POST /api/issues
// Create a Book Issue
router.post('/', async (req, res) => {
  const { bookId, memberId, issueDate, dueDate } = req.body;

  try {
    // Check if the book is already issued
    const book = await Book.findById(bookId);
    console.log(bookId, book);
    if (book.isIssued) {
      return res.status(400).json({ message: 'Book is already issued' });
    }

    const issue = new Issue({
      book: bookId,
      member: memberId,
      issueDate,
      dueDate,
    });

    const newIssue = await issue.save();

    // Update the isIssued field in the Book model
    book.isIssued = true;
    await book.save();

    res.status(201).json(newIssue);
  } catch (err) {
    console.error('Error creating book issue:', err);
    res.status(400).json({ message: err.message });
  }
});

// PUT /api/issues/:id/return 
// Update the returnDate of an issue
router.put('/:id/return', async (req, res) => {
  const issueId = req.params.id;
  const { returnDate } = req.body;

  try {
    const issue = await Issue.findById(issueId);
    if (!issue) {
      return res.status(404).json({ message: 'Issue not found' });
    }

    issue.returnDate = new Date(returnDate);
    issue.isLateReturn = issue.returnDate > issue.dueDate;

    const updatedIssue = await issue.save();

    // Update the isIssued field in the Book model
    await Book.findByIdAndUpdate(issue.book, { isIssued: false });

    res.json(updatedIssue);
  } catch (err) {
    console.error('Error updating return date:', err);
    res.status(400).json({ message: err.message });
  }
});


// GET /api/issues/:memberId
// Get All Issues for a Member
router.get('/:memberId', async (req, res) => {
  const memberId = req.params.memberId;

  try {
    const issues = await Issue.find({ member: memberId })
      .populate('book')
      .populate('member');

    const response = issues.map(issue => ({
      book: issue.book,
      issueDate: issue.issueDate,
      dueDate: issue.dueDate,
      returnDate: issue.returnDate,
    }));

    res.json(response);
  } catch (err) {
    console.error('Error fetching books for member:', err);
    res.status(500).json({ message: err.message });
  }
});


// GET /api/issues/book/:bookId  
// Fetch issue details by book ID
router.get('/book/:bookId', async (req, res) => {
  const bookId = req.params.bookId;

  try {
    // Find the active issue for the given book ID and populate book and member details
    const issue = await Issue.findOne({ book: bookId, returnDate: null }).populate('book').populate('member');
    if (!issue) {
      return res.status(404).json({ message: 'No active issue found for this book' });
    }

    res.json(issue);
  } catch (err) {
    console.error('Error fetching issue details:', err);
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
