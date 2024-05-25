const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const app = express();

const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());

// Connect to MongoDB
const connectDB = require('./config/db');
connectDB();

// Routes
app.get('/', (req, res) => {
  res.send('Library Management System API');
});

// Use the books route
const booksRouter = require('./routes/books');
app.use('/api/books', booksRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
