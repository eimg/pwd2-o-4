import sqlite3

db = sqlite3.connect("db/app.db")
cursor = db.cursor();

roles = cursor.execute("SELECT * FROM roles");
print(roles.fetchall())
