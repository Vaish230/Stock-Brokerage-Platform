const { Schema } = require("mongoose");

const PositionSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  product: { type: String },
  name: { type: String, required: true },
  qty: { type: Number, required: true },
  avg: { type: Number, required: true },
  price: { type: Number, required: true },
  net: { type: String },
  day: { type: String },
  isDown: { type: Boolean, default: false },
  isLoss: { type: Boolean, default: false },
});
module.exports = { PositionSchema };
