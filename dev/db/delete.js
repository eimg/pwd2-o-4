const sqlite = require("better-sqlite3");
const db = sqlite("db/app.db");

const statement = db.prepare("DELETE FROM roles WHERE name=?");
const result = statement.run(['Update']);

console.log(result);
