const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db.js");

// middleware
app.use(cors());
app.use(express.json()); // request.body

// Routes (Schnittstellen)


// create a todo

app.post("/todos", async(request, response) => {
    try {
         //console.log(request.body); -> destructure that

        const { description } = request.body;
        const newTodo = await pool.query("INSERT INTO todo (description) VALUES($1) RETURNING *", [description]);

        response.json(newTodo.rows[0]);

    } catch (error) {
        console.log(error.message);
    }
});

// get all todos

// get one todo

// update a todo

// delete a todo

app.listen(5000, () => {
    console.log("server has started on port 5000");
});

