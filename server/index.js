const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db.js");

// middleware
app.use(cors());
app.use(express.json()); // request.body

// Routes (Schnittstellen)

// create a todo

app.post("/todos", async (request, response) => {
  try {
    //console.log(request.body); -> destructure that

    const { description } = request.body;
    const newTodo = await pool.query(
      "INSERT INTO todo (description) VALUES($1) RETURNING *",
      [description]
    );

    response.json(newTodo.rows[0]);
  } catch (error) {
    console.error(error.message);
  }
});

// get all todos

app.get("/todos", async (request, response) => {
  try {
    const allToDos = await pool.query("SELECT * FROM todo");
    response.json(allToDos.rows);
  } catch (error) {
    console.error(error.message);
  }
});

// get one todo

app.get("/todos/:id", async (request, response) => {
  try {
    const { id } = request.params;
    const todo = await pool.query("SELECT * FROM todo WHERE todo_id = $1", [
      id,
    ]);

    // 0 -> only the first item
    response.json(todo.rows[0]);
  } catch (error) {
    console.error(error.message);
  }
});

// update a todo

app.put("/todos/:id", async(request, response) => {
  try {
    const { id } = request.params; // which todo
    const { description } = request.body; // give me its body
    const updateTodo = await pool.query("UPDATE todo SET description = $1 WHERE todo_id = $2", [description, id]);
    response.json("todo was updated");
  } catch (error) {
    console.error(error);
  }
});

// delete a todo

app.delete ("/todos/:id", async(request, response) => {
    try {
      const { id } = request.params;
      const deleteTodo = await pool.query("DELETE FROM todo WHERE todo_id = $1", [id]);
      response.json("todo was deleted");
    } catch (error) {
      console.error(error);
    }
});

//----

app.listen(5000, () => {
  console.log("server has started on port 5000");
});
