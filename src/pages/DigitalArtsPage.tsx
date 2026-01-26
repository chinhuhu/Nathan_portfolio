import React, { useState } from 'react';
import SideMenu, { SideMenuItem } from '../components/SideMenu';
import OverviewContent from '../components/OverviewContent';

type SectionKey = 'OVERVIEW' | 'GALLERY';

type GalleryItem = {
  id: string;
  title: string;
  description: string;
  thumb: string;
  full: string;
};

const ARTS_MENU_ITEMS: SideMenuItem<SectionKey>[] = [
  { key: 'OVERVIEW', label: 'Overview' },
  { key: 'GALLERY', label: 'Gallery' },
];

const asset = (name: string) => `${process.env.PUBLIC_URL}/${encodeURIComponent(name)}`;

const GALLERY_ITEMS: GalleryItem[] = [
  { id: 'GA-01', title: 'All in our hand', description: 'Hands-on composition exploring tactile balance.', thumb: asset('All in our hand.webp'), full: asset('All in our hand.png') },
  { id: 'GA-02', title: 'Dawn at Louise', description: 'Mist and light over Lake Louise at daybreak.', thumb: asset('Dawn at Louise.webp'), full: asset('Dawn at Louise.jpeg') },
  { id: 'GA-03', title: 'Graphic Novel', description: 'High-contrast panels in a cinematic grid.', thumb: asset('Graphic Novel.webp'), full: asset('Graphic Novel.png') },
  { id: 'GA-04', title: 'Kannanaskis', description: 'Peaks and clouds captured in crisp mountain air.', thumb: asset('Kannanaskis.webp'), full: asset('Kannanaskis.png') },
  { id: 'GA-05', title: 'Letters Agenda', description: 'Typographic play with layered stationery.', thumb: asset('Letters Agenda.webp'), full: asset('Letters Agenda.png') },
  { id: 'GA-06', title: 'Music Festival Poster', description: 'Vibrant gradients for a live event identity.', thumb: asset('Music festival poster.webp'), full: asset('Music festival poster.png') },
  { id: 'GA-07', title: 'Old Picture of an Owl', description: 'Grainy archival portrait with modern tone.', thumb: asset('Old picture of an owl.webp'), full: asset('Old picture of an owl.jpg') },
  { id: 'GA-08', title: 'The Central Library', description: 'Architectural study of glass and light.', thumb: asset('The Central Library.webp'), full: asset('The Central Library.png') },
  { id: 'GA-09', title: 'The Galleria Trees', description: 'Interior foliage under geometric skylights.', thumb: asset('The Galleria Trees.webp'), full: asset('The Galleria Trees.png') },
  { id: 'GA-10', title: 'The Last Sniff', description: 'Playful moment frozen in vivid detail.', thumb: asset('The last sniff.webp'), full: asset('The last sniff.png') },
];

const cardGrid = (items: GalleryItem[]) => (
  <div className="grid grid-cols-1 md:grid-cols-2 gap-12 flex-grow content-start overflow-hidden pt-0 relative">
    {items.map((item, idx) => (
      <div
        key={item.id}
        className="group relative animate-gallery-in flex flex-col"
        style={{ animationDelay: `${idx * 0.05}s`, willChange: 'transform, opacity' }}
      >
        <div className="relative aspect-video overflow-hidden border border-current/10 rounded-[10px] bg-current/5 transition-all duration-500 group-hover:border-blue-600/30">
          <img
            src={item.thumb}
            alt={item.title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
          />
          <a
            href={item.full}
            target="_blank"
            rel="noreferrer"
            className="absolute bottom-3 right-3 w-10 h-10 rounded-full border border-white/25 flex items-center justify-center text-xs bg-black/60 backdrop-blur-sm hover:border-blue-500 hover:text-blue-400 transition-all"
            aria-label="Open full image"
          >
            ↗
          </a>
        </div>

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
              Gallery
            </span>
          </div>
        </div>
      </div>
    ))}
  </div>
);

const DigitalArtsPage: React.FC = () => {
  const [activeSection, setActiveSection] = useState<SectionKey>('OVERVIEW');
  const [batch, setBatch] = useState(0);
  const itemsPerPage = 2;
  const totalBatches = Math.ceil(GALLERY_ITEMS.length / itemsPerPage);
  const currentItems = GALLERY_ITEMS.slice(batch * itemsPerPage, (batch + 1) * itemsPerPage);

  return (
    <div className="w-full h-[75vh] flex bg-current/[0.01] overflow-hidden relative transition-all duration-700">
      <SideMenu items={ARTS_MENU_ITEMS} activeKey={activeSection} onSelect={setActiveSection} />

      <main className="flex-1 overflow-hidden relative p-12 md:pb-[59px] md:pt-[0px] mr-[184px] bg-current/[0.01] flex flex-col">
        <div
          className="absolute inset-0 opacity-[0.02] pointer-events-none"
          style={{ backgroundImage: 'radial-gradient(currentColor 1px, transparent 1px)', backgroundSize: '40px 40px' }}
        ></div>

        <div className="relative z-10 animate-content-in w-full h-full flex flex-col">
          {activeSection === 'OVERVIEW' ? (
            <OverviewContent
              badge="// Arts Overview"
              title="Digital Arts"
              accent="Gallery"
              subtitle="Illustration and photography blends."
              description="Personal explorations in color, texture, and cinematic framing. I combine photography and illustration to explore mood, atmosphere, and visual storytelling for product and brand systems."
              highlights={[
                { label: 'Mediums', value: 'Illustration / Adobe Creative Cloud' },
                { label: 'Vibe', value: 'Color & Texture' },
              ]}
            />
          ) : (
            <div className="flex flex-col h-full overflow-hidden">
              <header className="mb-8 flex-shrink-0">
                <span className="text-[10px] font-mono text-blue-600 uppercase tracking-[0.5em] mb-4 block animate-pulse">
                  // Gallery_Overview
                </span>
                <div className="flex items-end justify-between">
                  <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter">
                    Selected<span className="font-serif italic opacity-50"> Works</span>
                  </h2>
                  <div className="hidden md:flex items-center space-x-4 mb-2">
                    <span className="text-[8px] font-mono uppercase tracking-[0.4em] opacity-100">
                      BATCH {batch + 1} / {totalBatches}
                    </span>
                  </div>
                </div>
              </header>

              {cardGrid(currentItems)}

              <div className="mt-auto pt-0 flex items-center justify-between flex-shrink-0">
                <div className="flex space-x-2">
                  {Array.from({ length: totalBatches }).map((_, i) => (
                    <div
                      key={i}
                      className={`h-1.5 transition-all duration-500 rounded-full ${i === batch ? 'w-50 bg-blue-600' : 'w-50 bg-current/10'}`}
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

                    <div className="absolute inset-0 border-t border-blue-600/30 rounded-full opacity-0 group-hover/nav:opacity-100 animate-spin-slow transition-opacity"></div>
                  </div>
                </button>
              </div>
            </div>
          )}
        </div>
      </main>

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
      `}</style>
    </div>
  );
};

export default DigitalArtsPage;
