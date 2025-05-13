import path from "path";
import { fileURLToPath } from "url";
import Hypercore from "hypercore";
import Hyperbee from "hyperbee";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const storagePath = path.resolve(__dirname, "../storage/db");

const core = new Hypercore(storagePath, { valueEncoding: "json" });
let db = null;
export async function getDbInstance() {
  if (!db) {
    await core.ready();
    db = new Hyperbee(core, {
      keyEncoding: "utf-8",
      valueEncoding: "json",
    });
  }

  return db;
}
