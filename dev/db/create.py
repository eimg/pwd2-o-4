import sqlite3

db = sqlite3.connect("db/app.db")
cursor = db.cursor();

role = cursor.execute("INSERT INTO roles (name) VALUES (?)", ['Python']);
db.commit()

print("A new role added")
