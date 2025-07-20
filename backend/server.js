//require('dotenv').config();
require('dotenv').config({
  path: require('path').join(__dirname, './.env'),
  override: true
});
const express = require('express');
const session = require('express-session');   
const cors = require('cors');
const authRoutes = require('./src/routes/auth.routes');
const profileRoutes = require('./src/routes/profile.routes');
const userRoutes = require('./src/routes/user.routes');
const connectDatabase = require("./src/utils/db");
const { apiErrorHandler } = require('./src/middleware/errorHandler');
const passport = require('passport');
require('./src/utils/passport_setup');
const cookieParser = require('cookie-parser');

const app = express();

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));

app.use(cookieParser());

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
app.use('/api/profile', profileRoutes);
app.use('/api/user', userRoutes);
app.use(apiErrorHandler); 

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`API listening on ${PORT}`));
