"use strict";

const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  fullName: String,
  emailAddress: String,
  password: String
});

const User = mongoose.model("users", UserSchema);
module.exports = User;
