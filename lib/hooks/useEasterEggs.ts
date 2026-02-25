"use client";

import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";

const KONAMI_CODE = [
    "ArrowUp", "ArrowUp", "ArrowDown", "ArrowDown",
    "ArrowLeft", "ArrowRight", "ArrowLeft", "ArrowRight",
    "KeyB", "KeyA",
];

const SECRET_PATH = "/consistency";

/**
 * Hidden easter egg hooks for navigating to /consistency
 * 1. Konami code (keyboard)
 * 2. Returns a click handler for rapid-click detection (7 clicks in 3s)
 */
export function useEasterEggs() {
    const router = useRouter();
    const konamiIndex = useRef(0);
    const clickCount = useRef(0);
    const clickTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

    // Konami Code listener
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.code === KONAMI_CODE[konamiIndex.current]) {
                konamiIndex.current++;
                if (konamiIndex.current === KONAMI_CODE.length) {
                    konamiIndex.current = 0;
                    router.push(SECRET_PATH);
                }
            } else {
                konamiIndex.current = 0;
            }
        };

        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [router]);

    // Rapid click handler (7 clicks within 3 seconds)
    const handleSecretClick = () => {
        clickCount.current++;

        if (clickTimer.current) clearTimeout(clickTimer.current);

        if (clickCount.current >= 4) {
            clickCount.current = 0;
            router.push(SECRET_PATH);
            return;
        }

        clickTimer.current = setTimeout(() => {
            clickCount.current = 0;
        }, 3000);
    };

    return { handleSecretClick };
}
