export const SYSTEMS = [
  "navigation",
  "communications",
  "life_support",
  "engines",
  "deflector_shield",
] as const;

export type System = (typeof SYSTEMS)[number];

export const SYSTEM_CODES: Record<System, string> = {
  navigation: "NAV-01",
  communications: "COM-02",
  life_support: "LIFE-03",
  engines: "ENG-04",
  deflector_shield: "SHLD-05",
};
