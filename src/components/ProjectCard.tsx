
import React from 'react';
import { Project } from '../types';

interface ProjectCardProps {
  project: Project;
  index: number;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project, index }) => {
  return (
    <div className="group relative w-[75vw] md:w-[48vw] flex-shrink-0">
      <div className="relative overflow-hidden bg-neutral-900 shadow-2xl">
        {/* Large Index Number Background */}
        <span className="absolute top-0 left-0 text-[20vw] font-black text-white/[0.02] leading-none pointer-events-none select-none z-0 translate-x-[-10%] translate-y-[-10%]">
          0{index + 1}
        </span>
        
        <div className="aspect-[16/10] overflow-hidden relative z-10 border border-white/5 group-hover:border-red-600/30 transition-colors duration-500">
          <img 
            src={project.image} 
            alt={project.title}
            className="w-full h-full object-cover transition-transform duration-1000 ease-out group-hover:scale-105 group-hover:rotate-1 grayscale group-hover:grayscale-0"
          />
          <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col items-center justify-center space-y-4">
            <span className="text-[10px] uppercase tracking-[0.5em] font-bold text-white/50">Discovery Phase</span>
            <div className="w-px h-12 bg-red-600"></div>
            <span className="text-xs uppercase tracking-[0.3em] font-bold border border-white/20 px-8 py-4 rounded-full hover:bg-white hover:text-black transition-all">Exploration</span>
          </div>
        </div>
      </div>
      
      <div className="mt-12 flex justify-between items-end border-b border-white/10 pb-8">
        <div className="max-w-md">
          <span className="text-[10px] text-red-600 uppercase tracking-[0.4em] font-bold block mb-4 italic">0{index + 1} — {project.category}</span>
          <h3 className="text-4xl md:text-7xl font-black uppercase tracking-tight group-hover:tracking-normal transition-all duration-700">{project.title}</h3>
        </div>
        <div className="text-right pb-1">
          <div className="text-[10px] uppercase tracking-[0.3em] text-white/30 font-bold mb-2">Released</div>
          <span className="font-serif italic text-3xl text-white/20">{project.year}</span>
        </div>
      </div>
      
      <div className="mt-8 flex justify-between items-start">
        <p className="text-sm text-white/40 leading-relaxed font-light max-w-sm">
          {project.description}
        </p>
        <div className="flex space-x-2">
          <div className="w-2 h-2 border border-white/20 rounded-full"></div>
          <div className="w-2 h-2 border border-white/20 rounded-full"></div>
          <div className="w-2 h-2 bg-red-600 rounded-full"></div>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
