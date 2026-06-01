import { defineField, defineType } from "sanity";
import { HomeIcon } from "@sanity/icons";

export const home = defineType({
  name: "home",
  title: "Home",
  type: "document",
  icon: HomeIcon,
  fields: [
    defineField({
      name: "video",
      title: "Video",
      type: "elementVideo",
    }),
    defineField({
      name: "lineUp",
      type: "lineUp",
    }),
    defineField({
      name: "unitedByAttitude",
      type: "object",
      fields: [
        defineField({
          name: "campaign",
          description: "Add 4 images",
          type: "array",
          validation: (Rule) =>
            Rule.length(4).warning("Exactly 4 images are required"),
          of: [
            defineField({
              name: "item",
              type: "object",
              fields: [
                defineField({
                  name: "image",
                  type: "elementImage",
                }),
                defineField({
                  name: "link",
                  type: "linkExternal",
                }),
              ],
              preview: {
                select: {
                  title: "link.label",
                  media: "image",
                },
              },
            }),
          ],
        }),
        defineField({
          name: "products",
          type: "array",
          of: [
            defineField({
              name: "product",
              type: "object",
              fields: [
                defineField({
                  name: "image",
                  type: "elementImage",
                }),
                defineField({
                  name: "link",
                  type: "linkExternal",
                }),
              ],
              preview: {
                select: {
                  title: "link.label",
                  media: "image",
                },
              },
            }),
          ],
        }),
      ],
    }),
  ],
  preview: {
    prepare() {
      return {
        title: "Home",
      };
    },
  },
});
