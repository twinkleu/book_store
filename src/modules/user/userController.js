import { createToken } from "../../helpers/token.js";
import User from "../../models/user.js";
import bcrypt from "bcrypt"

export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res
        .status(400)
        .json({ success: false, message: "All details are required" });
    }
    const loweredEmail =  email.toLowerCase()
    const user = await User.findOne({ email:loweredEmail });
    if (user) {
      return res
        .status(400)
        .json({ success: false, message: "Email already in use" });
    }
    const hashPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({
      name: name,
      email:loweredEmail,
      password: hashPassword,
    });
    if (!newUser) {
      return res
        .status(500)
        .json({ success: false, message: "Error while creating the user" });
    }
    return res
    .status(201)
    .json({ success: true, message: "User Registered Successfully" });
  } catch (err) {
    return res.status(500).json({ success: false, message: "error" });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res
        .status(400)
        .json({ success: false, message: "All details are required" });
    }
    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "User is not registered" });
    }
    const matchedPassword = await bcrypt.compare(password, user.password);
    if (!matchedPassword) {
      return res
        .status(400)
        .json({ success: false, message: "Incorrect Password" });
    }
    const payload = { id: user._id };
    const token = await createToken(payload);

    return res.status(200).json({
      success: true,
      message: "User logged in successfully",
      token: token,
      data: user,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "Error while logging in the user" });
  }
};
