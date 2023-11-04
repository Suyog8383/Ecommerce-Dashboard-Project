const express = require("express");
require("./dataBase/config");
const users = require("./dataBase/User");
const product = require("./dataBase/Product");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const jwtKey = "eco-comm";

const app = express();
app.use(express.json());
app.use(
  cors({
    origin: ["https://ecommerce-frontend-project.vercel.app/signUp"],
    methods: ["POST", "GET", "PUT", "DELETE"],
    credentials: true,
  })
);

app.post("/register", async (req, resp) => {
  console.log(req.body);
  let user = new users(req.body);
  let result = await user.save();
  result = result.toObject();
  delete result.password;
  jwt.sign({ result }, jwtKey, { expiresIn: "2h" }, (err, token) => {
    if (err) {
      resp.send({ result: "failed", message: "No user found" });
    }
    resp.send({
      result: "success",
      message: "user found",
      data: { result },
      token: { token },
    });
  });
});

app.post("/login", async (req, resp) => {
  if (req.body.password && req.body.email) {
    let user = await users.findOne(req.body).select("-password");
    if (user) {
      jwt.sign({ user }, jwtKey, { expiresIn: "2h" }, (err, token) => {
        if (err) {
          resp.send({ result: "failed", message: "No user found" });
        }
        resp.send({
          result: "success",
          message: "user found",
          data: { user },
          token: { token },
        });
      });
    } else {
      resp.send({ result: "failed", message: "No user found", data: { user } });
    }
  } else {
    resp.send({ result: "failed", message: "email and password mandotry" });
  }
});

app.post("/add-product", verifyToken, async (req, resp) => {
  let products = new product(req.body);
  let result = await products.save();
  resp.send(result);
});

app.delete("/products/:id", verifyToken, async (req, resp) => {
  let result = await product.deleteOne({ _id: req.params.id });
  resp.send(result);
});

app.get("/products", verifyToken, async (req, resp) => {
  const products = await product.find();
  if (products.length > 0) {
    resp.send(products);
  } else {
    resp.send({ result: "failed", message: "product not found!" });
  }
});

app.get("/updateProduct/:id", verifyToken, async (req, resp) => {
  let result = await product.findOne({ _id: req.params.id });

  if (result) {
    resp.send(result);
  } else {
    resp.send({ result: "no record found" });
  }
});

app.put("/product/:id", verifyToken, async (req, resp) => {
  let result = await product.updateOne(
    { _id: req.params.id },
    { $set: req.body }
  );
  resp.send(result);
});

app.get("/search/:key", verifyToken, async (req, resp) => {
  let result = await product.find({
    $or: [
      {
        name: { $regex: req.params.key },
      },
      {
        company: { $regex: req.params.key },
      },
      {
        category: { $regex: req.params.key },
      },
    ],
  });
  resp.send(result);
});

function verifyToken(req, resp, next) {
  let token = req.headers["authorization"];

  if (token) {
    token = token.split(" ")[1];

    jwt.verify(token, jwtKey, (err, valid) => {
      if (err) {
        resp.status(401).send({ result: "Please provide a valid token" });
      } else {
        // If the token is valid, call next() here
        next();
      }
    });
  } else {
    resp.status(403).send({ result: "Please add a token with the header" });
  }
}

app.listen(1200);
