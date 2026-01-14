export type PositionCode = "GK" | "DEF" | "MID" | "FWD";

export type Player = {
  slug: string;
  name: string;
  position: string;
  positionCode: PositionCode; // ✅ add this
  number: number;
  image: string;
  age: number;
  nationality: string;
};

export const players: Player[] = [
  {
    slug: "john-smith",
    name: "John Smith",
    position: "Forward",
    positionCode: "FWD",
    number: 9,
    image: "/players/test1.jpeg",
    age: 24,
    nationality: "England",
  },
  {
    slug: "david-lee",
    name: "David Lee",
    position: "Midfielder",
    positionCode: "MID",
    number: 8,
    image: "/players/test2.jpeg",
    age: 26,
    nationality: "Malaysia",
  },
];
