"use client";
import { useState } from "react";

export default function Home() {
  const [enroll, setEnroll] = useState("");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);

  const searchStudent = async () => {
    if (!enroll) return;

    setLoading(true);
    setResult("");

    try {
      const res = await fetch(`http://127.0.0.1:8000/students/${enroll}`);
      const data = await res.json();

      if (data.name) {
        setResult(data.name);
      } else {
        setResult("Student not found");
      }
    } catch (err) {
      setResult("Server error");
    }

    setLoading(false);
  };

  return (
    <main className="art-bg min-h-screen px-4 py-8 sm:px-6 md:py-12">
      <section className="mx-auto w-full max-w-xl art-card animate-fade-in">
        <p className="text-sm uppercase tracking-[0.22em] text-slate-700">
          Student Directory
        </p>

        <h1 className="mt-3 text-3xl font-semibold leading-tight text-slate-900 sm:text-4xl">
          Find a student by enrollment number
        </h1>

        <p className="mt-3 text-sm text-slate-700 sm:text-base">
          Quick search with clear, readable results built for phone and desktop.
        </p>

        <div className="mt-6 space-y-3">
          <label htmlFor="enroll" className="text-sm font-medium text-slate-800">
            Enrollment Number
          </label>

          <input
            id="enroll"
            type="number"
            placeholder="e.g. 230101"
            value={enroll}
            onChange={(e) => setEnroll(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                searchStudent();
              }
            }}
            className="field-input"
          />

          <button onClick={searchStudent} className="search-btn" disabled={loading}>
            {loading ? "Searching..." : "Search Student"}
          </button>
        </div>

        <div className="mt-6 result-panel" aria-live="polite">
          {loading ? "Looking up student..." : result || "Result will appear here."}
        </div>
      </section>
    </main>
  );
}