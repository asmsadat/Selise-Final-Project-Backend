const Product = require("../models/productModel");

exports.getProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};

exports.addProduct = async (req, res) => {
  try {
      const { name, id, price, category, origin, availableAmount } = req.body;
      if (!name || !id || !price || !category || !origin || !availableAmount) {
        return res.status(400).json({ error: "Missing required value" });
      }
      const newProduct = new Product({ name, id, price, category, origin, availableAmount });
      const { error } = Product.validate(newProduct);
    if (error) {
        return res.status(400).json({ error: error.details[0].message });
    }
    await newProduct.save();
    res.json(newProduct);
  } catch (error) {
    res.status(400).json({ error: "Server error." });
  }
};

exports.editProduct = async (req, res) => {
    try {
      const productId = req.params.id;
  
      const { name, id, price, category, origin, availableAmount } = req.body;
      if (!name || !id || !price || !category || !origin || !availableAmount) {
        return res.status(400).json({ error: "Missing required value" });
      }
      if(productId!=id)
      {
          return res.status(400).json({ error: "ID not found" });
      }
      const productData = { name, price, category, origin, availableAmount };
      const { error } = Product.validate(productData);
  
      if (error) {
        return res.status(400).json({ error: error.details[0].message });
      }
  
      const editProduct = await Product.findOneAndUpdate({ id: productId }, productData, { new: true });
  
      if (!editProduct) {
        return res.status(404).json({ error: 'Product not found' });
      }
  
      res.json(editProduct);
    } catch (error) {
      res.status(500).json({ error: 'Server error' });
    }
  };

exports.deleteProduct = async (req, res) => {
    try {
      const productId = req.params.id;
      const product = await Product.findOneAndRemove({ id: productId });
  
      if (!product) {
        res.status(404).json({ error: 'Product not found' });
      } else {
        res.json({ message: 'Product deleted successfully' });
      }
    } catch (error) {
      res.status(500).json({ error: 'Server error' });
    }
  };