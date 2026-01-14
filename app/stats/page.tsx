import Link from "next/link";
import { players } from "../players/playersData";

type TeamStats = {
  matchesPlayed: number;
  wins: number;
  draws: number;
  losses: number;
  goalsFor: number;
  goalsAgainst: number;
};

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

export default function TeamStatsPage() {
  // ✅ For now: simple “manual stats” (we’ll connect to matches later)
  const stats: TeamStats = {
    matchesPlayed: 12,
    wins: 7,
    draws: 2,
    losses: 3,
    goalsFor: 21,
    goalsAgainst: 14,
  };

  const goalDifference = stats.goalsFor - stats.goalsAgainst;

  return (
    <section className="max-w-7xl mx-auto px-4 py-14">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between mb-10">
        <div>
          <h1 className="text-4xl font-extrabold tracking-tight text-gray-900">
            Team Stats
          </h1>
          <p className="mt-2 text-gray-600 max-w-2xl">
            Quick overview of Kingsmen FC performance this season.
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

      {/* Top highlight row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-5 mb-8">
        <StatCard label="Players" value={players.length} hint="Current squad" />
        <StatCard label="Matches" value={stats.matchesPlayed} hint="Played" />
        <StatCard label="Wins" value={stats.wins} hint="This season" />
        <StatCard
          label="Goal Difference"
          value={goalDifference >= 0 ? `+${goalDifference}` : `${goalDifference}`}
          hint={`${stats.goalsFor} scored · ${stats.goalsAgainst} conceded`}
        />
      </div>

      {/* Detailed row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <StatCard label="Draws" value={stats.draws} />
        <StatCard label="Losses" value={stats.losses} />
        <StatCard label="Goals Scored" value={stats.goalsFor} />
      </div>

      <div className="mt-10 rounded-2xl bg-gray-50 border border-gray-200 p-6">
        <h2 className="text-xl font-bold text-gray-900">Next step</h2>
        <p className="mt-2 text-gray-600">
          Later, we’ll calculate these stats automatically from your Matches page
          data (so you never manually update numbers).
        </p>
      </div>
    </section>
  );
}
