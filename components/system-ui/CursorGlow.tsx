"use client";

import { useEffect, useRef } from "react";

export const CursorGlow = () => {
    const glowRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleMove = (e: MouseEvent) => {
            if (glowRef.current) {
                glowRef.current.style.left = `${e.clientX}px`;
                glowRef.current.style.top = `${e.clientY}px`;
                glowRef.current.style.opacity = "1";
            }
        };

        const handleLeave = () => {
            if (glowRef.current) {
                glowRef.current.style.opacity = "0";
            }
        };

        window.addEventListener("mousemove", handleMove);
        document.addEventListener("mouseleave", handleLeave);

        return () => {
            window.removeEventListener("mousemove", handleMove);
            document.removeEventListener("mouseleave", handleLeave);
        };
    }, []);

    return (
        <div
            ref={glowRef}
            className="pointer-events-none fixed z-[100] -translate-x-1/2 -translate-y-1/2 opacity-0 transition-opacity duration-300"
            style={{ willChange: "left, top" }}
        >
            <div className="w-[500px] h-[500px] rounded-full bg-primary/[0.04] blur-[80px]" />
        </div>
    );
};
