
const express = require('express');
const cors = require('cors');
const connectDatabase = require("./utils/db");

const app = express();

// Connect to the database
connectDatabase();

app.use(express.json());

// Middleware
app.use(cors());

// Public auth endpoints
app.use("/api/auth", authRoutes);

// A protected example
app.get("/api/profile", protect, (req, res) => {
  res.json({ message: "This is your profile data", user: req.user });
});

app.listen(process.env.PORT || 5000, () => {
  console.log("Server up");
});