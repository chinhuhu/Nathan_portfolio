
import React from 'react';

export type SectionKey = 'home' | 'work' | 'about' | 'end';

interface HeaderProps {
  onNavigate?: (section: SectionKey) => void;
}

const Header: React.FC<HeaderProps> = ({ onNavigate }) => {
  return (
    <header className="bg-[#edead8] border border-[#292e36] px-8 py-5 md:px-12 md:py-6 flex justify-between items-center transition-all duration-500 rounded-[2px] shadow-xl">
      <div className="flex items-center space-x-12"> 
        <div className="text-2xl font-black uppercase italic group cursor-pointer text-[#292e36] inline-flex items-center space-x-3">
          <span className="tracking-[-0.08em]">Nathan</span>
          <span className="tracking-[-0.08em]">Nguyen</span>
          <span className="text-red-600 group-hover:animate-ping inline-block">.</span>
        </div>
        <div className="hidden lg:block h-[1px] w-24 bg-[#292e36]/10"></div>
      </div>
      
      <nav className="flex items-center space-x-8 lg:space-x-10 text-[10px] font-bold uppercase tracking-[0.25em] lg:tracking-[0.4em] text-[#292e36]/50 hidden md:flex whitespace-nowrap">
          {[
            { label: 'Home', section: 'home' as const },
            { label: 'Development', section: 'work' as const },
            { label: 'Product Design', section: 'work' as const },
            { label: 'Visual Identity', section: 'about' as const },
            { label: 'Motion', section: 'about' as const },
            { label: 'Resume', section: 'end' as const },
          ].map((item) => (
            <button
              key={item.label}
              type="button"
              onClick={() => onNavigate?.(item.section)}
              className="text-[#292e36]/70 hover:text-[#292e36] transition-all hover:tracking-[0.3em] lg:hover:tracking-[0.5em] relative group/link"
            >
              {item.label}
              <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-[#292e36] transition-all duration-300 group-hover/link:w-full"></span>
            </button>
          ))}
          <div className="w-10 h-10 rounded-full border border-[#292e36]/10 flex items-center justify-center hover:border-red-600 transition-colors cursor-pointer group/dot flex-shrink-0">
            <div className="w-1 h-1 bg-[#292e36] rounded-full group-hover/dot:scale-150 transition-transform"></div>
          </div>
        </nav>
      
      <div className="md:hidden flex flex-col space-y-1.5 items-end">
        <div className="w-8 h-[2px] bg-[#edead8]"></div>
        <div className="w-5 h-[2px] bg-[#edead8]"></div>
      </div>
    </header>
  );
};

export default Header;
