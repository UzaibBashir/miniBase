from fastapi import FastAPI, Query
from fastapi.middleware.cors import CORSMiddleware
from pathlib import Path
from sqlalchemy import create_engine, text

app = FastAPI()

#frontend connection allowance
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

BASE_DIR = Path(__file__).resolve().parent
DB_PATH = BASE_DIR / "students.db"
engine = create_engine(f"sqlite:///{DB_PATH.as_posix()}")

@app.get("/")
def home():
    return {"message": "Welcome\n API is running!"}

@app.get("/students/{enroll}")
def get_student(enroll: int):
    with engine.connect() as connection:
        result = connection.execute(text("SELECT name FROM students WHERE id = :enroll"), {"enroll": enroll})
        student = result.fetchone()
        if student:
            return {"name": student[0]}
        else:
            return {"error": "Student not found"}


@app.get("/students")
def search_students(q: str = Query("", min_length=1), limit: int = Query(8, ge=1, le=20)):
    if not q.strip():
        return {"matches": []}

    id_query = f"{q.strip()}%"
    name_query = f"%{q.strip().lower()}%"

    with engine.connect() as connection:
        result = connection.execute(
            text(
                """
                SELECT id, name
                FROM students
                WHERE CAST(id AS TEXT) LIKE :id_query
                   OR lower(name) LIKE :name_query
                ORDER BY id
                LIMIT :limit
                """
            ),
            {"id_query": id_query, "name_query": name_query, "limit": limit},
        )
        matches = [{"id": row[0], "name": row[1]} for row in result]

    return {"matches": matches}