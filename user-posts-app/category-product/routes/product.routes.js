const express = require("express");
const router = express.Router();
const { addProduct, getAllProducts } = require("../controllers/product.controller");

router.post("/add-product", addProduct);
router.get("/products", getAllProducts);

module.exports = router;
