const Product = require("../Models/Product.js");
const router = require("express").Router();
const jwt = require("jsonwebtoken");
const User = require("../Models/User.js");

router.get("/", async (req, res) => {
  try {
    let user;
    if (req.cookies.token !== "undefined" && req.cookies.token) {
      const cookieData = jwt.verify(req.cookies.token, process.env.TOKEN_KEY);
      const userId = cookieData.id;
      user = await User.findById(userId);
    }
    if (!user) {
      return res.status(400).json({ message: "Please Login", isLogin: false });
    }
    const products = await Product.find({});
    res.status(200).json({ products, isLogin: true });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error while fetching request", isLogin: true });
  }
});

module.exports = router;
