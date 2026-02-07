import Hero from './components/Hero';
import LogoTrack from './components/LogoTrack';
import Stats from './components/Stats';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Contact from './components/Contact';
import ClientWrapper from './ClientWrapper'; // Import the wrapper

export default function Home() {
  return (
    <main>
      <Hero />
      <LogoTrack />
      <Stats /> 
      <Skills />
      <Projects />
      {/* This handles the ServicePlans safely */}
      <ClientWrapper />
      <Contact />
    </main>
  );
}