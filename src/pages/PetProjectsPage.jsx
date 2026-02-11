import React from 'react';
import Navbar from '../components/Navbar';
import { petProjects } from '../data/petProjects';

const PetProjectCard = ({ project }) => (
  <a
    href={project.href}
    target="_blank"
    rel="noreferrer"
    className="flex flex-col md:flex-row gap-4 p-5 rounded-xl bg-[#161B22] border border-[#30363D] hover:border-[#58A6FF]/50 transition-all group"
  >
    <div className="w-full md:w-56 h-36 rounded-lg bg-gradient-to-br from-[#161B22] via-[#0D1117] to-[#161B22] relative overflow-hidden border border-[#30363D] shrink-0">
      {project.thumbnail && (
        <img
          src={project.thumbnail}
          alt={`${project.title} thumbnail`}
          className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          onError={(e) => { e.target.style.display = 'none'; }}
        />
      )}
    </div>
    <div className="flex-1">
      <div className="flex items-center gap-3">
        <h3 className="text-xl font-bold text-white group-hover:text-[#58A6FF] transition-colors">
          {project.title}
        </h3>
        <span className="text-xs font-mono text-[#8B949E] border border-[#30363D] rounded px-2 py-1">
          {project.date || '—'}
        </span>
      </div>
      <p className="text-[#8B949E] text-sm mt-2">{project.summary}</p>
    </div>
  </a>
);

export default function PetProjectsPage() {
  return (
    <div className="min-h-screen bg-[#0D1117] text-[#C9D1D9]">
      <Navbar />
      <div
        className="fixed inset-0 z-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: 'linear-gradient(#30363D 1px, transparent 1px), linear-gradient(to right, #30363D 1px, transparent 1px)',
          backgroundSize: '50px 50px',
        }}
      />

      <main className="relative z-10 pt-24 pb-20 px-6 max-w-5xl mx-auto space-y-12">
        <div>
          <div className="flex items-center gap-4 text-[#8B949E] font-mono uppercase tracking-widest text-sm mb-4">
            <span className="w-8 h-[1px] bg-[#30363D]"></span>
            Pet Projects
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white">Experiments & Side Projects</h1>
          <div className="text-[#8B949E] mt-4 space-y-3">
            <p>
              I have been exploring tech solutions since my teenage years. I built small games with Unity (2018),
              explored a hotel management app with .NET and C# (2019), and ran countless experiments over the years.
            </p>
            <p>
              Many are not listed here but shaped my range across product, engineering, and creative tech.
              When you hire me, the job is done — I connect well with multiple teams and coordinate effectively as a lead.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4">
          {petProjects.map((project) => (
            <PetProjectCard key={project.id} project={project} />
          ))}
        </div>
      </main>
    </div>
  );
}
