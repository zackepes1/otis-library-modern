/**
 * Real shelves behind the library catalog's "Things We Love" list widget
 * (nw.catalog.lionlibraries.org/API/SearchAPI?method=getListWidget&id=198).
 * Seasonal "2025 Award Winners" lists are intentionally left out — they'll
 * go stale quickly and aren't part of the core, evergreen shelf set.
 */
export interface CatalogShelf {
  /** Tab label shown to the user. */
  label: string;
  /** The catalog's internal list ID for this shelf. */
  listId: string;
}

export const catalogShelves: CatalogShelf[] = [
  { label: "Staff Picks", listId: "22638" },
  { label: "Fiction", listId: "22311" },
  { label: "Nonfiction", listId: "22633" },
  { label: "Mysteries & Thrillers", listId: "22371" },
  { label: "Sci-Fi & Fantasy", listId: "24392" },
  { label: "Biography & Memoir", listId: "22634" },
  { label: "LGBTIQA+", listId: "22645" },
  { label: "DVDs", listId: "22610" },
  { label: "TV Series", listId: "22374" },
  { label: "Documentaries", listId: "22625" },
  { label: "Foreign Language Films", listId: "22626" },
];
