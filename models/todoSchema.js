var mongoose = require("mongoose");

var todoSchema = new mongoose.Schema({
    todo: {
        type: String,
        required: "Can't be empty!"
    },
    completed: {
        type: Boolean,
        default: false
    },
    date_created: {
        type: Date,
        default: Date.now
    }
});

var Todo = mongoose.model("todos", todoSchema);

module.exports = Todo;