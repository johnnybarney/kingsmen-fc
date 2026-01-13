import Link from "next/link";
import { matches } from "./matchesData";

export default function MatchesPage() {
  const upcoming = matches.filter((m) => !m.score);
  const results = matches.filter((m) => m.score);

  return (
    <section className="max-w-5xl mx-auto px-4 py-16">
      <h1 className="text-3xl font-bold text-center mb-10">
        Matches & Fixtures
      </h1>

      {/* Upcoming */}
      <h2 className="text-xl font-semibold mb-4">Upcoming</h2>
      <div className="space-y-4 mb-10">
        {upcoming.length === 0 && (
          <p className="text-gray-500">No upcoming matches.</p>
        )}

        {upcoming.map((match) => (
          <Link
            key={match.id}
            href={`/matches/${match.id}`}
            className="block bg-white rounded-xl shadow p-6 hover:shadow-lg transition"
          >
            <p className="text-sm text-gray-500">{match.date}</p>
            <p className="text-lg font-semibold">
              Kingsmen FC vs {match.opponent}
            </p>
            <p className="text-gray-600">
              {match.competition} · {match.venue}
            </p>
            <span className="inline-block mt-4 bg-blue-600 text-white px-4 py-2 rounded-lg">
              Upcoming
            </span>
          </Link>
        ))}
      </div>

      {/* Results */}
      <h2 className="text-xl font-semibold mb-4">Results</h2>
      <div className="space-y-4">
        {results.length === 0 && (
          <p className="text-gray-500">No results yet.</p>
        )}

        {results.map((match) => (
          <Link
            key={match.id}
            href={`/matches/${match.id}`}
            className="block bg-white rounded-xl shadow p-6 hover:shadow-lg transition"
          >
            <p className="text-sm text-gray-500">{match.date}</p>
            <p className="text-lg font-semibold">
              Kingsmen FC vs {match.opponent}
            </p>
            <p className="text-gray-600">
              {match.competition} · {match.venue}
            </p>
            <span className="inline-block mt-4 bg-gray-900 text-white px-4 py-2 rounded-lg">
              {match.score}
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}
