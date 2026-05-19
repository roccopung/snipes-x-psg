import { defineQuery } from "@sanity/sveltekit";

export const homeQuery = defineQuery(`*[_type == "home"][0]`);
