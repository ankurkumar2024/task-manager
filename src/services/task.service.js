const fs = require("fs");

/**
 * The function fetchAllTasks reads a JSON file containing tasks, parses it, and returns the tasks as a
 * response.
 * @param req - The `req` parameter is the request object that contains information about the incoming
 * HTTP request, such as the request headers, request method, request URL, and request body. It is used
 * to retrieve information from the client making the request.
 * @param res - The `res` parameter is the response object that is used to send the response back to
 * the client. It contains methods and properties that allow you to control the response, such as
 * setting the status code and sending the response body.
 * @returns either a 404 status with the message 'No tasks found' if the parsedTasksJSON array is
 * empty, or a 200 status with the parsedTasksJSON array if it is not empty.
 */
const fetchAllTasks = (req, res) => {
  try {
    const tasks = fs.readFileSync("./src/tasks.json", "utf-8", "r");
    const parsedTasksJSON = JSON.parse(tasks);
    if (!parsedTasksJSON.length) {
      return res.status(404).send({ message: "No tasks found" });
    }
    return res.status(200).send(parsedTasksJSON);
  } catch (error) {
    console.log("Failed fetching the tasks due to error", error.message);
    return res.status(500).send({
      message: `Failed fetching the tasks due to error ${error.message}`,
    });
  }
};

/**
 * The function fetches a task by its ID from a JSON file and returns it as a response.
 * @param taskId - The `taskId` parameter is the unique identifier of the task that needs to be
 * fetched. It is used to search for the task in the `tasks.json` file.
 * @param res - The `res` parameter is the response object that is used to send the response back to
 * the client. It is typically an instance of the Express `Response` object.
 * @returns The function `fetchTaskById` returns a response object with the status code and the task
 * object. If the task is found, it returns a response with status code 200 and the task object. If the
 * task is not found, it returns a response with status code 404 and a message indicating that the task
 * does not exist. If there is an error while fetching the task, it returns a
 */
const fetchTaskById = (taskId, res) => {
  try {
    const tasks = fs.readFileSync("./src/tasks.json", "utf-8", "r");
    const parsedTasksJSON = JSON.parse(tasks);
    const givenTaskById = parsedTasksJSON.find((task) => task.id == taskId);
    if (!givenTaskById) {
      return res.status(404).send({ message: "provided task doesnot exists" });
    }
    return res.status(200).send(givenTaskById);
  } catch (error) {
    console.log(
      `Failed fetching the task ${taskId} due to error`,
      error.message,
    );
    return res.staus(500).send({
      message: `Failed fetching the task ${taskId} due to error ${error.message}`,
    });
  }
};

/**
 * The function `makeNewTask` creates a new task by reading the existing tasks from a JSON file, adding
 * the new task to the list, and then writing the updated list back to the file.
 * @param req - The `req` parameter is the request object that contains information about the incoming
 * HTTP request, such as the request headers, request body, and request parameters. It is typically
 * provided by the web framework or server handling the request.
 * @param res - The `res` parameter is the response object that is used to send the response back to
 * the client. It contains methods and properties that allow you to control the response, such as
 * setting the status code, sending data, and setting headers.
 * @returns In the try block, if the task is successfully created and written to the file, the function
 * will return a response with status code 201 and a message "Post created successfully".
 */
const makeNewTask = (req, res) => {
  try {
    const newTaskBody = req.body;
    const tasks = fs.readFileSync("./src/tasks.json", "utf-8", "r");
    const parsedTasksJSON = JSON.parse(tasks);
    const newTasks = [
      ...parsedTasksJSON,
      { id: parsedTasksJSON.length + 1, ...newTaskBody },
    ];
    fs.writeFile("./src/tasks.json", JSON.stringify(newTasks), (err) => {
      if (err) {
        return res.status(500).send({ message: "Failed creating the task" });
      }
      return res.status(201).send({ message: "Post created successfully" });
    });
  } catch (error) {
    console.log("Failed creating the task due to error", error.message);
    return res.status(500).send({
      message: `Failed creating the task due to error ${error.message}`,
    });
  }
};

/**
 * The function `updateTask` updates a task in a JSON file based on the provided task ID and new task
 * body.
 * @param req - The `req` parameter is the request object that contains information about the incoming
 * HTTP request, such as the request headers, request body, and request parameters.
 * @param res - The `res` parameter is the response object that is used to send the response back to
 * the client. It contains methods and properties that allow you to control the response, such as
 * setting the status code, sending data, and setting headers.
 * @returns a response object with a status code and a message.
 */
const updateTask = (req, res) => {
  try {
    const taskId = parseInt(req.params.id);
    const newTaskBody = req.body;
    const tasks = fs.readFileSync("./src/tasks.json", "utf-8", "r");
    const parsedTasksJSON = JSON.parse(tasks);
    const index = parsedTasksJSON.findIndex((task) => task.id === taskId);
    if (index === -1) {
      return res
        .status(404)
        .send({ message: `No task having id ${taskId} exists for editing` });
    }
    parsedTasksJSON[index] = { id: taskId, ...newTaskBody };
    fs.writeFile("./src/tasks.json", JSON.stringify(parsedTasksJSON), (err) => {
      if (err) {
        return res
          .status(500)
          .send({ message: "Failed updating the existing task" });
      }
      return res
        .status(200)
        .send({ message: "Task has been updated successfully" });
    });
  } catch (error) {
    console.log("Failed updating the task due to error", error.message);
    return res.status(500).send({
      message: `Failed updating the task due to error ${error.message}`,
    });
  }
};

/**
 * The `deleteTask` function deletes a task from a JSON file based on the provided task ID.
 * @param req - The `req` parameter is the request object that contains information about the incoming
 * HTTP request, such as the request headers, request parameters, request body, etc. It is used to
 * retrieve data from the client and pass it to the server.
 * @param res - The `res` parameter is the response object that is used to send the response back to
 * the client. It contains methods and properties that allow you to control the response, such as
 * setting the status code, sending data, and setting headers.
 * @returns a response object with a status code and a message.
 */
const deleteTask = (req, res) => {
  try {
    const taskId = parseInt(req.params.id);
    const tasks = fs.readFileSync("./src/tasks.json", "utf-8", "r");
    const parsedTasksJSON = JSON.parse(tasks);
    const index = parsedTasksJSON.findIndex((task) => task.id === taskId);
    if (index === -1) {
      return res
        .status(404)
        .send({ message: `No task having id ${taskId} exists for deleting` });
    }
    parsedTasksJSON.splice(index, 1);
    fs.writeFile("./src/tasks.json", JSON.stringify(parsedTasksJSON), (err) => {
      if (err) {
        return res
          .status(500)
          .send({ message: "Failed deleting the existing task" });
      }
      return res
        .status(200)
        .send({ message: "Task has been deleted successfully" });
    });
  } catch (error) {
    console.log("Failed deleting the task due to error", error.message);
    return res.status(500).send({
      message: `Failed deleting the task due to error ${error.message}`,
    });
  }
};

module.exports = {
  fetchAllTasks,
  fetchTaskById,
  makeNewTask,
  updateTask,
  deleteTask,
};
