const express = require("express");
const userRouter = express.Router();
const User = require("../models/user");
const { validateEditProfileData } = require("../utils/validation");
const bcrypt = require("bcrypt");
const { userAuth } = require("../middlewares/auth");
const _ = require("lodash");

// GET CURRENT USER DETAILS
userRouter.get("/me", userAuth, async (req, res) => {
  try {
    const user = req.user;
    const userSafe = _.pick(user, ["_id", "firstName", "lastName", "emailId", "gender"]);
    res.json(userSafe);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// UPDATE CURRENT USER DETAILS
userRouter.patch("/me", userAuth, async (req, res) => {
  try {
    const isEditAllowed = validateEditProfileData(req);
    if (!isEditAllowed) {
      return res.status(400).json({ error: "Invalid fields in update request." });
    }

    const allowedFields = ["firstName", "lastName", "emailId", "gender"];
    const updates = {};
    allowedFields.forEach((field) => {
      if (req.body[field] !== undefined) updates[field] = req.body[field];
    });

    if (updates.emailId && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(updates.emailId)) {
      return res.status(400).json({ error: "Invalid email format." });
    }

    if (updates.emailId) {
      const existingUser = await User.findOne({ emailId: updates.emailId });
      if (existingUser && existingUser._id.toString() !== req.user._id.toString()) {
        return res.status(400).json({ error: "Email is already in use by another user." });
      }
    }

    const updatedUser = await User.findByIdAndUpdate(req.user._id, updates, { new: true }).select("-password");
    res.json(updatedUser);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// PASSWORD CHANGE ENDPOINT
userRouter.patch("/me/password", userAuth, async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;

    if (!currentPassword || !newPassword) {
      return res.status(400).json({ error: "Current and new passwords are required." });
    }

    const validator = require("validator");
    if (!validator.isStrongPassword(newPassword)) {
      return res.status(400).json({ error: "Please enter a strong new password!" });
    }

    const user = req.user;

    const isCurrentPasswordValid = await user.validatePassword(currentPassword);

    if (!isCurrentPasswordValid) {
      return res.status(400).json({ error: "Current password is incorrect." });
    }

    const newHashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = newHashedPassword;
    await user.save();

    res.send("Password updated successfully.");
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = userRouter;
