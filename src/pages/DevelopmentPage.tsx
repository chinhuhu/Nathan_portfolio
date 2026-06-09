import React, { useState } from 'react';
import BatchPager from '../components/BatchPager';
import GalleryHeader from '../components/GalleryHeader';
import OverviewContent from '../components/OverviewContent';
import PageSection from '../components/PageSection';
import { DEFAULT_SIDE_MENU_ITEMS, SideMenuItem } from '../components/SideMenu';

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

  const currentProjects = DEV_PROJECTS.slice(
    projectBatch * itemsPerPage,
    (projectBatch + 1) * itemsPerPage
  );

  const navItems = DEFAULT_SIDE_MENU_ITEMS as readonly SideMenuItem<SectionKey>[];

  return (
    <PageSection
      items={navItems}
      activeKey={activeSection}
      onSelect={setActiveSection}
      mobileBadge="// Dev_Sections"
      contentKey={activeSection}
      mainClassName="flex-1 overflow-y-auto laptop-m:overflow-hidden relative p-6 pb-24 tablet:p-8 tablet:pb-20 laptop-m:p-10 laptop-l:p-12 md:pb-[59px] md:pt-[0px] mr-0 laptop-m:mr-[80px] laptop-l:mr-[120px] largescreen:mr-[184px] bg-current/[0.01] flex flex-col"
      contentClassName="relative z-10 animate-content-in w-full min-h-full flex flex-col"
    >
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
        <div className="flex flex-col min-h-full">
          <GalleryHeader
            badge="// Selected_Works"
            title="Visual"
            accent="Laboratory"
            currentBatch={projectBatch}
            totalBatches={totalBatches}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 flex-grow content-start overflow-visible laptop-m:overflow-hidden pt-0 relative">
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

          <BatchPager
            currentBatch={projectBatch}
            totalBatches={totalBatches}
            onNext={() => setProjectBatch((prev) => (prev + 1) % totalBatches)}
            nextLabel="Next Projects"
            className="mt-auto pt-0 mb-8 md:mb-0 flex items-center justify-between flex-shrink-0"
          />
        </div>
      )}
    </PageSection>
  );
};

export default DevelopmentPage;
