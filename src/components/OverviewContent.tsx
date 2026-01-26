import React from 'react';

type Highlight = {
  label: string;
  value: string;
};

type OverviewContentProps = {
  badge?: string;
  title: string;
  accent?: string;
  subtitle?: string;
  description: React.ReactNode;
  highlights?: Highlight[];
};

const OverviewContent: React.FC<OverviewContentProps> = ({
  badge = '// Overview',
  title,
  accent,
  subtitle,
  description,
  highlights = [],
}) => (
  <div className="max-w-3xl">
    <header className="mb-16">
      <span className="text-[10px] font-mono text-blue-600 uppercase tracking-[0.5em] mb-4 block">
        {badge}
      </span>
      <h2 className="text-5xl md:text-6xl font-black uppercase tracking-tighter leading-[0.9] mb-8">
        {title}
        {accent ? (
          <span className="font-serif uppercase italic opacity-50 ml-8">
            {accent}
          </span>
        ) : null}
      </h2>
      {subtitle ? (
        <h3 className="text-xl font-light opacity-60 border-l-2 border-blue-600/30 pl-8 italic">
          {subtitle}
        </h3>
      ) : null}
    </header>

    <div className="space-y-12">
      <p className="text-lg md:text-xl leading-relaxed opacity-50 font-light">
        {description}
      </p>

      {highlights.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10 pt-12 border-t border-current/5">
          {highlights.map((item) => (
            <div key={item.label} className="group">
              <h4 className="text-[9px] font-mono uppercase tracking-[0.3em] opacity-30 mb-3 group-hover:text-blue-600 transition-colors">
                {item.label}
              </h4>
              <div className="text-sm font-bold uppercase tracking-widest">
                {item.value}
              </div>
            </div>
          ))}
        </div>
      ) : null}
    </div>
  </div>
);

export default OverviewContent;
