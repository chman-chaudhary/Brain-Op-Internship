const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Title is mandatory"],
  },
  description: {
    type: String,
    required: [true, "Product description is mandatory"],
  },
  url: {
    type: String,
    default:
      "https://th.bing.com/th/id/OIP.p5JeMPd6jv8ZJLap53uTogHaFj?w=1024&h=768&rs=1&pid=ImgDetMain",
    set: (v) =>
      v === "" || v === "undefined"
        ? "https://th.bing.com/th/id/OIP.p5JeMPd6jv8ZJLap53uTogHaFj?w=1024&h=768&rs=1&pid=ImgDetMain"
        : v,
  },
});

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
