import React from 'react';
import { NAV_LINKS } from '../constants';

export const Navbar = () => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 py-6 backdrop-blur-md bg-black/10 border-b border-white/5">
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
          <span className="text-black font-extrabold text-xl">S</span>
        </div>
        <span className="font-bold text-lg tracking-tight">Nathan13</span>
      </div>

      <div className="hidden md:flex items-center gap-8">
        {NAV_LINKS.map((link) => (
          <a
            key={link.label}
            href={link.href}
            className="text-sm font-medium text-white/60 hover:text-white transition-colors"
          >
            {link.label}
          </a>
        ))}
        <button className="px-4 py-2 bg-white text-black text-sm font-bold rounded-full hover:bg-white/90 transition-all">
          Let's talk
        </button>
      </div>

      <div className="md:hidden">
        <button className="p-2 text-white/60">
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16m-7 6h7"
            />
          </svg>
        </button>
      </div>
    </nav>
  );
};
