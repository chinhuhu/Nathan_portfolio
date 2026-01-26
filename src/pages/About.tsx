import React, { useState, useEffect } from 'react';
import { generateCreativeBio } from '../services/geminiService';

const About: React.FC = () => {
  const [bio, setBio] = useState<string>('Initializing creative protocol...');
  const [isGenerating, setIsGenerating] = useState(false);

  const fetchBio = async () => {
    setIsGenerating(true);
    const themes = ['high-end design', 'conceptual digital craft', 'aesthetic rigor', 'future-forward visuals'];
    const result = await generateCreativeBio(themes);
    setBio(result);
    setIsGenerating(false);
  };

  useEffect(() => {
    fetchBio();
  }, []);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
      <div className="lg:col-span-7 space-y-16">
        <div>
          <span className="text-[10px] uppercase tracking-[0.6em] text-blue-600 font-bold block mb-4">Foundation</span>
          <h2 className="text-6xl md:text-9xl font-black uppercase tracking-tighter leading-none">
            The <br />
            <span className="font-serif italic text-theme-subtle opacity-60 ml-16 md:ml-32">Collective</span>
          </h2>
        </div>

        <div className="relative group max-w-2xl">
          <div className="absolute -left-8 top-0 text-6xl font-serif text-blue-600/20 italic">"</div>
          <p className="text-2xl md:text-4xl font-light italic text-theme-strong leading-[1.2] tracking-tight min-h-[140px]">
            {bio}
          </p>

          <button
            onClick={fetchBio}
            disabled={isGenerating}
            className="mt-10 group/btn flex items-center space-x-4 outline-none"
          >
            <div
              className={`w-12 h-12 rounded-full border border-theme flex items-center justify-center group-hover/btn:border-blue-600 transition-colors ${
                isGenerating ? 'animate-spin' : ''
              }`}
            >
              <span className="text-xs">✦</span>
            </div>
            <span className="text-[9px] uppercase tracking-[0.5em] text-theme-subtle group-hover/btn:text-theme-primary transition-colors">
              {isGenerating ? 'Synthesizing...' : 'Redefine Narrative'}
            </span>
          </button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-12 border-t border-theme pt-16">
          <div>
            <h4 className="text-[9px] uppercase tracking-[0.4em] text-theme-subtle font-bold mb-4">Core Focus</h4>
            <ul className="text-xs space-y-2 text-theme-muted">
              <li>Creative Direction</li>
              <li>UI/UX Architecture</li>
              <li>Brand Intelligence</li>
            </ul>
          </div>
          <div>
            <h4 className="text-[9px] uppercase tracking-[0.4em] text-theme-subtle font-bold mb-4">Global Reach</h4>
            <p className="text-xs text-theme-muted">Distributed team operating from Berlin, Tokyo, and New York.</p>
          </div>
          <div className="hidden md:block">
            <h4 className="text-[9px] uppercase tracking-[0.4em] text-theme-subtle font-bold mb-4">Awards</h4>
            <p className="text-xs text-theme-muted font-serif italic">
              Site of the Day x14
              <br />
              Developer Award x06
            </p>
          </div>
        </div>
      </div>

      <div className="lg:col-span-5 relative">
        <div className="relative aspect-[4/5] overflow-hidden bg-theme-card border border-theme-card rounded-sm group">
          <img
            src="https://picsum.photos/seed/studio-pro/800/1000"
            alt="Studio Professional"
            className="w-full h-full object-cover opacity-50 grayscale transition-transform duration-[2s] group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent opacity-80"></div>

          <div className="absolute bottom-8 left-8 right-8">
            <div className="flex items-center justify-between text-[10px] uppercase tracking-[0.3em] font-bold text-white/70 italic">
              <span>Est. 2018</span>
              <div className="flex space-x-1">
                <div className="w-1 h-1 rounded-full bg-white/60"></div>
                <div className="w-1 h-1 bg-blue-600 rounded-full"></div>
                <div className="w-1 h-1 rounded-full bg-white/60"></div>
              </div>
            </div>
          </div>
        </div>

        <div className="absolute -top-6 -right-6 w-24 h-24 border border-theme flex items-center justify-center rounded-full backdrop-blur-sm pointer-events-none">
          <div className="w-12 h-[1px] bg-blue-600/50 rotate-45"></div>
        </div>
      </div>
    </div>
  );
};

export default About;
