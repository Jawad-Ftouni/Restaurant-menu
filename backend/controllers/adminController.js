import { Admin } from "../models/admin.js";

import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const login = async (req, res) => {
  try {
    const token = jwt.sign(
      { user_id: req.user.id, userName: req.user.userName, role: 1 },
      process.env.TOKEN_KEY,
      { expiresIn: "1h" }
    );
    res.json(token);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "my code sucks, let me know!" });
  }
};

export const register = async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    const admin = new Admin({
      userName: req.body.userName,
      password: hashedPassword,
    });
    await admin.save();
    res.send(admin);
    console.log(admin);
  } catch (error) {
    console.error(error.message);
  }
};
