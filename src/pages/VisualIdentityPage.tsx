import React, { useEffect, useState } from 'react';
import SideMenu, { SideMenuItem } from '../components/SideMenu';
import OverviewContent from '../components/OverviewContent';

type SectionKey = 'OVERVIEW' | 'UI/UX' | 'LOGOS-ICONS' | 'PRINT' | 'BRANDING';

const VISUAL_IDENTITY_MENU_ITEMS: readonly SideMenuItem<SectionKey>[] = [
  { key: 'OVERVIEW', label: 'Overview' },
  { key: 'UI/UX', label: 'UI/UX' },
  { key: 'LOGOS-ICONS', label: 'Logos - Icons' },
  { key: 'PRINT', label: 'Print' },
  { key: 'BRANDING', label: 'Branding' },
] as const;

type GalleryItem = {
  id: string;
  title: string;
  description: string;
  thumb: string;
  full: string;
  slides?: string[];
};

type LightboxState = { images: string[]; index: number; title: string };

const asset = (name: string) => `${process.env.PUBLIC_URL}/${encodeURIComponent(name)}`;

const UIUX_ITEMS: GalleryItem[] = [
  {
    id: 'UX-01',
    title: 'YYC Rowing Gym Platform',
    description: 'Membership dashboards, trainer flows, and booking UI system.',
    thumb: asset('gym_all.webp'),
    full: asset('gym_all.png'),
  },
  {
    id: 'UX-02',
    title: 'Homez',
    description: 'Real-estate marketplace with modular listing and map views.',
    thumb: asset('homez_all.webp'),
    full: asset('homez_all.png'),
  },
];

const LOGO_ITEMS: GalleryItem[] = [
  {
    id: 'LI-01',
    title: 'Luthor Media',
    description: 'Brandmark, symbol grid, and icon suite for a media collective.',
    thumb: asset('luthor_all.webp'),
    full: asset('luthor_all.png'),
  },
  {
    id: 'LI-02',
    title: 'PR',
    description: 'Press-ready logo lockups and pictogram set across use-cases.',
    thumb: asset('pr.webp'),
    full: asset('pr.png'),
  },
];

const BRAND_ITEMS: GalleryItem[] = [
  {
    id: 'BR-01',
    title: 'Luthor Media',
    description: 'Comprehensive brand system spanning marks, color, and packaging.',
    thumb: asset('brand_luthor1.webp'),
    full: asset('brand_luthor1.png'),
    slides: Array.from({ length: 23 }, (_, i) => asset(`brand_luthor${i + 1}.png`)),
  },
  {
    id: 'BR-02',
    title: 'PR Chocolate',
    description: 'Premium confectionery identity with luxe typographic voice.',
    // Use smaller PNG as thumbnail to reduce initial load (webp file is large).
    thumb: asset('PR Chocolate.png'),
    full: asset('PR Chocolate.png'),
    slides: [asset('PR Chocolate.png')],
  },
];

const PRINT_ITEMS: GalleryItem[] = [
  {
    id: 'PR-01',
    title: 'Electronic Gaming Magazine',
    description: 'Editorial spreads exploring rhythm, grids, and typographic pacing.',
    thumb: asset('magazine5.jpg'),
    full: asset('magazine4.png'),
    slides: [
      asset('magazine1.png'),
      asset('magazine2.png'),
      asset('magazine3.png'),
      asset('magazine4.png'),
      asset('magazine5.jpg'),
    ],
  },
  {
    id: 'PR-02',
    title: 'Origami Instructions',
    description: 'Fold-driven compositions blending type, crease lines, and color.',
    thumb: asset('origami5.png'),
    full: asset('origami1.png'),
    slides: [
      asset('origami1.png'),
      asset('origami2.png'),
      asset('origami3.png'),
      asset('origami4.png'),
      asset('origami5.png'),
    ],
  },
  {
    id: 'PR-03',
    title: 'EGM Poster',
    description: 'Large-format gradient poster prepared for print and screen.',
    thumb: asset('poster.webp'),
    full: asset('poster.png'),
    slides: [asset('poster.png')],
  },
];

