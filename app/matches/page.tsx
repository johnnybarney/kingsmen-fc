import Link from "next/link";
import type { ReactNode } from "react";
import { matches } from "./matchesData";

/* ---------- helpers ---------- */

function parseScore(score: string): { gf: number; ga: number } | null {
  // supports: "2-1", "2 - 1", "2:1"
  const cleaned = score.replace(/\s+/g, "");
  const parts = cleaned.split(/[-:]/);
  if (parts.length !== 2) return null;

  const gf = Number(parts[0]);
  const ga = Number(parts[1]);

  if (Number.isNaN(gf) || Number.isNaN(ga)) return null;
  return { gf, ga };
}

function getResultBadge(score?: string) {
  if (!score) return null;

  const parsed = parseScore(score);
  if (!parsed) {
    return { label: "RESULT", cls: "bg-gray-100 text-gray-700 ring-gray-200" };
  }

  if (parsed.gf > parsed.ga) {
    return { label: "WIN", cls: "bg-green-100 text-green-800 ring-green-200" };
  }

  if (parsed.gf < parsed.ga) {
    return { label: "LOSS", cls: "bg-red-100 text-red-800 ring-red-200" };
  }

  return { label: "DRAW", cls: "bg-yellow-100 text-yellow-800 ring-yellow-200" };
}

function Pill({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <span
      className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold ring-1 ${className}`}
    >
      {children}
    </span>
  );
}

/* ---------- page ---------- */

export default function MatchesPage() {
  const upcoming = matches
    .filter((m) => !m.score)
    .sort((a, b) => (a.date > b.date ? 1 : -1));

  const results = matches
    .filter((m) => !!m.score)
    .sort((a, b) => (a.date > b.date ? -1 : 1)); // newest first

  return (
    <section className="max-w-6xl mx-auto px-4 py-14 animate-pageFade">
      <h1 className="text-4xl font-extrabold text-gray-900 text-center">
        Matches & Fixtures
      </h1>
      <p className="mt-2 text-center text-gray-600">
        Upcoming fixtures and recent results for Kingsmen FC.
      </p>

      {/* ---------- UPCOMING ---------- */}
      <div className="mt-12">
        <div className="flex items-end justify-between">
          <h2 className="text-2xl font-bold text-gray-900">Upcoming</h2>
          <span className="text-sm text-gray-500">
            {upcoming.length} match(es)
          </span>
        </div>

        <div className="mt-5 grid gap-4">
          {upcoming.length === 0 ? (
            <div className="rounded-2xl bg-white border border-gray-200 p-6 text-gray-600">
              No upcoming matches yet.
            </div>
          ) : (
            upcoming.map((m) => (
              <Link
                key={m.id}
                href={`/matches/${m.id}`}
                className="group rounded-2xl bg-white border border-gray-200 p-5 hover:shadow-md transition"
              >
                <p className="text-sm text-gray-500">{m.date}</p>

                <p className="text-lg font-semibold text-gray-900">
                  Kingsmen FC vs {m.opponent}
                </p>

                <div className="mt-2 flex flex-wrap gap-2">
                  <Pill className="bg-blue-50 text-blue-700 ring-blue-200">
                    {m.competition}
                  </Pill>

                  <Pill
                    className={
                      m.venue === "Home"
                        ? "bg-green-50 text-green-700 ring-green-200"
                        : "bg-amber-50 text-amber-700 ring-amber-200"
                    }
                  >
                    {m.venue}
                  </Pill>

                  <Pill className="bg-blue-600 text-white ring-blue-600/30">
                    UPCOMING
                  </Pill>
                </div>

                <div className="mt-3 text-blue-600 font-semibold">
                  View →
                </div>
              </Link>
            ))
          )}
        </div>
      </div>

      {/* ---------- RESULTS ---------- */}
      <div className="mt-14">
        <div className="flex items-end justify-between">
          <h2 className="text-2xl font-bold text-gray-900">Results</h2>
          <span className="text-sm text-gray-500">
            {results.length} match(es)
          </span>
        </div>

        <div className="mt-5 grid gap-4">
          {results.length === 0 ? (
            <div className="rounded-2xl bg-white border border-gray-200 p-6 text-gray-600">
              No results yet.
            </div>
          ) : (
            results.map((m) => {
              const badge = getResultBadge(m.score);

              return (
                <Link
                  key={m.id}
                  href={`/matches/${m.id}`}
                  className="group rounded-2xl bg-white border border-gray-200 p-5 hover:shadow-md transition"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div>
                      <p className="text-sm text-gray-500">{m.date}</p>

                      <p className="text-lg font-semibold text-gray-900">
                        Kingsmen FC vs {m.opponent}
                      </p>

                      <div className="mt-2 flex flex-wrap gap-2 items-center">
                        <Pill className="bg-blue-50 text-blue-700 ring-blue-200">
                          {m.competition}
                        </Pill>

                        <Pill
                          className={
                            m.venue === "Home"
                              ? "bg-green-50 text-green-700 ring-green-200"
                              : "bg-amber-50 text-amber-700 ring-amber-200"
                          }
                        >
                          {m.venue}
                        </Pill>

                        {/* ✅ WIN / DRAW / LOSS badge */}
                        {badge && (
                          <Pill className={badge.cls}>{badge.label}</Pill>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center gap-4">
                      <span className="inline-flex items-center rounded-xl bg-gray-900 text-white px-4 py-2 font-bold">
                        {m.score}
                      </span>
                      <span className="text-blue-600 font-semibold">
                        View →
                      </span>
                    </div>
                  </div>
                </Link>
              );
            })
          )}
        </div>
      </div>
    </section>
  );
}
