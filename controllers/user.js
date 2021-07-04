const userService = require("./../services/userService");
const { successResponse, errorResponse } = require("../utils/response");

const createAdmin = async (req, res) => {
  try {
    req.body.role = "admin"
    const user = await userService.create(req.body);
    return successResponse(res, user, 201)
  } catch (error) {
    console.error(error)
    return errorResponse(res, error, 400)
  }
};

const createWorker = async (req, res) => {
  try {
    req.body.role = "worker";
    const user = await userService.create(req.body);
    return successResponse(res, user, 201)
  } catch (error) {
    return errorResponse(res, error, 400)
  }
};

const login = async (req, res) => {
  try {
    const user = await userService.emailLogin(req.body);
    return successResponse(res, user, 200);
  } catch (error) {
    console.error(error)
    return errorResponse(res, error, 400);
  }
};


const list = async (req, res) => {
  try {
    const users = await userService.list();
    return successResponse(res, users, 200);
  } catch (error) {
    console.error(error)
    return errorResponse(res, error, 400);
  }
};



module.exports = {
  createAdmin,
  createWorker,
  login,
  list
};
