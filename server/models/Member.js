const mongoose = require('mongoose');

const MemberSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  altPhone: {
    type: String,
    required: false,
  },
  email: {
    type: String,
    required: false,
  },
  joiningDate: {
    type: Date,
    required: false,
  },
  addressLine1: {
    type: String,
    required: false,
  },
  addressLine2: {
    type: String,
    required: false,
  },
  addressLine3: {
    type: String,
    required: false,
  },
  city: {
    type: String,
    required: false,
  },
  pinCode: {
    type: String,
    required: false,
  },
});

const Member = mongoose.model('Member', MemberSchema);

module.exports = Member;
