const mongoose = require('mongoose');

const caseSchema = new mongoose.Schema({
  caseId: {
    type: String,
    unique: true,
    required: true,
  },
  officerId: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    default: 'pending',
  },
  reportedDate: {
    type: Date,
   
    default:Date.now,
  },
  updatedDate: {
    type: Date,
 
    default:Date.now,
  },
});

module.exports = mongoose.model('Case', caseSchema);
