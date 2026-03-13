/**
 * Unified Motion Choreography Constants
 * Centralized timing and easing system for cinematic flow.
 */

export const DURATIONS = {
    FAST: 0.3,      // Micro-interactions (hover, click, toggle)
    MEDIUM: 0.7,    // Standard UI transitions (modals, cards reveal)
    SLOW: 1.2,      // Section reveals, secondary choreography
    CINEMATIC: 2.5,  // Large scene transitions, camera fly-throughs
};

export const EASING = {
    // Snappy for fast interactions
    SNAPPY: [0.23, 1, 0.32, 1],

    // Smooth for standard UI
    SMOOTH: [0.4, 0, 0.2, 1],

    // High contrast easing for cinematic impact (GSAP equivalent to expo.inOut)
    CINEMATIC: [0.87, 0, 0.13, 1],

    // Gentle for ambient motion
    AMBIENT: [0.445, 0.05, 0.55, 0.95],
};

export const CHOREOGRAPHY = {
    STAGGER_FAST: 0.05,
    STAGGER_MEDIUM: 0.1,
    STAGGER_SLOW: 0.2,
};

// Transition configuration for Framer Motion
export const transitions = {
    micro: {
        duration: DURATIONS.FAST,
        ease: EASING.SNAPPY as any,
    },
    standard: {
        duration: DURATIONS.MEDIUM,
        ease: EASING.SMOOTH as any,
    },
    cinematic: {
        duration: DURATIONS.CINEMATIC,
        ease: EASING.CINEMATIC as any,
    },
};
