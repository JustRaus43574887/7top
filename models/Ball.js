const { Schema, model } = require("mongoose");

const schema = new Schema({
  name: { type: String },
  balls: { type: String },
  players: { type: Number },
});

module.exports = model("Ball", schema);
