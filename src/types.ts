export interface Position {
  x: number;
  y: number;
}

export interface Dimensions {
  w: number;
  h: number;
}

export type Coordinates = Position & Dimensions;

export interface Face {
  info: {
    id: APIResponse["faceId"];
    attributes: APIResponse["faceAttributes"];
  };
  coords: Coordinates;
}

export interface APIResponse {
  faceId: string;
  faceRectangle: {
    top: number;
    left: number;
    width: number;
    height: number;
  };
  faceAttributes?: {
    smile: number;
    gender: string;
    age: number;
    emotion: {
      anger: number;
      contempt: number;
      disgust: number;
      fear: number;
      happiness: number;
      neutral: number;
      sadness: number;
      surprise: number;
    };
  };
}
