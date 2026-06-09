import React, { useEffect, useMemo, useState } from 'react';
import BatchPager from '../components/BatchPager';
import GalleryHeader from '../components/GalleryHeader';
import OverviewContent from '../components/OverviewContent';
import PageSection from '../components/PageSection';
import { DEFAULT_SIDE_MENU_ITEMS, SideMenuItem } from '../components/SideMenu';

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
  const navItems = DEFAULT_SIDE_MENU_ITEMS as readonly SideMenuItem<SectionKey>[];

  useEffect(() => {
    setBatch(0);
    setPlayingId(null);
  }, [activeSection]);

  const currentVideos = videos.slice(batch * itemsPerPage, (batch + 1) * itemsPerPage);

  return (
    <PageSection
      items={navItems}
      activeKey={activeSection}
      onSelect={setActiveSection}
      mobileBadge="// Motion_Sections"
      sideBadge="Motion // Sequence"
      contentKey={activeSection}
    >
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
          <GalleryHeader
            badge="// Motion_Reels"
            title="Visual"
            accent="Laboratory"
            currentBatch={batch}
            totalBatches={totalBatches}
          />

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

          <BatchPager
            currentBatch={batch}
            totalBatches={totalBatches}
            onNext={() => setBatch((prev) => (prev + 1) % totalBatches)}
            nextLabel="Next Projects"
            showSpinRing={false}
          />
        </div>
      )}
    </PageSection>
  );
};

export default MotionPage;
