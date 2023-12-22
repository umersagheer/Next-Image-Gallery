import type {Photo} from "@/models/Images";
import Image from "next/image";
import Link from "next/link";

type Props = { 
    photo: Photo
}

export default function ImageContainer({photo}: Props) {
  const widthHeightRatio = photo.height/ photo.width;
  const gelleryHeight = Math.ceil(250*widthHeightRatio)
  const photoSpans = Math.ceil(gelleryHeight / 10)

return (
    <div  className="w-[250px] justify-self-center" style={{gridRow:`span ${photoSpans}`}}>
      <Link href={photo.url} target="_blank" className="grid place-content-center">
      <div className="rounded-xl group overflow-hidden">
            <Image
              src={photo.src.large}
              alt={photo.alt}
              width={photo.width}
              height={photo.height}
              sizes="250px"
              className="group-hover:opacity-80"
              placeholder="blur"
              blurDataURL={photo.blurDataURL}
              priority={true}
            />
            </div>
            </Link>
          </div>
)


}
