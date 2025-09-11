const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const bookingRoutes = require("./routes/bookingRoutes");

const app = express();
const PORT = 5000;

app.use(cors());
app.use(bodyParser.json());

app.use("/api/bookings", bookingRoutes);

mongoose.connect("mongodb+srv://worktempory_db_user:qIVViSWJYPyPXTQ6@works.x7xbqwu.mongodb.net/carRental")
  .then(() => {
    console.log("MongoDB connected");
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch(err => console.error(err));
