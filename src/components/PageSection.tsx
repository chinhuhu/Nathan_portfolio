import React from 'react';
import SideMenu, { SideMenuItem } from './SideMenu';

interface PageSectionProps<Key extends string> {
  items: readonly SideMenuItem<Key>[];
  activeKey: Key;
  onSelect: (key: Key) => void;
  mobileBadge: string;
  children: React.ReactNode;
  sideBadge?: string;
  contentKey?: React.Key;
  mainClassName?: string;
  contentClassName?: string;
}

const DEFAULT_MAIN_CLASS =
  'flex-1 overflow-hidden relative p-6 tablet:p-8 laptop-m:p-10 laptop-l:p-12 md:pb-[59px] md:pt-[0px] mr-0 laptop-m:mr-[80px] laptop-l:mr-[120px] largescreen:mr-[184px] bg-current/[0.01] flex flex-col';

const DEFAULT_CONTENT_CLASS = 'relative z-10 animate-content-in w-full h-full flex flex-col';

const PageSection = <Key extends string>({
  items,
  activeKey,
  onSelect,
  mobileBadge,
  sideBadge,
  contentKey,
  mainClassName = DEFAULT_MAIN_CLASS,
  contentClassName = DEFAULT_CONTENT_CLASS,
  children,
}: PageSectionProps<Key>) => (
  <div className="w-full h-[75vh] flex flex-col laptop-m:flex-row laptop-l:flex-row largescreen:flex-row bg-current/[0.01] overflow-hidden relative transition-all duration-700">
    <div className="hidden mobile-l:flex tablet:flex laptop-m:hidden w-full px-6 py-4 border-b border-current/10 bg-current/[0.02]">
      <div className="flex flex-wrap items-center justify-between gap-4 text-[10px] font-mono uppercase tracking-[0.35em]">
        <span className="text-blue-600">{mobileBadge}</span>
        <div className="flex items-center gap-3">
          {items.map((item) => (
            <button
              key={item.key}
              type="button"
              onClick={() => onSelect(item.key)}
              className={`px-3 py-2 rounded-full transition-colors border border-current/15 ${
                activeKey === item.key
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

    <div className="hidden laptop-m:flex laptop-l:flex largescreen:flex">
      <SideMenu items={items} activeKey={activeKey} onSelect={onSelect} badgeLabel={sideBadge} />
    </div>

    <main className={mainClassName}>
      <div
        className="absolute inset-0 opacity-[0.02] pointer-events-none"
        style={{ backgroundImage: 'radial-gradient(currentColor 1px, transparent 1px)', backgroundSize: '40px 40px' }}
      ></div>

      <div key={contentKey} className={contentClassName}>
        {children}
      </div>
    </main>
  </div>
);

export default PageSection;
