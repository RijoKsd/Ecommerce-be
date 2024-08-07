const userRouter = require("express").Router();
const auth = require("../middleware/verifyJWT");
const {
  getProfile,
  updateProfile,
  resetPassword,
} = require("../controllers/user.controller");

userRouter.get("/profile", auth, getProfile);
userRouter.put("/profile", auth, updateProfile);
userRouter.put("/resetPassword", auth, resetPassword);


module.exports = userRouter;

