const User = require("../database/models/user");
const { generateToken, compareHash } = require("../utils/hash");
const create = async (body) => {
  try {
    const { email } = body;
    let user = await User.findOne({
      email: email,
    });
    if (user) {
      throw "Email already exists";
    }
    user = await User.create(body);
    return user;
  } catch (error) {
    throw error;
  }
};

const login = async (body) => {
  try {
    const { email, password } = body;
    let user = await User.findOne({
      email: email,
    });
    if (!user) {
      throw "Invalid email";
    }
    const validatePassword = await compareHash(password, user.password);
    const token = generateToken(user._id);
    return token;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const list = async () => {
  try {
    const users = await User.find({});
    return users;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const getById = async (id) => {
  try {
    const user = await User.findOne({ _id: id });
    return user;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  create,
  list,
  emailLogin: login,
  getById,
};
