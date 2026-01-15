
import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="fixed top-0 left-0 w-full z-50 px-12 py-10 flex justify-between items-center transition-all duration-500">
      <div className="flex items-center space-x-12">
        <div className="text-2xl font-black tracking-[-0.08em] uppercase italic group cursor-pointer">
          STIFF<span className="text-red-600 group-hover:animate-ping inline-block">.</span>
        </div>
        <div className="hidden lg:block h-[1px] w-24 bg-white/10"></div>
      </div>
      
      <nav className="flex items-center space-x-16 text-[10px] font-bold uppercase tracking-[0.4em] text-white/50 hidden md:flex">
        <a href="#" className="hover:text-white transition-all hover:tracking-[0.5em]">Work</a>
        <a href="#" className="hover:text-white transition-all hover:tracking-[0.5em]">Studio</a>
        <a href="#" className="hover:text-white transition-all hover:tracking-[0.5em]">Contact</a>
        <div className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:border-red-600 transition-colors">
          <div className="w-1 h-1 bg-white rounded-full"></div>
        </div>
      </nav>
      
      <div className="md:hidden flex flex-col space-y-1.5 items-end">
        <div className="w-8 h-[2px] bg-white"></div>
        <div className="w-5 h-[2px] bg-white"></div>
      </div>
    </header>
  );
};

export default Header;
