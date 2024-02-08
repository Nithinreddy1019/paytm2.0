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


router.post("/transfer", authMiddleware, async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const { to_id, amount } = req.body;
    const fromUsername = req.username;
    const fromUser = await User.findOne({ username: fromUsername });
    const fromUserid = fromUser._id;

    const fromAccount = await Account.findOne({ userId: fromUserid }).session(session);
    if (!fromAccount || fromAccount.balance < amount) {
      await session.abortTransaction();
      return res.status(400).json({ message: "Insufficient balance" });
    };

    const toAccount = await Account.findOne({ userId: to_id });
    if (!toAccount) {
      res.status(400).json({ message: "Incorrect account" });
    };

    await Account.updateOne({ userId: fromUserid }, {
      $inc: { balance: -amount }
    }).session(session);
    await Account.updateOne({ userId: to_id }, {
      $inc: { balance: amount }
    });

    await session.commitTransaction();
    res.status(200).json({ message: "Transfer successfull" });

  } catch (error) {
    await session.abortTransaction();
    res.status(400).json({ message: "Something went wrong" });
  }
})




module.exports = router;
