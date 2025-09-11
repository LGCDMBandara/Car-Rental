const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({
  name: { type: String, required: true },
  address: String,
  telephone: String,
  nic: String,
  pickupDate: String,
  returnDate: String,
  vehicleType: String,
  totalAmount: Number,
  carImg: String,
  userId: { type: String, required: true },
}, { timestamps: true });

module.exports = mongoose.model("Booking", bookingSchema);
