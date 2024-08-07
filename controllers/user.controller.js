const User = require("../models/user.model");
const bcrypt = require("bcryptjs");

exports.getProfile = async (req, res) => {
  const userId = req.user;
  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    return res.status(200).json(user);
  } catch (err) {
    console.error("Error in getProfile:", err);
    return res.status(500).json({ message: "Internal server error" });
  }
};

exports.updateProfile = async (req, res) => {
  const userId = req.user;
  const role = req.role;
  // only update the name or email or both
  const { name, email } = req.body;
  if (!name && !email) {
    return res.status(400).json({ message: "Please fill at least one field" });
  }
  if (role === "admin") {
    return res.status(401).json({ message: "Unauthorized" });
  }
  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    if (name) {
      user.name = name;
    }
    if (email) {
      user.email = email;
    }
    await user.save();
    return res.status(200).json({ message: "Profile updated successfully" });
  } catch (err) {
    console.error("Error in updateProfile:", err);
    return res.status(500).json({ message: "Internal server error" });
  }
};

exports.resetPassword = async (req, res) => {
  const userId = req.user;
  const { oldPassword, newPassword } = req.body;
  if (!oldPassword || !newPassword) {
    return res.status(400).json({ message: "Please fill the  field" });
  }
  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const isPasswordCorrect = await bcrypt.compare(oldPassword, user.password);
    if (!isPasswordCorrect) {
      return res.status(401).json({ message: "Invalid password" });
    }

    user.password = await bcrypt.hash(newPassword, 10);

    await user.save();
    return res.status(200).json({ message: "Password reset successfully" });
  } catch (error) {
    console.error("Error in resetPassword:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
