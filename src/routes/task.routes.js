const express = require("express");
const router = express.Router();
const {
  getAllTasks,
  getTaskById,
  createNewTask,
  updateExistingTask,
  deleteExistingTask,
} = require("../controllers/task.controller");
const {
  validateGetTaskById,
  validateTaskCreation,
  validateUpdateExistingTask,
  deleteExistingTaskById,
} = require("../middlewares/task.middleware");

router.get("/", getAllTasks);
router.get("/:id", validateGetTaskById, getTaskById);
router.post("/", validateTaskCreation, createNewTask);
router.put("/:id", validateUpdateExistingTask, updateExistingTask);
router.delete("/:id", deleteExistingTaskById, deleteExistingTask);

module.exports = router;
