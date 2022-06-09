const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../model/user");
const {SECRET} = require("./database");

const userRegister = async (userDets, role, res) => {
  const { name, email, username, password } = userDets;

  let usernameNotTaken = await validateUsername(username);
  let emailNotRegistered = await validateEmail(email);

  if (!usernameNotTaken) {
    return res.status(400).json({
      message: `Username is already taken.`,
    });
  }

  if (!emailNotRegistered) {
    return res.status(400).json({
      message: `Email is already registered.`,
    });
  }

  const hashedPassword = await bcrypt.hash(password, 12);

  const user = new User({
    name,
    email,
    username,
    password: hashedPassword,
    role,
  });

  try {
    const savedUser = await user.save();
    res.status(200).json({
      message: "User registered successfully",
      user: savedUser,
    });
  } catch (err) {
    res.status(400).json({
      message: err,
    });
  }
};

const userLogin = async (userCreds, role, res) => {
  let { username, password } = userCreds;
  // First Check if the username is in the database
  const user = await User.findOne({ username });
  if (!user) {
    return res.status(404).json({
      message: "Username is not found. Invalid login credentials.",
      success: false,
    });
  }

  // We will check the role
  if (user.role !== role) {
    return res.status(403).json({
      message: "Please make sure you are logging in from the right portal.",
      success: false,
    });
  }

  // That means user is existing and trying to signin fro the right portal
  // Now check for the password
  let isMatch = await bcrypt.compare(password, user.password);

  if (isMatch) {

    let token = jwt.sign(
        {
          user_id: user._id,
          role: user.role,
          username: user.username,
          email: user.email
        },
        SECRET,
        { expiresIn: "7 days" }
      );
    
    let result = {
      username: user.username,
      role: user.role,
      email: user.email,
      token: `Bearer ${token}`,
      expiresIn: 168,
    };

    return res.status(200).json({
      ...result,
      message: "Hurray! You are now logged in.",
      success: true,
    });
  }
  else {
    return res.status(403).json({
        message: "Incorrect password.",
        success: false
      });
  }
};

const validateUsername = async (username) => {
  let user = await User.findOne({ username });
  return user ? false : true;
};

const validateEmail = async (email) => {
  let user = await User.findOne({ email });
  return user ? false : true;
};

module.exports = {
  userRegister,
  userLogin
};
