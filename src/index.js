import RPC from "@hyperswarm/rpc";
import { getDbInstance } from "./db.js";

async function main() {
  const rpc = new RPC();

  const server = rpc.createServer();

  await server.listen();
  console.log(
    `🟢 Server listening. Public key (hex): ${server.publicKey.toString("hex")}`
  );

  server.respond("addTodo", async (req) => {
    const todo = req.toString();
    console.log(`✅ Todo added: ${todo}`);
    const db = await getDbInstance();
    // Use timestamp as a unique key
    const key = "todo-" + Date.now().toString();
    await db.put(key, todo);
    return Buffer.from(`Todo added: ${todo}`);
  });

  server.respond("getTodos", async () => {
    const db = await getDbInstance();
    const todos = [];
    for await (const { key, value } of db.createReadStream()) {
      todos.push({ key, value });
    }
    console.log("ℹ️ getTodos", todos);
    return Buffer.from(JSON.stringify(todos));
  });

  server.respond("getTodo", async (req) => {
    const key = req.toString();
    console.log(`ℹ️ getTodo ${key}`);
    const db = await getDbInstance();
    const todo = await db.get(key);
    if (todo) {
      return Buffer.from(todo.value);
    } else {
      return Buffer.from("Todo not found");
    }
  });

  server.respond("deleteTodo", async (req) => {
    const key = req.toString();
    console.log(`🗑️ Todo deleted: ${key}`);
    const db = await getDbInstance();
    await db.del(key);
    return Buffer.from(`Todo deleted: ${key}`);
  });
}

main();
