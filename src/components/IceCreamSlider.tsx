"use client";
import StarIcon from '@/icons/starIcon';
import { useAppSelector } from '@/utils/hooks';
import { RootState } from '@/store/store';
import React, { useState, useRef, useEffect } from 'react';
const MangoImage = '/images/mango.png';

const IceCreamSlider = () => {
  const [selectedIndex, setSelectedIndex] = useState<number>(1)
  const [isDragging, setIsDragging] = useState<boolean>(false)
  const [startX, setStartX] = useState<number>(0)
  const [dragOffset, setDragOffset] = useState<number>(0)
  const dragThreshold = 20
  const sliderRef = useRef<HTMLDivElement>(null)
  const animationRef = useRef<number | null>(null)
  
  const iceCreamItems = useAppSelector((state: RootState) => state.iceCream.items)

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true)
    setStartX(e.clientX - dragOffset)
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current)
    }
  }
  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return
    const currentX = e.clientX - startX
    setDragOffset(currentX)
  }
  const handleMouseUp = () => {
    if (!isDragging) return
    setIsDragging(false)
    if (Math.abs(dragOffset) > dragThreshold) {
      const direction = dragOffset > 0 ? -1 : 1
      const newIndex = Math.max(0, Math.min(iceCreamItems.length - 1, selectedIndex + direction))
      setSelectedIndex(newIndex)
    }
    animateToCenter()
  }
  const animateToCenter = () => {
    animationRef.current = requestAnimationFrame(() => {
      setDragOffset((prev) => {
        const newOffset = prev * 0.85
        if (Math.abs(newOffset) < 0.5) {
          if (animationRef.current) {
            cancelAnimationFrame(animationRef.current)
          }
          return 0
        }
        animateToCenter()
        return newOffset
      })
    })
  }
  const handleTouchStart = (e: React.TouchEvent) => {
    setIsDragging(true)
    setStartX(e.touches[0].clientX - dragOffset)
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current)
    }
  }
  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging) return
    const currentX = e.touches[0].clientX - startX
    setDragOffset(currentX)
  }
  const getVisibleItems = () => {
    const items = []
    for (let i = -1; i <= 1; i++) {
      const index = selectedIndex + i
      if (index >= 0 && index < iceCreamItems.length) {
        items.push({ ...iceCreamItems[index], index })
      }
    }
    return items
  }
  const getTransform = (index: number) => {
    let rotation = '0deg'
    const offset = index - selectedIndex
    if (offset < 0) {
      rotation = '15deg'
    } else if (offset > 0) {
      rotation = '-15deg'
    }
    const baseTransform = index === selectedIndex ? 'scale(1.1)' : 'scale(1)'
    const rotateTransform = `rotate(${rotation})`
    const dragAdjustment = isDragging ? `translateX(${dragOffset}px)` : ''
    return `${baseTransform} ${rotateTransform} ${dragAdjustment}`
  }
  useEffect(() => {
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [])
  return (
    <div className="relative pt-0 w-full flex flex-col items-center">
      <div
        ref={sliderRef}
        className={`flex justify-center gap-16 items-center mt-8 ${isDragging ? "cursor-grabbing" : "cursor-pointer"}`}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleMouseUp}
      >
        {getVisibleItems().map((item) => (
          <div
            key={item.index}
            className={`relative transition-transform duration-300 ease-out`}
            style={{ transform: getTransform(item.index) }}
          >
            <div className="bg-[#121904] rounded-2xl pt-[40px] px-10 relative w-[170px] min-w-[170px]">
              <h2 className='text-white mb-3 text-lg font-medium text-center'>
              {item.name}
              </h2>
              <div className='flex justify-center'>
                <img className='max-w-[75px]' src={MangoImage} alt='MangoImage'/>
              </div>
              <div className='absolute bottom-[-10px] right-2'>
              <StarIcon/>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className='pt-5 pb-2'>
        <p className='text-[#BCB7B7] text-[10px] font-medium text-center'>
        Tap to open
        </p>
      </div>
      <div>
        <p className='text-[#BDFE38] text-sm font-medium text-center'>
        Slide to scroll
        </p>
      </div>
      <div className="flex items-center gap-4 mt-3">
        <input
          type="range"
          min="0"
          max={iceCreamItems.length - 1}
          value={selectedIndex}
          onChange={(e) => setSelectedIndex(parseInt(e.target.value))}
          className="w-64 h-2 appearance-none cursor-pointer bg-transparent [&::-webkit-slider-runnable-track]:rounded-full [&::-webkit-slider-runnable-track]:bg-[#BDFE38] [&::-webkit-slider-runnable-track]:h-1 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:-mt-1.5 [&::-webkit-slider-runnable-track]:curved-track"
          style={{
            '--curved-track': `linear-gradient(to right, transparent 5%, #BDFE38 5% 95%, transparent 95%)`
          } as React.CSSProperties}
        />
      </div>
    </div>
  )
}
export default IceCreamSlider