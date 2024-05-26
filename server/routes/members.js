const express = require("express");
const router = express.Router();
const Member = require("../models/Member");

// GET /api/members
// Fetch all Members
router.get("/", async (req, res) => {
  console.log(req.query);
  const page = req.query.page || 1;
  const limit = req.query.limit || 10;
  try {
    const members = await Member.find()
      .skip((page - 1) * limit)
      .limit(limit);
    res.json(members);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST /api/members
// Create a Member
router.post("/", async (req, res) => {
  try {
    const data = req.body;
    const member = await Member.create({ ...data });
    res.json(member);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

//GET /api/members/:id
// Get BookById
router.get("/:id", async (req, res) => {
  try {
    const memberId = req.params.id;
    const data = req.body;
    const member = await Member.findOne({ _id: memberId });
    res.json(member);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
