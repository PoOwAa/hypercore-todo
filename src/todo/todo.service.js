import { getTodoDb } from "../db.js";
import { v4 as uuid } from "uuid";

export class TodoService {
  async init() {
    this.db = await getTodoDb();
  }

  async addTodo(todo) {
    const key = uuid();
    await this.db.put(key, {
      value: todo,
      completed: false,
    });
    console.log(`✅ Todo added: ${key} - ${todo}`);
    return key;
  }

  async getTodos() {
    const todos = [];
    for await (const { key, value } of this.db.createReadStream()) {
      todos.push({
        key,
        ...value,
      });
    }
    console.log(`✅ Todos retrieved: ${todos.length} items`);
    return todos;
  }

  async getTodo(key) {
    const todo = await this.db.get(key);
    if (todo) {
      return {
        key,
        ...todo.value,
      };
    } else {
      throw new Error("Todo not found");
    }
  }

  async deleteTodo(key) {
    await this.db.del(key);
    console.log(`✅ Todo deleted: ${key}`);
    return key;
  }

  async toggleTodo(key) {
    const todo = await this.getTodo(key);
    todo.value.completed = !todo.value.completed;
    await this.db.put(key, todo);
    console.log(`✅ Todo toggled: ${key} - ${todo.value.completed}`);
    return key;
  }
}
