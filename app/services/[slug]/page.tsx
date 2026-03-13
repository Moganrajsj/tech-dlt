import { getServiceBySlug } from '@/data/services';
import ServiceDetailClient from '@/components/services/ServiceDetailClient';
import { notFound } from 'next/navigation';

// Next.js 15+ compatible generic params type
type PageProps = {
    params: Promise<{ slug: string }>;
};

export default async function ServicePage({ params }: PageProps) {
    // Await params for Next.js 15 compatibility
    const { slug } = await params;
    console.log(`Rendering ServicePage for slug: ${slug}`);

    const service = getServiceBySlug(slug);

    if (!service) {
        notFound();
    }

    return <ServiceDetailClient service={service} />;
}
