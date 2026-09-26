const userModel = require("../models/user.model");
const jwt = require("jsonwebtoken");

async function userRegisterController(req, res) {
  const { email, password, name } = req.body;

  const userExists = await userModel.findOne({
    email: email,
  });

  if (userExists) {
    return res.status(422).json({
      message: `User already exists with this ${email}`,
    });
  }

  const user = await userModel.create({
    email,
    password,
    name,
  });

  const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET);

  res.cookie("token", token);
  res.status(201).json({
    user: {
      _id: user._id,
      email: user.email,
      name: user.name,
    },
    token,
  });
}

async function userLoginController(req, res) {
  const { email, password } = req.body;

  const userExists = await userModel.findOne({
    email,
  });

  if (!userExists)
    return res.send(
      `User with this ${email} does not exists Please Register First`,
    );

  const validPassword = userExists.comparePassword(password);

  if (!validPassword)
    return res.send(
      `Password is incorrect please try again with the correct password`,
    );

  const token = jwt.sign({ userId: userExists._id }, process.env.JWT_SECRET);

  res.cookie("token", token);
  res.status(201).json({
    user: {
      _id: userExists._id,
      email: userExists.email,
      name: userExists.name,
    },
    token,
  });
}

module.exports = {
  userRegisterController,
  userLoginController,
};
