import Link from "next/link";
import NextMatchCard from "./components/NextMatchCard";
import { players } from "./players/playersData";
import { matches } from "./matches/matchesData";

/* ---------- Helpers ---------- */

function parseScore(score: string): { gf: number; ga: number } | null {
  const cleaned = score.replace(/\s+/g, "");
  const parts = cleaned.split(/[-:]/);
  if (parts.length !== 2) return null;

  const gf = Number(parts[0]);
  const ga = Number(parts[1]);
  if (Number.isNaN(gf) || Number.isNaN(ga)) return null;

  return { gf, ga };
}

function calcTeamSummary() {
  const results = matches.filter((m) => m.score);
  let wins = 0;
  let goalsFor = 0;

  results.forEach((m) => {
    if (!m.score) return;
    const parsed = parseScore(m.score);
    if (!parsed) return;

    goalsFor += parsed.gf;
    if (parsed.gf > parsed.ga) wins += 1;
  });

  return { wins, goalsFor };
}

function getTodayYYYYMMDD() {
  const d = new Date();
  const yyyy = d.getFullYear();
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  const dd = String(d.getDate()).padStart(2, "0");
  return `${yyyy}-${mm}-${dd}`;
}

function getNextMatch() {
  const today = getTodayYYYYMMDD();

  // Upcoming = no score yet + future (or today)
  return (
    matches
      .filter((m) => !m.score && m.date >= today)
      .sort((a, b) => (a.date > b.date ? 1 : -1))[0] ?? null
  );
}

/* ---------- Page ---------- */

export default function Home() {
  const nextMatch = getNextMatch();
  const { wins, goalsFor } = calcTeamSummary();

  return (
    <main className="min-h-full animate-pageFade">
      <section className="min-h-full flex flex-col items-center justify-center text-center px-4 py-16">
        {/* HERO */}
        <div className="animate-fadeInUp">
          <h1 className="text-5xl sm:text-6xl font-extrabold tracking-tight text-gray-900">
            Kingsmen FC
          </h1>

          <p className="mt-4 text-gray-600 text-lg max-w-2xl mx-auto">
            Welcome to the official website of Kingsmen FC. Stay updated with our
            players, matches, and latest news.
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link
              href="/players"
              className="px-6 py-3 rounded-xl bg-blue-600 text-white font-semibold hover:bg-blue-700 transition"
            >
              Explore Players
            </Link>

            <Link
              href="/matches"
              className="px-6 py-3 rounded-xl bg-white border border-gray-200 text-gray-900 font-semibold hover:bg-gray-50 transition"
            >
              View Matches
            </Link>
          </div>
        </div>

        {/* NEXT MATCH CARD */}
        <div className="mt-14 w-full max-w-xl text-left animate-fadeInUp delay-150">
          <NextMatchCard match={nextMatch} />
        </div>

        {/* QUICK STATS */}
        <div className="mt-10 grid grid-cols-3 gap-3 max-w-xl w-full">
          <div className="rounded-2xl bg-gray-50 p-4 text-center">
            <p className="text-2xl font-extrabold text-gray-900">
              {players.length}
            </p>
            <p className="text-sm text-gray-600">Players</p>
          </div>

          <div className="rounded-2xl bg-gray-50 p-4 text-center">
            <p className="text-2xl font-extrabold text-gray-900">{wins}</p>
            <p className="text-sm text-gray-600">Wins</p>
          </div>

          <div className="rounded-2xl bg-gray-50 p-4 text-center">
            <p className="text-2xl font-extrabold text-gray-900">
              {goalsFor}
            </p>
            <p className="text-sm text-gray-600">Goals</p>
          </div>
        </div>
      </section>
    </main>
  );
}
