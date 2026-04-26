from pathlib import Path

from sqlalchemy import create_engine

BASE_DIR = Path(__file__).resolve().parent
DB_PATH = BASE_DIR / "students.db"
SQL_PATH = BASE_DIR / "data.sql"

engine = create_engine(f"sqlite:///{DB_PATH.as_posix()}")

with open(SQL_PATH, "r", encoding="utf-8") as f:
    sql_commands = f.read().split(";")  # split statements

with engine.begin() as connection:
    for command in sql_commands:
        command = command.strip()
        if command:
            connection.exec_driver_sql(command)

print("Database created successfully!")