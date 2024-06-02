const router = require("express").Router();
const User = require("../Models/User.js");
const { createSecretToken } = require("../init/SecretToken.js");
const bcrypt = require("bcrypt");

router.post("/signup", async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const checkEmail = await User.findOne({ email });
    if (checkEmail) {
      return res.json({
        message: "Email already registered",
      });
    }
    const user = await User.create({ email, password });
    const token = createSecretToken(user._id);
    res.cookie("token", token, {
      withCredentials: true,
      httpOnly: false,
    });
    res
      .status(201)
      .json({ message: "User signed in successfully", success: true });
  } catch (error) {
    console.error("Error in registering User:", error);
  }
});

router.post("/login", async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.json({ message: "All fields are required" });
    }
    const user = await User.findOne({ email });
    if (!user) {
      return res.json({ message: "Incorrect password or email" });
    }
    const auth = await bcrypt.compare(password, user.password);
    if (!auth) {
      return res.json({ message: "Incorrect password or email" });
    }
    const token = createSecretToken(user._id);
    res.cookie("token", token, {
      withCredentials: true,
      httpOnly: false,
    });
    res
      .status(201)
      .json({ message: "User logged in successfully", success: true });
    next();
  } catch (error) {
    console.error(error);
  }
});

router.get("/logout", (req, res) => {
  res
    .cookie("token", "")
    .json({ message: "Logout Successfully", success: true });
});

module.exports = router;
