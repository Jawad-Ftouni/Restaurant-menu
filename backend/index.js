import express from "express";
const app = express();
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import menu from "./routes/menuList.js";
import admin from "./routes/admin.js";
import session from "express-session";
import passport from "passport";
import fileUpload from "express-fileupload";
import bodyParser from "body-parser";
import options from "options";
bodyParser.json([options]);
dotenv.config();

const MONGO_URI = process.env.MONGO_URI;
mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log("Connect to MongoDB");
  })
  .catch((err) => {
    console.log(err);
  });
app.use(fileUpload());
app.use(
  cors({
    origin: "http://localhost:3006",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    preflightContinue: false,
  })
);

app.use(
  session({
    secret: process.env.SESSION_SECRET, //session_ID
    resave: false,
    saveUninitialized: false,
  })
); //middleware

app.use(passport.session());
app.use(express.json());
app.use("/api/menu", menu);
app.use("/api/admin", admin);

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log("Connected to server of PORT :" + port);
});
