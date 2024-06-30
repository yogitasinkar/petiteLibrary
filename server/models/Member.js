const mongoose = require('mongoose');

const MemberSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: false,
  },
  dob: {
    type: Date,
    required: true,
  },
  bloodGroup: {
    type: String,
    required: false,
  },
  address: {
    type: String,
    required: false,
  },
  aadhaarNo: {
    type: String,
    required: false,
  },
});

const Member = mongoose.model('Member', MemberSchema);

module.exports = Member;
