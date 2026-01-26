import React, { useRef, useState, useEffect } from 'react';
import Header, { SectionKey } from './components/Header';
import Hero from './components/Hero';
import LoadingScreen from './components/LoadingScreen';
import DevelopmentPage from './pages/DevelopmentPage';
import DigitalArtsPage from './pages/DigitalArtsPage';
import VisualIdentityPage from './pages/VisualIdentityPage';
import MotionPage from './pages/MotionPage';
import About from './pages/About';

const SECTION_ORDER: SectionKey[] = ['home', 'development', 'arts', 'visual', 'motion', 'about'];
type ThemeMode = 'light' | 'dark';

const App: React.FC = () => {
  const scrollContainerRef = useRef<HTMLDivElement | null>(null);
  const scrollToRef = useRef<((value: number) => void) | null>(null);
  const scrollStateRef = useRef({ current: 0, target: 0, rafId: 0 });
  const heroRef = useRef<HTMLElement | null>(null);
  const developmentRef = useRef<HTMLElement | null>(null);
  const artsRef = useRef<HTMLElement | null>(null);
  const visualRef = useRef<HTMLElement | null>(null);
  const motionRef = useRef<HTMLElement | null>(null);
  const aboutRef = useRef<HTMLElement | null>(null);
  const sectionRefs: Record<SectionKey, React.RefObject<HTMLElement>> = {
    home: heroRef,
    development: developmentRef,
    arts: artsRef,
    visual: visualRef,
    motion: motionRef,
    about: aboutRef,
  };
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeSection, setActiveSection] = useState<SectionKey>('home');
  const [theme, setTheme] = useState<ThemeMode>('dark');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const stored = localStorage.getItem('theme') as ThemeMode | null;
    if (stored === 'light' || stored === 'dark') {
      setTheme(stored);
      return;
    }
    setTheme('dark');
  }, []);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

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

    const updateActiveSection = (value: number) => {
      const viewportCenter = value + container.clientWidth / 2;
      let current: SectionKey = activeSection;

      for (const key of SECTION_ORDER) {
        const el = sectionRefs[key]?.current;
        if (!el) continue;
        const start = el.offsetLeft;
        const end = start + el.offsetWidth;
        if (viewportCenter >= start && viewportCenter < end) {
          current = key;
          break;
        }
      }

      setActiveSection((prev: SectionKey) => (prev === current ? prev : current));
    };

    const updateProgress = () => {
      const currentScroll = container.scrollLeft;
      applyProgress(currentScroll);
      updateActiveSection(currentScroll);
    };

    const animateScroll = () => {
      const maxScrollLeft = getMaxScrollLeft();
      state.target = Math.min(Math.max(state.target, 0), Math.max(maxScrollLeft, 0));

      const next = state.current + (state.target - state.current) * 0.14;
      const isSettled = Math.abs(state.target - state.current) < 0.5;

      if (isSettled) {
        container.scrollLeft = state.target;
        state.current = state.target;
        applyProgress(state.current);
        updateActiveSection(state.current);
        state.rafId = 0;
        return;
      }

      container.scrollLeft = next;
      state.current = next;
      applyProgress(state.current);
      updateActiveSection(state.current);
      state.rafId = requestAnimationFrame(animateScroll);
    };

    const handleWheel = (event: WheelEvent) => {
      const target = event.target as HTMLElement | null;
      if (target && target.closest('.allow-vertical-scroll')) {
        return;
      }
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
    const target = sectionRefs[section]?.current;
    if (target && scrollToRef.current) {
      scrollToRef.current(target.offsetLeft);
    }
  };

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  return (
    <div className="relative theme-surface min-h-screen">
      {isLoading && <LoadingScreen onFinished={() => setIsLoading(false)} />}

      <Header onNavigate={handleNavigate} activeSection={activeSection} onToggleTheme={toggleTheme} theme={theme} />
      
      <div
        ref={scrollContainerRef}
        className="flex h-screen w-full items-center overflow-x-auto overflow-y-hidden no-scrollbar"
      >
        {/* Home */}
        <section ref={heroRef} className="w-[100vw] flex-shrink-0 px-10 md:px-32 pb-[90px]"  id="home">
          <Hero />
        </section>

        {/* Development */}
        <section
          ref={developmentRef}
          className="w-[110vw] flex-shrink-0 px-10 md:px-24 overflow-y-auto max-h-screen"
          id="development"
        >
          <DevelopmentPage />
        </section>

        {/* Digital Arts */}
        <section
          ref={artsRef}
          className="w-[110vw] flex-shrink-0 px-10 md:px-24 overflow-y-auto max-h-screen"
          id="arts"
        >
          <DigitalArtsPage />
        </section>

        {/* Visual Identity */}
        <section
          ref={visualRef}
          className="w-[110vw] flex-shrink-0 px-10 md:px-24 overflow-y-auto max-h-screen"
          id="visual"
        >
          <VisualIdentityPage />
        </section>

        {/* Motion */}
        <section
          ref={motionRef}
          className="w-[110vw] flex-shrink-0 px-10 md:px-24 overflow-y-auto max-h-screen"
          id="motion"
        >
          <MotionPage />
        </section>

        {/* About Me */}
        <section ref={aboutRef} className="w-[110vw] flex-shrink-0 px-10 md:px-24 overflow-y-auto max-h-screen" id="about">
          <About />
        </section>
      </div>

      {/* Deep Atmosphere Decor */}
      <div className="fixed inset-0 pointer-events-none z-[-1]">
        <div
          className="absolute top-[10%] left-[10%] w-[40vw] h-[40vw] rounded-full blur-[140px] animate-pulse"
          style={{ backgroundColor: 'var(--color-accent-soft)' }}
        ></div>
        <div
          className="absolute bottom-[20%] right-[10%] w-[50vw] h-[50vw] rounded-full blur-[160px]"
          style={{ backgroundColor: 'var(--color-text-subtle)', opacity: 0.18 }}
        ></div>
      </div>

      {/* Minimal Progress Indicator */}
      <div className="fixed bottom-12 left-12 right-12 z-50 flex items-center space-x-6">
        <span className="text-[10px] font-bold text-theme-subtle tracking-widest">0{Math.floor(scrollProgress * SECTION_ORDER.length) + 1}</span>
        <div className="flex-1 h-[2px] progress-track relative overflow-hidden">
          <div 
            className="absolute top-0 left-0 h-full bg-accent ease-out"
            style={{ width: `${scrollProgress * 100}%` }}
          />
        </div>
        <span className="text-[10px] font-bold text-theme-subtle tracking-widest">0{SECTION_ORDER.length}</span>
      </div>
    </div>
  );
};

export default App;
