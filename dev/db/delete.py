import sqlite3

db = sqlite3.connect("db/app.db")
cursor = db.cursor();

role = cursor.execute("DELETE FROM roles WHERE name=?", ['Python3']);
db.commit()

print("A role deleted")
