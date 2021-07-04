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
    const job = await jobService.getByUser(req.params.worker);
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
    const job = await jobService.update(req.body, req.params.jobId);
    return successResponse(res, job, 200);
  } catch (error) {
    console.log(error);
    return errorResponse(res, error, 400);
  }
};

module.exports = {
  create,
  list,
  getByUser,
  update,
};
