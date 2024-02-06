const {
  fetchAllTasks,
  fetchTaskById,
  makeNewTask,
  updateTask,
  deleteTask,
} = require("../services/task.service");

const getAllTasks = (req, res) => {
  return fetchAllTasks(req, res);
};

const getTaskById = (req, res) => {
  const taskId = parseInt(req.params.id);
  return fetchTaskById(taskId, res);
};
const createNewTask = (req, res) => {
  return makeNewTask(req, res);
};

const updateExistingTask = (req, res) => {
  return updateTask(req, res);
};

const deleteExistingTask = (req, res) => {
  return deleteTask(req, res);
};

module.exports = {
  getAllTasks,
  getTaskById,
  createNewTask,
  updateExistingTask,
  deleteExistingTask,
};
