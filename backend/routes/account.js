const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/authMiddleware");
const mongoose = require("mongoose");
const { Account, User } = require("../db");


router.get("/balance", authMiddleware, async (req, res) => {
  const username = req.username;
  const user = await User.findOne({ username: username });
  const userId = user._id;
  const account = await Account.findOne({ userId: userId });

  res.status(200).json({ balance: account.balance });

});





module.exports = router;
