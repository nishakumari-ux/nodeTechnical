const express = require("express");
const app = express();
const router = express.Router();
const userController = require("../controllers/task")
const auth = require("../middleware/authentication")

router.post("/createTask", userController.taskCreate)
router.get("/taskList", userController.taskList)
router.put("/updateTask", auth.ensureToken, userController.updateTask)
router.delete("/deleteTask/:id", userController.deleteTask)
router.get("/completeTaskList", userController.completeTaskList)
module.exports = router;