
import React, { useState, useEffect } from 'react';
import { generateCreativeBio } from '../services/geminiService';

const About: React.FC = () => {
  const [bio, setBio] = useState<string>("Initializing creative protocol...");
  const [isGenerating, setIsGenerating] = useState(false);

  const fetchBio = async () => {
    setIsGenerating(true);
    const themes = ["high-end design", "conceptual digital craft", "aesthetic rigor", "future-forward visuals"];
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
          <span className="text-[10px] uppercase tracking-[0.6em] text-red-600 font-bold block mb-4">Foundation</span>
          <h2 className="text-6xl md:text-9xl font-black uppercase tracking-tighter leading-none">
            The <br /> 
            <span className="font-serif italic text-[#edead8]/20 ml-16 md:ml-32">Collective</span>
          </h2>
        </div>
        
        <div className="relative group max-w-2xl">
          <div className="absolute -left-8 top-0 text-6xl font-serif text-red-600/20 italic">"</div>
          <p className="text-2xl md:text-4xl font-light italic text-[#edead8]/90 leading-[1.2] tracking-tight min-h-[140px]">
            {bio}
          </p>
          
          <button 
            onClick={fetchBio}
            disabled={isGenerating}
            className="mt-10 group/btn flex items-center space-x-4 outline-none"
          >
            <div className={`w-12 h-12 rounded-full border border-[#edead8]/10 flex items-center justify-center group-hover/btn:border-red-600 transition-colors ${isGenerating ? 'animate-spin' : ''}`}>
              <span className="text-xs">✦</span>
            </div>
            <span className="text-[9px] uppercase tracking-[0.5em] text-[#edead8]/30 group-hover/btn:text-[#edead8] transition-colors">
              {isGenerating ? 'Synthesizing...' : 'Redefine Narrative'}
            </span>
          </button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-12 border-t border-[#edead8]/5 pt-16">
          <div>
            <h4 className="text-[9px] uppercase tracking-[0.4em] text-[#edead8]/30 font-bold mb-4">Core Focus</h4>
            <ul className="text-xs space-y-2 text-[#edead8]/60">
              <li>Creative Direction</li>
              <li>UI/UX Architecture</li>
              <li>Brand Intelligence</li>
            </ul>
          </div>
          <div>
            <h4 className="text-[9px] uppercase tracking-[0.4em] text-[#edead8]/30 font-bold mb-4">Global Reach</h4>
            <p className="text-xs text-[#edead8]/60">Distributed team operating from Berlin, Tokyo, and New York.</p>
          </div>
          <div className="hidden md:block">
            <h4 className="text-[9px] uppercase tracking-[0.4em] text-[#edead8]/30 font-bold mb-4">Awards</h4>
            <p className="text-xs text-[#edead8]/60 font-serif italic">Site of the Day x14<br/>Developer Award x06</p>
          </div>
        </div>
      </div>

      <div className="lg:col-span-5 relative">
        <div className="relative aspect-[4/5] overflow-hidden bg-neutral-900 border border-[#edead8]/5 rounded-sm group">
          <img 
            src="https://picsum.photos/seed/studio-pro/800/1000" 
            alt="Studio Professional" 
            className="w-full h-full object-cover opacity-50 grayscale transition-transform duration-[2s] group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent opacity-80"></div>
          
          <div className="absolute bottom-8 left-8 right-8">
             <div className="flex items-center justify-between text-[10px] uppercase tracking-[0.3em] font-bold text-[#edead8]/40 italic">
               <span>Est. 2018</span>
               <div className="flex space-x-1">
                 <div className="w-1 h-1 bg-[#edead8]/20 rounded-full"></div>
                 <div className="w-1 h-1 bg-red-600 rounded-full"></div>
                 <div className="w-1 h-1 bg-[#edead8]/20 rounded-full"></div>
               </div>
             </div>
          </div>
        </div>
        {/* Floating Accent */}
        <div className="absolute -top-6 -right-6 w-24 h-24 border border-[#edead8]/10 flex items-center justify-center rounded-full backdrop-blur-sm pointer-events-none">
           <div className="w-12 h-[1px] bg-red-600/50 rotate-45"></div>
        </div>
      </div>
    </div>
  );
};

export default About;
