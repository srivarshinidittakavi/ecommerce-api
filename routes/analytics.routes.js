const express = require("express")
const fs = require("fs")
const router = express.Router()

router.get("/allorders", (req, res) => {
  const db = JSON.parse(fs.readFileSync("db.json"))
  const orders = []
  db.orders.forEach(o => orders.push(o))
  res.json({ count: orders.length, orders })
})

router.get("/cancelled-orders", (req, res) => {
  const db = JSON.parse(fs.readFileSync("db.json"))
  const cancelled = db.orders.filter(o => o.status === "cancelled")
  res.json({ count: cancelled.length, orders: cancelled })
})

router.get("/shipped", (req, res) => {
  const db = JSON.parse(fs.readFileSync("db.json"))
  const shipped = db.orders.filter(o => o.status === "shipped")
  res.json({ count: shipped.length, orders: shipped })
})

router.get("/total-revenue/:productId", (req, res) => {
  const db = JSON.parse(fs.readFileSync("db.json"))
  const product = db.products.find(p => p.id == req.params.productId)
  if (!product) return res.status(404).json({ message: "Product not found" })

  const revenue = db.orders
    .filter(o => o.productId == product.id && o.status !== "cancelled")
    .reduce((sum, o) => sum + o.quantity * product.price, 0)

  res.json({ productId: product.id, totalRevenue: revenue })
})

router.get("/alltotalrevenue", (req, res) => {
  const db = JSON.parse(fs.readFileSync("db.json"))

  const totalRevenue = db.orders
    .filter(o => o.status !== "cancelled")
    .reduce((sum, o) => {
      const product = db.products.find(p => p.id === o.productId)
      return sum + o.quantity * product.price
    }, 0)

  res.json({ totalRevenue })
})

module.exports = router
