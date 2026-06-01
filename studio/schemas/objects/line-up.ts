import { defineType, defineField } from "sanity";

export const lineUp = defineType({
  name: "lineUp",
  title: "Line-Up",
  type: "array",
  of: [
    {
      type: "object",
      name: "artist",
      fields: [
        defineField({
          name: "name",
          type: "string",
        }),
        defineField({
          name: "image",
          type: "elementImage",
        }),
        defineField({
          name: "frame",
          type: "image",
        }),
      ],
      preview: {
        select: {
          title: "name",
          media: "image",
        },
        prepare: ({ media, title }) => ({
          title,
          media,
        }),
      },
    },
  ],
});
