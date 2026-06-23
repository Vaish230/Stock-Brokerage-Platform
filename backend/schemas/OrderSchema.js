const { Schema } = require("mongoose");

const OrderSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  name: { type: String, required: true },
  qty: { type: Number, required: true },
  price: { type: Number, required: true },
  mode: { type: String },
  createdAt: { type: Date, default: Date.now },
});
module.exports = { OrderSchema };
