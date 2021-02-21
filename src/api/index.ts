import axios from "axios";
import { loadImage, mask } from "..";
import { APIResponse, Face } from "../types";

export class FaceAPI {
  private token: string;
  private apiUrl: string;
  constructor(token: string, apiUrl: string) {
    this.token = token;
    this.apiUrl = apiUrl;
  }

  public async findFaces(url: string): Promise<Face[]> {
    try {
      const response = await axios.post<APIResponse[]>(
        this.apiUrl,
        { url },
        { headers: { "Ocp-Apim-Subscription-Key": this.token } }
      );
      return response.data.map((data) => ({
        coords: {
          x: data.faceRectangle.left,
          y: data.faceRectangle.top,
          h: data.faceRectangle.height,
          w: data.faceRectangle.width,
        },
        info: {
          attributes: data.faceAttributes,
          id: data.faceId,
        },
      }));
    } catch (e) {
      console.log("BAD API RESPONSE", e);
      return [];
    }
  }

  public async faceFilter(
    sourceUrl: string,
    filterUrl: string,
    scale = 1,
    offset: Parameters<typeof mask>[4]
  ) {
    const source = await loadImage(sourceUrl);
    const filter = await loadImage(filterUrl);
    const faces = await this.findFaces(sourceUrl);
    if (source && filter) {
      return mask(
        source,
        filter,
        faces.map((x) => x.coords),
        scale,
        offset
      );
    } else {
      throw new Error("Couldn't load the images");
    }
  }
}
