"use client";
import StarIcon from '@/icons/starIcon';
import { useAppSelector } from '@/utils/hooks';
import { RootState } from '@/store/store';
import React, { useState, useRef, useEffect } from 'react';
import { motion } from "framer-motion";

const MangoImage = '/images/mango.png';

const IceCreamSlider = () => {
  const [selectedIndex, setSelectedIndex] = useState<number>(1);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [startX, setStartX] = useState<number>(0);
  const [dragOffset, setDragOffset] = useState<number>(0);
  const dragThreshold = 20;
  const sliderRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<number | null>(null);
  
  const iceCreamItems = useAppSelector((state: RootState) => state.iceCream.items);

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setStartX(e.clientX - dragOffset);
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    const currentX = e.clientX - startX;
    setDragOffset(currentX);
  };

  const handleMouseUp = () => {
    if (!isDragging) return;
    setIsDragging(false);

    if (Math.abs(dragOffset) > dragThreshold) {
      const direction = dragOffset > 0 ? -1 : 1;
      const newIndex = Math.max(0, Math.min(iceCreamItems.length - 1, selectedIndex + direction));
      setSelectedIndex(newIndex);
    }
    animateToCenter();
  };

  const animateToCenter = () => {
    animationRef.current = requestAnimationFrame(() => {
      setDragOffset((prev) => {
        const newOffset = prev * 0.85;
        if (Math.abs(newOffset) < 0.5) {
          if (animationRef.current) {
            cancelAnimationFrame(animationRef.current);
          }
          return 0;
        }
        animateToCenter();
        return newOffset;
      });
    });
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    setIsDragging(true);
    setStartX(e.touches[0].clientX - dragOffset);
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging) return;
    const currentX = e.touches[0].clientX - startX;
    setDragOffset(currentX);
  };

  const getVisibleItems = () => {
    const items = [];
    for (let i = -1; i <= 1; i++) {
      const index = selectedIndex + i;
      if (index >= 0 && index < iceCreamItems.length) {
        items.push({ ...iceCreamItems[index], index });
      }
    }
    return items;
  };

  const getItemStyles = (index: number) => {
    const offset = index - selectedIndex;
    return {
      scale: offset === 0 ? 1.1 : 0.85,
      rotate: offset < 0 ? 15 : offset > 0 ? -15 : 0,
      y: offset === 0 ? 0 : -35,
      x: offset === 0 ? 0 : (offset * 20),
      zIndex: offset === 0 ? 2 : 1,
    };
  };

  useEffect(() => {
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  return (
    <div className="relative pt-0 w-full flex flex-col items-center">
      <div
        ref={sliderRef}
        className={`flex justify-center gap-16 items-center mt-8 min-h-[300px] ${isDragging ? "cursor-grabbing" : "cursor-pointer"}`}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleMouseUp}
      >
        {getVisibleItems().map((item) => (
          <motion.div
            key={item.index}
            initial={getItemStyles(item.index)}
            animate={getItemStyles(item.index)}
            transition={{ 
              type: "spring", 
              stiffness: 300, 
              damping: 25,
              mass: 0.8,
              velocity: isDragging ? 50 : 0
            }}
            className="relative"
            style={{ 
              transformOrigin: "center center",
              perspective: "1200px",
              transformStyle: "preserve-3d"
            }}
          >
            <motion.div 
              className="bg-[#121904] rounded-2xl pt-[40px] px-10 relative w-[170px] min-w-[170px] overflow-visible"
              whileHover={{ scale: 1.05 }}
              style={{
                boxShadow: "0 10px 20px rgba(0,0,0,0.2)",
              }}
            >
              <h2 className='text-white mb-3 text-lg font-medium text-center'>
                {item.name}
              </h2>
              <motion.div 
                className='flex justify-center relative z-10'
                whileHover={{ y: -5 }}
                animate={{ 
                  rotateY: isDragging ? dragOffset * 0.05 : 0
                }}
                transition={{ 
                  type: "spring", 
                  stiffness: 200,
                  damping: 20
                }}
              >
                <img 
                  className='max-w-[75px] transform-gpu'
                  src={MangoImage} 
                  alt='MangoImage'
                  style={{
                    willChange: 'transform',
                    backfaceVisibility: 'hidden'
                  }}
                />
              </motion.div>
              <motion.div 
                className='absolute bottom-[-10px] right-2'
                animate={{ 
                  rotate: isDragging ? dragOffset * 0.03 : 0
                }}
                transition={{
                  type: "spring",
                  stiffness: 150,
                  damping: 15
                }}
              >
                <StarIcon/>
              </motion.div>
            </motion.div>
          </motion.div>
        ))}
      </div>
      <motion.p 
        className='text-[#BCB7B7] text-[10px] font-medium text-center pt-5 pb-2'
        whileHover={{ scale: 1.1 }}
      >
        Tap to open
      </motion.p>
      <motion.p 
        className='text-[#BDFE38] text-sm font-medium text-center'
        whileHover={{ scale: 1.1 }}
      >
        Slide to scroll
      </motion.p>
      <motion.div 
        className="flex items-center gap-4 mt-3"
        whileHover={{ scale: 1.05 }}
      >
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
      </motion.div>
    </div>
  );
};

export default IceCreamSlider;