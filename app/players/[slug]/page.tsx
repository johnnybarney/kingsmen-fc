"use client";

import { useParams } from "next/navigation";
import { players } from "../playersData";

export default function PlayerDetailPage() {
  const params = useParams();
  const slug = params.slug as string;

  const player = players.find((p) => p.slug === slug);

  if (!player) {
    return <p className="p-8">Player not found</p>;
  }

  return (
    <section className="max-w-5xl mx-auto px-4 py-16">
      <div className="grid sm:grid-cols-2 gap-10 items-center">
        <img
          src={player.image}
          alt={player.name}
          className="rounded-2xl shadow-lg w-full"
        />

        <div>
          <span className="inline-block bg-blue-600 text-white px-4 py-1 rounded-full text-sm mb-4">
            #{player.number}
          </span>

          <h1 className="text-4xl font-extrabold">{player.name}</h1>

          <p className="mt-3 text-lg text-gray-600">
            Position: <span className="font-medium">{player.position}</span>
          </p>

          <p className="mt-2 text-gray-600">Age: {player.age}</p>
          <p className="text-gray-600">Nationality: {player.nationality}</p>

          <p className="mt-6 text-gray-700 leading-relaxed">
            Player bio will go here. You can describe experience,
            achievements, and playing style.
          </p>
        </div>
      </div>
    </section>
  );
}
