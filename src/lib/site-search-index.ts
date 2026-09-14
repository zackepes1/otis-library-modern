import { navTree, type NavNode } from "@/lib/site-data";

export interface SiteSearchItem {
  label: string;
  href: string;
  external: boolean;
  /** Top-level nav section this item belongs to, shown as a breadcrumb. */
  section: string;
}

// Flatten the full nav tree (top-level entries + their children) into a
// single searchable list. This lets the header search surface any page or
// external resource in the site — not just the ones with dedicated
// prototype routes — using the same menu structure that powers the sidebar.
function flatten(nodes: NavNode[], section?: string): SiteSearchItem[] {
  return nodes.flatMap((node) => {
    const items: SiteSearchItem[] = [];
    const isRealLink = node.href && node.href !== "#";
    if (isRealLink) {
      items.push({
        label: node.label,
        href: node.href,
        external: Boolean(node.external),
        section: section ?? node.label,
      });
    }
    if (node.children) {
      items.push(...flatten(node.children, section ?? node.label));
    }
    return items;
  });
}

export const siteSearchIndex: SiteSearchItem[] = flatten(navTree);

/**
 * Lightweight client-side ranking: exact/startsWith matches on the label
 * outrank substring matches, which outrank matches only found in the
 * section breadcrumb (e.g. searching "history" surfaces "Local History"
 * children even if the word isn't in their own label).
 */
export function searchSitePages(query: string, limit = 5): SiteSearchItem[] {
  const q = query.trim().toLowerCase();
  if (!q) return [];

  const scored = siteSearchIndex
    .map((item) => {
      const label = item.label.toLowerCase();
      const section = item.section.toLowerCase();
      let score = -1;
      if (label === q) score = 100;
      else if (label.startsWith(q)) score = 80;
      else if (label.includes(q)) score = 60;
      else if (section.includes(q)) score = 30;
      return { item, score };
    })
    .filter(({ score }) => score > 0)
    .sort((a, b) => b.score - a.score);

  // De-dupe by href (a couple of nav entries repeat across sections).
  const seen = new Set<string>();
  const results: SiteSearchItem[] = [];
  for (const { item } of scored) {
    if (seen.has(item.href)) continue;
    seen.add(item.href);
    results.push(item);
    if (results.length >= limit) break;
  }
  return results;
}
