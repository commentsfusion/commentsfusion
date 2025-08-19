// backend/utils/passport-setup.js
const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const User = require("../models/user");   // your Mongoose user model

passport.serializeUser((user, done) => {
  done(null, user.id);  // store MongoDB _id in session
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id).lean();
    done(null, user);
  } catch (err) {
    done(err);
  }
});

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: `${process.env.API_URL}/api/auth/google/callback`,
    },
    // This callback runs after Google has authenticated the user
    async (accessToken, refreshToken, profile, done) => {
      try {
        const email = profile.emails[0].value;
        console.log('Google Login - Profile:', { 
          id: profile.id, 
          displayName: profile.displayName, 
          email: email 
        });
        
        // First check if user exists with this googleId
        let user = await User.findOne({ googleId: profile.id });
        if (user) {
          console.log('Found existing Google user, current name:', user.name);
          console.log('Updating to current Google name:', profile.displayName);
          // Update name to current Google profile name even for existing users
          user.name = profile.displayName;
          await user.save();
          console.log('Updated existing Google user name to:', user.name);
          return done(null, user);
        }
        
        // Check if user exists with this email (from regular signup)
        user = await User.findOne({ email: email });
        if (user) {
          console.log('Found existing email user, current name:', user.name);
          console.log('Linking Google account and updating to Google name:', profile.displayName);
          // Link Google account to existing user and update name to Google name
          user.googleId = profile.id;
          user.name = profile.displayName; // Update name to Google profile name
          await user.save();
          console.log('Linked and updated user name to:', user.name);
          return done(null, user);
        }
        
        // Create new user if none exists
        console.log('Creating new Google user with name:', profile.displayName);
        user = await User.create({
          name: profile.displayName,
          email: email,
          googleId: profile.id,
          // No password needed for OAuth users
        });
        console.log('Created new user:', user.name);
        done(null, user);
      } catch (err) {
        done(err);
      }
    }
  )
);
