'use client';

import CinematicHero from '@/components/home/CinematicHero';
import ProblemSection from '@/components/home/ProblemSection';
import SolutionSection from '@/components/home/SolutionSection';
import BISection from '@/components/home/BISection';
import AIAutomationSection from '@/components/home/AIAutomationSection';
import ConversationalAISection from '@/components/home/ConversationalAISection';
import InfrastructureSection from '@/components/home/InfrastructureSection';
import FutureVisionSection from '@/components/home/FutureVisionSection';
import TestimonialsSection from '@/components/home/TestimonialsSection';
import FinalCTASection from '@/components/home/FinalCTASection';

export default function Home() {
  return (
    <main className="relative overflow-hidden bg-[#02040a]">
      <CinematicHero />
      <ProblemSection />
      <SolutionSection />
      <BISection />
      <AIAutomationSection />
      <ConversationalAISection />
      <InfrastructureSection />
      <FutureVisionSection />
      <TestimonialsSection />
      <FinalCTASection />
    </main>
  );
}
