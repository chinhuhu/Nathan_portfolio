import React, { useState } from 'react';
import SideMenu, { DEFAULT_SIDE_MENU_ITEMS, SideMenuItem } from '../components/SideMenu';
import OverviewContent from '../components/OverviewContent';

type SectionKey = 'OVERVIEW' | 'PROJECTS';

interface DevProject {
  id: string;
  title: string;
  subtitle: string;
  image: string;
  url: string;
  tech: string[];
}

const TECH_LABELS: Record<string, string> = {
  react: 'React',
  typescript: 'TypeScript',
  tailwind: 'Tailwind',
  node: 'Node.js',
  threejs: 'Three.js',
  gsap: 'GSAP',
  d3: 'D3',
  nextjs: 'Next.js',
  framer: 'Framer',
  supabase: 'Supabase',
  sanity: 'Sanity',
  graphql: 'GraphQL',
  html: 'HTML',
  css: 'CSS',
  php: 'PHP',
  javascript: 'JavaScript',
  mysql: 'MySQL',
};

const DEV_PROJECTS: DevProject[] = [
  {
    id: 'DP-01',
    title: 'Vic Digital Works',
    subtitle: 'CMS agency software',
    image: `${process.env.PUBLIC_URL}/vic.webp`,
    url: 'https://vicdigitalworks.com/',
    tech: ['react', 'typescript', 'tailwind', 'node'],
  },
  {
    id: 'DP-02',
    title: 'Leo Booking',
    subtitle: 'Booking & scheduling platform',
    image: `${process.env.PUBLIC_URL}/leo.webp`,
    url: 'https://leo-booking.com/',
    tech: ['react', 'typescript', 'tailwind', 'node'],
  },
  {
    id: 'DP-03',
    title: 'Gotoprint',
    subtitle: 'B2B Ecommerce Website',
    image: `${process.env.PUBLIC_URL}/gtp.webp`,
    url: 'https://gotoprint.ca/',
    tech: ['html', 'css', 'framer', 'supabase'],
  },
  {
    id: 'DP-04',
    title: 'Memory Express',
    subtitle: 'Ecommerce for tech hardware',
    image: `${process.env.PUBLIC_URL}/mem.webp`,
    url: 'https://www.memoryexpress.com/',
    tech: ['php', 'javascript', 'mysql'],
  },
  {
    id: 'DP-05',
    title: 'Cattiensa',
    subtitle: 'Entertainment & Media',
    image: `${process.env.PUBLIC_URL}/cts.webp`,
    url: 'https://www.cattiensa.com/#banner',
    tech: ['nextjs', 'typescript', 'tailwind'],
  },
];

