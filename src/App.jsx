import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Terminal, 
  Code2, 
  Layers, 
  Database, 
  Smartphone, 
  Cpu, 
  Globe, 
  Mail, 
  Github, 
  Linkedin, 
  ExternalLink,
  Briefcase,
  Phone,
  MessageCircle
} from 'lucide-react';
import Navbar from './components/Navbar';
import { projects } from './data/projects';

// --- Components ---

// 1. The Live Terminal Component
const TypewriterTerminal = () => {
  const [text, setText] = useState('');
  const fullText = `const profile = new Engineer({
  name: "Precious Ebubechukwu Chikezie",
  role: "Senior Software Engineer / UX",
  location: "Abuja, Nigeria (GMT+1)",
  stack: {
    frontend: ["React", "Next.js", "Flutter"],
    backend: ["Laravel", ".NET", "Node.js"],
    immersive: ["UE5", "Three.js", "Blender", "SketchUp Pro"]
  },
  tagline: "Bridging imagination & reality"
});`;

  useEffect(() => {
    let i = 0;
    const typing = setInterval(() => {
      if (i < fullText.length) {
        setText(fullText.substring(0, i + 1));
        i++;
      } else {
        clearInterval(typing);
      }
    }, 20);
    return () => clearInterval(typing);
  }, []);

  return (
    <div className="w-full max-w-lg rounded-lg overflow-hidden border border-[#30363D] bg-[#0D1117] shadow-2xl shadow-black/50 font-mono text-sm">
      <div className="flex items-center justify-between px-4 py-2 bg-[#161B22] border-b border-[#30363D]">
        <div className="flex gap-2">
          <div className="w-3 h-3 rounded-full bg-[#FF5F56] border border-red-600/50"></div>
          <div className="w-3 h-3 rounded-full bg-[#FFBD2E] border border-yellow-600/50"></div>
          <div className="w-3 h-3 rounded-full bg-[#27C93F] border border-green-600/50"></div>
        </div>
        <div className="text-xs text-[#8B949E]">profile.ts — bash</div>
      </div>
      
      <div className="p-6 min-h-[320px] text-gray-300 leading-relaxed whitespace-pre-wrap">
        <span className="text-[#8B949E]">{'// Initializing master profile...'}</span>
        <br />
        <div dangerouslySetInnerHTML={{ 
          __html: text
            .replace(/const|new/g, '<span class="text-[#FF7B72]">$&</span>')
            .replace(/Engineer/g, '<span class="text-[#D2A8FF]">$&</span>')
            .replace(/"[^"]*"/g, '<span class="text-[#A5D6FF]">$&</span>')
            .replace(/true|false/g, '<span class="text-[#79C0FF]">$&</span>')
            .replace(/\[|\]|\{|\}/g, '<span class="text-[#E6EDF3]">$&</span>')
            .replace(/:/g, '<span class="text-[#E6EDF3]">:</span>')
            .replace(/stack|frontend|backend|immersive/g, '<span class="text-[#79C0FF]">$&</span>')
        }} />
        <span className="inline-block w-2 h-4 bg-[#238636] ml-1 animate-pulse align-middle"></span>
      </div>
    </div>
  );
};

// 3. Bento Grid Item
const BentoItem = ({ title, sub, icon: Icon, color, size = "small" }) => (
  <div className={`group relative overflow-hidden rounded-xl bg-[#161B22] border border-[#30363D] hover:border-[#58A6FF]/50 transition-all duration-300 p-6 flex flex-col justify-between ${size === 'large' ? 'md:col-span-2' : ''}`}>
    <div className="flex justify-between items-start z-10">
      <div className={`p-2 rounded-lg bg-[#0D1117] border border-[#30363D] ${color}`}>
        <Icon size={24} />
      </div>
      <ArrowLink />
    </div>
    
    <div className="z-10 mt-8">
      <h3 className="text-lg font-bold text-white mb-1 group-hover:text-[#58A6FF] transition-colors">{title}</h3>
      <p className="text-sm text-[#8B949E] font-mono">{sub}</p>
    </div>

    <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 blur-[50px] rounded-full group-hover:bg-[#58A6FF]/10 transition-all duration-500"></div>
  </div>
);

const ArrowLink = () => (
  <div className="opacity-0 group-hover:opacity-100 transition-opacity transform translate-x-2 group-hover:translate-x-0">
    <ExternalLink size={16} className="text-[#8B949E] hover:text-white" />
  </div>
);

// 4. Project Card
const ProjectCard = ({ project }) => {
  const { id, title, overview, tech, status, heroImage, screenshots, liveUrl } = project;
  const thumbnailSrc = heroImage || screenshots?.[0]?.src;
  return (
    <Link
      to={`/projects/${id}`}
      className="flex flex-col md:flex-row gap-6 p-6 rounded-xl bg-[#161B22] border border-[#30363D] hover:border-[#238636]/50 transition-all group block"
    >
      <div className="w-full md:w-1/3 h-48 rounded-lg bg-[#0D1117] relative overflow-hidden flex items-center justify-center border border-[#30363D] shrink-0">
        <div className="absolute inset-0 bg-gradient-to-br from-[#161B22] via-[#0D1117] to-[#161B22]" />
        <Code2 className="absolute text-[#8B949E] opacity-40 group-hover:text-[#238636] group-hover:scale-110 transition-all duration-500" size={40} />
        {thumbnailSrc && (
          <img
            src={thumbnailSrc}
            alt={`${title} preview`}
            className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            onError={(e) => { e.target.style.display = 'none'; }}
          />
        )}
        <div className="absolute bottom-2 right-2 px-2 py-1 bg-[#238636]/20 text-[#238636] text-xs rounded border border-[#238636]/30 font-mono">
          {status}
        </div>
      </div>
      
      <div className="flex-1 flex flex-col justify-center">
        <div className="flex items-center gap-3 mb-2">
          <h3 className="text-2xl font-bold text-white group-hover:text-[#238636] transition-colors">{title}</h3>
          {liveUrl && (
            <a href={liveUrl} target="_blank" rel="noreferrer" onClick={(e) => e.stopPropagation()} className="text-[#8B949E] hover:text-white">
              <ExternalLink size={16} />
            </a>
          )}
        </div>
        <p className="text-[#8B949E] mb-6 leading-relaxed">
          {overview}
        </p>
        
        <div className="flex flex-wrap gap-2">
          {tech.map((tag, i) => (
            <span key={i} className="px-3 py-1 text-xs font-mono rounded-full bg-[#0D1117] text-[#58A6FF] border border-[#30363D]">
              {tag}
            </span>
          ))}
        </div>
      </div>
    </Link>
  );
};

// 5. Work Experience Item
const ExperienceItem = ({ role, company, date, desc }) => (
  <div className="relative pl-8 pb-12 border-l border-[#30363D] last:pb-0">
    <div className="absolute left-[-5px] top-0 w-2.5 h-2.5 rounded-full bg-[#238636] border border-[#0D1117]"></div>
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-2">
      <h3 className="text-xl font-bold text-white">{role}</h3>
      <span className="font-mono text-xs text-[#8B949E] bg-[#161B22] px-2 py-1 rounded border border-[#30363D]">{date}</span>
    </div>
    <h4 className="text-[#58A6FF] font-medium mb-4 flex items-center gap-2">
      <Briefcase size={16} /> {company}
    </h4>
    <p className="text-[#8B949E] leading-relaxed text-sm">
      {desc}
    </p>
  </div>
);

// --- Main Application ---

export default function App() {
  return (
    <div className="min-h-screen bg-[#0D1117] text-[#C9D1D9] font-sans selection:bg-[#238636] selection:text-white">
      <div className="fixed inset-0 z-0 opacity-[0.03] pointer-events-none" 
           style={{ backgroundImage: 'linear-gradient(#30363D 1px, transparent 1px), linear-gradient(to right, #30363D 1px, transparent 1px)', backgroundSize: '50px 50px' }}>
      </div>

      <Navbar />

      <main className="relative z-10 pt-24 pb-20 px-6 max-w-7xl mx-auto space-y-32">
        
        <section id="about" className="min-h-[85vh] flex flex-col md:flex-row items-center justify-between gap-12">
          <div className="flex-1 space-y-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#238636]/10 text-[#238636] border border-[#238636]/20 font-mono text-xs">
              <span className="w-2 h-2 rounded-full bg-[#238636] animate-pulse"></span>
              Open to Engineering Leadership
            </div>
            
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white tracking-tight leading-[1.1]">
              Precious Ebubechukwu <br />
              <span className="text-[#8B949E]">Chikezie.</span>
            </h1>
            
            <p className="text-lg md:text-xl text-[#8B949E] max-w-lg leading-relaxed border-l-2 border-[#238636] pl-6">
              "Bridging the gap between <span className="text-white font-medium">imagination</span> and <span className="text-white font-medium">reality</span>."
              <br/>
              <span className="text-sm mt-2 block opacity-75">Senior Software Engineer & Creative Technologist</span>
            </p>

            <div className="flex flex-wrap gap-4 pt-2">
              <a href="#projects" className="px-8 py-3 bg-white text-[#0D1117] font-bold rounded hover:bg-gray-200 transition-colors">
                View Work
              </a>
              <a href="https://github.com/Mass0Shifter" target="_blank" rel="noreferrer" className="px-8 py-3 border border-[#30363D] text-white font-mono rounded hover:bg-[#161B22] transition-colors flex items-center gap-2 group">
                <Github size={18} /> 
                <span className="group-hover:text-[#58A6FF] transition-colors">Mass0Shifter</span>
              </a>
            </div>
          </div>

          <div className="flex-1 w-full flex justify-center md:justify-end">
            <TypewriterTerminal />
          </div>
        </section>

        <section id="stack" className="space-y-12">
            <div className="flex items-center gap-4 text-[#8B949E] font-mono uppercase tracking-widest text-sm">
                <span className="w-8 h-[1px] bg-[#30363D]"></span>
                01. Technical Arsenal
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <BentoItem 
                    title="Backend & Architecture" 
                    sub="Laravel, ASP.NET Core, Node.js" 
                    icon={Database} 
                    color="text-[#58A6FF]"
                    size="large"
                />
                <BentoItem 
                    title="Cross-Platform Mobile" 
                    sub="Flutter (Dart)" 
                    icon={Smartphone} 
                    color="text-[#238636]"
                />
                <BentoItem 
                    title="Immersive Tech" 
                    sub="Unreal Engine 5, WebGL, Blender, SketchUp Pro" 
                    icon={Layers} 
                    color="text-[#D2A8FF]"
                />
                <BentoItem 
                    title="Modern Frontend" 
                    sub="React, Next.js, Tailwind CSS" 
                    icon={Globe} 
                    color="text-[#FF7B72]"
                />
                 <BentoItem 
                    title="System Design" 
                    sub="Scalable ERPs, Multi-tenant SaaS" 
                    icon={Cpu} 
                    color="text-[#FFBD2E]"
                />
            </div>
        </section>

        <section id="experience" className="space-y-12">
            <div className="flex items-center gap-4 text-[#8B949E] font-mono uppercase tracking-widest text-sm">
                <span className="w-8 h-[1px] bg-[#30363D]"></span>
                02. Professional Journey
            </div>
            
            <div className="max-w-3xl">
              <ExperienceItem 
                role="Founder & Principal Software Engineer"
                company="Nâcham Technology and Solutions"
                date="2023 – Present"
                desc="Spearheaded engineering strategy and product roadmaps. Architected high-traffic ERP solutions with 99.9% uptime. Led development of cross-platform mobile apps (Flutter) and reactive web dashboards."
              />
              <ExperienceItem 
                role="Lead Visualization Specialist & Founder"
                company="Visual Graphics Illustration Services (VGIS)"
                date="2019 – Present"
                desc="Pioneered the transition into digital visualization. Led end-to-end delivery of AR/VR Real Estate Suites using Unreal Engine 5. Integrated AI workflows to reduce turnaround time by 30%."
              />
              <ExperienceItem 
                role="Development Manager & Senior Frontend"
                company="Private Practice Ltd"
                date="2019 – 2023"
                desc="Coordinated development efforts across UX and Engineering. Introduced Agile/Scrum methodologies increasing velocity by 30%. Optimized React rendering for data-heavy dashboards."
              />
               <ExperienceItem 
                role="Media Director & Head of Ops"
                company="Gethsemane Kingdom Network Int'l"
                date="2021 – Present"
                desc="Managed end-to-end media pipelines and directed multi-camera productions for major global conferences."
              />
            </div>
        </section>

        <section id="projects" className="space-y-12">
            <div className="flex items-center gap-4 text-[#8B949E] font-mono uppercase tracking-widest text-sm">
                <span className="w-8 h-[1px] bg-[#30363D]"></span>
                03. Selected Works
            </div>

            <div className="grid grid-cols-1 gap-6">
                {projects.map((project) => (
                  <ProjectCard key={project.id} project={project} />
                ))}
            </div>
        </section>

        <section id="contact" className="py-20 border-t border-[#30363D]">
            <div className="max-w-4xl mx-auto text-center space-y-8">
                <h2 className="text-4xl font-bold text-white">Let's build something impossible.</h2>
                <p className="text-[#8B949E] text-lg">
                    Whether it's complex distributed systems or high-fidelity immersive experiences, I am ready to engineer the solution.
                </p>
                <div className="flex flex-wrap justify-center gap-6 pt-4">
                    <a href="mailto:ebubzy1997@gmail.com" className="flex items-center gap-2 text-[#58A6FF] hover:underline hover:text-white transition-colors">
                        <Mail size={20} /> ebubzy1997@gmail.com
                    </a>
                    <a href="tel:+2347072475996" className="flex items-center gap-2 text-[#8B949E] hover:text-white transition-colors">
                        <Phone size={20} /> +234 707 247 5996
                    </a>
                    <a href="https://wa.me/2348112853404" target="_blank" rel="noreferrer" className="flex items-center gap-2 text-[#8B949E] hover:text-white transition-colors">
                        <MessageCircle size={20} /> WhatsApp
                    </a>
                    <a href="https://www.linkedin.com/in/precious-ebubechukwu-chikezie/" target="_blank" rel="noreferrer" className="flex items-center gap-2 text-[#8B949E] hover:text-white transition-colors">
                        <Linkedin size={20} /> LinkedIn
                    </a>
                    <a href="https://github.com/Mass0Shifter" target="_blank" rel="noreferrer" className="flex items-center gap-2 text-[#8B949E] hover:text-white transition-colors">
                        <Github size={20} /> GitHub
                    </a>
                    <a href="https://web.facebook.com/the.revivalist.gkni/" target="_blank" rel="noreferrer" className="flex items-center gap-2 text-[#8B949E] hover:text-white transition-colors">
                        Facebook
                    </a>
                    <a href="https://www.instagram.com/the_revivalist_gkni" target="_blank" rel="noreferrer" className="flex items-center gap-2 text-[#8B949E] hover:text-white transition-colors">
                        Instagram
                    </a>
                    <a href="https://x.com/M_0_S_1997" target="_blank" rel="noreferrer" className="flex items-center gap-2 text-[#8B949E] hover:text-white transition-colors">
                        X
                    </a>
                    <span className="flex items-center gap-2 text-[#8B949E]">
                        Battle.net: Mass0Shifter#2877
                    </span>
                </div>
                <div className="pt-20 text-sm text-[#484F58] font-mono">
                    <p>© 2026 Precious Ebubechukwu Chikezie. All rights reserved.</p>
                    <p className="mt-2 text-xs">Based in Abuja, Nigeria (GMT+1)</p>
                </div>
            </div>
        </section>

      </main>
    </div>
  );
}
