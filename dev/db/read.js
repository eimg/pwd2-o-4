const sqlite = require("better-sqlite3");
const db = sqlite("db/app.db");

const roles = db.prepare("SELECT * FROM roles").all();

console.log(roles);
