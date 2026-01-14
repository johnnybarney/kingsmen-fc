"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

type Match = {
  id: string;
  date: string; // YYYY-MM-DD
  opponent: string;
  competition: string;
  venue: "Home" | "Away";
  score?: string;
  notes?: string;
};

function pad2(n: number) {
  return String(n).padStart(2, "0");
}

function getTargetMs(dateStr: string) {
  // Force a stable time so it doesn't depend on user locale parsing.
  // Match day at 00:00 local time.
  const [y, m, d] = dateStr.split("-").map(Number);
  return new Date(y, m - 1, d, 0, 0, 0, 0).getTime();
}

function diffParts(targetMs: number, nowMs: number) {
  let diff = Math.max(0, targetMs - nowMs);

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  diff -= days * (1000 * 60 * 60 * 24);

  const hours = Math.floor(diff / (1000 * 60 * 60));
  diff -= hours * (1000 * 60 * 60);

  const minutes = Math.floor(diff / (1000 * 60));
  diff -= minutes * (1000 * 60);

  const seconds = Math.floor(diff / 1000);

  return { days, hours, minutes, seconds };
}

export default function NextMatchCard({ match }: { match: Match | null }) {
  const [mounted, setMounted] = useState(false);

  // Start with a stable value so SSR and first client render match.
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  const isMatchday = useMemo(() => {
    if (!match) return false;
    // We only evaluate matchday after mount to avoid SSR/client mismatch from time.
    if (!mounted) return false;

    const targetMs = getTargetMs(match.date);
    const now = new Date();
    const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate()).getTime();

    return todayStart === targetMs;
  }, [match, mounted]);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!match) return;
    if (!mounted) return;

    const targetMs = getTargetMs(match.date);

    const tick = () => {
      setTimeLeft(diffParts(targetMs, Date.now()));
    };

    tick(); // immediate update after mount
    const id = setInterval(tick, 1000);

    return () => clearInterval(id);
  }, [match, mounted]);

  if (!match) {
    return (
      <div className="rounded-3xl bg-white shadow-sm ring-1 ring-black/5 p-6">
        <div className="flex gap-4 items-start">
          <img
            src="/kingsmenlogo.jpeg"
            alt="Kingsmen FC Logo"
            className="w-12 h-12 rounded-xl object-cover"
          />
          <div className="flex-1">
            <p className="text-sm text-gray-500">Next Match</p>
            <h2 className="text-xl font-bold text-gray-900">No upcoming matches</h2>
            <p className="mt-1 text-gray-600">Set a match without score in matchesData.</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-3xl bg-white shadow-sm ring-1 ring-black/5 p-6">
      <div className="flex gap-4 items-start">
        <img
          src="/kingsmenlogo.jpeg"
          alt="Kingsmen FC Logo"
          className="w-12 h-12 rounded-xl object-cover"
        />

        <div className="flex-1">
          <p className="text-sm text-gray-500">Next Match</p>

          <div className="flex flex-wrap items-center gap-2 mt-1">
            <h2 className="text-xl font-bold text-gray-900">
              Kingsmen FC vs {match.opponent}
            </h2>

            {/* Matchday badge */}
            {mounted && isMatchday ? (
              <span className="inline-flex items-center rounded-full bg-red-100 text-red-700 px-3 py-1 text-xs font-semibold">
                MATCHDAY
              </span>
            ) : null}
          </div>

          <p className="mt-1 text-gray-600">
            {match.date} · {match.competition} · {match.venue}
          </p>
        </div>

        <Link
          href={`/matches/${match.id}`}
          className="text-sm font-semibold text-blue-600 hover:text-blue-700"
        >
          View →
        </Link>
      </div>

      {/* Countdown */}
      <div className="mt-5 grid grid-cols-4 gap-3 text-center">
        <div className="rounded-2xl bg-gray-50 p-3">
          <p className="text-xl font-extrabold text-gray-900">
            {mounted ? timeLeft.days : "--"}
          </p>
          <p className="text-xs text-gray-600">Days</p>
        </div>

        <div className="rounded-2xl bg-gray-50 p-3">
          <p className="text-xl font-extrabold text-gray-900">
            {mounted ? pad2(timeLeft.hours) : "--"}
          </p>
          <p className="text-xs text-gray-600">Hrs</p>
        </div>

        <div className="rounded-2xl bg-gray-50 p-3">
          <p className="text-xl font-extrabold text-gray-900">
            {mounted ? pad2(timeLeft.minutes) : "--"}
          </p>
          <p className="text-xs text-gray-600">Mins</p>
        </div>

        <div className="rounded-2xl bg-gray-50 p-3">
          <p className="text-xl font-extrabold text-gray-900">
            {mounted ? pad2(timeLeft.seconds) : "--"}
          </p>
          <p className="text-xs text-gray-600">Secs</p>
        </div>
      </div>
    </div>
  );
}
