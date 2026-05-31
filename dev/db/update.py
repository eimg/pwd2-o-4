import sqlite3

db = sqlite3.connect("db/app.db")
cursor = db.cursor();

role = cursor.execute("UPDATE roles SET name=? WHERE name='Python'", ['Python3']);
db.commit()

print("A role updated")
