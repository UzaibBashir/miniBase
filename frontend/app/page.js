"use client";
import { useEffect, useState } from "react";

export default function Home() {
  const [enroll, setEnroll] = useState("");
  const [result, setResult] = useState("");
  const [matches, setMatches] = useState([]);
  const [loadingMatches, setLoadingMatches] = useState(false);
  const [showMatches, setShowMatches] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const typedValue = enroll.trim();

    if (!typedValue) {
      setMatches([]);
      setShowMatches(false);
      setLoadingMatches(false);
      return;
    }

    const controller = new AbortController();
    const timer = setTimeout(async () => {
      setLoadingMatches(true);

      try {
        const res = await fetch(
          `http://127.0.0.1:8000/students?q=${encodeURIComponent(typedValue)}&limit=7`,
          { signal: controller.signal }
        );

        const data = await res.json();
        setMatches(Array.isArray(data.matches) ? data.matches : []);
        setShowMatches(true);
      } catch (err) {
        if (err.name !== "AbortError") {
          setMatches([]);
        }
      } finally {
        setLoadingMatches(false);
      }
    }, 180);

    return () => {
      clearTimeout(timer);
      controller.abort();
    };
  }, [enroll]);

  const searchStudent = async () => {
    const query = enroll.trim();
    if (!query) return;

    setLoading(true);
    setShowMatches(false);
    setResult("");

    try {
      const res = await fetch(
        `http://127.0.0.1:8000/students?q=${encodeURIComponent(query)}&limit=20`
      );
      const data = await res.json();
      const list = Array.isArray(data.matches) ? data.matches : [];

      let selected = null;

      if (/^\d+$/.test(query)) {
        selected = list.find((item) => String(item.id) === query) || list[0] || null;
      } else {
        const loweredQuery = query.toLowerCase();
        selected =
          list.find((item) => item.name.toLowerCase() === loweredQuery) ||
          list.find((item) => item.name.toLowerCase().includes(loweredQuery)) ||
          list[0] ||
          null;
      }

      if (selected) {
        setResult(`${selected.name} (${selected.id})`);
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
            type="text"
            placeholder="e.g. 230101 or Uzaib"
            value={enroll}
            onChange={(e) => {
              setEnroll(e.target.value);
              setResult("");
            }}
            onFocus={() => {
              if (enroll.trim()) {
                setShowMatches(true);
              }
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                searchStudent();
              }
            }}
            className="field-input"
          />

          {showMatches && (
            <ul className="suggestions-panel" aria-label="Matching students">
              {loadingMatches ? (
                <li className="suggestion-muted">Looking for matches...</li>
              ) : matches.length > 0 ? (
                matches.map((match) => (
                  <li key={match.id}>
                    <button
                      type="button"
                      className="suggestion-item"
                      onClick={() => {
                        setEnroll(String(match.id));
                        setResult(match.name);
                        setShowMatches(false);
                      }}
                    >
                      <span className="suggestion-id">{match.id}</span>
                      <span className="suggestion-name">{match.name}</span>
                    </button>
                  </li>
                ))
              ) : (
                <li className="suggestion-muted">No matches found.</li>
              )}
            </ul>
          )}
        </div>

        <div className="mt-6 result-panel" aria-live="polite">
          {loading ? "Looking up student..." : result || "Result will appear here."}
        </div>
      </section>
    </main>
  );
}