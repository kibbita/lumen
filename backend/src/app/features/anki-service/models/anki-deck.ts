export interface AnkiDeck {
  id: number;
  mod: number;
  name: string;
  usn: number;

  lrnToday: [number, number];
  revToday: [number, number];
  newToday: [number, number];
  timeToday: [number, number];

  collapsed: boolean;
  browserCollapsed: boolean;

  desc: string;
  dyn: number;
  conf: number;

  extendNew: number;
  extendRev: number;

  reviewLimit: number | null;
  newLimit: number | null;
  reviewLimitToday: number | null;
  newLimitToday: number | null;

  desiredRetention: number | null;
}