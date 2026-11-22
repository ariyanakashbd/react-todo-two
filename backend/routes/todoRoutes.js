const express = require("express");
const router = express.Router();

const {
  getTodos,
  getTodoById,
  createTodo,
  updateTodo,
  deleteTodo,
} = require("../controllers/todoController");

// /api/todos  →  GET (সব আনা), POST (নতুন তৈরি)
router.route("/").get(getTodos).post(createTodo);

// /api/todos/:id  →  GET (একটা আনা), PUT (update), DELETE (delete)
router.route("/:id").get(getTodoById).put(updateTodo).delete(deleteTodo);

module.exports = router;
