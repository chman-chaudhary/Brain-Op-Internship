if (process.env.NODE_ENV != "production") {
  require("dotenv").config();
}

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const AuthRoute = require("./Routes/AuthRoutes.js");
const ProductRoute = require("./Routes/ProductRoutes.js");

const app = express();

app.use(bodyParser.json());
app.use(
  cors({
    origin: ["http://localhost:5173"],
    credentials: true,
  })
);
app.use(cookieParser());

main()
  .then(console.log("Connection Successfull"))
  .catch((err) => console.log("Connection Failed"));

async function main() {
  await mongoose.connect("mongodb://localhost:27017/BrainOp");
}

app.listen(3000, () => {
  console.log("App listening on port 3000");
});

app.use("/", AuthRoute);
app.use("/products", ProductRoute);
