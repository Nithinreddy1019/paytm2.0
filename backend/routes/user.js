const express = require("express");
const router = express.Router();
const jwt = require('jsonwebtoken');
const zod = require("zod");
const { User, Account } = require("../db");
const { JWT_PASS } = require("../config");
const authMiddleware = require("../middlewares/authMiddleware");


router.get("/me", authMiddleware, async  (req, res) => {
  const username = req.username;
  if(!username){
    return res.status(400).json({message:"Not authorized/ not a user"});
  }

  const userDetails = await User.findOne({username: username});
  const userId = userDetails._id;

  const accountDetails= await Account.findOne({userId: userId});

  res.status(200).json({
    "user": {username: userDetails.username, firstName: userDetails.firstName},
    "account": {balance: accountDetails.balance}
  })

})



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

    const token = jwt.sign({ username: username }, JWT_PASS);
    res.status(200).json({ token: token });

  } catch (error) {
    return res.status(411).json({ message: `An error occured - ${error}` });
  }

});

const updateSchema = zod.object({
  firstName: zod.string().optional(),
  lastName: zod.string().optional(),
  password: zod.string().optional(),
})
router.put("/update", authMiddleware, async (req, res) => {
  const validatedBody = updateSchema.safeParse(req.body);
  if (!validatedBody.success) {
    return res.status(411).json({ message: "Error while updateing the information" })
  };

  const { firstName, lastName, password } = req.body;
  if (!password) {
    await User.updateOne({ username: req.username }, req.body);
    res.status(200).json({ message: "User updated successfully" });
    return;
  }

  const username = req.username;
  const user = await User.findOne({ username: username });
  const newHashedPassword = await user.createHash(password);

  await User.updateOne({ username: req.username }, { ...req.body, password: newHashedPassword });

  res.status(200).json({ message: "User updated successfully" });

})


router.get("/bulk", authMiddleware, async (req, res) => {
  const filter = req.query.filter || "";

  const users = await User.find({
    $or: [
      { firstName: { "$regex": filter } },
      { lastName: { "$regex": filter } }
    ]
  });

  res.json({
    user: users.map(user => ({
      username: user.username,
      firstName: user.firstName,
      lastName: user.lastName,
      id: user._id
    }))
  });

});


module.exports = router;
