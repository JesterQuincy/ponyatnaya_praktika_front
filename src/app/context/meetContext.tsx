'use client'

import { createContext, useContext, useState, ReactNode } from 'react';

const MeetContext = createContext<any>(null);

export function MeetProvider({ children }: { children: ReactNode }) {
    const [meet, setMeet] = useState<any>(null);

    return (
        <MeetContext.Provider value={{ meet, setMeet }}>
            {children}
        </MeetContext.Provider>
    )
}

export function useMeet() {
    return useContext(MeetContext);
}
