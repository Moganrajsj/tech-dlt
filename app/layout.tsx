import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navigation from "@/components/layout/Navigation";
import Footer from "@/components/layout/Footer";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import CinematicUniverse from "@/components/shared/CinematicUniverse";
import ConsoleEasterEgg from "@/components/shared/ConsoleEasterEgg";
import AdvancedEasterEggs from "@/components/shared/AdvancedEasterEggs";
import WhatsAppButton from "@/components/shared/WhatsAppButton";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Tech-DLT | Advanced AI Solutions & Digital Transformation",
  description: "Accelerate your enterprise with Tech-DLT's cutting-edge AI infrastructure, predictive analytics, and autonomous automation solutions.",
  keywords: "AI, Artificial Intelligence, Digital Transformation, B2B Marketplace, Tech-DLT, Automation, Machine Learning",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} font-sans antialiased selection:bg-blue-500/30 selection:text-blue-200`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <ConsoleEasterEgg />
          <AdvancedEasterEggs />
          <CinematicUniverse />
          <Navigation />
          <WhatsAppButton />
          <main className="relative z-10">{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
