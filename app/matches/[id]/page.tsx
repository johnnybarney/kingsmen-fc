"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { matches } from "../matchesData";

export default function MatchDetailPage() {
  const params = useParams();
  const id = params.id as string;

  const match = matches.find((m) => m.id === id);

  if (!match) {
    return (
      <section className="max-w-5xl mx-auto px-4 py-16">
        <p className="mb-6">Match not found.</p>
        <Link href="/matches" className="text-blue-600 underline">
          Back to matches
        </Link>
      </section>
    );
  }

  return (
    <section className="max-w-5xl mx-auto px-4 py-16">
      <Link href="/matches" className="text-blue-600 underline">
        ← Back to matches
      </Link>

      <h1 className="text-3xl font-bold mt-6">
        Kingsmen FC vs {match.opponent}
      </h1>

      <p className="text-gray-600 mt-2">
        {match.date} · {match.competition} · {match.venue}
      </p>

      <div className="mt-6 bg-white rounded-xl shadow p-6">
        {match.score ? (
          <p className="text-xl font-semibold">Final Score: {match.score}</p>
        ) : (
          <p className="text-xl font-semibold text-blue-600">Upcoming Match</p>
        )}

        {match.notes && (
          <p className="mt-4 text-gray-700 leading-relaxed">{match.notes}</p>
        )}
      </div>
    </section>
  );
}
