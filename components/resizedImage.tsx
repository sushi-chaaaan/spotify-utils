import React from 'react'
import { useEffect, useState } from 'react'

type ResizedImageProps = {
  alt: string
  className?: string
  src: string

  fallbackWidth?: number
  fallbackHeight?: number

  height: number
  width: number

  priority?: boolean
}

const ResizedImage: React.FC<ResizedImageProps> = ({
  alt,
  className = '',
  src,

  fallbackHeight,
  fallbackWidth,

  height,
  width,

  priority = false,
}) => {
  if (fallbackWidth === undefined && fallbackHeight === undefined) {
    throw new Error(
      'fallbackWidth or fallbackHeight must be specified at least one.'
    )
  }
  if (fallbackWidth !== undefined && fallbackHeight !== undefined) {
    throw new Error(
      'fallbackWidth and fallbackHeight cannot be specified at the same time.'
    )
  }

  const adjustTargetIsWidth = fallbackWidth !== undefined
  const fallbackSize = fallbackWidth ?? fallbackHeight ?? 500 // 500 is not used usually
  const [imageSide, setImageSide] = useState(fallbackSize)

  useEffect(() => {
    const onResize = () => {
      const displayWidth = window.innerWidth
      setImageSide(displayWidth)
    }
    onResize()
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  })

  return (
    <img
      alt={alt}
      className={className}
      height={adjustTargetIsWidth ? height * (imageSide / width) : imageSide}
      loading={priority ? 'eager' : 'lazy'}
      src={src}
      width={adjustTargetIsWidth ? imageSide : width * (imageSide / height)}
    />
  )
}

export default ResizedImage
