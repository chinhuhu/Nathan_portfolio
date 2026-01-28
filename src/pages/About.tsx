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
        <span className="text-[9px] mobile-l:text-[10px] tablet:text-[11px] laptop-m:text-[11px] laptop-l:text-[12px] largescreen:text-[12px] font-mono text-blue-600 uppercase tracking-[0.5em] mb-4 block animate-pulse">
          // Personal_Projects
        </span>
        <div className="flex items-end justify-between">
          <h2 className="text-[30px] mobile-l:text-[34px] tablet:text-[40px] laptop-m:text-[48px] laptop-l:text-[30px] largescreen:text-[45px] font-black uppercase tracking-tighter">
            Fleet<span className="font-serif italic opacity-50"> Mobile App</span>
          </h2>
          
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
          <div className="absolute bottom-4 left-4 text-[8px] mobile-l:text-[9px] tablet:text-[10px] laptop-m:text-[10px] laptop-l:text-[11px] largescreen:text-[11px] font-mono uppercase tracking-[0.35em] text-white/80">
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
            <div className="text-[9px] mobile-l:text-[10px] tablet:text-[11px] laptop-m:text-[11px] laptop-l:text-[12px] largescreen:text-[12px] font-mono uppercase tracking-[0.35em] text-blue-600">
              Role
            </div>
            <div className="text-[22px] mobile-l:text-[24px] tablet:text-[26px] laptop-m:text-[28px] laptop-l:text-[20px] largescreen:text-[25px] font-black uppercase tracking-tighter">
              Co-Founder & Lead Developer
            </div>
            <div className="text-[12px] mobile-l:text-[13px] tablet:text-[14px] laptop-m:text-[14px] laptop-l:text-[10px] largescreen:text-[10px] uppercase tracking-[0.3em] text-theme-subtle">
              Mobile • Realtime • AI-assisted
            </div>
          </div>

          <ul className="space-y-3 border-t border-current/10 pt-6 text-theme-muted text-[14px] mobile-l:text-[14px] tablet:text-[15px] laptop-m:text-[16px] laptop-l:text-[12px] largescreen:text-[12px] leading-relaxed">
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
              className="px-4 py-2 rounded-full border border-current/15 hover:border-blue-600/40 hover:text-blue-600 text-[9px] mobile-l:text-[10px] tablet:text-[11px] laptop-m:text-[11px] laptop-l:text-[12px] largescreen:text-[12px] font-mono uppercase tracking-[0.35em] transition-colors"
            >
              Case Study Soon
            </a>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="w-full h-[75vh] flex flex-col laptop-m:flex-row laptop-l:flex-row largescreen:flex-row bg-current/[0.01] overflow-hidden relative transition-all duration-700">
      {/* Top nav for tablet and below */}
      <div className="hidden mobile-l:flex tablet:flex laptop-m:hidden w-full px-6 py-4 border-b border-current/10 bg-current/[0.02]">
        <div className="flex flex-wrap items-center justify-between gap-4 text-[10px] font-mono uppercase tracking-[0.35em]">
          <span className="text-blue-600">// About_Sections</span>
          <div className="flex items-center gap-3">
            {ABOUT_MENU_ITEMS.map((item) => (
              <button
                key={item.key}
                onClick={() => setActiveSection(item.key as SectionKey)}
                className={`px-3 py-2 rounded-full transition-colors border border-current/15 ${
                  activeSection === item.key
                    ? 'bg-blue-600 text-white border-blue-600'
                    : 'text-theme-muted hover:text-blue-600 hover:border-blue-600/40'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Side nav for laptop-m and above */}
      <div className="hidden laptop-m:flex laptop-l:flex largescreen:flex">
        <SideMenu
          items={ABOUT_MENU_ITEMS}
          activeKey={activeSection}
          onSelect={(key) => setActiveSection(key)}
          badgeLabel="About // Sequence"
        />
      </div>

      <main className="flex-1 overflow-hidden relative p-6 tablet:p-8 laptop-m:p-10 laptop-l:p-12 md:pb-[59px] md:pt-[0px] mr-0 laptop-m:mr-[80px] laptop-l:mr-[120px] largescreen:mr-[184px] bg-current/[0.01] flex flex-col">
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

            {(activeSection === 'TIMELINE' || activeSection === 'RESUME') && (
              <div className="flex flex-col h-full overflow-hidden">
                <header className={`${activeSection === 'RESUME' ? 'mb-6' : 'mb-8'} flex-shrink-0`}>
                  <span
                    className={`text-[10px] font-mono text-blue-600 uppercase tracking-[0.5em] ${
                      activeSection === 'RESUME' ? 'mb-3' : 'mb-4'
                    } block ${activeSection === 'TIMELINE' ? 'animate-pulse' : ''}`}
                  >
                    {activeSection === 'TIMELINE' ? '// Career_Timeline' : '// Resume_View'}
                  </span>
                  <div className="flex flex-wrap items-center justify-between gap-4">
                    <h2 className="text-[30px] mobile-l:text-[34px] tablet:text-[40px] laptop-m:text-[48px] laptop-l:text-[30px] largescreen:text-[45px] font-black uppercase tracking-tighter">
                      {activeSection === 'TIMELINE' ? (
                        <>
                          Visual<span className="font-serif italic opacity-50"> Narrative</span>
                        </>
                      ) : (
                        <>
                          Resume<span className="font-serif italic opacity-50"> PDF</span>
                        </>
                      )}
                    </h2>
                    {activeSection === 'TIMELINE' ? (
                      <div className="flex items-center space-x-2">
                        {TIMELINE_ENTRIES.map((entry) => (
                          <button
                            key={entry.navYear}
                            onClick={() => selectYear(entry.navYear)}
                            className={`text-[10px] mobile-l:text-[11px] tablet:text-[12px] laptop-m:text-[12px] laptop-l:text-[10px] largescreen:text-[13px] font-mono uppercase tracking-[0.35em] px-3 py-2 rounded-full transition-all ${
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
                    ) : (
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
                    )}
                  </div>
                </header>

                {activeSection === 'TIMELINE' ? (
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
                        <span className="text-[16px] mobile-l:text-[17px] tablet:text-[18px] laptop-m:text-[18px] laptop-l:text-[12px] largescreen:text-[12px] font-mono uppercase tracking-[0.4em] text-blue-600">
                          {currentEntry.displayYear}
                        </span>
                        <h3 className="text-[26px] mobile-l:text-[28px] tablet:text-[30px] laptop-m:text-[32px] laptop-l:text-[20px] largescreen:text-[25px] font-black uppercase tracking-tighter leading-tight">
                          {currentEntry.role}
                        </h3>
                        <div className="text-[18px] mobile-l:text-[19px] tablet:text-[20px] laptop-m:text-[22px] laptop-l:text-[15px] largescreen:text-[15px] font-medium text-theme-muted">
                          {currentEntry.company}
                        </div>
                        <div className="text-[11px] mobile-l:text-[11px] tablet:text-[12px] laptop-m:text-[12px] laptop-l:text-[10px] largescreen:text-[10px] uppercase tracking-[0.3em] text-theme-subtle">
                          {currentEntry.location}
                        </div>
                      </div>

                      <ul className="space-y-3 border-t border-current/10 pt-6">
                        {currentEntry.highlights.map((item, i) => (
                          <li key={i} className="flex items-start text-[14px] mobile-l:text-[14px] tablet:text-[15px] laptop-m:text-[16px] laptop-l:text-[12px] largescreen:text-[12px] leading-relaxed text-theme-muted">
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
                ) : (
                  <div className="flex flex-col space-y-4">
                    <div className="flex items-center space-x-3">
                      <a
                        href={resumeUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="px-4 py-2 rounded-full border border-current/15 hover:border-blue-600/40 hover:text-blue-600 text-[10px] font-mono uppercase tracking-[0.35em] transition-colors"
                      >
                        Open in New Tab
                      </a>
                      <a
                        href={resumeUrl}
                        download
                        className="px-4 py-2 rounded-full border border-current/15 hover:border-blue-600/40 hover:text-blue-600 text-[10px] font-mono uppercase tracking-[0.35em] transition-colors"
                      >
                        Download
                      </a>
                    </div>
                    <div
                      className="w-full max-w-[92vw] mobile-l:max-w-[95vw] tablet:max-w-[640px] laptop-m:max-w-[860px] laptop-l:max-w-[980px] largescreen:max-w-[1100px] mx-auto flex-1 max-h-[50vh] laptop-m:max-h-[40vh] laptop-l:max-h-[45vh] largescreen:max-h-[42vh] rounded-[12px] border border-current/10 bg-current/[0.02] shadow-lg overflow-auto overscroll-contain"
                      style={{ touchAction: 'pan-y' }}
                      onWheel={(e) => e.stopPropagation()}
                      onTouchMove={(e) => e.stopPropagation()}
                    >
                      <object
                        data={`${resumeUrl}#view=FitH`}
                        type="application/pdf"
                        className="w-full h-[900px]"
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
