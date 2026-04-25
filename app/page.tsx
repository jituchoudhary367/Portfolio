import dynamic from "next/dynamic";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import PageBoot from "@/components/PageBoot";
import SectionDivider from "@/components/ui/SectionDivider";
import ScrollReveal from "@/components/ui/ScrollReveal";

const Hero = dynamic(() => import("@/components/sections/Hero"));
const About = dynamic(() => import("@/components/sections/About"));
const Projects = dynamic(() => import("@/components/sections/Projects"));
const Skills = dynamic(() => import("@/components/sections/Skills"));
const GithubCerts = dynamic(() => import("@/components/sections/GithubCerts"));
const Contact = dynamic(() => import("@/components/sections/Contact"));

export default function Home() {
  return (
    <>
      <PageBoot />
      <Navbar />
      <main className="bg-[var(--bg-primary)] text-[var(--text-primary)]">
        <Hero />
        <SectionDivider />
        <ScrollReveal animation="fadeRight">
          <About />
        </ScrollReveal>
        <SectionDivider />
        <ScrollReveal animation="fadeRight">
          <Projects />
        </ScrollReveal>
        <SectionDivider />
        <ScrollReveal animation="fadeRight">
          <Skills />
        </ScrollReveal>
        <SectionDivider />
        <ScrollReveal animation="fadeRight">
          <GithubCerts />
        </ScrollReveal>
        <SectionDivider />
        <ScrollReveal animation="fadeRight">
          <Contact />
        </ScrollReveal>
      </main>
      <Footer />
    </>
  );
}
