import { getPlaiceholder } from "plaiceholder";
import type { Photo,ImageResults } from "@/models/Images";

async function getBase64(imageUrl: string){
    try {
        const res = await fetch(imageUrl)
        if(!res.ok){
            throw new Error(`failed to fetch image ${res.status} ${res.statusText}`)
        }

        const buffer = await res.arrayBuffer()

        const {base64} = await getPlaiceholder(Buffer.from(buffer))
        // console.log(base64)
        return base64
    } catch (error) {
        console.log(error)
    }
}

export default async function addBlurredUrls(images:ImageResults): Promise<Photo[]> {
    // Make all requests at once, instead of fetching them one by one.(Avoiding a waterfall)
    const base64Promises = images.photos.map(photo => getBase64(photo.src.large))

    // Resolve all Promises
    const base64Results = await Promise.all(base64Promises)
    
    const photoWithBlur:Photo[] = images.photos.map((photo, index) => {
        photo.blurDataURL = base64Results[index]
        return photo
    })

     return photoWithBlur
}
 