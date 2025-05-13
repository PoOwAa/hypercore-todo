import todoController from "./todo.controller.js";

export function addTodoRoutes(app) {
  app.respond("addTodo", todoController.addTodo.bind(todoController));
  app.respond("getTodos", todoController.getTodos.bind(todoController));
  app.respond("getTodo", todoController.getTodo.bind(todoController));
  app.respond("deleteTodo", todoController.deleteTodo.bind(todoController));
  app.respond("toggleTodo", todoController.toggleTodo.bind(todoController));
}
