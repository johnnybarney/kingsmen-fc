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
    id: "2026-02-10-red-lions",
    date: "2026-02-10",
    opponent: "Red Lions FC",
    competition: "League Match",
    venue: "Home",
    notes: "Big match at home. Arrive early.",
  },
  {
    id: "2026-02-03-blue-tigers",
    date: "2026-02-03",
    opponent: "Blue Tigers FC",
    competition: "Friendly",
    venue: "Away",
    score: "2 - 1",
    notes: "Great win. Strong second half.",
  },
];
