const Booking = require("../models/Booking");

exports.createBooking = async (req, res) => {
  try {
    const booking = new Booking({ ...req.body, userId: req.user.uid });
    await booking.save();
    res.status(201).json(booking);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({ userId: req.user.uid });
    res.json(bookings);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
