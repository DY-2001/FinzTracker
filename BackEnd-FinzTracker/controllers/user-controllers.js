const User = require("../models/User.js");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const mongoose = require('mongoose');
const register = async (req, res) => {
  try {
    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    // Create a new user
    const user = new User({
      email: req.body.email,
      password: hashedPassword,
      alertList: [],
    });

    const savedUser = await user.save();

    res.status(200).json({
      success: true,
      user: user,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err,
    });
  }
};

const login = async (req, res) => {
  try {
    // Check if the email exists
    const user = await User.findOne({ email: req.body.email });
    if (!user)
      return res
        .status(500)
        .json({ success: false, message: "Email is not found" });

    // Check if the password is correct
    const validPass = await bcrypt.compare(req.body.password, user.password);
    if (!validPass)
      return res.status(500).json({
        success: false,
        message: "Invalid Password! Password do not match!",
      });

    res.status(200).header("Authorization").send({
      success: true,
      message: "Login Success",
      user: user,
    });
  } catch (err) {
    console.log(err);
    res.status(500).send({
      success: false,
      message: err,
    });
  }
};

const updateUser = async (req, res) => {
  try {
    const userId = new mongoose.Types.ObjectId(req.params.id); 
    const updatedAlertList = {
        alertList: req.body.alertList
    }
    const updatedUser = await User.findByIdAndUpdate(userId, updatedAlertList, {
      new: true, 
    });
    res.status(200).json({
        success: true,
        message: "User Info updated",
        user: updatedUser,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err,
    });
  }
};

const getUserInfo = async (req, res) => {
  try {
    const userId = new mongoose.Types.ObjectId(req.params.id); 
    
    const user = await User.findById(userId);
    res.status(200).json({
        success: true,
        message: "User Info updated",
        user: user,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err,
    });
  }
}

module.exports = { register, login, updateUser, getUserInfo };
