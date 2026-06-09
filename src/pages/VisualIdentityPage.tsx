import React, { useEffect, useState } from 'react';
import BatchPager from '../components/BatchPager';
import GalleryGrid, { GalleryGridItem } from '../components/GalleryGrid';
import GalleryHeader from '../components/GalleryHeader';
import OverviewContent from '../components/OverviewContent';
import PageSection from '../components/PageSection';
import { SideMenuItem } from '../components/SideMenu';

type SectionKey = 'OVERVIEW' | 'UI/UX' | 'LOGOS-ICONS' | 'PRINT' | 'BRANDING';

const VISUAL_IDENTITY_MENU_ITEMS: readonly SideMenuItem<SectionKey>[] = [
  { key: 'OVERVIEW', label: 'Overview' },
  { key: 'UI/UX', label: 'UI/UX' },
  { key: 'LOGOS-ICONS', label: 'Logos - Icons' },
  { key: 'PRINT', label: 'Print' },
  { key: 'BRANDING', label: 'Branding' },
] as const;

type GalleryItem = GalleryGridItem & {
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
    thumb: asset('PR Chocolate.webp'),
    full: asset('PR Chocolate.webp'),
    slides: [asset('PR Chocolate.webp')],
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
    full: asset('poster.webp'),
    slides: [asset('poster.webp')],
  },
];

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
          <GalleryHeader
            badge={badge}
            title={title}
            accent={accent}
            currentBatch={currentBatch}
            totalBatches={totalBatches}
          />
          <GalleryGrid
            items={currentItems}
            tagLabel={tagLabel}
            onOpen={useLightbox ? openLightbox : undefined}
            aspectClassName="aspect-[21/9]"
          />
          <BatchPager
            currentBatch={currentBatch}
            totalBatches={totalBatches}
            onNext={() => setBatch((prev) => (prev + 1) % totalBatches)}
            showSpinRing={activeSection !== 'PRINT'}
          />
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
    <>
      <PageSection
        items={VISUAL_IDENTITY_MENU_ITEMS}
        activeKey={activeSection}
        onSelect={setActiveSection}
        mobileBadge="// Visual_Sections"
        sideBadge="Visual // Sequence"
        contentKey={activeSection}
      >
        {renderContent()}
      </PageSection>

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
    </>
  );
};

export default VisualIdentityPage;
