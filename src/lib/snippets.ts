import snippetsData from "./data/snippets.json";

export type Snippet = {
  id: number;
  slug: string;
  title: string;
  date: string;
  excerpt: string;
};

export type SnippetDetail = Snippet & {
  content: string;
};

const allSnippets: SnippetDetail[] = snippetsData as SnippetDetail[];

export function fetchSnippets(): Promise<Snippet[]> {
  return Promise.resolve(
    allSnippets.map(({ id, slug, title, date, excerpt }) => ({
      id,
      slug,
      title,
      date,
      excerpt,
    }))
  );
}

export function fetchSnippetBySlug(slug: string): Promise<SnippetDetail | null> {
  return Promise.resolve(allSnippets.find((s) => s.slug === slug) ?? null);
}
