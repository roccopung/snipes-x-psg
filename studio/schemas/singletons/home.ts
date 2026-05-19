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
  ],
  preview: {
    prepare() {
      return {
        title: "Home",
      };
    },
  },
});
