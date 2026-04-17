from sqlalchemy import create_engine

# Keep paths direct and simple for beginners.
engine = create_engine("sqlite:///students.db")

with open("data.sql", "r") as f:
    sql_commands = f.read().split(";")  # split statements

with engine.begin() as connection:
    for command in sql_commands:
        command = command.strip()
        if command:
            connection.exec_driver_sql(command)

print("Database created successfully!")