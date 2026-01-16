import React, { useRef, useState, useEffect } from 'react';
import Header, { SectionKey } from './components/Header';
import Hero from './components/Hero';
import ProjectCard from './components/ProjectCard';
import About from './components/About';
import { PROJECTS } from './constants';

const App: React.FC = () => {
  const scrollContainerRef = useRef<HTMLDivElement | null>(null);
  const scrollToRef = useRef<((value: number) => void) | null>(null);
  const scrollStateRef = useRef({ current: 0, target: 0, rafId: 0 });
  const heroRef = useRef<HTMLElement | null>(null);
  const projectsRef = useRef<HTMLElement | null>(null);
  const aboutRef = useRef<HTMLElement | null>(null);
  const closingRef = useRef<HTMLElement | null>(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const state = scrollStateRef.current;
    state.current = container.scrollLeft;
    state.target = container.scrollLeft;

    const getMaxScrollLeft = () => container.scrollWidth - container.clientWidth;

    const applyProgress = (value: number) => {
      const maxScrollLeft = getMaxScrollLeft();
      if (maxScrollLeft <= 0) {
        setScrollProgress(0);
        return;
      }

      const progress = value / maxScrollLeft;
      setScrollProgress(Math.min(Math.max(progress, 0), 1));
    };

    const updateProgress = () => applyProgress(container.scrollLeft);

    const animateScroll = () => {
      const maxScrollLeft = getMaxScrollLeft();
      state.target = Math.min(Math.max(state.target, 0), Math.max(maxScrollLeft, 0));

      const next = state.current + (state.target - state.current) * 0.14;
      const isSettled = Math.abs(state.target - state.current) < 0.5;

      if (isSettled) {
        container.scrollLeft = state.target;
        state.current = state.target;
        applyProgress(state.current);
        state.rafId = 0;
        return;
      }

      container.scrollLeft = next;
      state.current = next;
      applyProgress(state.current);
      state.rafId = requestAnimationFrame(animateScroll);
    };

    const handleWheel = (event: WheelEvent) => {
      const maxScrollLeft = getMaxScrollLeft();
      if (maxScrollLeft <= 0) return;

      const verticalScrollDominant = Math.abs(event.deltaY) > Math.abs(event.deltaX);
      if (!verticalScrollDominant) return;

      event.preventDefault();
      state.target += event.deltaY;

      if (!state.rafId) {
        state.rafId = requestAnimationFrame(animateScroll);
      }
    };

    scrollToRef.current = (value: number) => {
      state.target = value;
      if (!state.rafId) {
        state.rafId = requestAnimationFrame(animateScroll);
      }
    };

    container.addEventListener('scroll', updateProgress, { passive: true });
    window.addEventListener('wheel', handleWheel, { passive: false });
    window.addEventListener('resize', updateProgress);

    updateProgress();

    return () => {
      container.removeEventListener('scroll', updateProgress);
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('resize', updateProgress);
      if (state.rafId) {
        cancelAnimationFrame(state.rafId);
      }
    };
  }, []);

  const handleNavigate = (section: SectionKey) => {
    const targetRef =
      section === 'home'
        ? heroRef
        : section === 'work'
        ? projectsRef
        : section === 'about'
        ? aboutRef
        : closingRef;

    if (targetRef.current && scrollToRef.current) {
      scrollToRef.current(targetRef.current.offsetLeft);
    }
  };

  return (
    <div className="relative bg-[#292e36] min-h-screen">
      <Header onNavigate={handleNavigate} />
      
      <div
        ref={scrollContainerRef}
        className="flex h-screen w-full items-center overflow-x-auto overflow-y-hidden no-scrollbar"
      >
        {/* Intro Section */}
        <section ref={heroRef} className="w-[100vw] flex-shrink-0 px-10 md:px-32" id="home">
          <Hero />
        </section>

        {/* Portfolio Grid */}
        <section
          ref={projectsRef}
          className="flex items-end space-x-24 md:space-x-56 px-32 pb-20"
          id="work"
        >
          {PROJECTS.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </section>

        {/* About & Contact Section */}
        <section ref={aboutRef} className="w-[110vw] flex-shrink-0 px-10 md:px-32" id="about">
          <About />
        </section>
        
        {/* Closing */}
        <section
          ref={closingRef}
          className="w-[60vw] flex-shrink-0 flex items-center justify-center pr-32"
          id="end"
        >
           <div className="text-center">
             <h2 className="text-5xl md:text-8xl font-serif italic text-[#edead8]/10 mb-8 uppercase tracking-widest">Endless</h2>
             <p className="text-xs uppercase tracking-[0.6em] text-[#edead8]/30">Crafted with precision & AI</p>
           </div>
        </section>
      </div>

      {/* Deep Atmosphere Decor */}
      <div className="fixed inset-0 pointer-events-none z-[-1]">
        <div className="absolute top-[10%] left-[10%] w-[40vw] h-[40vw] bg-red-900/10 rounded-full blur-[140px] animate-pulse"></div>
        <div className="absolute bottom-[20%] right-[10%] w-[50vw] h-[50vw] bg-[#edead8]/5 rounded-full blur-[160px]"></div>
      </div>

      {/* Minimal Progress Indicator */}
      <div className="fixed bottom-12 left-12 right-12 z-50 flex items-center space-x-6">
        <span className="text-[10px] font-bold text-[#edead8]/40 tracking-widest">0{Math.floor(scrollProgress * PROJECTS.length) + 1}</span>
        <div className="flex-1 h-[2px] bg-[#edead8]/5 relative overflow-hidden">
          <div 
            className="absolute top-0 left-0 h-full bg-red-600 ease-out"
            style={{ width: `${scrollProgress * 100}%` }}
          />
        </div>
        <span className="text-[10px] font-bold text-[#edead8]/40 tracking-widest">0{PROJECTS.length}</span>
      </div>
    </div>
  );
};

export default App;
