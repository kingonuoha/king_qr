"use client";

import { useEffect, useState } from "react";

export default function ThemeToggle() {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
  }, [dark]);

  return (
    <button
      type="button"
      aria-label="Toggle dark mode"
      aria-pressed={dark}
      onClick={() => setDark((prev) => !prev)}
      className="rounded-lg bg-card p-2 text-ink ring-1 ring-line outline-none transition hover:ring-brand-purple focus-visible:ring-2 focus-visible:ring-brand-purple"
    >
      {dark ? (
        <svg
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        >
          <circle cx="10" cy="10" r="4" />
          <path d="M10 1v2M10 17v2M1 10h2M17 10h2M3.5 3.5l1.4 1.4M15.1 15.1l1.4 1.4M16.5 3.5l-1.4 1.4M4.9 15.1l-1.4 1.4" />
        </svg>
      ) : (
        <svg
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M17.5 11.5A7.5 7.5 0 0 1 8.5 2.5a7.5 7.5 0 1 0 9 9z" />
        </svg>
      )}
    </button>
  );
}
