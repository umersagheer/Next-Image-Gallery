import type { ImageResults } from "@/models/Images";
import { ImagesSchemaWithPhotos } from "@/models/Images";
import env from "./env";

export default async function fetchImages(
  url: string
): Promise<ImageResults | undefined> {
  try {
    const res = await fetch(url, {
      headers: {
        Authorization: env.PEXELS_API_KEY,
      },
    });

    if (!res.ok) throw new Error("Fetching images failed");

    const imagesResults: ImageResults = await res.json();
    // console.log(imagesResults);

    // Parse data with zod schema
    const parsedData = ImagesSchemaWithPhotos.parse(imagesResults);

    if (parsedData.total_results === 0) {
      return undefined;
    }

    return parsedData;
  } catch (error) {
    // will show in terminal
    if (error instanceof Error) {
      console.log(error.stack);
    }
  }
}
