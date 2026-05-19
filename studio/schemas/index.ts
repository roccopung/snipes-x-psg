import { blockContent } from "./objects/blockContent";
import { elementImage } from "./objects/elementImage";
import { elementVideo } from "./objects/elementVideo";
import { gallery } from "./objects/gallery";
import { linkExternal } from "./objects/link/linkExternal";
import { linkEmail } from "./objects/link/linkEmail";
import { seo } from "./objects/seo";

import { home } from "./singletons/home";

export const schemaTypes = [
  //objects
  blockContent,
  elementImage,
  elementVideo,
  gallery,
  linkExternal,
  linkEmail,
  seo,

  //singletons
  home,
];
