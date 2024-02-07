const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const { jwt_pass, monoConnection } = require("./config");

mongoose.connect(monoConnection);

const userSchema = mongoose.Schema({
  username: { type: String, required: true, unique: true },
  firstName: { type: String },
  lastName: { type: String },
  password_hash: { type: String, required: true }
});

//to hash password
userSchema.methods.createHash = async function(plainPassword) {
  const saltRounds = 10;
  const salt = await bcrypt.genSalt(saltRounds);

  return await bcrypt.hash(plainPassword, salt);
};

//to chech password
userSchema.methods.validatePassword = async function(passwordValue) {
  return await bcrypt.compare(passwordValue, this.password_hash);
}

const accountSchema = mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  balance: { type: Number }
});

const User = mongoose.model('User', userSchema);
const Account = mongoose.model('Account', accountSchema);


module.exports = {
  User, Account
};



