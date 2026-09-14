import { defineType, defineField } from "sanity";

export const donorSpotlight = defineType({
  name: "donorSpotlight",
  title: "Donor Spotlight",
  type: "document",
  fields: [
    defineField({ name: "name", title: "Name or Group", type: "string" }),
    defineField({ name: "badge", title: 'Badge Text (e.g. "50+ years")', type: "string" }),
    defineField({ name: "photo", title: "Photo", type: "image", options: { hotspot: true } }),
    defineField({ name: "order", title: "Display Order", type: "number" }),
  ],
  orderings: [{ title: "Display Order", name: "orderAsc", by: [{ field: "order", direction: "asc" }] }],
  preview: { select: { title: "name", subtitle: "badge", media: "photo" } },
});
