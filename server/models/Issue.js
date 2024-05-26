const mongoose = require('mongoose');

const IssueSchema = new mongoose.Schema({
  book: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Book',
    required: true
  },
  member: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Member',
    required: true
  },
  issueDate: {
    type: Date,
    required: true
  },
  dueDate: {
    type: Date,
    required: true
  },
  returnDate: {
    type: Date
  },
  isLateReturn: {
    type: Boolean,
    default: false
  }
});

const Issue = mongoose.model('Issue', IssueSchema);

module.exports = Issue;
