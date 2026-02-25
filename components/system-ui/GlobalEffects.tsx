"use client";

import { BootScreen } from "@/components/system-ui/BootScreen";
import { CursorGlow } from "@/components/system-ui/CursorGlow";
import { InteractiveTerminal } from "@/components/system-ui/InteractiveTerminal";

export const GlobalEffects = ({ children }: { children: React.ReactNode }) => {
    return (
        <>
            <BootScreen />
            <CursorGlow />
            {children}
            <InteractiveTerminal />
        </>
    );
};
