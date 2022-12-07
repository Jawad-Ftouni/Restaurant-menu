import express from "express";
import compareHash from "../middleware/compareHashPwd.js";
import passport from "passport";
import LocalStrategy from "passport-local";
const app = express();
import session from "express-session";
import mongoose from "mongoose";
// app.use(flash());//middleware
app.use(
  session({
    secret: process.env.SESSION_SECRET, //session_ID
    resave: false,
    saveUninitialized: false,
  })
); //middleware
app.use(passport.initialize()); //initialize passport and connect it to express servers
app.use(passport.session()); //middleware

passport.serializeUser((user, done) => done(null, user)); //write or save user into a session
passport.deserializeUser((user, done) => done(null, user)); // read user from a session

const adminSchema = new mongoose.Schema({
  userName: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

export const Admin = mongoose.model("admin", adminSchema);

passport.use(
  new LocalStrategy.Strategy(
    { usernameField: "userName", session: true },
    async (userName, password, done) => {
      try {
        const userFound = await Admin.findOne({ userName: userName });
        if (!userFound) {
          console.log("user not found");
        }
        if (userFound && compareHash(password, userFound.password)) {
          done(null, userFound);
        } else {
          done(null, false, { message: "user doesnt exist" }); //status 401 text of unauthorized message isnt working
        }
      } catch (error) {
        done(error);
      }
    }
  )
);
