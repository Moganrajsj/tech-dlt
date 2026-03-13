'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

const StorePage = () => {
    const products = [
        {
            id: 1,
            name: "Premium Digital Marketing",
            description: "High-tier branding ecosystem including SEO, web optimization, and strategic authority positioning.",
            price: "₹15,000",
            category: "Strategic Package",
            features: ["Authority SEO", "Strategic Social Hub", "Brand Ecosystem Design"]
        },
        {
            id: 2,
            name: "Analytical Ecosystems",
            description: "Custom market research and data intelligence infrastructure with infographic deliverables.",
            price: "₹25,000",
            category: "Data Product",
            features: ["Market Intelligence", "Visual Analytics", "Trend Projections"]
        },
        {
            id: 3,
            name: "Custom AI Agent Logic",
            description: "Bespoke AI agent development architected for your specific organizational automation needs.",
            price: "₹25,000",
            category: "Engineering Node",
            features: ["Autonomous Logic", "Scalable Scripts", "Global API Sockets"]
        },
        {
            id: 4,
            name: "AI Strategy Consulting",
            description: "High-level strategic advisory session for enterprise-wide AI implementation and data ethics.",
            price: "₹150,000",
            category: "Direct Advisory",
            features: ["Implementation Roadmap", "Executive Briefing", "Risk Shielding"]
        }
    ];

    return (
        <div className="pt-40 pb-32 min-h-screen bg-white">
            <div className="container mx-auto px-6 md:px-12">
                {/* Header */}
                <div className="max-w-4xl mx-auto text-center mb-32">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <span className="text-blue-600 font-black text-xs uppercase tracking-[0.4em] mb-6 block">Marketplace</span>
                        <h1 className="text-6xl md:text-9xl font-black text-[#111111] tracking-tighter mb-10 leading-none text-center">
                            Elite Service <br />
                            <span className="text-blue-600">Inventory</span>
                        </h1>
                        <p className="text-[#333333] text-xl font-medium max-w-2xl mx-auto">
                            Curated high-performance digital solutions and consulting products optimized for immediate enterprise deployment.
                        </p>
                    </motion.div>
                </div>

                {/* Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                    {products.map((product, index) => (
                        <motion.div
                            key={product.id}
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, delay: index * 0.1 }}
                            className="bg-slate-50 border border-slate-100 rounded-[56px] overflow-hidden group hover:bg-white hover:shadow-2xl hover:shadow-blue-600/5 transition-all duration-700"
                        >
                            <div className="p-16 flex flex-col h-full">
                                <div className="flex justify-between items-start mb-12">
                                    <span className="px-5 py-2 bg-blue-50 text-blue-600 rounded-full text-[10px] font-black uppercase tracking-widest border border-blue-100">
                                        {product.category}
                                    </span>
                                    <span className="text-slate-900 font-black text-4xl tracking-tighter">{product.price}</span>
                                </div>

                                <h3 className="text-4xl font-black text-[#111111] mb-6 group-hover:text-blue-600 transition-colors">
                                    {product.name}
                                </h3>

                                <p className="text-[#333333] text-lg leading-relaxed mb-12 font-medium">
                                    {product.description}
                                </p>

                                <ul className="space-y-6 mb-16">
                                    {product.features.map((feature) => (
                                        <li key={feature} className="flex items-center text-sm text-[#111111] font-bold">
                                            <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center mr-4">
                                                <svg className="w-3.5 h-3.5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={4} d="M5 13l4 4L19 7" />
                                                </svg>
                                            </div>
                                            {feature}
                                        </li>
                                    ))}
                                </ul>

                                <div className="mt-auto grid grid-cols-2 gap-6">
                                    <Link href="/contact" className="btn-primary py-5 text-sm uppercase tracking-widest shadow-xl shadow-blue-500/20">
                                        Request Quote
                                    </Link>
                                    <button className="btn-outline py-5 text-sm uppercase tracking-widest bg-white">
                                        Add to Bag
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Footnote */}
                <div className="mt-40 text-center py-20 bg-slate-50 border-dashed border-2 border-slate-200 rounded-[64px]">
                    <h3 className="text-2xl font-black text-slate-900 mb-8">Custom Enterprise Procurement</h3>
                    <p className="text-slate-500 font-medium max-w-xl mx-auto mb-10">
                        For custom deployment architectures and bulk service integration, please initiate a direct collaboration flow.
                    </p>
                    <Link href="/contact" className="text-blue-600 font-black text-sm uppercase tracking-widest hover:underline">
                        Start B2B Discussion →
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default StorePage;
