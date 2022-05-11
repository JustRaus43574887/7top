const { Schema, model } = require("mongoose");

const schema = new Schema({
  name: { type: String },
  balls: { type: String },
  players: { type: Number },
  timestapmt: { type: Number },
});

module.exports = model("ListBall", schema);
