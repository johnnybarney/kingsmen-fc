"use client";

import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-50 flex items-center">
      <section className="max-w-6xl mx-auto px-4 py-16 w-full">
        <div className="grid md:grid-cols-2 gap-10 items-center">
          {/* Text */}
          <div className="animate-fadeInUp">
            <h1 className="text-4xl sm:text-6xl font-extrabold leading-tight">
              Kingsmen FC
            </h1>
            <p className="mt-4 text-gray-700 text-base sm:text-lg max-w-xl">
              Welcome to the official website of Kingsmen FC. Stay updated with our
              players, matches, and latest news — on desktop and mobile.
            </p>

            <div className="mt-8 flex gap-3 flex-wrap">
              <Link
                href="/players"
                className="px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition"
              >
                Explore Players
              </Link>

              <Link
                href="/matches"
                className="px-6 py-3 bg-white border border-gray-300 rounded-xl hover:bg-gray-100 transition"
              >
                View Matches
              </Link>
            </div>
          </div>

          {/* Image / Card */}
          <div className="animate-fadeInUp delay-150">
            <div className="bg-white rounded-2xl shadow-xl p-6">
              <div className="flex items-center gap-4">
                <img
                  src="/kingsmenlogo.jpeg"
                  alt="Kingsmen FC Logo"
                  className="w-16 h-16 object-contain"
                />
                <div>
                  <p className="text-sm text-gray-500">Next Match</p>
                  <p className="text-lg font-semibold">Kingsmen FC vs Red Lions FC</p>
                  <p className="text-sm text-gray-600">10 Feb 2026 · Home</p>
                </div>
              </div>

              <div className="mt-6 grid grid-cols-3 gap-3">
                <Stat label="Players" value="18" />
                <Stat label="Wins" value="12" />
                <Stat label="Goals" value="35" />
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="bg-gray-50 rounded-xl p-3 text-center">
      <p className="text-xl font-bold">{value}</p>
      <p className="text-xs text-gray-600">{label}</p>
    </div>
  );
}
