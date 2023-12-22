import React from "react";
import fetchImages from "@/lib/fetchImages";
import { ImageResults } from "@/models/Images";
import ImageContainer from "./ImageContainer";
import addBlurredUrls from "@/lib/getBase64";

export default async function Gallery() {
  const url = "https://api.pexels.com/v1/curated";

  const images: ImageResults | undefined = await fetchImages(url);
  if (!images)
    return <h2 className="m-4 text-2xl font-bold">No Images Found</h2>;
    const photosWithBlur = await addBlurredUrls(images);
  return (
    <section className="px-2 my-3 grid gap-2 grid-cols-gallery">
      {photosWithBlur.map(photo => {
        return (
          <ImageContainer key={photo.id} photo={photo}/>
        );
      })}
    </section>
  );
}
