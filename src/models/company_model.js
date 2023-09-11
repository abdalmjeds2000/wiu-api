const { model, Schema } = require("mongoose");

const companySchema = new Schema({
  guid: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  membership: {
    type: String,
    required: true
  },
  type: {
    type: String,
    required: true
  },
  membership_number: {
    type: String,
    required: true
  },
  address: {
    type: String,
    required: true
  },
  governorate: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    required: true
  },
  license_number: {
    type: String,
    required: true
  },
  brand: {
    type: String,
    required: false
  },
  production_type: {
    type: [String],
    required: true
  },
  status: {
    type: Boolean,
    required: true,
    default: true
  },
  cr_files: {
    type: [Object],
    required: false,
    default: []
  },
  il_files: {
    type: [Object],
    required: false,
    default: []
  },
  ml_files: {
    type: [Object],
    required: false,
    default: []
  },
});

module.exports = model("Companies", companySchema);