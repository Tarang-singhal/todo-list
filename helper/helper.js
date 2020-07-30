var Todo = require("../models/todoSchema");
module.exports = {
    getTodos: (req, res) => {
        Todo.find()
            .then((todos) => {
                res.json(todos);
            })
            .catch((err) => {
                console.log(err);
                res.send(err);
            });
    },
    create: (req, res) => {
        Todo.create(req.body)
            .then((newTodo) => {
                res.status(201).json(newTodo);
            })
            .catch((err) => {
                console.log(err);
                res.send(err);
            })
    },
    find: (req, res) => {
        var todo_id = req.params.todo_id;
        Todo.findById(todo_id)
            .then((foundTodo) => {
                res.json(foundTodo);
            })
            .catch((err) => {
                console.log(err);
                res.send(err);
            })

    },
    update: (req, res) => {
        Todo.findOneAndUpdate({ _id: req.params.todo_id }, req.body, { new: true })
            .then((updatedTodo) => {
                res.json(updatedTodo);
            })
            .catch((err) => {
                console.log(err);
                res.send(err);
            })
    },
    delete: (req, res) => {
        Todo.findOneAndDelete(req.params.todo_id)
            .then((deletedTodo) => {
                res.json({ message: "We deleted it!" });
            })
            .catch((err) => {
                console.log(err);
                res.send(err);
            })
    }
}