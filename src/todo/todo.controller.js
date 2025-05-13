import { TodoService } from "./todo.service.js";

const todoService = new TodoService();

await todoService.init();

class TodoController {
  constructor() {
    this.todoService = todoService;
  }

  async init() {
    await this.todoService.init();
  }

  async addTodo(req) {
    const todo = req.toString();
    const key = await this.todoService.addTodo(todo);
    return Buffer.from(key);
  }
  async getTodos() {
    const todos = await this.todoService.getTodos();
    return Buffer.from(JSON.stringify(todos));
  }
  async getTodo(req) {
    const key = req.toString();
    const todo = await this.todoService.getTodo(key);
    return Buffer.from(JSON.stringify(todo));
  }
  async deleteTodo(req) {
    const key = req.toString();
    await this.todoService.deleteTodo(key);
    return Buffer.from(key);
  }
  async toggleTodo(req) {
    const key = req.toString();
    const todo = await this.todoService.toggleTodo(key);
    return Buffer.from(todo);
  }
}

const todoController = new TodoController();
await todoController.init();

export default todoController;
