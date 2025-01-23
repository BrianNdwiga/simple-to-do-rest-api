
const { validateTodo } = require('../utils/validations');
const Todo = require('../models/Todo');

// Get todos
exports.getTodos = async (req, res) => {
    try {
        const todos = await Todo.find();

        // Simplify the response
        const simplifiedTodos = todos.map((todo) => ({
            id: todo.id,
            title: todo.title,
            completed: todo.completed,
        }));

        res.status(200).json({
            headers: { responseCode: 200, responseMessage: "Fetched Successfully" },
            body: simplifiedTodos,
        });
    } catch (error) {
        res.status(500).json({
            headers: { responseCode: 500, responseMessage: "Internal Server Error" },
            body: { error: error.message },
        });
    }
};

// Create a new todo
exports.createTodo = async (req, res) => {
    const { isValid, errors } = validateTodo(req.body);

    if (!isValid) {
        return res.status(400).json({
            headers: { responseCode: 400, responseMessage: "Validation Failed" },
            body: { errors },
        });
    }

    try {
        const newTodo = new Todo(req.body);
        const savedTodo = await newTodo.save();

        // Simplified response
        const responseBody = {
            id: savedTodo.id,
            title: savedTodo.title,
            completed: savedTodo.completed,
        };

        res.status(201).json({
            headers: { responseCode: 201, responseMessage: "Created Successfully" },
            body: responseBody,
        });
    } catch (error) {
        res.status(500).json({
            headers: { responseCode: 500, responseMessage: "Internal Server Error" },
            body: { error: error.message },
        });
    }
};


// update to do
exports.updateTodo = async (req, res) => {
    const { isValid, errors } = validateTodo(req.body);

    if (!isValid) {
        return res.status(400).json({
            headers: { responseCode: 400, responseMessage: "Validation Failed" },
            body: { errors },
        });
    }

    try {
        const updatedTodo = await Todo.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedTodo) {
            return res.status(404).json({
                headers: { responseCode: 404, responseMessage: "Todo Not Found" },
                body: {},
            });
        }

        const responseBody = {
            id: updatedTodo.id,
            title: updatedTodo.title,
            completed: updatedTodo.completed,
        };

        res.status(200).json({
            headers: { responseCode: 200, responseMessage: "Updated Successfully" },
            body: responseBody,
        });
    } catch (error) {
        res.status(500).json({
            headers: { responseCode: 500, responseMessage: "Internal Server Error" },
            body: { error: error.message },
        });
    }
};

// delete
exports.deleteTodo = async (req, res) => {
    try {
        const deletedTodo = await Todo.findByIdAndDelete(req.params.id);

        if (!deletedTodo) {
            return res.status(404).json({
                headers: { responseCode: 404, responseMessage: "Todo Not Found" },
                body: {},
            });
        }

        res.status(200).json({
            headers: { responseCode: 200, responseMessage: "Deleted Successfully" },
            body: {
                id: deletedTodo.id,
                title: deletedTodo.title,
                completed: deletedTodo.completed,
            },
        });
    } catch (error) {
        res.status(500).json({
            headers: { responseCode: 500, responseMessage: "Internal Server Error" },
            body: { error: error.message },
        });
    }
};
