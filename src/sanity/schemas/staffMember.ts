import { defineType, defineField } from "sanity";

export const staffMember = defineType({
  name: "staffMember",
  title: "Staff Member",
  type: "document",
  fields: [
    defineField({ name: "name", title: "Name", type: "string" }),
    defineField({ name: "role", title: "Role / Title", type: "string" }),
    defineField({ name: "order", title: "Display Order", type: "number" }),
    defineField({ name: "photo", title: "Photo", type: "image" }),
    defineField({ name: "email", title: "Email", type: "string" }),
  ],
  orderings: [{ title: "Display Order", name: "orderAsc", by: [{ field: "order", direction: "asc" }] }],
  preview: { select: { title: "name", subtitle: "role", media: "photo" } },
});
