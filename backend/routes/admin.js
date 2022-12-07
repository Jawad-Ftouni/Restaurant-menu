import express from "express";
const router = express.Router();
import passport from "passport";
import { login, register } from "../controllers/adminController.js";

router.post("/login", passport.authenticate("local"), login);

router.post("/register", register);
export default router;
