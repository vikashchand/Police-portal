const mongoose = require("mongoose");

const AdminPowersAuditSchema = new mongoose.Schema({
  email: {
    type: String,
    required: false,
  },
  type: {
    type: String,
    required: true,
  },

  time: {
    type: Date,
    default: Date.now,
  },
  
});

const AdminPowersAudit = mongoose.models.AdminPowersAudit || mongoose.model("AdminPowersAudit", AdminPowersAuditSchema);

module.exports = AdminPowersAudit;
