const sqlite = require("better-sqlite3");
const db = sqlite("db/app.db");

const statement = db.prepare("UPDATE roles SET name='Update' WHERE name=?");
const result = statement.run(['Test']);

console.log(result);
