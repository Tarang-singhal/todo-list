//WITH AJAX

$(document).ready(function() {
    $.getJSON("/api/todos")
        .then(addTodos);

    $(".form").keypress(function(event) {
        if (event.which == 13 || event.keyCode == 13) {
            var userInput = $("#todoInput").val();
            if (userInput) {
                $.post("/api/todos", { todo: userInput })
                    .then(addTodo)
            }

        }
    });

    $("ul").on("click", "li i", function() {
        $.ajax({
                type: "delete",
                url: "/api/todos/" + $(this).parent().data('id'),
            })
            .then(() => {
                $(this).parent().remove();
            })
    })

    $("ul").on("click", "li span", function() {

        $.ajax({
                type: "put",
                url: "/api/todos/" + $(this).parent().data('id'),
                data: {
                    completed: !($(this).parent().data('complete'))
                }
            })
            .then(() => {
                $(this).toggleClass("done");
            })
    })

});

function addTodos(data) {
    data.forEach(addTodo);
}

function addTodo(todo) {
    $("#todoInput").val("");
    var done = "";
    if (todo.completed) {
        done = " class= \"done\" ";
    }
    var newTodo = $("<li><span" + done + ">" + todo.todo + "</span><i class='fa fa-trash'></i></li>");
    newTodo.data("id", todo._id);
    newTodo.data("complete", todo.completed);
    $("section ul").append(newTodo);
}


//WITHOUT AJAX
fetch("/api/todos")
    .then((response) => {
        return response.json();
    })
    .then((todos) => {
        todos.forEach((todo) => {
            var done = "";
            if (todo.completed) {
                done = " class= \"done\" ";
            }
            var newTodo = "<li><span" + done + ">" + todo.todo + "</span><i class='fa fa-trash'></i></li>";
            document.querySelector("section ul").innerHTML += newTodo;
        });
    });

// var todoInput = document.querySelector("#todoInput");
// todoInput.addEventListener("keypress", (event) => {
//     if (event.key === "Enter") {
//         console.log("enter");
//     }
// })