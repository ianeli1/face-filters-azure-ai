export * from "./types";
export { composite } from "./filters/composite";
import { mask } from "./filters/mask";
export { mask };
export { crop } from "./filters/crop";
import jimp, { read } from "jimp";
export { FaceAPI } from "./api";

export async function loadImage(url: string): Promise<jimp | null> {
  try {
    return await read(url);
  } catch (e) {
    console.log(
      `An error ocurred while trying to load "${
        url.split("/").slice(-1)[0]
      }", are you sure it's a supported image?`
    );
    return null;
  }
}
