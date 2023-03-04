import React, { useEffect, useState } from 'react';
import NextImage from 'next/image';
import type { ImageProps as NextImageProps } from 'next/image';

interface ImageProps extends NextImageProps {
  fallbackSrc?: string;
}

export const Image = ({ src = '', fallbackSrc = '', ...rest }: ImageProps) => {
  const [imgSrc, setImgSrc] = useState<typeof src>(src);
  const blurDataUrl =
    'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8+O1bPQAJGwNesYV0lwAAAABJRU5ErkJggg==';

  useEffect(() => {
    if (src) setImgSrc(src);
  }, [src]);

  return (
    <NextImage
      {...rest}
      src={imgSrc}
      fill={true}
      placeholder='blur'
      blurDataURL={blurDataUrl}
      onError={() => {
        setImgSrc(fallbackSrc);
      }}
    />
  );
};
