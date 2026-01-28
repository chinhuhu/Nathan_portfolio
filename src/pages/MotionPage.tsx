import React, { useEffect, useMemo, useState } from 'react';
import SideMenu, { DEFAULT_SIDE_MENU_ITEMS } from '../components/SideMenu';
import OverviewContent from '../components/OverviewContent';

type SectionKey = 'OVERVIEW' | 'PROJECTS';

type MotionVideo = {
  id: string;
  title: string;
  url: string;
  embedId: string;
  thumb: string;
};

const videoSources = [
  { id: 'MV-02', title: 'Samsung SSD Update', url: 'https://www.youtube.com/watch?v=oqXTWeROMx4' },
  { id: 'MV-01', title: "Domino's Pizza", url: 'https://www.youtube.com/shorts/uC3RJYdexE0' },
  { id: 'MV-03', title: 'MEPC | Spectre PC Reveal', url: 'https://youtu.be/VuYdwHao_Gc' },
  { id: 'MV-04', title: 'MEPC | GAMECON 2024 | Mega Stage Reveal', url: 'https://youtu.be/gg560oRRAvk' },
] as const;

const extractYouTubeId = (link: string): string => {
  const short = /youtu\.be\/([\w-]{6,})/.exec(link);
  if (short?.[1]) return short[1];
  const watch = /v=([\w-]{6,})/.exec(link);
  if (watch?.[1]) return watch[1];
  const shorts = /shorts\/([\w-]{6,})/.exec(link);
  if (shorts?.[1]) return shorts[1];
  return link;
};

const buildVideos = (): MotionVideo[] =>
  videoSources.map((v) => {
    const id = extractYouTubeId(v.url);
    return {
      ...v,
      embedId: id,
      thumb: `https://img.youtube.com/vi/${id}/hqdefault.jpg`,
    };
  });

