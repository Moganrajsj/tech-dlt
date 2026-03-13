'use client';

import { usePathname } from 'next/navigation';
import dynamic from 'next/dynamic';
import { Suspense } from 'react';
import SceneTransition from './controls/SceneTransition';

const HomeScene = dynamic(() => import('./scenes/HomeScene'), { ssr: false });
const ServicesScene = dynamic(() => import('./scenes/ServicesScene'), { ssr: false });
const AboutScene = dynamic(() => import('./scenes/AboutScene'), { ssr: false });
const StoreScene = dynamic(() => import('./scenes/StoreScene'), { ssr: false });
const CareersScene = dynamic(() => import('./scenes/CareersScene'), { ssr: false });
const ContactScene = dynamic(() => import('./scenes/ContactScene'), { ssr: false });
const TechnologyScene = dynamic(() => import('./scenes/TechnologyScene'), { ssr: false });

export default function SceneManager() {
    const pathname = usePathname();

    let SceneComponent = HomeScene;

    if (pathname.includes('/services')) SceneComponent = ServicesScene;
    else if (pathname.includes('/about')) SceneComponent = AboutScene;
    else if (pathname.includes('/store')) SceneComponent = StoreScene;
    else if (pathname.includes('/careers')) SceneComponent = CareersScene;
    else if (pathname.includes('/contact')) SceneComponent = ContactScene;
    else if (pathname.includes('/technology')) SceneComponent = TechnologyScene;

    return (
        <Suspense fallback={null}>
            <SceneTransition key={pathname}>
                <SceneComponent />
            </SceneTransition>
        </Suspense>
    );
}
