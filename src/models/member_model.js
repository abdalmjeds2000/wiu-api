const { model, Schema } = require("mongoose");

const memberSchema = new Schema({
  company_id: {
    type: String,
    required: true
  },
  full_name: {
    type: String,
    required: true
  },
  id_number: {
    type: String,
    required: true
  },
  dob: {
    type: Date,
    required: true
  },
  address: {
    type: String,
    required: true
  },
  phone_number: {
    type: String,
    required: true
  },
  licensed_operator_number: {
    type: String,
    required: true
  },
  is_responsible_member: {
    type: Boolean,
    required: true,
    default: false
  },
  attachments: {
    type: [Object],
    required: false,
    default: []
  },
});

module.exports = model("member", memberSchema);