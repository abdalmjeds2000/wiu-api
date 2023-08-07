const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const secret = process.env.DB_SECRET_KEY;
const UserModel = require('../../models/user');

module.exports = async (req, res) => {
  const {username, password} = req.body;
  const user = await UserModel.findOne({ username });
  !user && res.status(404).send({ status: "error", message: "User doesn't Exist!"});

  // const isPasswordValid = await bcrypt.compare(password, user.password);
  const isPasswordValid = password === user?.password;
  !isPasswordValid && res.status(401).send({ status: "error", message: "Username or Password Wrong!" });
  
  const token = jwt.sign({
    id: user._id,
    username: user.username,
    userImage: user.userImage,
    email: user.email,
    isAdmin: user.isAdmin
  }, secret);
  return res.status(200).send({ status: "success", message: `Welcome back, ${username}`, token });
}