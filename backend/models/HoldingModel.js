const { model, Schema } = require("mongoose");
const { HoldingSchema } = require("../schemas/HoldingShema");

const Holding = model("holding", HoldingSchema);

module.exports = { Holding };
