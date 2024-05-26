const express = require("express");
const router = express.Router();
const Member = require("../models/Member");

// GET /api/members
// Fetch all Members
router.get("/", async (req, res) => {
  const page = req.query.page || 1;
  const limit = req.query.limit || 10;
  try {
    const members = await Member.find().skip((page - 1) * limit).limit(limit);
    const totalCount = await Member.countDocuments();
    res.json({
      members,
      totalCount,
      totalPages: Math.ceil(totalCount / limit),
      currentPage: page,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


// GET /api/members/search - 
// Fetch members searched by firstName or lastName
router.get('/search', async (req, res) => {
  const { name } = req.query;

  try {
    let query = {};
    if (name) {
      query.$or = [
        { firstName: new RegExp(name, 'i') },
        { lastName: new RegExp(name, 'i') }
      ];
    }

    // Find members matching the query
    const members = await Member.find(query).select('_id firstName lastName');

    // Format the result
    const formattedMembers = members.map(member => ({
      id: member._id,
      value: `${member.firstName} ${member.lastName} ,id:${member._id}`,
    }));

    res.json(formattedMembers);
  } catch (err) {
    console.error('Error fetching members list:', err);
    res.status(500).json({ message: 'Failed to fetch members list' });
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
