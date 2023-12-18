import React from "react";
import fetchImages from "@/lib/fetchImages";
import { ImageResults } from "@/models/Images";
import Image from "next/image";

export default async function Gallery() {
  const url = "https://api.pexels.com/v1/curated";

  const images: ImageResults | undefined = await fetchImages(url);
  if (!images)
    return <h2 className="m-4 text-2xl font-bold">No Images Found</h2>;
  return (
    <section className="px-2 my-3 grid gap-2 grid-cols-gallery">
      {images.photos.map((photo) => {
        return (
          <div key={photo.id} className="h-64 bg-gray-200 rounded-xl">
            <Image
              src={photo.src.large}
              width={photo.width}
              height={photo.height}
              alt={photo.alt}
            />
          </div>
        );
      })}
    </section>
  );
}
