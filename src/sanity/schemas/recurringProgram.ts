import { defineType, defineField } from "sanity";

export const recurringProgram = defineType({
  name: "recurringProgram",
  title: "Recurring Program",
  type: "document",
  fields: [
    defineField({ name: "title", title: "Title", type: "string" }),
    defineField({ name: "schedule", title: "Schedule", type: "string", description: 'e.g. "Ongoing — see calendar" or "Annual — April"' }),
    defineField({ name: "description", title: "Description", type: "text", rows: 3 }),
    defineField({ name: "order", title: "Display Order", type: "number" }),
  ],
  orderings: [{ title: "Display Order", name: "orderAsc", by: [{ field: "order", direction: "asc" }] }],
  preview: { select: { title: "title", subtitle: "schedule" } },
});
