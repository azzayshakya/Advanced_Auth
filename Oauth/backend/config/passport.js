// config/passport.js
import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import dotenv from "dotenv";
import User from "../models/user.model.js";
import jwt from "jsonwebtoken";

dotenv.config();

// Configure Google Strategy
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: `${
        process.env.BACKEND_URL || "http://localhost:3200"
      }/auth/google/callback`,
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        // Check if user exists in the database
        let user = await User.findOne({ googleId: profile.id });
        console.log("profile ", profile)

        // If user doesn't exist, create a new one
        if (!user) {
          user = await User.create({
            googleId: profile.id,
            name: profile.displayName,
            email: profile.emails[0].value,
            avatar: profile.photos?.[0]?.value || "",
          });
        }

        // Generate JWT token
        const token = jwt.sign(
          { id: user._id, email: user.email },
          process.env.JWT_SECRET || "your-jwt-secret",
          { expiresIn: "30d" }
        );

        // Add token to user object
        const userWithToken = {
          ...user.toObject(),
          token,
        };

        return done(null, userWithToken);
      } catch (error) {
        return done(error, null);
      }
    }
  )
);

// Serialize user to session
passport.serializeUser((user, done) => {
  done(null, user._id);
});

// Deserialize user from session
passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (error) {
    done(error, null);
  }
});

export default passport;
