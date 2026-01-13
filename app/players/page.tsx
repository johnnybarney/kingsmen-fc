"use client";

import Link from "next/link";
import { players } from "./playersData";
import { useMemo, useState } from "react";

type PositionCode = "GK" | "DEF" | "MID" | "FWD" | "ALL";

const positionLabels: Record<Exclude<PositionCode, "ALL">, string> = {
  GK: "Goalkeepers",
  DEF: "Defenders",
  MID: "Midfielders",
  FWD: "Forwards",
};

const pills: PositionCode[] = ["ALL", "GK", "DEF", "MID", "FWD"];

function PlayerCard({ slug, name, position, number, image }: any) {
  return (
    <Link
      href={`/players/${slug}`}
      className="group block overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-black/5 hover:shadow-lg transition"
    >
      <div className="relative">
        <img
          src={image}
          alt={name}
          onError={(e) => {
            e.currentTarget.src = "/players/placeholder.png";
          }}
          className="h-56 w-full object-cover group-hover:scale-[1.03] transition-transform duration-300"
        />

        <div className="absolute left-3 top-3 rounded-full bg-black/80 px-3 py-1 text-sm font-semibold text-white">
          #{number}
        </div>
      </div>

      <div className="p-4">
        <p className="text-xs uppercase tracking-wide text-gray-500">
          {position}
        </p>
        <h3 className="mt-1 text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
          {name}
        </h3>
      </div>
    </Link>
  );
}

export default function PlayersPage() {
  const [active, setActive] = useState<PositionCode>("ALL");
  const [search, setSearch] = useState("");

  const filtered = useMemo(() => {
    const s = search.trim().toLowerCase();
    return players.filter((p) => {
      const matchesSearch = !s || p.name.toLowerCase().includes(s);
      const matchesPos = active === "ALL" || p.positionCode === active;
      return matchesSearch && matchesPos;
    });
  }, [active, search]);

  const grouped = useMemo(() => {
    const groups: Record<Exclude<PositionCode, "ALL">, typeof players> = {
      GK: [],
      DEF: [],
      MID: [],
      FWD: [],
    };
    filtered.forEach((p) => {
      groups[p.positionCode].push(p);
    });
    return groups;
  }, [filtered]);

  return (
    <section className="max-w-7xl mx-auto px-4 py-14">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-extrabold tracking-tight text-gray-900">
          Players
        </h1>
        <p className="mt-2 text-gray-600 max-w-2xl">
          Meet the Kingsmen FC squad. Search or filter by position, then tap a
          player to view their profile.
        </p>
      </div>

      {/* Controls */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between mb-10">
        {/* Search */}
        <input
          type="text"
          placeholder="Search player..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full sm:w-96 px-4 py-2 rounded-xl bg-white border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        {/* Pills */}
        <div className="flex flex-wrap gap-2">
          {pills.map((p) => (
            <button
              key={p}
              onClick={() => setActive(p)}
              className={
                active === p
                  ? "px-4 py-2 rounded-full bg-blue-600 text-white font-semibold"
                  : "px-4 py-2 rounded-full bg-white border border-gray-200 text-gray-800 hover:bg-gray-50 transition"
              }
            >
              {p}
            </button>
          ))}
        </div>
      </div>

      {/* If ALL: show sections like Man City */}
      {active === "ALL" ? (
        <div className="space-y-12">
          {(["GK", "DEF", "MID", "FWD"] as const).map((code) => (
            <div key={code}>
              <div className="flex items-end justify-between mb-4">
                <h2 className="text-2xl font-bold text-gray-900">
                  {positionLabels[code]}
                </h2>
                <span className="text-sm text-gray-500">
                  {grouped[code].length} players
                </span>
              </div>

              {grouped[code].length === 0 ? (
                <p className="text-gray-500">No players in this position yet.</p>
              ) : (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
                  {grouped[code].map((player) => (
                    <PlayerCard key={player.slug} {...player} />
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      ) : (
        // If filtered to a position: show one grid
        <div>
          <div className="flex items-end justify-between mb-4">
            <h2 className="text-2xl font-bold text-gray-900">
              {active === "ALL" ? "All Players" : positionLabels[active]}
            </h2>
            <span className="text-sm text-gray-500">{filtered.length} players</span>
          </div>

          {filtered.length === 0 ? (
            <p className="text-gray-500">No players found.</p>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
              {filtered.map((player) => (
                <PlayerCard key={player.slug} {...player} />
              ))}
            </div>
          )}
        </div>
      )}
    </section>
  );
}
