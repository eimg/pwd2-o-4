const sqlite = require("better-sqlite3");
const db = sqlite("db/app.db");

const statement = db.prepare("INSERT INTO roles (name) VALUES (?)");
const result = statement.run(['Test']);

console.log(result);
