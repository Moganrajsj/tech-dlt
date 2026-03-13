'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';

const row1Testimonials = [
    { name: "Arun Kumar", role: "CTO", text: "Tech-DLT redesigned our AI infrastructure with precision. Our systems now run faster and more efficiently." },
    { name: "Vignesh Raj", role: "Startup Founder", text: "The automation solutions simplified our daily operations. We now scale our business with confidence." },
    { name: "Karthik Narayanan", role: "Product Lead", text: "The AI dashboards provide real-time business insights. Decision-making has become much easier." },
    { name: "Pradeep Kumar", role: "Systems Architect", text: "Secure architecture and strong performance. Tech-DLT delivered exactly what we needed." },
    { name: "Sathish Kumar", role: "Engineering Head", text: "Their AI platforms integrate seamlessly with our systems. The results were impressive." },
    { name: "Rammorthi", role: "IT Manager", text: "Reliable infrastructure and smooth deployment. A great partner for digital transformation." },
    { name: "Balaji Srinivasan", role: "Technology Consultant", text: "The engineering quality is exceptional. Their team understands enterprise AI perfectly." },
    { name: "Manikandan S", role: "Operations Lead", text: "Our automation workflows improved drastically. Tech-DLT helped us save time and resources." },
    { name: "Saravanan K", role: "Business Director", text: "Their intelligent systems brought clarity to our data. A truly professional team." },
    { name: "Senthil Kumar", role: "Engineering Manager", text: "Fast, stable, and secure AI architecture. Exactly what modern businesses require." },
    { name: "Mogan Raj SJ", role: "Software Architect", text: "Integration was smooth and well-engineered. Their AI frameworks are powerful." },
    { name: "Murugan P", role: "IT Director", text: "We experienced immediate performance improvements. Tech-DLT delivered high-quality solutions." },
    { name: "Ilango Krishnan", role: "Systems Analyst", text: "The analytics tools improved our visibility. Now we make smarter business decisions." },
    { name: "Ashwin Kumar", role: "Product Manager", text: "A reliable technology partner for scaling businesses. Their AI capabilities are impressive." },
    { name: "Dinesh Babu", role: "Tech Lead", text: "Modern AI infrastructure with strong security. Highly recommended for enterprise solutions." }
];

const row2Testimonials = [
    { name: "Lakshmi Narayanan", role: "Product Strategy", text: "Advanced AI insights improved our planning. Tech-DLT helped us grow faster." },
    { name: "Suresh Babu", role: "Infrastructure Manager", text: "The digital architecture they built is future-ready. Stable, secure, and scalable." },
    { name: "Meenakshi Sundaram", role: "Transformation Head", text: "Our systems are now automated and efficient. Tech-DLT made the transformation smooth." },
    { name: "Yuvrani . M", role: "Technical Advisor", text: "A trusted partner for AI innovation. Their engineering standards are excellent." },
    { name: "Kumaravel P", role: "Systems Engineer", text: "The performance boost was noticeable immediately. Great infrastructure solutions." },
    { name: "Naveen Kumar", role: "Startup Founder", text: "Tech-DLT understands real startup challenges. Their solutions helped us scale quickly." },
    { name: "Gokul Krishna", role: "Software Developer", text: "Clean architecture and modern AI frameworks. The system works flawlessly." },
    { name: "Thiru Murugan", role: "IT Consultant", text: "Their cloud and AI systems are highly reliable. Perfect for enterprise environments." },
    { name: "Ganesh Kumar", role: "Technology Director", text: "Powerful automation tools and intelligent systems. The impact was significant." },
    { name: "Prakash Raj", role: "Business Owner", text: "Automation simplified our operations. We now run more efficiently." },
    { name: "Vasanth Kumar", role: "Product Engineer", text: "The analytics platform gave us deep insights. A major upgrade to our infrastructure." },
    { name: "Selvakumar R", role: "Engineering Lead", text: "The technology stack is modern and scalable. Excellent engineering execution." },
    { name: "Aravind Raj", role: "Cloud Architect", text: "Strong AI architecture and cloud integration. Highly dependable solutions." },
    { name: "Bharath Kumar", role: "Software Consultant", text: "Tech-DLT delivered high-quality AI solutions. Professional and efficient team." },
    { name: "Deepak Raj", role: "Operations Manager", text: "Our digital systems became faster and smarter. A great transformation partner." }
];

