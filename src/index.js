const RPC = require("@hyperswarm/rpc");

const todos = [];

async function main() {
  const rpc = new RPC();

  const server = rpc.createServer();

  await server.listen();
  console.log(
    `🟢 Server listening. Public key (hex): ${server.publicKey.toString("hex")}`
  );

  server.respond("addTodo", (req) => {
    const todo = req.toString();
    console.log(`✅ Todo added: ${todo}`);
    todos.push(todo);
    return Buffer.from(`Todo added: ${todo}`);
  });
  server.respond("getTodos", () => {
    console.log("ℹ️ getTodos", todos);
    return Buffer.from(JSON.stringify(todos));
  });
}

main();
