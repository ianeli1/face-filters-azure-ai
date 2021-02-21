import { Dimensions, Position } from "../types";
import jimp from "jimp";

/**Makes a composite out of two images based on the resulting coords of the manipulator */
export function composite(
  /**The target image*/
  source: jimp,
  /**The filter image */
  image: jimp,
  /**Dictates how much to scale the filter image */
  scaler: (
    /**The dimensions of the target image */
    sourceD: Dimensions,
    /**The dimensions of the filter image prescaling*/
    imageD: Dimensions
  ) => Omit<Dimensions, "h"> & { h?: number },
  /**Function to calculate the position of the filter image based on the dimensions of the target and filter */
  positioner: (
    /**The dimensions of the target image */
    sourceD: Dimensions,
    /**The dimensions of the filter image after being scaled */
    imageD: Dimensions
  ) => Position
): jimp {
  const resulDimensions = scaler(
    { w: source.getWidth(), h: source.getHeight() },
    { w: image.getWidth(), h: image.getHeight() }
  );
  image.resize(resulDimensions.w, resulDimensions.h ?? jimp.AUTO);
  const resulPos = positioner(
    { w: source.getWidth(), h: source.getHeight() },
    { w: image.getWidth(), h: image.getHeight() }
  );
  return source.composite(image, resulPos.x, resulPos.y);
}
