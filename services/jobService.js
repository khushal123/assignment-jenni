const Jobs = require("../database/models/jobs");
const userService = require("./userService");
const create = async (body) => {
  try {
    const user = await userService.getById(body.worker);
    if (user && user.role === "admin") {
      throw "User should be a worker";
    }
    const job = await Jobs.create(body);
    return job;
  } catch (error) {
    console.error(error)
    throw error;
  }
};

const getByUser = async (id) => {
  try {
    const jobs = await Jobs.find({ worker: id }).populate("worker");
    return jobs;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const list = async () => {
  try {
    const jobs = await Jobs.find({ worker: id }).populate("worker");
    return Jobs;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const update = async (body, id) => {
  try {
    const job = await Jobs.findOneAndUpdate(
      {
        _id: id,
      },
      {
        $set: body,
      },{
        new:true
      }
    );
    if(!job){
      throw "Invalid job id"
    }
    return job;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  create,
  list,
  getByUser,
  update,
};
