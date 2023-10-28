const Cart = require("../models/cartModel");

exports.getCart = async (req, res) => {
  try {
    const carts = await Cart.find();
    res.json(carts);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};

exports.addCart = async (req, res) => {
  try {
    const { name, id, price, category, origin, selectedAmount } = req.body;
    if (!name || !id || !price || !category || !origin || !selectedAmount) {
        return res.status(400).json({ error: "Missing required fields" });
    }
    const newCart = new Cart({ name, id, price, category, origin, selectedAmount });
    
    const { error } = Cart.validate(newCart);

    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }

    await newCart.save();
    res.json(newCart);
  } catch (error) {
    res.status(400).json({ error: "Invalid request data" });
  }
};

exports.editCart = async (req, res) => {
  try {
    const cartId = req.params.id;
    const { name, price, id, category, origin, selectedAmount } = req.body;
    if (!name || !id || !price || !category || !origin || !selectedAmount) {
        return res.status(400).json({ error: "Missing required fields" });
      }
    if(cartId != id){
        return res.status(400).json({ error: "ID not found" });
    }
    const cartData = { name, price, category, origin, selectedAmount };
    const { error } = Cart.validate(cartData);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }

    const editedCart = await Cart.findOneAndUpdate(
      { id: cartId },
      cartData,
      { new: true }
    );

    if (!editedCart) {
      return res.status(404).json({ error: "Product not found" });
    }

    res.json(editedCart);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};

exports.deleteCart = async (req, res) => {
  try {
    const cartId = req.params.id;
    const cart = await Cart.findOneAndRemove({ id: cartId });

    if (!cart) {
      res.status(404).json({ error: "Product not found" });
    } else {
      res.json({ message: "Product deleted successfully" });
    }
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};
