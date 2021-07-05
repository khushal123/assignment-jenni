const jobService = require("../services/jobService");
const { successResponse, errorResponse } = require("../utils/response");

const create = async (req, res) => {
  try {
    const job = await jobService.create(req.body);
    return successResponse(res, job, 201);
  } catch (error) {
    return errorResponse(res, error, 400);
  }
};

const getByUser = async (req, res) => {
  try {
    const id = req.user._id;
    const job = await jobService.getByUser(id);
    return successResponse(res, job, 200);
  } catch (error) {
    return errorResponse(res, error, 400);
  }
};

const list = async (req, res) => {
  try {
    const job = await jobService.list();
    return successResponse(res, job, 201);
  } catch (error) {
    return errorResponse(res, error, 400);
  }
};

const update = async (req, res) => {
  try {
    const userId = req.user._id
    const job = await jobService.update(req.body, req.params.jobId, userId);
    return successResponse(res, job, 200);
  } catch (error) {
    return errorResponse(res, error, 400);
  }
};

module.exports = {
  create,
  list,
  getByUser,
  update,
};
