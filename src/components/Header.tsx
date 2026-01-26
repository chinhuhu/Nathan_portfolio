import React from 'react';

export type SectionKey = 'home' | 'development' | 'arts' | 'visual' | 'motion' | 'about';
type ThemeMode = 'light' | 'dark';

interface HeaderProps {
  onNavigate?: (section: SectionKey) => void;
  activeSection?: SectionKey;
  onToggleTheme?: () => void;
  theme?: ThemeMode;
}

const Header: React.FC<HeaderProps> = ({ onNavigate, activeSection, onToggleTheme, theme = 'light' }) => {
  const isDarkMode = theme === 'dark';

  return (
    <header className="bg-theme-panel border border-theme-panel px-8 py-5 md:px-12 md:py-6 flex justify-between items-center transition-colors duration-500 rounded-[2px] shadow-xl">
      <div className="flex items-center space-x-12">
        <div className="text-2xl font-black uppercase italic group cursor-pointer text-panel-strong inline-flex items-center space-x-3">
          <span className="tracking-[-0.08em]">Nathan</span>
          <span className="tracking-[-0.08em]">Nguyen</span>
          <span className="text-blue-600 group-hover:animate-ping inline-block">.</span>
        </div>

        <div className="hidden lg:flex items-center ml-8 space-x-6 text-[6pt] font-bold uppercase tracking-[0.2em] text-panel-muted whitespace-nowrap">
          <div className="flex flex-col">
            <span className="text-panel-subtle mb-0.5">Contact</span>
            <a href="tel:8252880663" className="hover:text-blue-600 transition-colors">
              8252880663
            </a>
          </div>
          <div className="w-[1px] h-4 bg-panel-subtle opacity-40"></div>
          <div className="flex flex-col">
            <span className="text-panel-subtle mb-0.5">Email</span>
            <a href="mailto:nathanguyen12@gmail.com" className="hover:text-blue-600 transition-colors">
              nathanguyen12@gmail.com
            </a>
          </div>
          <div className="w-[1px] h-4 bg-panel-subtle opacity-40"></div>
          <div className="flex flex-col">
            <span className="text-panel-subtle mb-0.5">Location</span>
            <span>Calgary AB, Canada</span>
          </div>
        </div>
      </div>

      <div className="hidden lg:block h-[1px] w-24 bg-panel-subtle opacity-40"></div>

      <nav className="flex items-center space-x-8 lg:space-x-10 text-[10px] font-bold uppercase tracking-[0.25em] lg:tracking-[0.4em] text-panel-muted hidden md:flex whitespace-nowrap">
        {[
          { label: 'Home', section: 'home' as const },
          { label: 'Development', section: 'development' as const },
          { label: 'Digital Arts', section: 'arts' as const },
          { label: 'Visual Identity', section: 'visual' as const },
          { label: 'Motion', section: 'motion' as const },
          { label: 'About Me', section: 'about' as const },
        ].map((item) => {
          const isActive = activeSection === item.section;
          return (
            <button
              key={item.label}
              type="button"
              onClick={() => onNavigate?.(item.section)}
              className={`relative transition-all ${isActive ? 'text-panel-strong' : 'text-panel-muted hover:text-panel-strong'} ${
                isActive ? 'tracking-[0.4em]' : 'hover:tracking-[0.3em] lg:hover:tracking-[0.5em]'
              } group/link`}
            >
              {item.label}
              <span
                className="absolute -bottom-1 left-0 h-[1px] bg-panel-strong transition-all duration-300"
                style={{ width: isActive ? '100%' : '0%' }}
              ></span>
            </button>
          );
        })}

        <button
          type="button"
          onClick={onToggleTheme}
          className="w-10 h-10 rounded-full border border-theme-panel flex items-center justify-center hover:border-blue-600 transition-colors cursor-pointer group/dot flex-shrink-0"
          aria-label="Toggle light and dark mode"
        >
          {isDarkMode ? (
            <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-[#131a2e]" viewBox="0 0 24 24" fill="currentColor">
              <path d="M21.752 15.002A9.718 9.718 0 0 1 12.999 21c-5.376 0-9.732-4.365-9.732-9.75 0-3.701 2.093-6.912 5.163-8.52a.75.75 0 0 1 .974.266.75.75 0 0 1-.1.905 7.502 7.502 0 0 0 9.963 11.101.75.75 0 0 1 1.483.023.75.75 0 0 1-.998.977Z" />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-[#f2ede4]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="4" />
              <path strokeLinecap="round" d="M12 2v2m0 16v2m10-10h-2M4 12H2m15.071-7.071-1.414 1.414M8.343 15.657l-1.414 1.414m0-12.728 1.414 1.414m9.314 9.314 1.414 1.414" />
            </svg>
          )}
        </button>
      </nav>

      <div className="md:hidden flex flex-col space-y-1.5 items-end">
        <div className="w-8 h-[2px] bg-panel-strong"></div>
        <div className="w-5 h-[2px] bg-panel-strong"></div>
      </div>
    </header>
  );
};

export default Header;
