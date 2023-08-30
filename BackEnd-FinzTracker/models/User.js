const { ObjectId } = require("mongodb");
const mongoose = require("mongoose");

const TriggerSchema = new mongoose.Schema({
  currencyPair: String,
  email: String,
  status: Boolean,
  value: Number,
});

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    minlength: 5,
  },
  password: {
    type: String,
    required: true,
    unique: false,
    minlength: 3,
  },

  alertList: [TriggerSchema]
});

const User = mongoose.model("User", userSchema);

module.exports = User;
