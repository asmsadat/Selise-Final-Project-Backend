const express = require("express");
const router = express.Router();
const productController = require("../controllers/productController");

// Define the product routes
router.get("/", productController.getProducts);
router.post("/", productController.addProduct);
router.put("/:id", productController.editProduct);
router.delete("/:id", productController.deleteProduct);

module.exports = router;