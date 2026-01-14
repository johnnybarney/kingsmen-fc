export type Match = {
  id: string; // used in URL
  date: string; // YYYY-MM-DD
  opponent: string;
  competition: string;
  venue: "Home" | "Away";
  score?: string; // if exists = result match
  notes?: string;
};

export const matches: Match[] = [
   {
    id: "2026-01-30-TBC",
    date: "2026-01-30",
    opponent: "TBC",
    competition: "Friendly",
    venue: "Home",
    notes: "Big match at home. Arrive early.",
  },
  {
    id: "2026-01-19-Cendana-FC",
    date: "2026-01-19",
    opponent: "Cendana FC",
    competition: "Friendly",
    venue: "Home",
    notes: "Big match at home. Arrive early.",
  },
  {
    id: "2026-01-09-Team-Irfan",
    date: "2026-01-09",
    opponent: "Team Irfan",
    competition: "Friendly",
    venue: "Home",
    score: "1 - 0",
    notes: "Great win. Strong second half.",
  },
];
