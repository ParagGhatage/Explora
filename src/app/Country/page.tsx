import Image from "next/image";

import { PexelsQuery } from "@/components/APIs/Pexels/Query";

export default async function Country() {
    const data = await PexelsQuery("India")
    console.log(data.data)
  return (
    <main className="bg-indigo-100 w-full h-full">
      <div className="bg-indigo-100 w-full h-full ">
      {data.data.photos.map((photo:any, index:any) => (
        <div key={photo.id}>
          <Image
            src={photo.src.medium}
            alt={photo.photographer}
            width={100}
            height={100}
            priority = {index === 0} // Set priority to the first image as an example
          />
           </div>
           ))}
      </div>
    </main>
  );
}
