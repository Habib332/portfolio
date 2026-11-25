import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Projects from "@/components/Projects";
import Experience from "@/components/Experience";
import Skills from "@/components/Skills";
import GitHubActivity from "@/components/GithubActivity";
import About from "@/components/About";
import Footer from "@/components/Footer";
import CustomCursor from "@/components/CustomCursor";
import ScrollProgress from "@/components/ScrollProgress";
import { useReveal } from "@/hooks/useReveal";
import { useSpotlight } from "@/hooks/useSpotlight";

const Index = () => {
  useReveal();
  useSpotlight();
  return (
    <div className="relative min-h-screen flex flex-col">
      <ScrollProgress />
      <CustomCursor />
      <div aria-hidden className="pointer-events-none fixed inset-0 z-0 bg-line-grid" />

      <div className="relative z-10 flex min-h-screen flex-col">
        <Navbar />
        <main className="flex-1">
          <Hero />
          <div className="hairline" />
          <Projects />
          <div className="hairline" />
          <Experience />
          <div className="hairline" />
          <Skills />
          <div className="hairline" />
          <GitHubActivity />
          <div className="hairline" />
          <About />
        </main>
        <Footer />
      </div>
    </div>
  );
};

export default Index;