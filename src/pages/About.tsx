import React, { useEffect, useMemo, useState } from 'react';
import SideMenu, { SideMenuItem } from '../components/SideMenu';
import OverviewContent from '../components/OverviewContent';

type SectionKey = 'OVERVIEW' | 'TIMELINE' | 'RESUME' | 'PROJECT';

type TimelineEntry = {
  navYear: string;
  displayYear: string;
  role: string;
  company: string;
  location: string;
  highlights: string[];
  image?: string;
  projectUrl?: string;
  projectLabel?: string;
};

const ABOUT_MENU_ITEMS: readonly SideMenuItem<SectionKey | 'PROJECT'>[] = [
  { key: 'OVERVIEW', label: 'Overview' },
  { key: 'TIMELINE', label: 'Timeline' },
  { key: 'PROJECT', label: 'Personal Project' },
  { key: 'RESUME', label: 'Resume' },
] as const;

const TIMELINE_ENTRIES: TimelineEntry[] = [
  {
    navYear: '2019',
    displayYear: 'Dec 2019 – Nov 2023',
    role: 'Software & Web Developer',
    company: 'Le Tran Share Holder Limited Company (Fulltime Permanent)',
    location: 'Ho Chi Minh City',
    highlights: [
      'Built production websites with integrated front-end, backend, and SQL systems, leading UX/UI optimization driven by analytics and user feedback.',
      'Key project: cattiensa.com',
    ],
    image: `url(${process.env.PUBLIC_URL}/cts.webp)`,
    projectUrl: 'https://www.cattiensa.com/#banner',
    projectLabel: 'cattiensa.com',
  },
  {
    navYear: '2023',
    displayYear: 'Aug 2023 - May 2025',
    role: 'Digital Designer Student',
    company: 'Bow Valley College',
    location: 'Calgary - Canada',
    highlights: [
      'GPA: 3.9 / 4.0',
      
    ],
    image: `url(${process.env.PUBLIC_URL}/bowvalley.webp)`,
    projectLabel: 'Bow Valley Study',
  },
  {
    navYear: '2024',
    displayYear: 'May 2024 – Jul 2024',
    role: 'Digital Developer ',
    company: 'Memory Express Inc. (Intern)',
    location: 'Calgary - Canada',
    highlights: [
      'Supported web tool development through debugging, testing, and feature refinement in enterprise-level workflows.',
      'Key project: memoryexpress.com',
    ],
    image: `url(${process.env.PUBLIC_URL}/mem.webp)`,
    projectUrl: 'https://www.memoryexpress.com/',
    projectLabel: 'memoryexpress.com',
  },
  {
    navYear: '2025',
    displayYear: 'Jul 2025 – Jan 2026',
    role: 'Software Developer',
    company: 'Anvy Digital Imaging (Fulltime Contract)',
    location: 'Calgary - Canada',
    highlights: [
      'Developed scalable web applications with responsive front ends, API integrations, analytics-driven UX improvements, and structured Git workflows.',
      'Key projects: leo-booking.com, gotoprint.ca, vicdigitalworks.com',
    ],
    image: `url(${process.env.PUBLIC_URL}/leo.webp)`,
    projectUrl: 'https://leo-booking.com/',
    projectLabel: 'leo-booking.com',
  },
  
];

const resumeUrl = `${process.env.PUBLIC_URL}/Resume_Nathan%20Nguyen.pdf`;

