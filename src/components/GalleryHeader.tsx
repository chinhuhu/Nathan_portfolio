import React from 'react';

interface GalleryHeaderProps {
  badge: string;
  title: string;
  accent: string;
  currentBatch?: number;
  totalBatches?: number;
  className?: string;
}

const GalleryHeader: React.FC<GalleryHeaderProps> = ({
  badge,
  title,
  accent,
  currentBatch,
  totalBatches,
  className = 'mb-8',
}) => (
  <header className={`${className} flex-shrink-0`}>
    <span className="text-[10px] font-mono text-blue-600 uppercase tracking-[0.5em] mb-4 block animate-pulse">
      {badge}
    </span>
    <div className="flex items-end justify-between">
      <h2 className="text-[30px] mobile-l:text-[34px] tablet:text-[40px] laptop-m:text-[48px] laptop-l:text-[56px] largescreen:text-[45px] font-black uppercase tracking-tighter">
        {title}
        <span className="font-serif italic opacity-50"> {accent}</span>
      </h2>
      {typeof currentBatch === 'number' && typeof totalBatches === 'number' ? (
        <div className="hidden md:flex items-center space-x-4 mb-2">
          <span className="text-[8px] font-mono uppercase tracking-[0.4em] opacity-100">
            BATCH {currentBatch + 1} / {totalBatches}
          </span>
        </div>
      ) : null}
    </div>
  </header>
);

export default GalleryHeader;
