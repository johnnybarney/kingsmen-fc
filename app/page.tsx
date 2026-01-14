import Link from "next/link";
import { players } from "./players/playersData";
import { matches } from "./matches/matchesData";

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
  // Local date as YYYY-MM-DD
  const d = new Date();
  const yyyy = d.getFullYear();
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  const dd = String(d.getDate()).padStart(2, "0");
  return `${yyyy}-${mm}-${dd}`;
}

function getNextMatch() {
  const today = getTodayYYYYMMDD();

  // Upcoming = no score yet + date is today or later
  const upcoming = matches
    .filter((m) => !m.score && m.date >= today)
    .sort((a, b) => (a.date > b.date ? 1 : a.date < b.date ? -1 : 0));

  return upcoming[0] ?? null;
}

function Badge({
  children,
  variant = "gray",
}: {
  children: React.ReactNode;
  variant?: "blue" | "gray" | "green";
}) {
  const styles =
    variant === "blue"
      ? "bg-blue-50 text-blue-700 ring-blue-200"
      : variant === "green"
      ? "bg-green-50 text-green-700 ring-green-200"
      : "bg-gray-50 text-gray-700 ring-gray-200";

  return (
    <span
      className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold ring-1 ${styles}`}
    >
      {children}
    </span>
  );
}

export default function Home() {
  const nextMatch = getNextMatch();
  const { wins, goalsFor } = calcTeamSummary();

  return (
    <main className="min-h-screen bg-gray-50 animate-pageFade">
      <section
        className="
          max-w-5xl mx-auto px-4
          min-h-[calc(100vh-80px)]
          flex flex-col justify-center
          text-center
        "
      >
        {/* HERO */}
        <div className="animate-fadeInUp">
          <h1 className="text-5xl sm:text-6xl font-extrabold tracking-tight text-gray-900">
            Kingsmen FC
          </h1>

          <p className="mt-4 text-gray-600 text-lg max-w-2xl mx-auto">
            Welcome to the official website of Kingsmen FC. Stay updated with our
            players, matches, and latest news — on desktop and mobile.
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
        <div className="mt-14 max-w-xl mx-auto text-left animate-fadeInUp delay-150">
          <div className="rounded-3xl bg-white shadow-sm ring-1 ring-black/5 p-6">
            <div className="flex gap-4 items-start">
              <img
                src="/kingsmenlogo.jpeg"
                alt="Kingsmen FC Logo"
                className="w-12 h-12 rounded-xl object-cover"
              />

              <div className="flex-1">
                <p className="text-sm text-gray-500">Next Match</p>

                {nextMatch ? (
                  <>
                    <h2 className="text-xl font-bold text-gray-900">
                      Kingsmen FC vs {nextMatch.opponent}
                    </h2>

                    {/* competition + venue badges */}
                    <div className="mt-2 flex flex-wrap gap-2">
                      <Badge variant="blue">{nextMatch.competition}</Badge>
                      <Badge variant={nextMatch.venue === "Home" ? "green" : "gray"}>
                        {nextMatch.venue}
                      </Badge>
                      <span className="text-sm text-gray-600">
                        {nextMatch.date}
                      </span>
                    </div>
                  </>
                ) : (
                  <>
                    <h2 className="text-xl font-bold text-gray-900">
                      No upcoming matches
                    </h2>
                    <p className="mt-1 text-gray-600">
                      Add a future match without a score in matchesData.
                    </p>
                  </>
                )}
              </div>

              {nextMatch ? (
                <Link
                  href={`/matches/${nextMatch.id}`}
                  className="text-sm font-semibold text-blue-600 hover:text-blue-700"
                >
                  View →
                </Link>
              ) : null}
            </div>

            <div className="mt-6 grid grid-cols-3 gap-3 text-center">
              <div className="rounded-2xl bg-gray-50 p-4">
                <p className="text-2xl font-extrabold text-gray-900">
                  {players.length}
                </p>
                <p className="text-sm text-gray-600">Players</p>
              </div>

              <div className="rounded-2xl bg-gray-50 p-4">
                <p className="text-2xl font-extrabold text-gray-900">{wins}</p>
                <p className="text-sm text-gray-600">Wins</p>
              </div>

              <div className="rounded-2xl bg-gray-50 p-4">
                <p className="text-2xl font-extrabold text-gray-900">{goalsFor}</p>
                <p className="text-sm text-gray-600">Goals</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
