const Product = require("../models/product.model");

exports.createProduct = async (req, res) => {
  const ownerId = req.user;
  const role = req.role;
  const { name, price, description, quantity } = req.body;
  if (!name || !price || !description || !quantity) {
    return res.status(400).json({ message: "Please fill all fields" });
  }

  try {
    if (role === "user") {
      const product = new Product({
        name,
        price,
        description,
        quantity,
        owner: ownerId,
      });
      await product.save();
      return res.status(200).json({ message: "Product created successfully" });
    } else {
      return res.status(401).json({ message: "Unauthorized" });
    }
  } catch (err) {
    console.error("Error during product creation:", err);
    return res.status(500).json({ message: "Internal server error" });
  }
};

exports.getProductsByUser = async (req, res) => {
  const userId = req.user;
  const role = req.role;
  if (role === "admin") {
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    const products = await Product.find({ owner: userId });
    if (!products) {
      return res.status(404).json({ message: "Products not found" });
    }
    return res.status(200).json(products);
  } catch (err) {
    console.error("Error in getProductsByUser:", err);
    return res.status(500).json({ message: "Internal server error" });
  }
};

exports.getProductById = async (req, res) => {
  const { id } = req.params;
  const role = req.role;
  const userId = req.user;

  if (role === "admin") {
    return res.status(401).json({ message: "Unauthorized" });
  }
  try {
    const product = await Product.findOne({ _id: id, owner: userId });
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    return res.status(200).json(product);
  } catch (error) {
    console.error("Error in getProductById:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

exports.updateProduct = async (req, res) => {
  const { id } = req.params;
  const role = req.role;
  const userId = req.user;
  const { name, price, description, quantity } = req.body;

  if (!name && !price && !description && !quantity) {
    return res.status(400).json({ message: "Please add any field" });
  }

  if (role === "admin") {
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    const product = await Product.findOne({ _id: id, owner: userId });
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    if (name) {
      product.name = name;
    }
    if (price) {
      product.price = price;
    }
    if (description) {
      product.description = description;
    }
    if (quantity) {
      product.quantity = quantity;
    }
    await product.save();
    return res.status(200).json({ message: "Product updated successfully" });
  } catch (error) {
    console.error("Error in updateProduct:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

exports.deleteProduct = async (req, res) => {
  const { id } = req.params;
  const role = req.role;
  const userId = req.user;
  if (role === "admin") {
    return res.status(401).json({ message: "Unauthorized" });
  }
  try {
    const product = await Product.findOne({ _id: id, owner: userId });
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    await product.deleteOne({ _id: id, owner: userId });
    return res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    console.error("Error in deleteProduct:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
