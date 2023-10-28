const express = require("express");
const router = express.Router();
const cartController = require("../controllers/cartController");

// Define the myProducts routes
router.get("/", cartController.getCart);
router.post("/", cartController.addCart);
router.put("/:id", cartController.editCart);
router.delete("/:id", cartController.deleteCart);

module.exports = router;