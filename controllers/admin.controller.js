const User = require("../models/user.model");
const Product = require("../models/product.model");

exports.getAllUsers =async (req, res) => {
    const userId = req.user;
    const role = req.role;
    if (role !== "admin") {
        return res.status(401).json({ message: "Unauthorized" });
    }
    try {
        const user = await  User.find({role:"user"});
        return res.status(200).json(user);
        
    } catch (error) {
        console.error("Error in getAllUsers:", error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
}

exports.getAllProducts = async (req, res) => {
    const userId = req.user;
    const role = req.role;
    if (role !== "admin") {
        return res.status(401).json({ message: "Unauthorized" });
    }
    try {
        const product = await  Product.find();
        return res.status(200).json(product);
        
    } catch (error) {
        console.error("Error in getAllProducts:", error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
}