const express = require("express");
const fs = require("fs");
const router = express.Router();

console.log("Loaded products.routes.js"); // confirms file is required

router.post("/", (req, res) => {
  console.log("POST /products hit", req.body); // confirms route is reached
  const db = JSON.parse(fs.readFileSync("db.json"));
  const product = { id: Date.now(), ...req.body };
  db.products.push(product);
  fs.writeFileSync("db.json", JSON.stringify(db, null, 2));
  res.status(201).json(product);
});

router.get("/", (req, res) => {
  const db = JSON.parse(fs.readFileSync("db.json"));
  res.json(db.products);
});

module.exports = router;