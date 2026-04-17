from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
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

engine = create_engine("sqlite:///students.db")

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