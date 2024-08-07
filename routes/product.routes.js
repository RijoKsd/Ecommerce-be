const productRouter = require("express").Router();
const auth = require("../middleware/verifyJWT");
const {
  createProduct,
  getProductsByUser,
  getProductById,
  updateProduct,
  deleteProduct,
} = require("../controllers/product.controller");

productRouter.post("/create", auth, createProduct);
productRouter.get("/all", auth, getProductsByUser);
productRouter.get("/:id", auth, getProductById);
productRouter.put("/:id", auth, updateProduct);
productRouter.delete("/:id", auth, deleteProduct);

module.exports = productRouter;