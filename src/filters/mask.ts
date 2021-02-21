import jimp from "jimp/*";
import { Coordinates, Dimensions, Position } from "../types";
import { composite } from "./composite";

/**Masks a filter image to one or more rectangles given, typically used for face filters */
export function mask(
  /**The target image */
  source: jimp,
  /**The filter image */
  filter: jimp,
  /**Where the filter image will be applied */
  where: Coordinates[],
  /**The value to scale factor of the filter image */
  scale = 1.0,
  /**Function to calculate the offset of the filter image, by default the filter image will be centered on the coordinates given */
  offset?: (coords: Coordinates, filterDim: Dimensions) => Position
) {
  let result = source.clone();
  for (const coords of where) {
    result = composite(
      result.clone(),
      filter.clone(),
      () => ({ w: coords.w * scale }),
      (_, { w, h }) => {
        let offsetPos = { x: 0, y: 0 };
        if (offset) offsetPos = offset(coords, { w, h });
        return {
          x: coords.x + (coords.w - w) / 2 + offsetPos.x,
          y: coords.y + (coords.h - h) / 2 + offsetPos.y,
        };
      }
    );
  }

  return result;
}
