require('dotenv').config();
const express = require('express');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');
const { protect } = require('./middleware/auth');
const { connectDB} = require('./utils/db');
const connectDatabase = require("./utils/db");

const app = express();

// 1) JSON parsing
app.use(express.json());
connectDatabase();

// 2) Enable CORS for your front-end origin
app.use(
  cors({
    origin: process.env.FRONTEND_URL, // e.g. "http://localhost:3000"
    methods: ['GET','POST','PUT','DELETE'],
    credentials: true,
  })
);

// 3) Mount auth routes
app.use('/api/auth', authRoutes);

// 4) Example protected route
app.get('/api/protected', protect, (req, res) => {
  res.json({ message: `Hello user ${req.user.id}`, role: req.user.role });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`API listening on ${PORT}`));
