import React from 'react';

export type SideMenuItem<Key extends string = string> = {
  key: Key;
  label: string;
};

interface SideMenuProps<Key extends string = string> {
  items: readonly SideMenuItem<Key>[];
  activeKey?: Key;
  onSelect?: (key: Key) => void;
  badgeLabel?: string;
}

export const DEFAULT_SIDE_MENU_ITEMS = [
  { key: 'OVERVIEW', label: 'Overview' },
  { key: 'PROJECTS', label: 'Projects' },
] as const satisfies readonly SideMenuItem[];

const SideMenu = <Key extends string = string>({
  items,
  activeKey,
  onSelect,
  badgeLabel = 'Dev_Log // Sequence',
}: SideMenuProps<Key>) => {
  const resolvedActive = activeKey ?? items[0]?.key;

  return (
    <aside className="w-64 md:w-80 border-r border-current/10 flex flex-col p-10 justify-between bg-inherit z-20">
      <div>
        <div className="flex items-center space-x-2 mb-16">
          <div className="w-2 h-2 bg-blue-600 rounded-full animate-pulse shadow-[0_0_8px_rgba(37,99,235,0.6)]"></div>
          <span className="text-[9px] font-black tracking-[0.4em] uppercase opacity-100">
            {badgeLabel}
          </span>
        </div>

        <nav className="space-y-12">
          {items.map((item) => {
            const isActive = resolvedActive === item.key;

            return (
              <button
                key={item.key}
                type="button"
                onClick={onSelect ? () => onSelect(item.key) : undefined}
                className="group flex flex-col items-start outline-none text-left w-full"
              >
                <span
                  className={`text-[9px] font-mono mb-1 transition-all duration-500 ${
                    isActive ? 'text-blue-600' : 'opacity-100'
                  }`}
                >
                  {item.key}
                </span>
                <span
                  className={`text-sm font-black uppercase tracking-[0.25em] transition-all duration-300 ${
                    isActive
                      ? 'opacity-100 translate-x-4 text-blue-600'
                      : 'opacity-100 group-hover:opacity-60 translate-x-0'
                  }`}
                >
                  {item.label}
                </span>
              </button>
            );
          })}
        </nav>
      </div>
    </aside>
  );
};

export default SideMenu;
