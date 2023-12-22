import React from "react";
import fetchImages from "@/lib/fetchImages";
import { ImageResults } from "@/models/Images";
import ImageContainer from "./ImageContainer";
import addBlurredUrls from "@/lib/getBase64";

type Props = {
  topic?: string|undefined
}

export default async function Gallery({topic}:Props) {
  const url = !topic 
  ? "https://api.pexels.com/v1/curated"
  : `https://api.pexels.com/v1/search?query=${topic}&`

  const images: ImageResults | undefined = await fetchImages(url);
  if (!images)
    return <h2 className="m-4 text-2xl font-bold">No Images Found</h2>;
    const photosWithBlur = await addBlurredUrls(images);
  return (
    <section className="px-1 my-3 grid grid-cols-gallery auto-rows-[10px]">
      {photosWithBlur.map(photo => {
        return (
          <ImageContainer key={photo.id} photo={photo}/>
        );
      })}
    </section>
  );
}
