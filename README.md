# face-filters-azure-ai

JS wrapper for Azure AI cognitive services that lets you automatically apply a mask/filter to a face.

You will need an API Token and the endpoint from Azure Cognitive Services to use this

### Usage

```ts
import { FaceAPI } from "face-filters-azure-ai";

async function main() {
  const client = new FaceAPI("<your token>", "<your API endpoint>");
  const myImage = "image.png";
  const myFilter = "filter.png";
  const myProcessedImage = await client.faceFilter(myImage, myFilter);
  myProcessedImage.write("myImage.png", (error) =>
    console.log(error ? error : "Image saved as myImage.png")
  );
  //myProcessedImage is a standard jimp object
}

main();
```

### Dependencies used

- Axios (for API calls)
- JIMP (for the image editing)
