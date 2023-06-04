const mongoose = require("mongoose");
const moment = require("moment");

const Schema = mongoose.Schema;

const usersSchema = new Schema({
    email: String,
    password: String,
    username: String
  });
module.exports = mongoose.model("User", usersSchema);