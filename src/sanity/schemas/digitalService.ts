import { defineType, defineField } from "sanity";

export const digitalService = defineType({
  name: "digitalService",
  title: "Digital Service",
  type: "document",
  fields: [
    defineField({ name: "name", title: "Name", type: "string" }),
    defineField({ name: "tagline", title: "Tagline", type: "string" }),
    defineField({ name: "description", title: "Description", type: "text", rows: 3 }),
    defineField({ name: "logo", title: "Logo URL", type: "url", description: "Full URL to the service logo image" }),
    defineField({ name: "href", title: "Get Started URL", type: "url", description: "Primary link for this service (leave blank if not applicable)" }),
    defineField({ name: "appStoreHref", title: "App Store URL", type: "url" }),
    defineField({ name: "playStoreHref", title: "Google Play URL", type: "url" }),
    defineField({ name: "order", title: "Display Order", type: "number" }),
  ],
  orderings: [{ title: "Display Order", name: "orderAsc", by: [{ field: "order", direction: "asc" }] }],
  preview: { select: { title: "name", subtitle: "tagline" } },
});
