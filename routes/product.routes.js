const productRouter = require("express").Router();
const auth = require("../middleware/verifyJWT");
const {
  createProduct,
  getProductsByUser,
  getProductById,
} = require("../controllers/product.controller");

productRouter.post("/create", auth, createProduct);
productRouter.get("/all", auth, getProductsByUser);
productRouter.get("/:id", auth, getProductById);

module.exports = productRouter;