const DevelopmentPage: React.FC = () => {
  const [activeSection, setActiveSection] = useState<SectionKey>('OVERVIEW');
  const [projectBatch, setProjectBatch] = useState(0);
  const itemsPerPage = 2;
  const totalBatches = Math.ceil(DEV_PROJECTS.length / itemsPerPage);

  const nextBatch = () => {
    setProjectBatch((prev) => (prev + 1) % totalBatches);
  };

  const currentProjects = DEV_PROJECTS.slice(
    projectBatch * itemsPerPage,
    (projectBatch + 1) * itemsPerPage
  );

  const navItems = DEFAULT_SIDE_MENU_ITEMS as readonly SideMenuItem<SectionKey>[];

  return (
    <div className="w-full h-[75vh] flex flex-col laptop-m:flex-row bg-current/[0.01] overflow-hidden relative transition-all duration-700">
      {/* Top nav for tablet and below */}
      <div className="laptop-m:hidden w-full px-6 py-4 border-b border-current/10 bg-current/[0.02]">
        <div className="flex items-center justify-between gap-4 text-[10px] font-mono uppercase tracking-[0.35em]">
          <span className="text-blue-600">// Dev_Sections</span>
          <div className="flex items-center gap-3">
            {navItems.map((item) => (
              <button
                key={item.key}
                onClick={() => setActiveSection(item.key)}
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
      <div className="hidden laptop-m:flex">
        <SideMenu
          items={navItems}
          activeKey={activeSection}
          onSelect={(key) => setActiveSection(key)}
        />
      </div>

      <main className="flex-1 overflow-hidden relative p-6 tablet:p-8 laptop-m:p-10 laptop-l:p-12 md:pb-[59px] md:pt-[0px] mr-0 laptop-m:mr-[80px] laptop-l:mr-[120px] largescreen:mr-[184px] bg-current/[0.01] flex flex-col">
        <div
          className="absolute inset-0 opacity-[0.02] pointer-events-none"
          style={{ backgroundImage: 'radial-gradient(currentColor 1px, transparent 1px)', backgroundSize: '40px 40px' }}
        ></div>

        <div key={activeSection} className="relative z-10 animate-content-in w-full h-full flex flex-col">
          {activeSection === 'OVERVIEW' ? (
            <OverviewContent
              badge="// Dev_Overview"
              title="Dev"
              accent="Playbook"
              subtitle="Shipping resilient, scalable products."
              description="I build production-ready digital products that solve real business problems and scale over time. With experiences in software development, I turn requirements into reliable, maintainable systems with strong user experience at their core."
              highlights={[
                { label: 'Stack', value: 'TypeScript / React / Node / Cloud-Native' },
                { label: 'Outcome', value: 'Stable releases with measurable impact' },
              ]}
            />
          ) : (
            <div className="flex flex-col h-full overflow-hidden">
              <header className="mb-8 flex-shrink-0">
                <span className="text-[10px] font-mono text-blue-600 uppercase tracking-[0.5em] mb-4 block animate-pulse">
                  // Selected_Works
                </span>
                <div className="flex items-end justify-between">
                  <h2 className="text-[30px] mobile-l:text-[34px] tablet:text-[40px] laptop-m:text-[48px] laptop-l:text-[56px] largescreen:text-[64px] font-black uppercase tracking-tighter">
                    Visual<span className="font-serif italic opacity-50"> Laboratory</span>
                  </h2>
                  <div className="hidden md:flex items-center space-x-4 mb-2">
                    <span className="text-[8px] font-mono uppercase tracking-[0.4em] opacity-100">
                      BATCH {projectBatch + 1} / {totalBatches}
                    </span>
                  </div>
                </div>
              </header>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-12 flex-grow content-start overflow-hidden pt-0 relative">
                {currentProjects.map((project, idx) => {
                  const techText = project.tech.map((t) => TECH_LABELS[t] || t).join(' - ');

                  return (
                    <div
                      key={`${projectBatch}-${project.id}`}
                      className="group relative animate-batch-in flex flex-col"
                      style={{ animationDelay: `${idx * 0.05}s`, willChange: 'transform, opacity' }}
                    >
                      <a
                        href={project.url}
                        target="_blank"
                        rel="noreferrer"
                      className="aspect-video largescreen:aspect-[21/9] overflow-hidden border border-current/10 rounded-[10px] bg-current/5 transition-all duration-500 group-hover:border-blue-600/30 block"
                      >
                        <img
                          src={project.image}
                          alt={project.title}
                          className="w-full h-full object-cover opacity-100 transition-all duration-700 group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-105"
                        />
                      </a>

                      <div className="mt-6">
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex flex-col">
                            <span className="text-[8px] font-mono text-blue-600 font-bold uppercase tracking-widest mb-1">
                              {project.id}
                            </span>
                            <a
                              href={project.url}
                              target="_blank"
                              rel="noreferrer"
                              className="text-[15px] mobile-m:text-[15px] mobile-l:text-[16px] tablet:text-[17px] laptop-m:text-[18px] laptop-l:text-[10px] largescreen:text-[18px] font-black uppercase tracking-[0.1em] transition-all group-hover:text-blue-600 group-hover:translate-x-1"
                            >
                              {project.title}
                            </a>
                            <span className="text-[10px] mobile-l:text-[10px] tablet:text-[11px] laptop-m:text-[11px] laptop-l:text-[10px] largescreen:text-[13px] text-theme-muted uppercase tracking-[0.25em] mt-1">
                              {project.subtitle}
                            </span>
                          </div>

                          <div className="text-[10px] font-mono uppercase pt-[0px] tracking-[0.35em] opacity-100 text-right">
                            {techText}
                          </div>
                        </div>
                        <div className="h-[1px] w-full bg-current/5 group-hover:bg-blue-600/20 transition-colors"></div>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="mt-auto pt-0 flex items-center justify-between flex-shrink-0">
                <div className="flex space-x-2">
                  {Array.from({ length: totalBatches }).map((_, i) => (
                    <div
                      key={i}
                      className={`h-1.5 transition-all duration-500 rounded-full ${i === projectBatch ? 'w-50 bg-blue-600' : 'w-50 bg-current/10'}`}
                    />
                  ))}
                </div>

                <button onClick={nextBatch} className="group/nav flex items-center space-x-6 outline-none">
                  <div className="text-right">
                    <span className="block text-[8px] font-black uppercase tracking-[0.4em] opacity-100 group-hover/nav:opacity-100 transition-opacity">
                      Next Projects
                    </span>
                    <span className="text-[10px] font-mono italic opacity-50">Sequence {((projectBatch + 1) % totalBatches) + 1}</span>
                  </div>
                  <div className="w-14 h-14 rounded-full border border-current/10 flex items-center justify-center relative transition-all duration-500 group-hover/nav:border-blue-600/40 group-hover/nav:scale-100 bg-current/[0.02]">
                    <svg
                      className="absolute w-5 h-5 text-blue-600/50 animate-ping"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        d="M3 10.75a.75.75 0 0 1 .75-.75h8.19l-2.22-2.22a.75.75 0 1 1 1.06-1.06l3.5 3.5a.75.75 0 0 1 0 1.06l-3.5 3.5a.75.75 0 0 1-1.06-1.06l2.22-2.22H3.75A.75.75 0 0 1 3 10.75Z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <svg
                      className="w-5 h-5 text-blue-600 relative z-10 transition-transform duration-300 group-hover/nav:translate-x-0.5"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        d="M3 10.75a.75.75 0 0 1 .75-.75h8.19l-2.22-2.22a.75.75 0 1 1 1.06-1.06l3.5 3.5a.75.75 0 0 1 0 1.06l-3.5 3.5a.75.75 0 0 1-1.06-1.06l2.22-2.22H3.75A.75.75 0 0 1 3 10.75Z"
                        clipRule="evenodd"
                      />
                    </svg>

                    <div className="absolute inset-0 border-t border-blue-600/30 rounded-full opacity-0 group-hover/nav:opacity-100 animate-spin-slow transition-opacity"></div>
                  </div>
                </button>
              </div>
            </div>
          )}
        </div>

        <div className="absolute top-10 right-10 w-20 h-20 pointer-events-none opacity-[0.05]">
          <div className="absolute top-0 right-0 w-full h-[1px] bg-current"></div>
          <div className="absolute top-0 right-0 w-[1px] h-full bg-current"></div>
        </div>
      </main>

      <style>{`
        @keyframes contentIn {
          from { opacity: 0; transform: translateY(16px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes batchIn {
          0% { opacity: 0; transform: translateY(16px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-content-in {
          animation: contentIn 0.7s cubic-bezier(0.25, 0.8, 0.25, 1) forwards;
        }
        .animate-batch-in {
          animation: batchIn 0.7s cubic-bezier(0.25, 0.8, 0.25, 1) forwards;
        }
        .animate-spin-slow {
          animation: spin-slow 4s linear infinite;
        }
      `}</style>
    </div>
  );
};

export default DevelopmentPage;
