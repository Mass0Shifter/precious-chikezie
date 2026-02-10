import React, { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, ExternalLink, X } from 'lucide-react';
import { getProjectById } from '../data/projects';
import Navbar from '../components/Navbar';

const statusColors = {
  Live: 'bg-[#238636]/20 text-[#238636] border-[#238636]/30',
  Production: 'bg-[#238636]/20 text-[#238636] border-[#238636]/30',
  Confidential: 'bg-[#FFBD2E]/20 text-[#FFBD2E] border-[#FFBD2E]/30',
  Experimental: 'bg-[#58A6FF]/20 text-[#58A6FF] border-[#58A6FF]/30',
};

function SectionHeader({ number, title }) {
  return (
    <div className="flex items-center gap-4 text-[#8B949E] font-mono uppercase tracking-widest text-sm mb-8">
      <span className="w-8 h-[1px] bg-[#30363D]" />
      {number}. {title}
    </div>
  );
}

function ScreenshotGrid({ screenshots }) {
  const [lightboxIndex, setLightboxIndex] = useState(null);

  if (!screenshots?.length) return null;

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {screenshots.map((shot, i) => (
          <button
            key={i}
            onClick={() => setLightboxIndex(i)}
            className="group relative aspect-video rounded-xl overflow-hidden border border-[#30363D] bg-gradient-to-br from-[#161B22] to-[#0D1117] hover:border-[#238636]/50 transition-all focus:outline-none focus:ring-2 focus:ring-[#238636]"
          >
            <img
              src={shot.src}
              alt={shot.caption}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              onError={(e) => { e.target.style.display = 'none'; }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="absolute bottom-0 left-0 right-0 p-3 text-left text-sm text-white font-medium truncate opacity-0 group-hover:opacity-100 transition-opacity">
              {shot.caption}
            </div>
          </button>
        ))}
      </div>

      {lightboxIndex !== null && (
        <div
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
          onClick={() => setLightboxIndex(null)}
        >
          <button
            onClick={() => setLightboxIndex(null)}
            className="absolute top-6 right-6 p-2 text-white/80 hover:text-white transition-colors"
            aria-label="Close"
          >
            <X size={24} />
          </button>
          <img
            src={screenshots[lightboxIndex].src}
            alt={screenshots[lightboxIndex].caption}
            className="max-w-full max-h-[90vh] object-contain rounded-lg"
            onClick={(e) => e.stopPropagation()}
          />
          <p className="absolute bottom-6 left-1/2 -translate-x-1/2 text-[#8B949E] text-sm">
            {screenshots[lightboxIndex].caption}
          </p>
        </div>
      )}
    </>
  );
}

export default function ProjectPage() {
  const { id } = useParams();
  const project = getProjectById(id);

  if (!project) {
    return (
      <div className="min-h-screen bg-[#0D1117] flex flex-col items-center justify-center px-6">
        <h1 className="text-2xl font-bold text-white mb-4">Project not found</h1>
        <Link to="/#projects" className="text-[#58A6FF] hover:underline flex items-center gap-2">
          <ArrowLeft size={18} /> Back to projects
        </Link>
      </div>
    );
  }

  const statusClass = statusColors[project.status] ?? 'bg-[#8B949E]/20 text-[#8B949E] border-[#30363D]';

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

      <main className="relative z-10">
        {/* Hero */}
        <section className="relative min-h-[50vh] flex flex-col justify-end">
          <div className="absolute inset-0">
            {project.heroImage ? (
              <img
                src={project.heroImage}
                alt=""
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.target.style.display = 'none';
                }}
              />
            ) : null}
            <div
              className="absolute inset-0 bg-gradient-to-t from-[#0D1117] via-[#0D1117]/80 to-[#0D1117]/40"
              style={project.heroImage ? {} : { background: 'linear-gradient(135deg, #161B22 0%, #0D1117 100%)' }}
            />
          </div>

          <div className="relative z-10 max-w-7xl mx-auto w-full px-6 pb-16 pt-32">
            <Link
              to="/#projects"
              className="inline-flex items-center gap-2 text-[#8B949E] hover:text-white transition-colors mb-8 font-mono text-sm"
            >
              <ArrowLeft size={16} /> Back to projects
            </Link>

            <div className="flex flex-wrap items-center gap-3 mb-4">
              <span className={`px-3 py-1 text-xs font-mono rounded border ${statusClass}`}>
                {project.status}
              </span>
              {project.timeline && (
                <span className="text-[#8B949E] font-mono text-sm">{project.timeline}</span>
              )}
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white tracking-tight mb-2">
              {project.title}
            </h1>
            {project.tagline && (
              <p className="text-xl text-[#8B949E]">{project.tagline}</p>
            )}

            <div className="flex flex-wrap gap-2 mt-6">
              {project.tech.map((tag, i) => (
                <span
                  key={i}
                  className="px-3 py-1 text-xs font-mono rounded-full bg-[#161B22] text-[#58A6FF] border border-[#30363D]"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* Content */}
        <div className="max-w-3xl mx-auto px-6 py-16 space-y-20">
          <section>
            <SectionHeader number="01" title="Overview" />
            <p className="text-[#C9D1D9] leading-relaxed">{project.overview}</p>
          </section>

          <section>
            <SectionHeader number="02" title="The Problem" />
            <p className="text-[#C9D1D9] leading-relaxed">{project.problem}</p>
          </section>

          <section>
            <SectionHeader number="03" title="The Solution" />
            <p className="text-[#C9D1D9] leading-relaxed">{project.solution}</p>
          </section>

          <section>
            <SectionHeader number="04" title="My Role" />
            <ul className="space-y-2">
              {project.myRole.map((role, i) => (
                <li key={i} className="flex items-center gap-3 text-[#C9D1D9]">
                  <span className="w-2 h-2 rounded-full bg-[#238636]" />
                  {role}
                </li>
              ))}
            </ul>
          </section>

          {project.screenshots?.length > 0 && (
            <section>
              <SectionHeader number="05" title="Screenshots" />
              <ScreenshotGrid screenshots={project.screenshots} />
            </section>
          )}

          {(project.client || project.hostCompany || project.liveUrl) && (
            <section>
              <SectionHeader
                number={project.screenshots?.length ? '06' : '05'}
                title="Project Details"
              />
              <div className="space-y-3 text-[#C9D1D9]">
                {project.client && (
                  <p>
                    <span className="text-[#8B949E] font-mono text-sm">Client:</span>{' '}
                    {project.client}
                  </p>
                )}
                {project.hostCompany && (
                  <p>
                    <span className="text-[#8B949E] font-mono text-sm">Host / Company:</span>{' '}
                    {project.hostCompany}
                  </p>
                )}
                {project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 text-[#58A6FF] hover:underline"
                  >
                    View live project <ExternalLink size={14} />
                  </a>
                )}
              </div>
            </section>
          )}
        </div>
      </main>
    </div>
  );
}
