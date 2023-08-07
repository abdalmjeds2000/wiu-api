const { model, Schema } = require("mongoose");

const workerSchema = new Schema({
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
  phone_number: {
    type: String,
    required: true
  },
  social_status: {
    type: String,
    required: true
  },
  job_title: {
    type: String,
    required: true
  },
  has_certificate: {
    type: Boolean,
    required: true
  },
  address: {
    type: String,
    required: true
  },
  gender: {
    type: String,
    required: true
  },
  attachments: {
    type: [Object],
    required: false,
    default: []
  },
});

module.exports = model("worker", workerSchema);