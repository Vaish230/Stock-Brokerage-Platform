const { model, Schema } = require("mongoose");
const { OrderSchema } = require("../schemas/OrderSchema");

const Order = model("order", OrderSchema);

module.exports = { Order };
