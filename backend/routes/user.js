const express = require("express");
const router = express.Router();
const jwt = require('jsonwebtoken');
const zod = require("zod");
const { User, Account } = require("../db");
const { JWT_PASS } = require("../config");

const signupSchema = zod.object({
  username: zod.string().email(),
  firstName: zod.string(),
  lastName: zod.string(),
  password: zod.string()
});

router.post("/signup", async (req, res) => {
  const { username, firstName, lastName, password } = req.body;

  const validatedBody = signupSchema.safeParse(req.body);

  if (!validatedBody.success) {
    return res.status(411).json({ message: "Incorrect inputs" });
  };

  const existingUser = await User.findOne({ username: username });
  if (existingUser) {
    return res.status(411).json({ message: "Email already taken" });
  };

  try {

    const newUser = new User({
      username: username,
      firstName: firstName,
      lastName: lastName
    });

    const hashedPassword = await newUser.createHash(password);
    newUser.password_hash = hashedPassword;
    await newUser.save();

    const userId = newUser._id;
    await Account.create({
      userId: userId,
      balance: Math.random() * 10000
    });

  } catch (error) {
    res.status(411).json({ message: `An error occured while creating account ${error}` });
  }

  const token = jwt.sign(username, JWT_PASS);
  res.status(200).json({
    message: "User created successfully",
    token: token
  });

});



const signinSchema = zod.object({
  username: zod.string().email(),
  password: zod.string()
});
router.post("/signin", async (req, res) => {
  const { username, password } = req.body;

  const validatedBody = await signinSchema.safeParse(req.body);
  if (!validatedBody.success) {
    return res.status(411).json({ message: "Incorrect inputs" })
  };

  try {
    const user = await User.findOne({ username: username });
    if (!user) {
      return res.status(411).json({ message: "Incorrect username" });
    }
    const correctPassword = await user.validatePassword(password);
    if (!correctPassword) {
      return res.status(411).jaon({ message: "Incorrect password" });
    }

    const token = jwt.sign(username, JWT_PASS);
    res.status(200).json({ token: token });

  } catch (error) {
    return res.status(411).json({ message: `An error occured - ${error}` });
  }

})


module.exports = router;
