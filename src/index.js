import RPC from "@hyperswarm/rpc";
import { addTodoRoutes } from "./todo/todo.routes.js";

const rpc = new RPC();

const server = rpc.createServer();

await server.listen();
console.log(
  `🟢 Server listening. Public key (hex): ${server.publicKey.toString("hex")}`
);

addTodoRoutes(server);
console.log("🟢 Todo routes added.");
