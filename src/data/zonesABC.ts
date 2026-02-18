// Zonage ABC simplifié — basé sur les préfixes de code INSEE
// Source : arrêté du 1er août 2014 modifié (BOFiP)

export type ZoneABC = "A bis" | "A" | "B1" | "B2" | "C";

// Paris et communes limitrophes (zone A bis) — codes INSEE
const ZONE_A_BIS_COMMUNES = new Set([
  "75056", // Paris (code commune)
  // Arrondissements de Paris
  ...Array.from({ length: 20 }, (_, i) => `751${String(i + 1).padStart(2, "0")}`),
  // Communes limitrophes principales
  "92002", "92004", "92007", "92009", "92012", "92014", "92019", "92020",
  "92022", "92023", "92024", "92025", "92026", "92032", "92033", "92035",
  "92036", "92040", "92041", "92044", "92046", "92047", "92048", "92049",
  "92050", "92051", "92060", "92062", "92063", "92064", "92071", "92072",
  "92073", "92076", "92077", "92078",
  "93001", "93005", "93006", "93007", "93008", "93010", "93013", "93014",
  "93015", "93027", "93029", "93030", "93031", "93032", "93033", "93039",
  "93045", "93046", "93047", "93048", "93049", "93050", "93051", "93053",
  "93055", "93057", "93059", "93061", "93062", "93063", "93064", "93066",
  "93070", "93071", "93072", "93073", "93074", "93077", "93078",
  "94002", "94003", "94004", "94011", "94015", "94016", "94017", "94018",
  "94019", "94021", "94022", "94028", "94033", "94034", "94037", "94038",
  "94041", "94042", "94043", "94044", "94046", "94047", "94048", "94052",
  "94053", "94054", "94055", "94056", "94057", "94058", "94059", "94060",
  "94065", "94067", "94068", "94069", "94070", "94071", "94073", "94074",
  "94075", "94076", "94077", "94078", "94079", "94080", "94081",
]);

// Départements en zone A (hors A bis)
const ZONE_A_DEPS = new Set(["01", "06", "13", "38", "69", "73", "74"]);

// Départements en zone B1
const ZONE_B1_DEPS = new Set([
  "14", "17", "21", "25", "29", "31", "33", "34", "35", "37", "44",
  "45", "49", "50", "51", "54", "56", "57", "59", "60", "62", "63",
  "64", "66", "67", "68", "76", "77", "78", "83", "84", "87", "91", "95",
]);

/**
 * Retourne la zone ABC à partir du code INSEE de la commune.
 * Approximation par département — pour une précision exacte il faudrait
 * la base complète du CGEDD.
 */
export function getZoneByInsee(codeInsee: string): ZoneABC {
  if (!codeInsee) return "C";

  // Zone A bis
  if (ZONE_A_BIS_COMMUNES.has(codeInsee)) return "A bis";

  const dep = codeInsee.startsWith("97")
    ? codeInsee.slice(0, 3) // DOM
    : codeInsee.slice(0, 2);

  // Île-de-France hors A bis → zone A
  if (["75", "92", "93", "94"].includes(dep)) return "A bis";
  if (["77", "78", "91", "95"].includes(dep)) return "A";

  if (ZONE_A_DEPS.has(dep)) return "A";
  if (ZONE_B1_DEPS.has(dep)) return "B1";

  // Grandes agglos B2 — simplifié
  return "C";
}
