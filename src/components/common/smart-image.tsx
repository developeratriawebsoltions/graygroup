import Image, { type ImageProps } from "next/image";

import { blurFor } from "@/lib/blur-data";

/**
 * next/image with the generated LQIP wired up automatically. Falls back to an
 * empty placeholder for any asset without one, so nothing ever throws.
 */
export function SmartImage({ src, alt, ...props }: ImageProps) {
  const blurDataURL =
    typeof src === "string" ? blurFor(src) : undefined;

  return (
    <Image
      src={src}
      alt={alt}
      placeholder={blurDataURL ? "blur" : "empty"}
      blurDataURL={blurDataURL}
      {...props}
    />
  );
}
