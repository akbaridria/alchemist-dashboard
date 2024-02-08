/* eslint-disable @next/next/no-img-element */
import { IPropsImage } from "@/types"
import { useState } from "react"
import { Skeleton } from "./skeleton";

export const LazyImage = ({ src, alt, classname }: IPropsImage) => {
  const [loading, setLoading] = useState(true);

  return (
    <>
      <img src={src} alt={alt} className={classname} onLoad={() => setLoading(false)} loading="lazy" />
      <Skeleton className={loading ? 'w-full aspect-square rounded-t-lg' : 'hidden'} />
    </>
  )
}