const cardGrid = (
  items: GalleryItem[],
  tagLabel: string,
  onOpen?: (item: GalleryItem) => void
) => (
  <div className="grid grid-cols-1 md:grid-cols-2 gap-12 flex-grow content-start overflow-hidden pt-0 relative">
    {items.map((item, idx) => (
      <div
        key={item.id}
        className="group relative animate-gallery-in flex flex-col"
        style={{ animationDelay: `${idx * 0.05}s`, willChange: 'transform, opacity' }}
      >
        {onOpen ? (
          <button
            type="button"
            onClick={() => onOpen(item)}
            className="relative aspect-[21/9] overflow-hidden border border-current/10 rounded-[10px] bg-current/5 transition-all duration-500 group-hover:border-blue-600/30"
          >
            <img
              src={item.thumb}
              alt={item.title}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
              loading="lazy"
              decoding="async"
              fetchPriority="low"
              sizes="(min-width: 768px) 50vw, 100vw"
            />
            <span className="absolute bottom-3 right-3 w-10 h-10 rounded-full border border-white/25 flex items-center justify-center text-xs bg-black/60 backdrop-blur-sm hover:border-blue-500 hover:text-blue-400 transition-all">
              ↗
            </span>
          </button>
        ) : (
          <a
            href={item.full}
            target="_blank"
            rel="noreferrer"
            className="relative aspect-[21/9] overflow-hidden border border-current/10 rounded-[10px] bg-current/5 transition-all duration-500 group-hover:border-blue-600/30 block"
            >
              <img
                src={item.thumb}
                alt={item.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                loading="lazy"
                decoding="async"
                fetchPriority="low"
                sizes="(min-width: 768px) 50vw, 100vw"
              />
              <span className="absolute bottom-3 right-3 w-10 h-10 rounded-full border border-white/25 flex items-center justify-center text-xs bg-black/60 backdrop-blur-sm hover:border-blue-500 hover:text-blue-400 transition-all">
                ↗
              </span>
            </a>
        )}

        <div className="mt-6 space-y-2">
          <div className="flex items-center justify-between mb-1">
            <div className="flex flex-col">
              <span className="text-[8px] font-mono text-blue-600 font-bold uppercase tracking-widest mb-1">
                {item.id}
              </span>
              <span className="text-lg font-black uppercase tracking-[0.1em] transition-all group-hover:text-blue-600">
                {item.title}
              </span>
            </div>
            <span className="text-[11px] text-theme-muted uppercase tracking-[0.25em]">
              {tagLabel}
            </span>
          </div>
          <p className="text-sm opacity-70 leading-relaxed">{item.description}</p>
        </div>
      </div>
    ))}
  </div>
);

const VisualIdentityPage: React.FC = () => {
  const [activeSection, setActiveSection] = useState<SectionKey>('OVERVIEW');
  const [batch, setBatch] = useState(0);
  const itemsPerPage = 2;
  const [lightbox, setLightbox] = useState<LightboxState | null>(null);

  useEffect(() => {
    setBatch(0);
    setLightbox(null);
  }, [activeSection]);

  useEffect(() => {
    if (!lightbox) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setLightbox(null);
      } else if (e.key === 'ArrowRight') {
        setLightbox((prev) =>
          prev ? { ...prev, index: (prev.index + 1) % prev.images.length } : prev
        );
      } else if (e.key === 'ArrowLeft') {
        setLightbox((prev) =>
          prev
            ? { ...prev, index: (prev.index - 1 + prev.images.length) % prev.images.length }
            : prev
        );
      }
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [lightbox]);

  const openLightbox = (item: GalleryItem) => {
    const images = item.slides && item.slides.length > 0 ? item.slides : [item.full];
    const startIndex = images.findIndex((src) => src === item.full);
    setLightbox({ images, index: startIndex >= 0 ? startIndex : 0, title: item.title });
  };

  useEffect(() => {
    if (!lightbox || lightbox.images.length <= 1) return;
    const next = (lightbox.index + 1) % lightbox.images.length;
    const prev = (lightbox.index - 1 + lightbox.images.length) % lightbox.images.length;
    [next, prev].forEach((i) => {
      const img = new Image();
      img.src = lightbox.images[i];
    });
  }, [lightbox]);

  const renderContent = () => {
    if (activeSection === 'OVERVIEW') {
      return (
        <OverviewContent
          badge="// Identity_Overview"
          title="Visual Identity"
          accent="Systems"
          subtitle="Designing coherent brands across every touchpoint."
          description="I craft scalable identity systems that balance aesthetics with utility. From UI foundations to logos, print, and signage, every piece is built to stay consistent, legible, and flexible as products grow."
          highlights={[
            { label: 'Focus', value: 'Logos / UI Kits / Print Suites' },
            { label: 'Approach', value: 'Grid-Driven / Accessible Color & Type' },
          ]}
        />
      );
    }

    if (activeSection === 'UI/UX' || activeSection === 'LOGOS-ICONS' || activeSection === 'PRINT' || activeSection === 'BRANDING') {
      const galleryConfig = {
        'UI/UX': {
          badge: '// UIUX_Gallery',
          title: 'Product',
          accent: 'Interfaces',
          tagLabel: 'UI/UX',
          items: UIUX_ITEMS,
          useLightbox: false,
        },
        'LOGOS-ICONS': {
          badge: '// Logos_Icons',
          title: 'Identity',
          accent: 'Marks',
          tagLabel: 'Logos - Icons',
          items: LOGO_ITEMS,
          useLightbox: false,
        },
        PRINT: {
          badge: '// Print_Gallery',
          title: 'Print',
          accent: 'Compositions',
          tagLabel: 'Print',
          items: PRINT_ITEMS,
          useLightbox: true,
        },
        BRANDING: {
          badge: '// Branding_Gallery',
          title: 'Brand',
          accent: 'Systems',
          tagLabel: 'Branding',
          items: BRAND_ITEMS,
          useLightbox: true,
        },
      } as const;

      const { badge, title, accent, tagLabel, items, useLightbox } = galleryConfig[activeSection];
      const totalBatches = Math.max(1, Math.ceil(items.length / itemsPerPage));
      const currentBatch = Math.min(batch, totalBatches - 1);
      const currentItems = items.slice(
        currentBatch * itemsPerPage,
        (currentBatch + 1) * itemsPerPage
      );

      return (
        <div className="flex flex-col h-full overflow-hidden">
          <header className="mb-8 flex-shrink-0">
            <span className="text-[10px] font-mono text-blue-600 uppercase tracking-[0.5em] mb-4 block animate-pulse">
              {badge}
            </span>
            <div className="flex items-end justify-between">
              <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter">
                {title}
                <span className="font-serif italic opacity-50"> {accent}</span>
              </h2>
              <div className="hidden md:flex items-center space-x-4 mb-2">
                <span className="text-[8px] font-mono uppercase tracking-[0.4em] opacity-100">
                  BATCH {currentBatch + 1} / {totalBatches}
                </span>
              </div>
            </div>
          </header>

          {cardGrid(currentItems, tagLabel, useLightbox ? openLightbox : undefined)}

          <div className="mt-auto pt-0 flex items-center justify-between flex-shrink-0">
            <div className="flex space-x-2">
              {Array.from({ length: totalBatches }).map((_, i) => (
                <div
                  key={i}
                  className={`h-1.5 transition-all duration-500 rounded-full ${i === currentBatch ? 'w-50 bg-blue-600' : 'w-50 bg-current/10'}`}
                />
              ))}
            </div>

            <button
              onClick={() => setBatch((prev) => (prev + 1) % totalBatches)}
              className="group/nav flex items-center space-x-6 outline-none"
            >
              <div className="text-right">
                <span className="block text-[8px] font-black uppercase tracking-[0.4em] opacity-100 group-hover/nav:opacity-100 transition-opacity">
                  Next Works
                </span>
                <span className="text-[10px] font-mono italic opacity-50">Sequence {((currentBatch + 1) % totalBatches) + 1}</span>
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
                {activeSection !== 'PRINT' ? (
                  <div className="absolute inset-0 border-t border-blue-600/30 rounded-full opacity-0 group-hover/nav:opacity-100 animate-spin-slow transition-opacity"></div>
                ) : null}
              </div>
            </button>
          </div>
        </div>
      );
    }

    return (
      <div className="flex-1 flex items-center justify-center text-sm uppercase tracking-[0.3em] opacity-40">
        {activeSection} content coming soon
      </div>
    );
  };

  return (
    <div className="w-full h-[75vh] flex bg-current/[0.01] overflow-hidden relative transition-all duration-700">
      <SideMenu
        items={VISUAL_IDENTITY_MENU_ITEMS}
        activeKey={activeSection}
        onSelect={setActiveSection}
        badgeLabel="Visual // Sequence"
      />

      <main className="flex-1 overflow-hidden relative p-12 md:pb-[59px] md:pt-[0px] mr-[184px] bg-current/[0.01] flex flex-col">
        <div
          className="absolute inset-0 opacity-[0.02] pointer-events-none"
          style={{ backgroundImage: 'radial-gradient(currentColor 1px, transparent 1px)', backgroundSize: '40px 40px' }}
        ></div>
        <div className="relative z-10 w-full h-full flex flex-col">
          <div key={activeSection} className="animate-content-in flex-1 flex flex-col">
            {renderContent()}
          </div>
        </div>
      </main>

      {lightbox ? (
        <div className="fixed inset-0 z-[60] bg-black/80 backdrop-blur-sm flex items-center justify-center px-6">
          <button
            type="button"
            onClick={() => setLightbox(null)}
            className="absolute top-6 right-6 w-10 h-10 rounded-full border border-white/30 text-white/80 hover:text-white hover:border-white transition-colors"
            aria-label="Close lightbox"
          >
            ✕
          </button>

          <div className="relative w-full max-w-6xl">
            <img
              src={lightbox.images[lightbox.index]}
              alt={lightbox.title}
              loading="eager"
              decoding="async"
              className="w-full max-h-[80vh] object-contain rounded-lg shadow-2xl border border-white/10 bg-black/40"
            />

            {lightbox.images.length > 1 ? (
              <>
                <button
                  type="button"
                  onClick={() =>
                    setLightbox((prev) =>
                      prev
                        ? { ...prev, index: (prev.index - 1 + prev.images.length) % prev.images.length }
                        : prev
                    )
                  }
                  className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 border border-white/20 text-white hover:bg-white/20 transition-all"
                  aria-label="Previous image"
                >
                  ←
                </button>
                <button
                  type="button"
                  onClick={() =>
                    setLightbox((prev) =>
                      prev ? { ...prev, index: (prev.index + 1) % prev.images.length } : prev
                    )
                  }
                  className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 border border-white/20 text-white hover:bg-white/20 transition-all"
                  aria-label="Next image"
                >
                  →
                </button>
              </>
            ) : null}
          </div>

          <div className="mt-4 text-[10px] font-mono tracking-[0.3em] uppercase text-white/70">
            {lightbox.title} — {lightbox.index + 1} / {lightbox.images.length}
          </div>
        </div>
      ) : null}

      <style>{`
        @keyframes galleryIn {
          0% { opacity: 0; transform: translateY(16px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        .animate-gallery-in {
          opacity: 0;
          animation: galleryIn 0.7s cubic-bezier(0.25, 0.8, 0.25, 1) forwards;
        }
        @keyframes contentIn {
          from { opacity: 0; transform: translateY(16px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-content-in {
          animation: contentIn 0.7s cubic-bezier(0.25, 0.8, 0.25, 1) forwards;
        }
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-spin-slow {
          animation: spin-slow 4s linear infinite;
        }
      `}</style>
    </div>
  );
};

export default VisualIdentityPage;
