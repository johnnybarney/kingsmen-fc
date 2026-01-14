import Link from "next/link";
import { players } from "../players/playersData";
import { matches } from "../matches/matchesData";

function StatCard({
  label,
  value,
  hint,
}: {
  label: string;
  value: string | number;
  hint?: string;
}) {
  return (
    <div className="rounded-2xl bg-white shadow-sm ring-1 ring-black/5 p-5">
      <p className="text-sm text-gray-500">{label}</p>
      <p className="mt-2 text-3xl font-extrabold text-gray-900">{value}</p>
      {hint ? <p className="mt-2 text-sm text-gray-600">{hint}</p> : null}
    </div>
  );
}

function parseScore(score: string): { gf: number; ga: number } | null {
  // Supports: "2-1", "2 - 1", "2:1"
  const cleaned = score.replace(/\s+/g, "");
  const parts = cleaned.split(/[-:]/);

  if (parts.length !== 2) return null;

  const gf = Number(parts[0]);
  const ga = Number(parts[1]);

  if (Number.isNaN(gf) || Number.isNaN(ga)) return null;
  return { gf, ga };
}

export default function TeamStatsPage() {
  const results = matches.filter((m) => m.score);

  let played = 0;
  let wins = 0;
  let draws = 0;
  let losses = 0;
  let goalsFor = 0;
  let goalsAgainst = 0;

  results.forEach((m) => {
    if (!m.score) return;

    const parsed = parseScore(m.score);
    if (!parsed) return;

    played += 1;
    goalsFor += parsed.gf;
    goalsAgainst += parsed.ga;

    if (parsed.gf > parsed.ga) wins += 1;
    else if (parsed.gf === parsed.ga) draws += 1;
    else losses += 1;
  });

  const goalDifference = goalsFor - goalsAgainst;

  return (
    <section className="max-w-7xl mx-auto px-4 py-14">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between mb-10">
        <div>
          <h1 className="text-4xl font-extrabold tracking-tight text-gray-900">
            Team Stats
          </h1>
          <p className="mt-2 text-gray-600 max-w-2xl">
            Automatically calculated from your Results matches.
          </p>
        </div>

        <div className="flex gap-3">
          <Link
            href="/matches"
            className="px-4 py-2 rounded-xl bg-white border border-gray-200 hover:bg-gray-50 transition"
          >
            View Matches
          </Link>
          <Link
            href="/players"
            className="px-4 py-2 rounded-xl bg-blue-600 text-white hover:bg-blue-700 transition"
          >
            View Players
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-5 mb-8">
        <StatCard label="Players" value={players.length} hint="Current squad" />
        <StatCard label="Matches Played" value={played} hint="Results only" />
        <StatCard label="Wins" value={wins} hint="From results" />
        <StatCard
          label="Goal Difference"
          value={goalDifference >= 0 ? `+${goalDifference}` : `${goalDifference}`}
          hint={`${goalsFor} scored · ${goalsAgainst} conceded`}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <StatCard label="Draws" value={draws} />
        <StatCard label="Losses" value={losses} />
        <StatCard label="Goals Scored" value={goalsFor} />
      </div>

      <div className="mt-10 rounded-2xl bg-gray-50 border border-gray-200 p-6">
        <h2 className="text-xl font-bold text-gray-900">How to update stats</h2>
        <p className="mt-2 text-gray-600">
          Go to Matches Data and add a <b>score</b> for completed games (example:
          <b> “2 - 1”</b>). The stats page will update automatically.
        </p>
      </div>
    </section>
  );
}
