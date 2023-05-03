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

  noMoreThanSource?: boolean
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

  noMoreThanSource = false,
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
      const clientWidth = document.documentElement.clientWidth
      // const displayWidth = window.innerWidth
      setImageSide(clientWidth)
    }
    onResize()
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  })

  const getResolvedSize = (side: 'width' | 'height') => {
    if (side === 'width') {
      const resolvedWidth = adjustTargetIsWidth
        ? imageSide
        : width * (imageSide / height)
      if (noMoreThanSource && resolvedWidth > width) {
        return width
      }
      return resolvedWidth
    } else {
      const resolvedHeight = adjustTargetIsWidth
        ? height * (imageSide / width)
        : imageSide
      if (noMoreThanSource && resolvedHeight > height) {
        return height
      }
      return resolvedHeight
    }
  }

  return (
    <img
      alt={alt}
      className={className}
      height={getResolvedSize('height')}
      loading={priority ? 'eager' : 'lazy'}
      src={src}
      width={getResolvedSize('width')}
    />
  )
}

export default ResizedImage
