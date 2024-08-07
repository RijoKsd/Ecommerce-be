const adminRouter = require("express").Router();
const { getAllProducts, getAllUsers } = require("../controllers/admin.controller");
const auth = require("../middleware/verifyJWT");
 
adminRouter.get("/allUsers", auth, getAllUsers);
adminRouter.get("/allProducts",auth, getAllProducts);

module.exports = adminRouter;