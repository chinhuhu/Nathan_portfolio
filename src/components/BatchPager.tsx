import React from 'react';

interface BatchPagerProps {
  currentBatch: number;
  totalBatches: number;
  onNext: () => void;
  nextLabel?: string;
  className?: string;
  showSpinRing?: boolean;
}

const BatchPager: React.FC<BatchPagerProps> = ({
  currentBatch,
  totalBatches,
  onNext,
  nextLabel = 'Next Works',
  className = 'mt-auto pt-0 flex items-center justify-between flex-shrink-0',
  showSpinRing = true,
}) => (
  <div className={className}>
    <div className="flex space-x-2">
      {Array.from({ length: totalBatches }).map((_, i) => (
        <div
          key={i}
          className={`h-1.5 transition-all duration-500 rounded-full ${
            i === currentBatch ? 'w-50 bg-blue-600' : 'w-50 bg-current/10'
          }`}
        />
      ))}
    </div>

    <button type="button" onClick={onNext} className="group/nav flex items-center space-x-6 outline-none">
      <div className="text-right">
        <span className="block text-[8px] font-black uppercase tracking-[0.4em] opacity-100 group-hover/nav:opacity-100 transition-opacity">
          {nextLabel}
        </span>
        <span className="text-[10px] font-mono italic opacity-50">
          Sequence {((currentBatch + 1) % totalBatches) + 1}
        </span>
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
        {showSpinRing ? (
          <div className="absolute inset-0 border-t border-blue-600/30 rounded-full opacity-0 group-hover/nav:opacity-100 animate-spin-slow transition-opacity"></div>
        ) : null}
      </div>
    </button>
  </div>
);

export default BatchPager;