const MotionPage: React.FC = () => {
  const [activeSection, setActiveSection] = useState<SectionKey>('OVERVIEW');
  const [batch, setBatch] = useState(0);
  const [playingId, setPlayingId] = useState<string | null>(null);

  const videos = useMemo(() => buildVideos(), []);
  const itemsPerPage = 2;
  const totalBatches = Math.ceil(videos.length / itemsPerPage);

  const nextBatch = () => setBatch((prev) => (prev + 1) % totalBatches);

  useEffect(() => {
    setBatch(0);
    setPlayingId(null);
  }, [activeSection]);

  const currentVideos = videos.slice(batch * itemsPerPage, (batch + 1) * itemsPerPage);

  return (
    <div className="w-full h-[75vh] flex flex-col laptop-m:flex-row bg-current/[0.01] overflow-hidden relative transition-all duration-700">
      {/* Top nav for tablet and below */}
      <div className="laptop-m:hidden w-full px-6 py-4 border-b border-current/10 bg-current/[0.02]">
        <div className="flex items-center justify-between gap-4 text-[10px] font-mono uppercase tracking-[0.35em]">
          <span className="text-blue-600">// Motion_Sections</span>
          <div className="flex items-center gap-3">
            {(DEFAULT_SIDE_MENU_ITEMS as readonly { key: SectionKey; label: string }[]).map((item) => (
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
          items={DEFAULT_SIDE_MENU_ITEMS as readonly { key: SectionKey; label: string }[]}
          activeKey={activeSection}
          onSelect={(key) => setActiveSection(key)}
          badgeLabel="Motion // Sequence"
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
              badge="// Motion_Overview"
              title="Motion Design"
              accent="Stories"
              subtitle="Kinetic narratives for products and brands."
              description="From microinteractions to interface transitions, I design motion that clarifies intent, improves usability, and remains performant across platforms."
              highlights={[
                { label: 'Tools', value: 'After Effects / Premiere Pro / Blender' },
                { label: 'Outcome', value: 'Expressive, Performance-Safe Motion' },
              ]}
            />
          ) : (
            <div className="flex flex-col h-full overflow-hidden">
              <header className="mb-8 flex-shrink-0">
                <span className="text-[10px] font-mono text-blue-600 uppercase tracking-[0.5em] mb-4 block animate-pulse">
                  // Motion_Reels
                </span>
                <div className="flex items-end justify-between">
                  <h2 className="text-[30px] mobile-l:text-[34px] tablet:text-[40px] laptop-m:text-[48px] laptop-l:text-[56px] largescreen:text-[64px] font-black uppercase tracking-tighter">
                    Visual<span className="font-serif italic opacity-50"> Laboratory</span>
                  </h2>
                  <div className="hidden md:flex items-center space-x-4 mb-2">
                    <span className="text-[8px] font-mono uppercase tracking-[0.4em] opacity-100">
                      BATCH {batch + 1} / {totalBatches}
                    </span>
                  </div>
                </div>
              </header>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-12 flex-grow content-start overflow-hidden pt-0 relative">
                {currentVideos.map((video, idx) => (
                  <div
                    key={`${batch}-${video.id}`}
                    className="group relative animate-batch-in flex flex-col"
                    style={{ animationDelay: `${idx * 0.05}s`, willChange: 'transform, opacity' }}
                  >
                    <div className="aspect-video largescreen:aspect-[21/9] overflow-hidden border border-current/10 rounded-[10px] bg-current/5 transition-all duration-500 group-hover:border-blue-600/30 relative">
                      {playingId === video.id ? (
                        <iframe
                          src={`https://www.youtube-nocookie.com/embed/${video.embedId}?autoplay=1&rel=0&modestbranding=1`}
                          title={video.title}
                          className="w-full h-full"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                          loading="lazy"
                        />
                      ) : (
                        <button
                          type="button"
                          onClick={() => setPlayingId(video.id)}
                          className="w-full h-full relative"
                          aria-label={`Play ${video.title}`}
                        >
                          <img
                            src={video.thumb}
                            alt={video.title}
                            loading="lazy"
                            decoding="async"
                            className="w-full h-full object-cover opacity-100 transition-all duration-700 group-hover:opacity-100 group-hover:scale-105"
                          />
                          <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors" />
                          <div className="absolute inset-0 flex items-center justify-center">
                            <span className="w-14 h-14 rounded-full bg-white/80 text-black flex items-center justify-center text-sm font-black tracking-[0.2em] transition-all group-hover:scale-105">
                              ▶
                            </span>
                          </div>
                        </button>
                      )}
                    </div>

                    <div className="mt-6">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex flex-col">
                          <span className="text-[8px] font-mono text-blue-600 font-bold uppercase tracking-widest mb-1">
                            {video.id}
                          </span>
                          <button
                            type="button"
                            onClick={() => setPlayingId(video.id)}
                            className="text-[15px] mobile-l:text-[16px] tablet:text-[17px] laptop-m:text-[18px] laptop-l:text-[20px] largescreen:text-[22px] font-black uppercase tracking-[0.1em] transition-all group-hover:text-blue-600 group-hover:translate-x-1 text-left"
                          >
                            {video.title}
                          </button>
                          <span className="text-[9px] mobile-l:text-[10px] tablet:text-[11px] laptop-m:text-[11px] laptop-l:text-[12px] largescreen:text-[13px] text-theme-muted uppercase tracking-[0.25em] mt-1">
                            Motion
                          </span>
                        </div>

                        <div className="text-[10px] mobile-l:text-[10px] tablet:text-[11px] laptop-m:text-[11px] laptop-l:text-[12px] largescreen:text-[12px] font-mono uppercase pt-[0px] tracking-[0.35em] opacity-100 text-right">
                          Play
                        </div>
                      </div>
                      <div className="h-[1px] w-full bg-current/5 group-hover:bg-blue-600/20 transition-colors"></div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-auto pt-0 flex items-center justify-between flex-shrink-0">
                <div className="flex space-x-2">
                  {Array.from({ length: totalBatches }).map((_, i) => (
                    <div
                      key={i}
                      className={`h-1.5 transition-all duration-500 rounded-full ${i === batch ? 'w-50 bg-blue-600' : 'w-50 bg-current/10'}`}
                    />
                  ))}
                </div>

                <button onClick={nextBatch} className="group/nav flex items-center space-x-6 outline-none">
                  <div className="text-right">
                    <span className="block text-[8px] font-black uppercase tracking-[0.4em] opacity-100 group-hover/nav:opacity-100 transition-opacity">
                      Next Projects
                    </span>
                    <span className="text-[10px] font-mono italic opacity-50">Sequence {((batch + 1) % totalBatches) + 1}</span>
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
        .animate-content-in {
          animation: contentIn 0.7s cubic-bezier(0.25, 0.8, 0.25, 1) forwards;
        }
        .animate-batch-in {
          animation: batchIn 0.7s cubic-bezier(0.25, 0.8, 0.25, 1) forwards;
        }
      `}</style>
    </div>
  );
};

export default MotionPage;
