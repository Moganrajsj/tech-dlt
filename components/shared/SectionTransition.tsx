'use client';

/**
 * SectionTransition Component
 * Provides smooth gradient transitions between homepage sections
 * to eliminate hard black cuts and create visual flow
 */

interface SectionTransitionProps {
    variant?: 'blue' | 'cyan' | 'purple' | 'subtle';
    position?: 'top' | 'bottom' | 'both';
    height?: string;
}

const SectionTransition = ({
    variant = 'blue',
    position = 'bottom',
    height = 'h-32'
}: SectionTransitionProps) => {
    const gradients = {
        blue: 'from-transparent via-blue-950/30 to-transparent',
        cyan: 'from-transparent via-cyan-950/30 to-transparent',
        purple: 'from-transparent via-purple-950/30 to-transparent',
        subtle: 'from-transparent via-slate-900/20 to-transparent'
    };

    const positionClasses = {
        top: 'top-0',
        bottom: 'bottom-0',
        both: 'top-0'
    };

    return (
        <>
            <div
                className={`absolute ${positionClasses[position]} left-0 right-0 ${height} bg-gradient-to-b ${gradients[variant]} pointer-events-none z-10`}
            />
            {position === 'both' && (
                <div
                    className={`absolute bottom-0 left-0 right-0 ${height} bg-gradient-to-t ${gradients[variant]} pointer-events-none z-10`}
                />
            )}
        </>
    );
};

export default SectionTransition;
