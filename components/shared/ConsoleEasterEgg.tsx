'use client';

import { useEffect } from 'react';

const ConsoleEasterEgg = () => {
    useEffect(() => {
        const hasSeen = sessionStorage.getItem('developer-easter-egg');
        if (!hasSeen) {
            console.log(
                '%c👀 Curious developer detected.',
                'color: #00bef3; font-size: 16px; font-weight: bold; font-family: sans-serif;'
            );
            console.log(
                '%cIf you’re reading this, you’re our kind of person.\nWe should probably hire you.',
                'color: #ffffff; font-size: 14px; font-family: sans-serif;'
            );
            sessionStorage.setItem('developer-easter-egg', 'true');
        }
    }, []);

    return null;
};

export default ConsoleEasterEgg;
