'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import React from 'react'

import image1 from '~/assets/highlights/1.jpg'
import image2 from '~/assets/highlights/2.jpg'
import image3 from '~/assets/highlights/3.jpg'
import image4 from '~/assets/highlights/4.jpg'
import image5 from '~/assets/highlights/5.jpg'
import image6 from '~/assets/highlights/6.jpg'

const images = [image1, image2, image3, image4, image5, image6]
const alts = [
  '石柱龙潭玩水嬉戏',
  '万州烤鱼城',
  '家附近的夕阳',
  '老家的夕阳',
  '老家的稻田',
  '金佛山',
]

export function Photos() {
  const [width, setWidth] = React.useState(0)
  const [isCompact, setIsCompact] = React.useState(false)
  const expandedWidth = React.useMemo(() => width * 1.38, [width])

  React.useEffect(() => {
    const handleResize = () => {
      // 640px is the breakpoint for md
      if (window.innerWidth < 640) {
        setIsCompact(true)
        return setWidth(window.innerWidth / 2 - 64)
      }

      setWidth(window.innerWidth / images.length - 4 * images.length)
    }

    window.addEventListener('resize', handleResize)
    handleResize()

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  return (
    <motion.div
      className="mt-16 sm:mt-20"
      initial={{ opacity: 0, scale: 0.925, y: 16 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{
        delay: 0.5,
        type: 'spring',
      }}
    >
      <div className="-my-4 flex w-full snap-x snap-proximity scroll-pl-4 justify-start gap-4 overflow-x-auto px-4 py-4 sm:gap-6 md:justify-center md:overflow-x-hidden md:px-0">
        {images.map((image, idx) => (
          <motion.div
            key={image.src}
            className="relative h-40 flex-none shrink-0 snap-start overflow-hidden rounded-xl bg-zinc-100 ring-2 ring-lime-800/20 dark:bg-zinc-800 dark:ring-lime-300/10 md:h-72 md:rounded-3xl"
            animate={{
              width,
              opacity: isCompact ? 1 : 0.85,
              filter: isCompact ? 'grayscale(0)' : 'grayscale(0.5)',
              rotate: idx % 2 === 0 ? 2 : -1,
            }}
            whileHover={
              isCompact
                ? {}
                : {
                    width: expandedWidth,
                    opacity: 1,
                    filter: 'grayscale(0)',
                  }
            }
            layout
          >
            <Image
              src={image}
              alt={alts[idx] ?? ''}
              sizes="(min-width: 640px) 18rem, 11rem"
              className="pointer-events-none absolute inset-0 h-full w-full select-none object-cover"
              priority
            />
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}
