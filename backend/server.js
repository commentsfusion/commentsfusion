require('dotenv').config();
const express = require('express');
const session = require('express-session');   
const cors = require('cors');
const authRoutes = require('./src/routes/authRoutes');
const connectDatabase = require("./src/utils/db");
const { apiErrorHandler } = require('./src/middleware/errorHandler');
const passport = require('passport');
require('./src/utils/passport_setup');

const app = express();

app.use(express.json());
connectDatabase();

app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    methods: ['GET','POST','PUT','DELETE'],
    credentials: true,
  })
);

app.use(
  session({
    secret: process.env.SESSION_SECRET || "keyboard cat",
    resave: false,
    saveUninitialized: false,
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use('/api/auth', authRoutes);
app.use(apiErrorHandler); 

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`API listening on ${PORT}`));
