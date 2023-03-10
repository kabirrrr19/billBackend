const mongoose = require("mongoose");

const billSchema = mongoose.Schema({
  uid: { type: String, required:true },
  created_at: { type: Date, required:true , default: new Date(0)},
  credits: { type: Number, required:true },
  duration: { type: Number, required:true },
  execution_status: { type: String, required:true },
  flow_name: { type: String, required:true },
  flow_uid: { type: String, required:true },
  manual_run: { type: Boolean, required:true },
  project_uid: { type: String, required:true },
  queue: {
    label: { type: String, required:true },
    value: { type: String, required:true },
  },
  restarted: { type: Boolean, required:true },
  tenant_uid: { type: String, required:true },
  trigger: { type: String, required:true },
  start_time: { type: Date, required:true },
  stop_time: { type: Date, required:true },
  type: { type: String, required:true },
});

const billModel = mongoose.model("Bill", billSchema);

module.exports = billModel;
