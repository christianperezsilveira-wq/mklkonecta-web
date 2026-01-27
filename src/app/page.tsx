import { Navbar } from "@/components/home/Navbar";
import { Hero } from "@/components/home/Hero";
import { Services } from "@/components/home/Services";
import { Footer } from "@/components/home/Footer";
import { LanguageProvider } from "@/context/LanguageContext";

export default function Home() {
  return (
    <LanguageProvider>
      <main>
        <Navbar />
        <Hero />
        <Services />
        <Footer />
      </main>
    </LanguageProvider>
  );
}
