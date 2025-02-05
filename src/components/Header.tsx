"use client";
import React, { useState, useRef, useEffect } from "react";
const Arrow = '/images/arrow.svg';
interface NavItem {
    text: string
    href: string
}

const Header = () => {
    const [selectedIndex, setSelectedIndex] = useState<number>(2);
    const [isDragging, setIsDragging] = useState<boolean>(false);
    const [startX, setStartX] = useState<number>(1);
    const [dragOffset, setDragOffset] = useState<number>(0);
    const dragThreshold = 20;
    const sliderRef = useRef<HTMLDivElement>(null);
    const animationRef = useRef<number | null>(null);

    const navItems: NavItem[] = [
        { text: "ACCOUNT", href: "/account" },
        { text: "HOME", href: "/" },
        { text: "FLAVORS", href: "/flavors" },
        { text: "REQUESTS", href: "/requests" },
        { text: "SETTINGS", href: "/settings" },
    ];

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
            const newIndex = Math.max(0, Math.min(navItems.length - 1, selectedIndex + direction));
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

    const handleClick = (index: number) => {
        if (!isDragging || Math.abs(dragOffset) < dragThreshold) {
            setSelectedIndex(index);
        }
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

    const handleTouchEnd = () => {
        handleMouseUp();
    };

    const getPosition = (index: number): number => {
        const spacing = 22.5
        const startPosition = 5
        const basePositions = Array.from({ length: 5 }, (_, i) => startPosition + (spacing * i))
        const selectedOffset = (selectedIndex - 2) * -spacing
        const dragAdjustment = isDragging ? dragOffset * 0.1 : 0
        return basePositions[index] + selectedOffset + dragAdjustment
    };

    useEffect(() => {
        return () => {
            if (animationRef.current) {
                cancelAnimationFrame(animationRef.current);
            }
        };
    }, []);

    return (
        <>
            <div className="relative w-full overflow-hidden">
                <div className="mt-[-150px] ml-[-20%] w-[140%] h-[250px] relative overflow-hidden rounded-[200%] flex items-end justify-center bg-[#BDFE38]">
                    <div
                        ref={sliderRef}
                        className={`absolute bottom-1 w-full h-32 select-none ${isDragging ? "cursor-grabbing" : "cursor-pointer"}`}
                        onMouseDown={handleMouseDown}
                        onMouseMove={handleMouseMove}
                        onMouseUp={handleMouseUp}
                        onMouseLeave={handleMouseUp}
                        onTouchStart={handleTouchStart}
                        onTouchMove={handleTouchMove}
                        onTouchEnd={handleTouchEnd}
                    >
                        <svg className="w-full h-full" viewBox="0 0 500 100">
                            <defs>
                                <path
                                    id="reverseCurvePath"
                                    d="M 50,0 A 200,90 0 0,0 450,0"
                                    fill="transparent"
                                />
                            </defs>
                            {navItems.map((item, index) => (
                                <text
                                    key={item.text}
                                    fontSize="14"
                                    fontWeight="500"
                                    fill="currentColor"
                                    className={`transition-all duration-500 ease-out ${index === selectedIndex ? "fill-black" : "fill-[#BCB7B7]"} hover:fill-black`}
                                    onClick={() => handleClick(index)}
                                >

                                    <textPath
                                        href="#reverseCurvePath"
                                        startOffset={`${getPosition(index)}%`}
                                        textAnchor="middle"
                                        className="transition-all duration-500 ease-out"
                                    >
                                        {item.text}
                                    </textPath>
                                </text>
                            ))}
                        </svg>
                    </div>
                </div>
            </div>
            <div className="flex justify-center mt-[-5px]">
                <img src={Arrow} alt="Arrow" />
            </div>
        </>
    );
};

export default Header;