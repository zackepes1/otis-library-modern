import { defineType, defineField } from "sanity";

export const snippet = defineType({
  name: "snippet",
  title: "Content Snippet",
  type: "document",
  fields: [
    defineField({ name: "key", title: "Key", type: "slug", options: { source: "title" } }),
    defineField({ name: "title", title: "Title", type: "string" }),
    defineField({ name: "dateLabel", title: "Date Label", type: "string", description: 'Display string, e.g. "December 2025"' }),
    defineField({ name: "publishedAt", title: "Published At", type: "date", description: "Used for ordering; dateLabel controls the displayed text" }),
    defineField({
      name: "body",
      title: "Body",
      type: "array",
      of: [{ type: "block" }],
    }),
  ],
  orderings: [{ title: "Newest First", name: "publishedAtDesc", by: [{ field: "publishedAt", direction: "desc" }] }],
  preview: { select: { title: "title", subtitle: "dateLabel" } },
});
