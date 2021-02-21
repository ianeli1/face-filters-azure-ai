import jimp from "jimp";
import { Coordinates } from "../types";

/**Wrapper for the jimp function, for consistency across functions */
export function crop(source: jimp, coords: Coordinates): jimp {
  return source.crop(coords.x, coords.y, coords.w, coords.h);
}
