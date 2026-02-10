import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Terminal, Menu, X } from 'lucide-react';

const navLinks = [
  { href: '/#about', label: '_about' },
  { href: '/#stack', label: '_stack' },
  { href: '/#projects', label: '_projects' },
  { href: '/#experience', label: '_experience' },
  { href: '/#contact', label: '_contact', cta: true },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const closeMobile = () => setIsOpen(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[#0D1117]/80 backdrop-blur-md border-b border-[#30363D]">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 font-mono text-white font-bold text-lg hover:opacity-90 transition-opacity">
          <Terminal size={20} className="text-[#238636]" />
          <span>precious<span className="text-[#8B949E]">.dev</span></span>
        </Link>

        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-[#8B949E]">
          {navLinks.map(({ href, label, cta }) => (
            <a
              key={label}
              href={href}
              className={cta
                ? 'px-4 py-2 bg-[#238636] text-white rounded hover:bg-[#2EA043] transition-colors border border-[rgba(255,255,255,0.1)]'
                : 'hover:text-white transition-colors'}
            >
              {cta ? 'Contact Me' : label}
            </a>
          ))}
        </div>

        <button className="md:hidden text-white" onClick={() => setIsOpen(!isOpen)} aria-label="Toggle menu">
          {isOpen ? <X /> : <Menu />}
        </button>
      </div>

      {isOpen && (
        <div className="md:hidden bg-[#161B22] border-b border-[#30363D] px-6 py-4 flex flex-col gap-4 text-sm font-mono text-gray-300">
          {navLinks.map(({ href, label, cta }) => (
            <a key={label} href={href} onClick={closeMobile} className={cta ? 'text-[#238636]' : ''}>
              {cta ? 'contact.sh' : label}
            </a>
          ))}
        </div>
      )}
    </nav>
  );
}
