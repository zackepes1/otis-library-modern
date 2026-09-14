import { defineType, defineField } from "sanity";

export const siteInfo = defineType({
  name: "siteInfo",
  title: "Site Info",
  type: "document",
  fields: [
    defineField({ name: "address", title: "Address", type: "string" }),
    defineField({ name: "phone", title: "Phone", type: "string" }),
    defineField({ name: "email", title: "Email", type: "string" }),
    defineField({
      name: "hours",
      title: "Hours",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({ name: "day", title: "Day", type: "string" }),
            defineField({ name: "time", title: "Time", type: "string" }),
          ],
          preview: { select: { title: "day", subtitle: "time" } },
        },
      ],
    }),
    defineField({
      name: "bookdrops",
      title: "Book Drop Locations",
      type: "array",
      of: [{ type: "string" }],
    }),
    defineField({
      name: "donateUrl",
      title: "Donate URL",
      type: "url",
      description: "External payment processor URL for the Donate Now button",
    }),
  ],
  preview: { prepare: () => ({ title: "Site Info" }) },
});
