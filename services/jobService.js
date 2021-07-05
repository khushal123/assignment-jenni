const Jobs = require("../database/models/jobs");
const userService = require("./userService");
const create = async (body) => {
  try {
    const user = await userService.getById(body.worker);
    if(!user){
      throw "Invalid worker id";
    }
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
    console.log(jobs)
    if(jobs.length === 0){
      throw "no jobs found"
    }
    return jobs
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

const update = async (body, id, userId) => {
  try {
    const job = await Jobs.findOneAndUpdate(
      {
        _id: id,
        worker:userId
      },
      {
        $set: body,
      },{
        new:true
      }
    );
    if(!job){
      throw "job not found"
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
