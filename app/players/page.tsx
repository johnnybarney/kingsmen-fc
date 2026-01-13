"use client";

import Link from "next/link";
import { players } from "./playersData";
import { useState } from "react";

const filters = ["ALL", "GK", "DEF", "MID", "FWD"] as const;

export default function PlayersPage() {
  const [activeFilter, setActiveFilter] = useState<typeof filters[number]>("ALL");
  const [search, setSearch] = useState("");

  const filteredPlayers = players.filter((player) => {
    const matchesFilter =
      activeFilter === "ALL" || player.positionCode === activeFilter;

    const matchesSearch = player.name
      .toLowerCase()
      .includes(search.toLowerCase());

    return matchesFilter && matchesSearch;
  });

  return (
    <section className="max-w-7xl mx-auto px-4 py-16">
      <h1 className="text-3xl font-bold mb-6 text-center text-white">
        Kingsmen FC Players
      </h1>

      {/* Search */}
      <input
  type="text"
  placeholder="Search player..."
  value={search}
  onChange={(e) => setSearch(e.target.value)}
  className="w-full sm:w-80 mb-6 px-4 py-2 rounded-lg bg-white/10 text-white placeholder:text-white/50 border border-white/15 focus:outline-none focus:ring-2 focus:ring-blue-500"
/>

      {/* Filters */}
      <div className="flex flex-wrap gap-2 mb-8">
        {filters.map((f) => (
          <button
            key={f}
            onClick={() => setActiveFilter(f)}
            className={
  activeFilter === f
    ? "bg-blue-600 text-white px-4 py-2 rounded-full"
    : "bg-white text-gray-900 px-4 py-2 rounded-full border border-gray-300 hover:bg-gray-100 transition"
}


          >
            {f}
          </button>
        ))}
      </div>

      {/* Players grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
        {filteredPlayers.map((player) => (
          <Link
            key={player.slug}
            href={`/players/${player.slug}`}
            className="group bg-white rounded-2xl shadow-md hover:shadow-xl transition overflow-hidden"
          >
            <img
              src={player.image}
              alt={player.name}
              onError={(e) => {
                e.currentTarget.src = "/players/placeholder.png";
              }}
              className="w-full h-56 object-cover group-hover:scale-105 transition-transform"
            />

            <div className="p-4 text-center">
              <p className="text-xs text-gray-500">
                #{player.number} · {player.position}
              </p>
              <h2 className="text-lg font-semibold mt-1">
                {player.name}
              </h2>
            </div>
          </Link>
        ))}

        {filteredPlayers.length === 0 && (
          <p className="col-span-full text-center text-gray-500">
            No players found.
          </p>
        )}
      </div>
    </section>
  );
}