const About: React.FC = () => {
  const [activeSection, setActiveSection] = useState<SectionKey>('OVERVIEW');
  const [activeYear, setActiveYear] = useState(TIMELINE_ENTRIES[0].navYear);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const currentEntry = useMemo(
    () => TIMELINE_ENTRIES.find((e) => e.navYear === activeYear) ?? TIMELINE_ENTRIES[0],
    [activeYear]
  );

  useEffect(() => {
    setActiveYear(TIMELINE_ENTRIES[0].navYear);
    setIsTransitioning(false);
  }, [activeSection]);

  const selectYear = (year: string) => {
    if (year === activeYear) return;
    setIsTransitioning(true);
    setTimeout(() => {
      setActiveYear(year);
      setIsTransitioning(false);
    }, 250);
  };

  const handleNext = () => {
    const idx = TIMELINE_ENTRIES.findIndex((e) => e.navYear === activeYear);
    if (idx < TIMELINE_ENTRIES.length - 1) selectYear(TIMELINE_ENTRIES[idx + 1].navYear);
  };

  const handlePrev = () => {
    const idx = TIMELINE_ENTRIES.findIndex((e) => e.navYear === activeYear);
    if (idx > 0) selectYear(TIMELINE_ENTRIES[idx - 1].navYear);
  };

  const renderProjects = () => (
    <div className="flex flex-col h-full overflow-hidden">
      <header className="mb-8 flex-shrink-0">
        <span className="text-[10px] font-mono text-blue-600 uppercase tracking-[0.5em] mb-4 block animate-pulse">
          // Personal_Projects
        </span>
        <div className="flex items-end justify-between">
          <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter">
            Fleet<span className="font-serif italic opacity-50"> Mobile Application</span>
          </h2>
          <span className="text-[9px] font-mono uppercase tracking-[0.35em] text-theme-muted">
            Location-based, AI-assisted build
          </span>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 flex-grow content-start overflow-hidden pt-0 relative">
        <div className="aspect-video rounded-[10px] border border-current/10 bg-current/5 overflow-hidden relative">
          <img
            src={`${process.env.PUBLIC_URL}/fleet.png`}
            alt="Fleet mobile application"
            className="w-full h-full object-cover"
            loading="lazy"
            decoding="async"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"></div>
          <div className="absolute bottom-4 left-4 text-[10px] font-mono uppercase tracking-[0.35em] text-white/80">
            Real-time geo feed • API-driven
          </div>
          <a
            href={`${process.env.PUBLIC_URL}/fleet.png`}
            target="_blank"
            rel="noreferrer"
            className="absolute bottom-3 right-3 w-10 h-10 rounded-full border border-white/25 flex items-center justify-center text-xs bg-black/60 backdrop-blur-sm hover:border-blue-500 hover:text-blue-400 transition-all"
            aria-label="Open full image"
          >
            ↗
          </a>
        </div>

        <div className="flex flex-col space-y-6 lg:pl-4">
          <div className="space-y-2">
            <div className="text-[10px] font-mono uppercase tracking-[0.35em] text-blue-600">Role</div>
            <div className="text-2xl md:text-3xl font-black uppercase tracking-tighter">Co-Founder & Lead Developer</div>
            <div className="text-sm uppercase tracking-[0.3em] text-theme-subtle">Mobile • Realtime • AI-assisted</div>
          </div>

          <ul className="space-y-3 border-t border-current/10 pt-6 text-theme-muted text-base md:text-lg leading-relaxed">
            <li className="flex items-start">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-600/70 mr-3 mt-2 shrink-0" />
              Finalist (4th), VentureQuest 2025, iterested by potential strategic partners including TrafficNet.ca and Go-Alberta.ca.
            </li>
            <li className="flex items-start">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-600/70 mr-3 mt-2 shrink-0" />
              Co-founded and actively developed a mobile application delivering real-time, location-based information.
            </li>
            <li className="flex items-start">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-600/70 mr-3 mt-2 shrink-0" />
              Built API integrations, frontend logic, and system architecture for data synchronization and performance.
            </li>
            <li className="flex items-start">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-600/70 mr-3 mt-2 shrink-0" />
              Leveraged AI-assisted tools to prototype features, evaluate approaches, and iterate quickly from user feedback.
            </li>
          </ul>

          <div className="flex space-x-4 pt-2">
            <a
              href="#"
              className="px-4 py-2 rounded-full border border-current/15 hover:border-blue-600/40 hover:text-blue-600 text-[10px] font-mono uppercase tracking-[0.35em] transition-colors"
            >
              Case Study Soon
            </a>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="w-full h-[75vh] flex bg-current/[0.01] overflow-hidden relative transition-all duration-700">
      <SideMenu
        items={ABOUT_MENU_ITEMS}
        activeKey={activeSection}
        onSelect={(key) => setActiveSection(key)}
        badgeLabel="About // Sequence"
      />

      <main className="flex-1 overflow-hidden relative p-12 md:pb-[59px] md:pt-[0px] mr-[184px] bg-current/[0.01] flex flex-col">
        <div
          className="absolute inset-0 opacity-[0.02] pointer-events-none"
          style={{ backgroundImage: 'radial-gradient(currentColor 1px, transparent 1px)', backgroundSize: '40px 40px' }}
        ></div>

        <div className="relative z-10 w-full h-full flex flex-col">
          <div key={activeSection} className="animate-content-in flex-1 flex flex-col overflow-hidden">
            {activeSection === 'OVERVIEW' && (
              <OverviewContent
                badge="// About_Overview"
                title="About"
                accent="Nathan"
                subtitle="Designer–dev hybrid focused on shipping stories that feel inevitable."
                description="I design and build product experiences and visual systems as a cohesive whole. From Figma and design tokens to React-based implementations, I keep strategy, craft, and handoff aligned so teams can ship with confidence."
                highlights={[
                  { label: 'Focus', value: 'Product Systems / Motion / Identity' },
                  { label: 'Edge', value: 'Narrative prototyping + Dev-ready handoff' },
                ]}
              />
            )}

            {activeSection === 'TIMELINE' && (
              <div className="flex flex-col h-full overflow-hidden">
                <header className="mb-8 flex-shrink-0">
                  <span className="text-[10px] font-mono text-blue-600 uppercase tracking-[0.5em] mb-4 block animate-pulse">
                    // Career_Timeline
                  </span>
                  <div className="flex flex-wrap items-center justify-between gap-4">
                    <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter">
                      Visual<span className="font-serif italic opacity-50"> Narrative</span>
                    </h2>
                    <div className="flex items-center space-x-2">
                      {TIMELINE_ENTRIES.map((entry) => (
                        <button
                          key={entry.navYear}
                          onClick={() => selectYear(entry.navYear)}
                          className={`text-xs md:text-[10pt] font-mono uppercase tracking-[0.35em] px-3 py-2 rounded-full transition-all ${
                            activeYear === entry.navYear
                              ? 'bg-blue-600 text-white'
                              : 'bg-current/5 text-theme-muted hover:text-blue-600'
                          }`}
                          aria-pressed={activeYear === entry.navYear}
                        >
                          {entry.navYear}
                        </button>
                      ))}
                    </div>
                  </div>
                </header>

                <div
                  className={`grid grid-cols-1 lg:grid-cols-2 gap-12 flex-grow content-start overflow-hidden pt-0 relative transition-all duration-500 ${
                    isTransitioning ? 'opacity-0 translate-y-2' : 'opacity-100 translate-y-0'
                  }`}
                >
                  <div className="aspect-video w-full rounded-[10px] border border-current/10 bg-current/5 overflow-hidden relative">
                    <div
                      className="absolute inset-0"
                      style={{
                        backgroundImage: currentEntry.image,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        filter: 'saturate(0.9)',
                      }}
                    ></div>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
                    <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between text-[10px] uppercase tracking-[0.35em] text-white/80">
                      <span>{currentEntry.company}</span>
                      <span>{currentEntry.displayYear}</span>
                    </div>
                    {currentEntry.projectUrl && currentEntry.projectLabel && (
                      <a
                        href={currentEntry.projectUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="absolute top-4 right-4 px-3 py-2 text-[10px] font-mono uppercase tracking-[0.25em] rounded-full bg-black/50 border border-white/20 hover:border-blue-400 hover:text-blue-200 transition-colors"
                      >
                        View Project
                      </a>
                    )}
                  </div>

                  <div className="space-y-6 lg:pl-8 flex flex-col">
                    <div className="space-y-3">
                      <span className="text-lg md:text-[14pt] font-mono uppercase tracking-[0.4em] text-blue-600">
                        {currentEntry.displayYear}
                      </span>
                      <h3 className="text-3xl md:text-4xl font-black uppercase tracking-tighter leading-tight">
                        {currentEntry.role}
                      </h3>
                      <div className="text-xl md:text-2xl font-medium text-theme-muted">
                        {currentEntry.company}
                      </div>
                      <div className="text-xs uppercase tracking-[0.3em] text-theme-subtle">
                        {currentEntry.location}
                      </div>
                    </div>

                    <ul className="space-y-3 border-t border-current/10 pt-6">
                      {currentEntry.highlights.map((item, i) => (
                        <li key={i} className="flex items-start text-base md:text-lg leading-relaxed text-theme-muted">
                          <span className="w-1.5 h-1.5 rounded-full bg-blue-600/70 mr-3 mt-2 shrink-0" />
                          {item}
                        </li>
                      ))}
                    </ul>

                    <div className="flex space-x-4 pt-6">
                      <button
                        onClick={handlePrev}
                        disabled={TIMELINE_ENTRIES.findIndex((e) => e.navYear === activeYear) === 0}
                        className="w-14 h-14 rounded-full border border-current/15 flex items-center justify-center hover:border-blue-600/40 hover:text-blue-600 transition-all disabled:opacity-20"
                        aria-label="Previous timeline entry"
                      >
                        <svg className="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
                          <path
                            fillRule="evenodd"
                            d="M12.78 15.28a.75.75 0 0 1-1.06 0l-4.5-4.5a.75.75 0 0 1 0-1.06l4.5-4.5a.75.75 0 0 1 1.06 1.06L8.81 10l3.97 3.97a.75.75 0 0 1 0 1.06Z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </button>
                      <button
                        onClick={handleNext}
                        disabled={TIMELINE_ENTRIES.findIndex((e) => e.navYear === activeYear) === TIMELINE_ENTRIES.length - 1}
                        className="w-14 h-14 rounded-full border border-current/15 flex items-center justify-center hover:border-blue-600/40 hover:text-blue-600 transition-all disabled:opacity-20"
                        aria-label="Next timeline entry"
                      >
                        <svg className="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
                          <path
                            fillRule="evenodd"
                            d="M7.22 4.72a.75.75 0 0 1 1.06 0l4.5 4.5a.75.75 0 0 1 0 1.06l-4.5 4.5a.75.75 0 0 1-1.06-1.06L11.19 10 7.22 6.03a.75.75 0 0 1 0-1.06Z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeSection === 'RESUME' && (
              <div className="flex flex-col h-full overflow-hidden">
                <header className="mb-6 flex-shrink-0">
                  <span className="text-[10px] font-mono text-blue-600 uppercase tracking-[0.5em] mb-3 block">
                    // Resume_View
                  </span>
                  <div className="flex items-center justify-between">
                    <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter">
                      Resume<span className="font-serif italic opacity-50"> PDF</span>
                    </h2>
                    <div className="flex items-center space-x-4 text-[10px] font-mono uppercase tracking-[0.35em]">
                      <a
                        href={resumeUrl}
                        download
                        className="px-3 py-2 border border-current/15 rounded-full hover:border-blue-600/40 hover:text-blue-600 transition-colors"
                      >
                        Download
                      </a>
                      <button
                        onClick={() => window.print()}
                        className="px-3 py-2 border border-current/15 rounded-full hover:border-blue-600/40 hover:text-blue-600 transition-colors"
                      >
                        Print
                      </button>
                    </div>
                  </div>
                </header>

                <div className="flex-1 rounded-[12px] border border-current/10 bg-current/[0.02] overflow-hidden shadow-lg">
                  <object
                    data={`${resumeUrl}#view=FitH`}
                    type="application/pdf"
                    className="w-full h-full"
                    aria-label="Resume PDF"
                  >
                    <div className="w-full h-full flex items-center justify-center text-sm text-theme-muted">
                      PDF preview unavailable.{' '}
                      <a href={resumeUrl} download className="underline ml-2">
                        Download resume
                      </a>
                    </div>
                  </object>
                </div>
              </div>
            )}

            {activeSection === 'PROJECT' && renderProjects()}
          </div>
        </div>
      </main>

      <style>{`
        @keyframes contentIn {
          from { opacity: 0; transform: translateY(16px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-content-in {
          animation: contentIn 0.7s cubic-bezier(0.25, 0.8, 0.25, 1) forwards;
        }
      `}</style>
    </div>
  );
};

export default About;