// Double the items for seamless infinite scroll
const row1Items = [...row1Testimonials, ...row1Testimonials];
const row2Items = [...row2Testimonials, ...row2Testimonials];

const TestimonialCard = ({ testimonial }: { testimonial: { name: string, role: string, text: string } }) => (
    <div className="flex-shrink-0 w-[450px] min-h-[200px] p-8 rounded-3xl bg-slate-900/40 backdrop-blur-2xl border border-white/10 hover:border-blue-500/50 transition-all duration-500 group relative shadow-2xl shadow-black/80 mx-4 cursor-default hover:-translate-y-4 hover:scale-[1.02] hover:z-30 hover:bg-slate-900/60">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

        <div className="flex items-center gap-6 mb-6 relative z-10">
            <div>
                <h4 className="text-white font-black tracking-tighter text-base group-hover:text-blue-400 transition-colors uppercase">{testimonial.name}</h4>
                <p className="text-slate-500 text-[10px] font-bold tracking-[0.2em] uppercase">{testimonial.role}</p>
            </div>
        </div>

        <div className="relative z-10">
            <p className="text-slate-400 text-lg leading-[1.5] whitespace-normal group-hover:text-white transition-colors line-clamp-2 group-hover:line-clamp-none">
                "{testimonial.text}"
            </p>
        </div>

        <div className="absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-blue-600/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
    </div>
);

const TestimonialsSection = () => {
    const [isPaused1, setIsPaused1] = useState(false);
    const [isPaused2, setIsPaused2] = useState(false);

    return (
        <section className="py-40 bg-transparent relative overflow-hidden flex flex-col items-center">
            <div className="container mx-auto px-6 relative z-10 text-center mb-24">
                <motion.span
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    className="text-blue-500 font-bold tracking-[0.5em] uppercase text-xs mb-8 block"
                >
                    Success Protocols
                </motion.span>
                <motion.h2
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1 }}
                    className="text-white text-5xl md:text-7xl font-black tracking-tighter uppercase leading-none"
                >
                    Validated by <br />
                    <span className="text-blue-600">Global Partners.</span>
                </motion.h2>
            </div>

            {/* Double Row Carousel Container */}
            <div className="w-full relative space-y-8 py-4">
                {/* Global Mask Fades */}
                <div className="absolute left-0 top-0 bottom-0 w-64 bg-gradient-to-r from-[#02040a] to-transparent z-20 pointer-events-none" />
                <div className="absolute right-0 top-0 bottom-0 w-64 bg-gradient-to-l from-[#02040a] to-transparent z-20 pointer-events-none" />

                {/* Row 1: Left Scrolling */}
                <div 
                    className="w-full overflow-hidden flex items-center group/row1"
                    onMouseEnter={() => setIsPaused1(true)}
                    onMouseLeave={() => setIsPaused1(false)}
                >
                    <div className={`flex whitespace-nowrap animate-marquee ${isPaused1 ? 'pause-animation' : ''}`}>
                        {row1Items.map((t, i) => (
                            <TestimonialCard key={`r1-${i}`} testimonial={t} />
                        ))}
                    </div>
                </div>

                {/* Row 2: Right Scrolling */}
                <div 
                    className="w-full overflow-hidden flex items-center group/row2"
                    onMouseEnter={() => setIsPaused2(true)}
                    onMouseLeave={() => setIsPaused2(false)}
                >
                    <div className={`flex whitespace-nowrap animate-marquee-reverse ${isPaused2 ? 'pause-animation' : ''}`}>
                        {row2Items.map((t, i) => (
                            <TestimonialCard key={`r2-${i}`} testimonial={t} />
                        ))}
                    </div>
                </div>
            </div>

            {/* Background Decoration - RESTORED CINEMATIC GLOWS */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] bg-blue-600/5 rounded-full blur-[180px] -z-10 animate-glow-drift" />
        </section>
    );
};

export default TestimonialsSection;
