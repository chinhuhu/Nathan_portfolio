import React from 'react';

export type GalleryGridItem = {
  id: string;
  title: string;
  description: string;
  thumb: string;
  full: string;
};

interface GalleryGridProps<T extends GalleryGridItem> {
  items: readonly T[];
  tagLabel: string;
  onOpen?: (item: T) => void;
  aspectClassName?: string;
  className?: string;
}

const GalleryGrid = <T extends GalleryGridItem>({
  items,
  tagLabel,
  onOpen,
  aspectClassName = 'aspect-video largescreen:aspect-[21/9]',
  className = 'grid grid-cols-1 md:grid-cols-2 gap-12 flex-grow content-start overflow-hidden pt-0 relative',
}: GalleryGridProps<T>) => (
  <div className={className}>
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
            className={`relative ${aspectClassName} overflow-hidden border border-current/10 rounded-[10px] bg-current/5 transition-all duration-500 group-hover:border-blue-600/30`}
            aria-label={`Open ${item.title}`}
          >
            <img
              src={item.thumb}
              alt={item.title}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
              loading="lazy"
              decoding="async"
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
            aria-label={`Open full image for ${item.title}`}
            className={`relative ${aspectClassName} overflow-hidden border border-current/10 rounded-[10px] bg-current/5 transition-all duration-500 group-hover:border-blue-600/30 block`}
          >
            <img
              src={item.thumb}
              alt={item.title}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
              loading="lazy"
              decoding="async"
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
              <span className="text-[15px] mobile-l:text-[16px] tablet:text-[17px] laptop-m:text-[18px] laptop-l:text-[20px] largescreen:text-[22px] font-black uppercase tracking-[0.1em] transition-all group-hover:text-blue-600">
                {item.title}
              </span>
            </div>
            <span className="text-[9px] mobile-l:text-[10px] tablet:text-[11px] laptop-m:text-[11px] laptop-l:text-[12px] largescreen:text-[13px] text-theme-muted uppercase tracking-[0.25em]">
              {tagLabel}
            </span>
          </div>
          <p className="text-[12px] mobile-l:text-[13px] tablet:text-[14px] laptop-m:text-[14px] laptop-l:text-[15px] largescreen:text-[16px] opacity-70 leading-relaxed">
            {item.description}
          </p>
        </div>
      </div>
    ))}
  </div>
);

export default GalleryGrid;
