


import React, { useState, useEffect, useRef } from 'react';
import logo from '../assets/logo.jpeg';

import {useTheme} from '../ThemeApp/ThemeContext';
const Index = () => {
  //const [darkMode, setDarkMode] = useState(false);
  const {darkMode , toggleDarkMode} = useTheme();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const cursorDotRef = useRef(null);
  const cursorRingRef = useRef(null);
  const canvasRef = useRef(null);
  const particlesRef = useRef([]);
  const mouseRef = useRef({ x: 0, y: 0 });
  const ringPosRef = useRef({ x: 0, y: 0 });
  const navRef = useRef(null);
  const mobileMenuRef = useRef(null);
  const animFrameRef = useRef(null);
  const particleFrameRef = useRef(null);

  useEffect(() => {
    if (darkMode) {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }
  }, [darkMode]);

  useEffect(() => {
    const handleMouseMove = (e) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };
    const animateCursor = () => {
      if (cursorDotRef.current && cursorRingRef.current) {
        cursorDotRef.current.style.left = mouseRef.current.x + 'px';
        cursorDotRef.current.style.top = mouseRef.current.y + 'px';
        ringPosRef.current.x += (mouseRef.current.x - ringPosRef.current.x) * 0.12;
        ringPosRef.current.y += (mouseRef.current.y - ringPosRef.current.y) * 0.12;
        cursorRingRef.current.style.left = ringPosRef.current.x + 'px';
        cursorRingRef.current.style.top = ringPosRef.current.y + 'px';
      }
      animFrameRef.current = requestAnimationFrame(animateCursor);
    };
    document.addEventListener('mousemove', handleMouseMove);
    animateCursor();
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let width, height;

    const createParticle = () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      r: Math.random() * 1.8 + 0.4,
      vx: (Math.random() - 0.5) * 0.25,
      vy: (Math.random() - 0.5) * 0.25,
      alpha: darkMode ? Math.random() * 0.2 + 0.1 : Math.random() * 0.4 + 0.1,
      color: 'rgba(113,179,71,'
    });

    const resize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      particlesRef.current = Array.from({ length: 60 }, createParticle);
    };

    const drawParticles = () => {
      ctx.clearRect(0, 0, width, height);
      particlesRef.current.forEach(p => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = p.color + p.alpha + ')';
        ctx.fill();
      });
      for (let i = 0; i < particlesRef.current.length; i++) {
        for (let j = i + 1; j < particlesRef.current.length; j++) {
          const dx = particlesRef.current[i].x - particlesRef.current[j].x;
          const dy = particlesRef.current[i].y - particlesRef.current[j].y;
          const d = Math.sqrt(dx * dx + dy * dy);
          if (d < 120) {
            ctx.beginPath();
            ctx.strokeStyle = `rgba(113,179,71,${darkMode ? 0.02 : 0.04 * (1 - d / 120)})`;
            ctx.lineWidth = 0.5;
            ctx.moveTo(particlesRef.current[i].x, particlesRef.current[i].y);
            ctx.lineTo(particlesRef.current[j].x, particlesRef.current[j].y);
            ctx.stroke();
          }
        }
      }
      particleFrameRef.current = requestAnimationFrame(drawParticles);
    };

    resize();
    window.addEventListener('resize', resize);
    drawParticles();
    return () => {
      window.removeEventListener('resize', resize);
      if (particleFrameRef.current) cancelAnimationFrame(particleFrameRef.current);
    };
  }, [darkMode]);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const revealElements = document.querySelectorAll('.reveal');
    const observer = new IntersectionObserver(
      (entries) => entries.forEach(entry => {
        if (entry.isIntersecting) entry.target.classList.add('visible');
      }),
      { threshold: 0.12 }
    );
    revealElements.forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const animateCount = (el, target) => {
      let start = 0;
      const step = target / 60;
      const timer = setInterval(() => {
        start += step;
        if (start >= target) { start = target; clearInterval(timer); }
        const display = target >= 1000
          ? (start / 1000).toFixed(target >= 10000 ? 0 : 1) + 'k'
          : Math.round(start).toString();
        el.textContent = display;
      }, 20);
    };
    const statsObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const el = entry.target.querySelector('.stat-num');
            if (!el) return;
            const txt = el.textContent;
            if (txt.includes('k')) animateCount(el, parseFloat(txt) * 1000);
            else if (txt.includes('T')) animateCount(el, parseFloat(txt) * 1000);
            else if (txt.includes('%')) {
              let s = 0;
              const t = parseInt(txt);
              const timer = setInterval(() => {
                s += t / 60;
                if (s >= t) { s = t; clearInterval(timer); }
                el.textContent = Math.round(s) + '%';
              }, 20);
            } else animateCount(el, parseInt(txt.replace(',', '')));
            statsObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.5 }
    );
    document.querySelectorAll('.stat-item').forEach(el => statsObserver.observe(el));
    return () => statsObserver.disconnect();
  }, []);

  const handleSmoothScroll = (e, id) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    setMobileMenuOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        mobileMenuRef.current &&
        !mobileMenuRef.current.contains(e.target) &&
        !e.target.closest('.nav-hamburger')
      ) {
        setMobileMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const styles = `
    @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800;900&family=DM+Serif+Display:ital@0;1&display=swap');

    *, *::before, *::after {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }

    :root {
      --background: #f8faf8;
      --foreground: #1a1e1a;
      --card: #ffffff;
      --card-foreground: #1a1e1a;
      --primary: #71B347;
      --primary-rgb: 113, 179, 71;
      --primary-foreground: #ffffff;
      --secondary: #eef6e6;
      --secondary-foreground: #2d5a12;
      --muted: #f0f3f0;
      --muted-foreground: #5a655a;
      --accent: #e0a020;
      --accent-foreground: #3d2d06;
      --destructive: #dc2626;
      --border: #d9e0d9;
      --ring: #71B347;
      --radius: 0.75rem;
      --shadow: 0 4px 20px -4px rgba(0,0,0,0.05);
      --shadow-lg: 0 10px 40px -8px rgba(0,0,0,0.08);
      --shadow-colored: 0 4px 20px -4px rgba(113,179,71,0.15);
      --nav-bg: rgba(255,255,255,0.95);
      --nav-border: rgba(0,0,0,0.05);
      --nav-height: 72px;
    }

    .dark-mode {
      --background: #0f1a0a;
      --foreground: #e8efe8;
      --card: #162010;
      --card-foreground: #e8efe8;
      --primary: #71B347;
      --primary-foreground: #0f1a0a;
      --secondary: #1a2a14;
      --secondary-foreground: #9fd38a;
      --muted: #1e2e18;
      --muted-foreground: #9aa89e;
      --accent: #c68b1c;
      --accent-foreground: #fef7e6;
      --border: #2a3d22;
      --ring: #71B347;
      --shadow: 0 4px 20px -4px rgba(0,0,0,0.3);
      --shadow-lg: 0 10px 40px -8px rgba(0,0,0,0.5);
      --shadow-colored: 0 4px 20px -4px rgba(113,179,71,0.2);
      --nav-bg: rgba(15,26,10,0.95);
      --nav-border: rgba(255,255,255,0.05);
    }

    html {
      scroll-behavior: smooth;
    }

    body {
      font-family: 'Outfit', sans-serif;
      background: var(--background);
      color: var(--foreground);
      line-height: 1.6;
      overflow-x: hidden;
      transition: background-color 0.3s ease, color 0.3s ease;
    }

    /* ── CURSOR ─────────────────────────────── */
    .cursor {
      position: fixed;
      top: 0; left: 0;
      pointer-events: none;
      z-index: 9999;
    }
    .cursor-dot {
      width: 8px; height: 8px;
      background: var(--primary);
      border-radius: 50%;
      position: absolute;
      transform: translate(-50%,-50%);
    }
    .cursor-ring {
      width: 36px; height: 36px;
      border: 1.5px solid rgba(113,179,71,0.35);
      border-radius: 50%;
      position: absolute;
      transform: translate(-50%,-50%);
      transition: all 0.18s cubic-bezier(.4,0,.2,1);
    }
    @media (max-width: 768px) {
      .cursor { display: none; }
      body { cursor: auto; }
    }

    /* ── CANVAS ──────────────────────────────── */
    #particles {
      position: fixed;
      inset: 0;
      pointer-events: none;
      z-index: 0;
      opacity: 0.5;
    }

    /* ── NAV ─────────────────────────────────── */
    nav {
      position: fixed;
      top: 0; left: 0; right: 0;
      z-index: 200;
      height: var(--nav-height);
      padding: 0 4rem;
      display: flex;
      align-items: center;
      justify-content: space-between;
      background: var(--nav-bg);
      backdrop-filter: blur(12px);
      -webkit-backdrop-filter: blur(12px);
      border-bottom: 1px solid var(--nav-border);
      transition: box-shadow 0.3s ease, background 0.3s ease;
    }
    nav.scrolled {
      box-shadow: 0 2px 20px rgba(0,0,0,0.06);
    }
    @media (max-width: 768px) {
      nav { padding: 0 1.25rem; }
    }

    .nav-logo {
      display: flex;
      align-items: center;
      gap: 0.6rem;
      text-decoration: none;
      flex-shrink: 0;
    }
    .nav-logo img {
      height: 40px;
      width: auto;
      border-radius: 10px;
      image-rendering: -webkit-optimize-contrast;
      image-rendering: crisp-edges;
      display: block;
    }
    .nav-logo-name {
      font-family: 'Outfit', sans-serif;
      font-weight: 800;
      font-size: 1.2rem;
      color: var(--foreground);
    }

    .nav-links {
      display: flex;
      gap: 2rem;
      list-style: none;
    }
    .nav-links a {
      color: var(--muted-foreground);
      font-size: 0.92rem;
      font-weight: 500;
      text-decoration: none;
      letter-spacing: 0.02em;
      transition: color 0.2s;
      position: relative;
      white-space: nowrap;
    }
    .nav-links a::after {
      content: '';
      position: absolute;
      bottom: -4px; left: 0;
      width: 0; height: 2px;
      background: var(--primary);
      transition: width 0.3s ease;
    }
    .nav-links a:hover { color: var(--foreground); }
    .nav-links a:hover::after { width: 100%; }

    .nav-cta {
      display: flex;
      align-items: center;
      gap: 0.75rem;
      flex-shrink: 0;
    }

    .btn-ghost {
      color: var(--muted-foreground);
      font-size: 0.92rem;
      font-weight: 500;
      background: none;
      border: none;
      cursor: pointer;
      padding: 0.5rem 0.9rem;
      border-radius: 100px;
      transition: color 0.2s;
      font-family: 'Outfit', sans-serif;
      white-space: nowrap;
    }
    .btn-ghost:hover { color: var(--foreground); }

    .btn-pill {
      background: var(--primary);
      color: white;
      font-family: 'Outfit', sans-serif;
      font-size: 0.92rem;
      font-weight: 600;
      border: none;
      cursor: pointer;
      padding: 0.6rem 1.4rem;
      border-radius: 100px;
      transition: all 0.25s cubic-bezier(.34,1.56,.64,1);
      box-shadow: 0 4px 15px rgba(113,179,71,0.25);
      white-space: nowrap;
    }
    .btn-pill:hover {
      transform: scale(1.06);
      box-shadow: 0 8px 25px rgba(113,179,71,0.35);
    }

    .theme-toggle {
      background: none;
      border: none;
      font-size: 1.1rem;
      cursor: pointer;
      padding: 0.4rem;
      border-radius: 50%;
      transition: background 0.2s;
      color: var(--foreground);
      display: flex;
      align-items: center;
      justify-content: center;
      width: 36px; height: 36px;
    }
    .theme-toggle:hover { background: rgba(113,179,71,0.1); }

    .nav-hamburger {
      display: none;
      flex-direction: column;
      gap: 5px;
      background: none;
      border: none;
      padding: 6px;
      cursor: pointer;
      z-index: 201;
      flex-shrink: 0;
    }
    .nav-hamburger span {
      width: 22px; height: 2px;
      background: var(--foreground);
      border-radius: 2px;
      transition: all 0.3s;
      display: block;
    }
    .nav-hamburger.active span:nth-child(1) { transform: rotate(45deg) translate(5px, 5px); }
    .nav-hamburger.active span:nth-child(2) { opacity: 0; }
    .nav-hamburger.active span:nth-child(3) { transform: rotate(-45deg) translate(5px, -5px); }

    @media (max-width: 900px) {
      .nav-links, .nav-cta { display: none; }
      .nav-hamburger { display: flex; }
    }

    /* ── MOBILE MENU ─────────────────────────── */
    .mobile-menu {
      position: fixed;
      top: var(--nav-height);
      left: 0; right: 0;
      background: var(--card);
      border-bottom: 1px solid var(--border);
      padding: 1.25rem 1.5rem 1.75rem;
      z-index: 199;
      transform: translateY(-110%);
      opacity: 0;
      transition: transform 0.3s cubic-bezier(.4,0,.2,1), opacity 0.3s ease;
      box-shadow: 0 8px 30px rgba(0,0,0,0.08);
      pointer-events: none;
    }
    .mobile-menu.open {
      transform: translateY(0);
      opacity: 1;
      pointer-events: all;
    }
    .mobile-menu-links {
      list-style: none;
      display: flex;
      flex-direction: column;
      gap: 0.25rem;
    }
    .mobile-menu-links a {
      display: block;
      padding: 0.7rem 0.9rem;
      color: var(--foreground);
      text-decoration: none;
      font-weight: 500;
      font-size: 0.95rem;
      border-radius: 10px;
      transition: all 0.2s;
    }
    .mobile-menu-links a:hover {
      background: var(--primary);
      color: white;
    }
    .mobile-menu-cta {
      display: flex;
      flex-direction: column;
      gap: 0.6rem;
      margin-top: 1.25rem;
      padding-top: 1.25rem;
      border-top: 1px solid var(--border);
    }
    .mobile-menu-cta .btn-ghost,
    .mobile-menu-cta .btn-pill {
      width: 100%;
      text-align: center;
      padding: 0.7rem;
      justify-content: center;
    }

    /* ── PAGE LAYOUT ─────────────────────────── */
    .page-content {
      position: relative;
      z-index: 2;
    }

    /* ── HERO ────────────────────────────────── */
    .hero {
      position: relative;
      z-index: 2;
      min-height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: calc(var(--nav-height) + 4rem) 1.5rem 6rem;
      text-align: center;
      overflow: hidden;
    }
    .hero-glow {
      position: absolute;
      inset: 0;
      pointer-events: none;
      background: radial-gradient(ellipse 80% 60% at 50% 60%, rgba(113,179,71,0.06) 0%, transparent 70%);
      z-index: 0;
    }

    /* Orbit rings — hidden on mobile to prevent overflow issues */
    .orbit-ring {
      position: absolute;
      border-radius: 50%;
      border: 1px solid;
      pointer-events: none;
      z-index: 0;
    }
    .orbit-1 {
      width: 700px; height: 700px;
      top: 50%; left: 50%;
      transform: translate(-50%,-50%);
      border-color: rgba(113,179,71,0.1);
      animation: orbitSpin 40s linear infinite;
    }
    .orbit-2 {
      width: 500px; height: 500px;
      top: 50%; left: 50%;
      border-color: rgba(113,179,71,0.08);
      animation: orbitSpinRev 25s linear infinite;
    }
    .orbit-3 {
      width: 900px; height: 900px;
      top: 50%; left: 50%;
      transform: translate(-50%,-50%);
      border-color: rgba(113,179,71,0.05);
      animation: orbitSpin 60s linear infinite;
    }
    @keyframes orbitSpin {
      from { transform: translate(-50%,-50%) rotate(0deg); }
      to   { transform: translate(-50%,-50%) rotate(360deg); }
    }
    @keyframes orbitSpinRev {
      from { transform: translate(-50%,-50%) rotate(30deg); }
      to   { transform: translate(-50%,-50%) rotate(-330deg); }
    }
    @media (max-width: 768px) {
      .orbit-ring { display: none; }
    }

    .hero-inner {
      position: relative;
      z-index: 3;
      max-width: 860px;
      width: 100%;
    }
    .hero-title {
      font-family: 'DM Serif Display', serif;
      font-size: clamp(3rem, 8vw, 7.5rem);
      line-height: 1.02;
      margin-bottom: 1.5rem;
      color: var(--foreground);
    }
    .hero-title em {
      font-style: italic;
      color: var(--primary);
    }
    .hero-sub {
      font-size: clamp(1rem, 2vw, 1.2rem);
      font-weight: 300;
      line-height: 1.7;
      color: var(--muted-foreground);
      max-width: 560px;
      margin: 0 auto 2.5rem;
    }
    .hero-actions {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 1rem;
      flex-wrap: wrap;
    }
    @media (max-width: 480px) {
      .hero-actions {
        flex-direction: column;
        align-items: stretch;
      }
    }

    /* Floating stat cards — desktop only */
    .hero-stats {
      position: absolute;
      inset: 0;
      pointer-events: none;
      z-index: 1;
    }
    @media (max-width: 1100px) {
      .hero-stats { display: none; }
    }
    .stat-float {
      position: absolute;
      background: var(--card);
      border: 1px solid var(--border);
      border-radius: 16px;
      padding: 1rem 1.3rem;
      animation: floatCard 6s ease-in-out infinite;
      box-shadow: var(--shadow);
      white-space: nowrap;
    }
    .stat-float-1 { left: 3%; top: 22%; animation-delay: 0s; }
    .stat-float-2 { right: 3%; top: 32%; animation-delay: 1.5s; }
    .stat-float-3 { left: 5%; bottom: 22%; animation-delay: 3s; }
    @keyframes floatCard {
      0%,100% { transform: translateY(0); }
      50%      { transform: translateY(-14px); }
    }
    .stat-float-icon { font-size: 1rem; margin-bottom: 0.4rem; }
    .stat-float-num  { font-size: 1.7rem; font-weight: 800; color: var(--primary); line-height: 1; margin-bottom: 0.2rem; }
    .stat-float-label{ font-size: 0.75rem; color: var(--muted-foreground); font-weight: 500; }

    .btn-primary-hero {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: 0.65rem;
      background: var(--primary);
      color: white;
      font-family: 'Outfit', sans-serif;
      font-weight: 600;
      font-size: 1rem;
      border: none;
      cursor: pointer;
      padding: 0.95rem 2rem;
      border-radius: 100px;
      transition: all 0.3s cubic-bezier(.34,1.56,.64,1);
      box-shadow: 0 4px 20px rgba(113,179,71,0.28);
    }
    .btn-primary-hero:hover {
      transform: translateY(-3px) scale(1.04);
      box-shadow: 0 8px 30px rgba(113,179,71,0.38);
    }
    .btn-outline-hero {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: 0.65rem;
      background: transparent;
      color: var(--foreground);
      font-family: 'Outfit', sans-serif;
      font-weight: 500;
      font-size: 1rem;
      border: 1px solid var(--border);
      cursor: pointer;
      padding: 0.95rem 2rem;
      border-radius: 100px;
      transition: all 0.3s ease;
    }
    .btn-outline-hero:hover {
      border-color: var(--primary);
      color: var(--primary);
      background: rgba(113,179,71,0.05);
    }
    @media (max-width: 480px) {
      .btn-primary-hero, .btn-outline-hero { width: 100%; }
    }

    .scroll-hint {
      position: absolute;
      bottom: 2rem; left: 50%;
      transform: translateX(-50%);
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 0.5rem;
      color: var(--muted-foreground);
      font-size: 0.72rem;
      letter-spacing: 0.1em;
      text-transform: uppercase;
      z-index: 3;
    }
    .scroll-line {
      width: 1px; height: 36px;
      background: linear-gradient(to bottom, var(--primary), transparent);
      animation: scrollBob 2s ease-in-out infinite;
    }
    @keyframes scrollBob {
      0%,100% { transform: scaleY(1); opacity: 1; }
      50%      { transform: scaleY(0.6); opacity: 0.5; }
    }

    /* ── SECTIONS ────────────────────────────── */
    section { position: relative; z-index: 2; }

    .section-inner {
      max-width: 1200px;
      margin: 0 auto;
      padding: 0 4rem;
    }
    @media (max-width: 768px) {
      .section-inner { padding: 0 1.25rem; }
    }

    .section-label {
      font-size: 0.82rem;
      font-weight: 700;
      letter-spacing: 0.14em;
      text-transform: uppercase;
      color: var(--primary);
      margin-bottom: 0.9rem;
      display: block;
    }
    .section-heading {
      font-family: 'DM Serif Display', serif;
      font-size: clamp(2.2rem, 4.5vw, 3.8rem);
      line-height: 1.1;
      margin-bottom: 1.1rem;
      color: var(--foreground);
    }
    .section-sub {
      font-size: 1.05rem;
      color: var(--muted-foreground);
      max-width: 500px;
      line-height: 1.7;
    }

    /* ── HOW IT WORKS ────────────────────────── */
    .how {
      padding: 8rem 0;
      background: linear-gradient(to bottom, transparent, var(--secondary), transparent);
    }
    .steps-grid {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 1.25rem;
      margin-top: 4rem;
    }
    @media (max-width: 1100px) { .steps-grid { grid-template-columns: repeat(2, 1fr); } }
    @media (max-width: 600px)  { .steps-grid { grid-template-columns: 1fr; } }

    .step-card {
      background: var(--card);
      border: 1px solid var(--border);
      border-radius: 20px;
      padding: 2rem 1.5rem;
      position: relative;
      overflow: hidden;
      transition: all 0.35s ease;
      box-shadow: var(--shadow);
    }
    .step-card:hover {
      border-color: var(--primary);
      transform: translateY(-5px);
      box-shadow: var(--shadow-lg);
    }
    .step-num {
      font-size: 3rem;
      font-weight: 900;
      color: rgba(113,179,71,0.12);
      line-height: 1;
      margin-bottom: 1.25rem;
    }
    .step-icon-wrap {
      width: 48px; height: 48px;
      background: rgba(113,179,71,0.1);
      border-radius: 13px;
      display: flex; align-items: center; justify-content: center;
      margin-bottom: 1.1rem;
      font-size: 1.3rem;
      border: 1px solid rgba(113,179,71,0.2);
    }
    .step-title { font-size: 1.1rem; font-weight: 700; margin-bottom: 0.6rem; color: var(--foreground); }
    .step-desc  { font-size: 0.9rem; color: var(--muted-foreground); line-height: 1.65; }

    /* ── WASTE ───────────────────────────────── */
    .waste { padding: 7rem 0; }
    .waste-flex {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 5rem;
      align-items: center;
      margin-top: 3rem;
    }
    @media (max-width: 1000px) {
      .waste-flex { grid-template-columns: 1fr; gap: 3rem; }
    }
    .waste-tiles {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 0.9rem;
    }
    @media (max-width: 500px) { .waste-tiles { grid-template-columns: repeat(2, 1fr); } }

    .waste-tile {
      background: var(--card);
      border: 1px solid var(--border);
      border-radius: 16px;
      padding: 1.3rem 1rem;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 0.6rem;
      text-align: center;
      transition: all 0.3s ease;
      box-shadow: var(--shadow);
    }
    .waste-tile:hover {
      border-color: var(--primary);
      transform: scale(1.04);
      box-shadow: var(--shadow-lg);
    }
    .waste-emoji { font-size: 1.8rem; }
    .waste-name  { font-size: 0.88rem; font-weight: 600; color: var(--foreground); }
    .waste-sub   { font-size: 0.75rem; color: var(--muted-foreground); }

    .feature-list { list-style: none; display: flex; flex-direction: column; gap: 0.9rem; }
    .feature-item { display: flex; align-items: flex-start; gap: 0.9rem; }
    .feature-check {
      width: 22px; height: 22px; min-width: 22px;
      background: rgba(113,179,71,0.1);
      border: 1px solid rgba(113,179,71,0.2);
      border-radius: 7px;
      display: flex; align-items: center; justify-content: center;
      font-size: 0.75rem;
      color: var(--primary);
      margin-top: 0.15rem;
    }
    .feature-item-text { font-size: 0.92rem; color: var(--muted-foreground); line-height: 1.6; }
    .feature-item-text strong { color: var(--foreground); }

    /* ── STATS BAND ──────────────────────────── */
    .stats-band {
      padding: 5rem 0;
      border-top: 1px solid var(--border);
      border-bottom: 1px solid var(--border);
      background: var(--card);
    }
    .stats-band-inner {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 1.5rem;
      text-align: center;
    }
    @media (max-width: 900px) { .stats-band-inner { grid-template-columns: repeat(2, 1fr); } }
    @media (max-width: 480px) { .stats-band-inner { grid-template-columns: 1fr 1fr; } }

    .stat-item { padding: 0.75rem; }
    .stat-num {
      font-size: clamp(2rem, 4vw, 3rem);
      font-weight: 900;
      color: var(--primary);
      line-height: 1;
      margin-bottom: 0.4rem;
    }
    .stat-desc { font-size: 0.9rem; color: var(--muted-foreground); }

    /* ── REWARDS ─────────────────────────────── */
    .rewards {
      padding: 7rem 0;
      background: linear-gradient(to bottom, transparent, var(--secondary), transparent);
    }
    .rewards-inner {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 5rem;
      align-items: center;
    }
    @media (max-width: 1000px) {
      .rewards-inner { grid-template-columns: 1fr; gap: 3rem; }
    }
    .rewards-visual {
      position: relative;
      height: 400px;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    @media (max-width: 1000px) {
      .rewards-visual { height: 340px; }
    }

    .points-card {
      background: var(--card);
      border: 1px solid var(--border);
      border-radius: 22px;
      box-shadow: var(--shadow-lg);
    }
    .points-main {
      width: min(280px, 90%);
      padding: 1.75rem;
      position: relative;
      z-index: 2;
    }
    .points-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 1.25rem;
    }
    .points-label {
      font-size: 0.78rem;
      font-weight: 600;
      color: var(--muted-foreground);
      text-transform: uppercase;
      letter-spacing: 0.08em;
    }
    .points-badge {
      background: rgba(113,179,71,0.12);
      color: var(--primary);
      font-size: 0.72rem;
      font-weight: 700;
      padding: 0.2rem 0.6rem;
      border-radius: 100px;
      border: 1px solid rgba(113,179,71,0.2);
    }
    .points-big {
      font-size: 3rem;
      font-weight: 900;
      color: var(--primary);
      line-height: 1;
      margin-bottom: 0.2rem;
    }
    .points-unit { font-size: 0.88rem; color: var(--muted-foreground); margin-bottom: 1.25rem; }
    .points-bar-wrap { background: var(--muted); border-radius: 100px; height: 6px; overflow: hidden; }
    .points-bar {
      width: 72%; height: 100%;
      background: var(--primary);
      border-radius: 100px;
    }
    .points-footer {
      display: flex;
      justify-content: space-between;
      margin-top: 0.7rem;
      font-size: 0.8rem;
      color: var(--muted-foreground);
    }

    .reward-chip {
      position: absolute;
      background: var(--card);
      border: 1px solid var(--border);
      border-radius: 13px;
      padding: 0.8rem 1rem;
      display: flex;
      align-items: center;
      gap: 0.7rem;
      animation: floatCard 5s ease-in-out infinite;
      box-shadow: var(--shadow);
      z-index: 3;
      white-space: nowrap;
    }
    .reward-chip-1 { top: 5%; right: 0; animation-delay: 0s; }
    .reward-chip-2 { bottom: 8%; left: 0; animation-delay: 2s; }
    .reward-chip-icon { font-size: 1.3rem; }
    .reward-chip-txt strong { display: block; font-size: 0.88rem; color: var(--foreground); font-weight: 600; }
    .reward-chip-txt span  { font-size: 0.75rem; color: var(--muted-foreground); }

    /* ── TESTIMONIALS ────────────────────────── */
    .testimonials { padding: 7rem 0; }
    .testi-grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 1.25rem;
      margin-top: 4rem;
    }
    @media (max-width: 1000px) { .testi-grid { grid-template-columns: repeat(2, 1fr); } }
    @media (max-width: 640px)  { .testi-grid { grid-template-columns: 1fr; } }

    .testi-card {
      background: var(--card);
      border: 1px solid var(--border);
      border-radius: 18px;
      padding: 1.75rem;
      transition: all 0.3s ease;
      box-shadow: var(--shadow);
    }
    .testi-card:hover {
      border-color: var(--primary);
      transform: translateY(-4px);
      box-shadow: var(--shadow-lg);
    }
    .testi-stars { color: var(--accent); margin-bottom: 1rem; font-size: 0.9rem; letter-spacing: 0.1em; }
    .testi-text  { font-size: 0.9rem; color: var(--muted-foreground); line-height: 1.7; margin-bottom: 1.25rem; font-style: italic; }
    .testi-author { display: flex; align-items: center; gap: 0.75rem; }
    .testi-avatar {
      width: 38px; height: 38px; min-width: 38px;
      border-radius: 50%;
      display: flex; align-items: center; justify-content: center;
      font-size: 0.95rem; font-weight: 700; color: white;
    }
    .av1 { background: var(--primary); }
    .av2 { background: #4299e1; }
    .av3 { background: var(--accent); }
    .testi-name { font-size: 0.9rem; font-weight: 600; color: var(--foreground); }
    .testi-role { font-size: 0.76rem; color: var(--muted-foreground); }

    /* ── CTA SECTION ─────────────────────────── */
    .cta-section {
      padding: 9rem 0;
      text-align: center;
      position: relative;
      overflow: hidden;
      background: var(--card);
    }
    .cta-glow {
      position: absolute;
      top: 50%; left: 50%;
      transform: translate(-50%,-50%);
      width: 700px; height: 350px;
      background: radial-gradient(ellipse, rgba(113,179,71,0.06) 0%, transparent 70%);
      pointer-events: none;
    }
    .cta-heading {
      font-family: 'DM Serif Display', serif;
      font-size: clamp(2.8rem, 6vw, 5rem);
      line-height: 1.06;
      margin-bottom: 1.25rem;
      color: var(--foreground);
      position: relative;
    }
    .cta-heading em { font-style: italic; color: var(--primary); }
    .cta-sub {
      font-size: 1.1rem;
      color: var(--muted-foreground);
      max-width: 480px;
      margin: 0 auto 2.5rem;
      line-height: 1.7;
      position: relative;
    }
    .cta-buttons {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 1rem;
      flex-wrap: wrap;
      position: relative;
    }
    @media (max-width: 480px) {
      .cta-buttons { flex-direction: column; align-items: stretch; padding: 0 1.25rem; }
    }

    .btn-big {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: 0.75rem;
      background: var(--primary);
      color: white;
      font-family: 'Outfit', sans-serif;
      font-weight: 700;
      font-size: 1.05rem;
      border: none;
      cursor: pointer;
      padding: 1.05rem 2.25rem;
      border-radius: 100px;
      transition: all 0.3s cubic-bezier(.34,1.56,.64,1);
      box-shadow: 0 4px 25px rgba(113,179,71,0.32);
    }
    .btn-big:hover {
      transform: translateY(-3px) scale(1.05);
      box-shadow: 0 8px 35px rgba(113,179,71,0.42);
    }
    @media (max-width: 480px) {
      .btn-big { width: 100%; }
    }

    /* ── FOOTER ──────────────────────────────── */
    footer {
      border-top: 1px solid var(--border);
      padding: 3.5rem 4rem 2.5rem;
      position: relative;
      z-index: 2;
      background: var(--card);
    }
    @media (max-width: 768px) { footer { padding: 3rem 1.25rem 2rem; } }

    .footer-inner {
      max-width: 1200px;
      margin: 0 auto;
      display: flex;
      flex-direction: column;
      gap: 2.5rem;
    }
    .footer-top {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      flex-wrap: wrap;
      gap: 2rem;
    }
    @media (max-width: 768px) { .footer-top { flex-direction: column; } }

    .footer-tagline {
      font-size: 0.9rem;
      color: var(--muted-foreground);
      max-width: 220px;
      line-height: 1.6;
      margin-top: 0.6rem;
    }
    .footer-cols { display: flex; gap: 3.5rem; flex-wrap: wrap; }
    @media (max-width: 600px) { .footer-cols { gap: 1.75rem; } }

    .footer-col h4 {
      font-size: 0.82rem;
      font-weight: 700;
      color: var(--foreground);
      letter-spacing: 0.1em;
      text-transform: uppercase;
      margin-bottom: 1.1rem;
    }

    .agir-glow {
  display: inline-block;
  background: linear-gradient(135deg, #71B347, #3d7d1d); /* Dégradé plus contrasté */
  background-clip: text;
  -webkit-background-clip: text;
  color: transparent;
  font-size: 1.1em;
  font-weight: bold;
  
  /* On remplace text-shadow par drop-shadow */
  filter: drop-shadow(0 0 5px rgba(113, 179, 71, 0.4));
  animation: pulseSoft 2s ease-in-out infinite;
}

@keyframes pulseSoft {
  0%, 100% {
    filter: drop-shadow(0 0 3px rgba(113, 179, 71, 0.3));
  }
  50% {
    filter: drop-shadow(0 0 10px rgba(113, 179, 71, 0.7));
  }
}

    .footer-col ul { list-style: none; display: flex; flex-direction: column; gap: 0.65rem; }
    .footer-col a { font-size: 0.9rem; color: var(--muted-foreground); text-decoration: none; transition: color 0.2s; }
    .footer-col a:hover { color: var(--primary); }

    .footer-bottom {
      border-top: 1px solid var(--border);
      padding-top: 1.75rem;
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-size: 0.87rem;
      color: var(--muted-foreground);
      flex-wrap: wrap;
      gap: 0.75rem;
    }
    @media (max-width: 600px) { .footer-bottom { flex-direction: column; text-align: center; } }
    .footer-bottom-lime { color: var(--primary); font-weight: 600; }

    /* ── LOGO IMAGE ──────────────────────────── */
    .logo-img-nav {
      height: 38px;
      width: auto;
      border-radius: 9px;
      display: block;
      image-rendering: -webkit-optimize-contrast;
      image-rendering: crisp-edges;
    }

    /* ── SCROLL REVEAL ───────────────────────── */
    .reveal {
      opacity: 0;
      transform: translateY(32px);
      transition: opacity 0.65s ease, transform 0.65s ease;
    }
    .reveal.visible { opacity: 1; transform: translateY(0); }
    .reveal-delay-1 { transition-delay: 0.1s; }
    .reveal-delay-2 { transition-delay: 0.2s; }
    .reveal-delay-3 { transition-delay: 0.3s; }
    .reveal-delay-4 { transition-delay: 0.4s; }

    /* ── DARK MODE OVERRIDES ─────────────────── */
    .dark-mode .step-card,
    .dark-mode .waste-tile,
    .dark-mode .testi-card,
    .dark-mode .points-card,
    .dark-mode .reward-chip,
    .dark-mode .stat-float {
      background: var(--card);
      border-color: var(--border);
    }
    .dark-mode .stats-band { background: var(--card); border-color: var(--border); }
    .dark-mode .cta-section { background: var(--card); }
    .dark-mode footer { background: var(--card); border-color: var(--border); }
  `;

  return (
    <>
      <style>{styles}</style>

      {/* Custom cursor */}
      <div className="cursor">
        <div className="cursor-dot" ref={cursorDotRef}></div>
        <div className="cursor-ring" ref={cursorRingRef}></div>
      </div>

    
      <canvas id="particles" ref={canvasRef}></canvas>

      {/* ── NAVIGATION ── */}
      <nav ref={navRef} className={scrolled ? 'scrolled' : ''}>
        <a href="/" className="nav-logo">
          <img src={logo} alt="EcoCollect" className="logo-img-nav" />
          
        </a>

        <ul className="nav-links">
          <li><a href="#how"     onClick={(e) => handleSmoothScroll(e, 'how')}>Fonctionnement</a></li>
          <li><a href="#waste"   onClick={(e) => handleSmoothScroll(e, 'waste')}>Déchets</a></li>
          <li><a href="#rewards" onClick={(e) => handleSmoothScroll(e, 'rewards')}>Récompenses</a></li>
          <li><a href="#about"   onClick={(e) => handleSmoothScroll(e, 'about')}>À propos</a></li>
        </ul>

        <div className="nav-cta">
          <button className="btn-ghost" onClick={() => window.location.href = '/login'}>Se connecter</button>
          <button className="btn-pill"  onClick={() => window.location.href = '/register'}>Commencer →</button>
          <button className="theme-toggle" onClick={toggleDarkMode}>
            {darkMode ?  '🌙' : '☀️' }
          </button>
        </div>

        <button
          className={`nav-hamburger ${mobileMenuOpen ? 'active' : ''}`}
          aria-label="Menu"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          <span></span><span></span><span></span>
        </button>
      </nav>

      {/* ── MOBILE MENU ── */}
      <div className={`mobile-menu ${mobileMenuOpen ? 'open' : ''}`} ref={mobileMenuRef}>
        <ul className="mobile-menu-links">
          <li><a href="#how"     onClick={(e) => handleSmoothScroll(e, 'how')}>Fonctionnement</a></li>
          <li><a href="#waste"   onClick={(e) => handleSmoothScroll(e, 'waste')}>Déchets</a></li>
          <li><a href="#rewards" onClick={(e) => handleSmoothScroll(e, 'rewards')}>Récompenses</a></li>
          <li><a href="#about"   onClick={(e) => handleSmoothScroll(e, 'about')}>À propos</a></li>
        </ul>
        <div className="mobile-menu-cta">
          <button className="btn-ghost" onClick={() => window.location.href = '/login'}>Se connecter</button>
          <button className="btn-pill"  onClick={() => window.location.href = '/register'}>Commencer →</button>
          <button className="theme-toggle" style={{width:'100%', borderRadius:'10px', gap:'0.5rem', display:'flex', alignItems:'center', justifyContent:'center'}}
            onClick={() => { setDarkMode(!darkMode); setMobileMenuOpen(false); }}>
            {darkMode ? '☀️ Mode clair' : '🌙 Mode sombre'}
          </button>
        </div>
      </div>

      {/* ── PAGE CONTENT ── */}
      <div className="page-content">

        {/* ── HERO ── */}
        <section className="hero" id="home">
          <div className="hero-glow"></div>
          <div className="orbit-ring orbit-1"></div>
          <div className="orbit-ring orbit-2"></div>
          <div className="orbit-ring orbit-3"></div>

          <div className="hero-stats">
            <div className="stat-float stat-float-1">
              <div className="stat-float-icon">♻️</div>
              <div className="stat-float-num">12k+</div>
              <div className="stat-float-label">Collectes ce mois</div>
            </div>
            <div className="stat-float stat-float-2">
              <div className="stat-float-icon">🏆</div>
              <div className="stat-float-num">850</div>
              <div className="stat-float-label">Points gagnés aujourd'hui</div>
            </div>
            <div className="stat-float stat-float-3">
              <div className="stat-float-icon">🌱</div>
              <div className="stat-float-num">4.2T</div>
              <div className="stat-float-label">Kg valorisés ce mois</div>
            </div>
          </div>

          <div className="hero-inner">
            <h1 className="hero-title">
      Abonnez-vous<br/>
      <em>Gagnez</em><br/>
       Impactez Recyclez<br/>
        <span className="agir-glow">(A.G.I.R)</span>
       </h1>
            <p className="hero-sub">
              Déclarez vos déchets, suivez vos collectes en temps réel
              et transformez chaque geste écologique en récompenses concrètes.
            </p>
            <div className="hero-actions">
              <button className="btn-primary-hero" onClick={() => window.location.href = '/register'}>
                Créer mon compte gratuit
                <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
              </button>
              <button className="btn-outline-hero" onClick={() => document.getElementById('how').scrollIntoView({behavior:'smooth'})}>
                <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10"/><polygon points="10 8 16 12 10 16 10 8"/>
                </svg>
                Voir comment ça marche
              </button>
            </div>
          </div>

          <div className="scroll-hint">
            <span>Découvrir</span>
            <div className="scroll-line"></div>
          </div>
        </section>

        {/* ── HOW IT WORKS ── */}
        <section className="how" id="how">
          <div className="section-inner">
            <div className="reveal">
              <span className="section-label">⚡ Processus simplifié</span>
              <h2 className="section-heading">Quatre étapes,<br/>un impact réel.</h2>
              <p className="section-sub">De l'inscription à la récompense, chaque action est pensée pour être simple, rapide et motivante.</p>
            </div>
            <div className="steps-grid">
              {[
                { n:'01', icon:'🪪', title:'Enrôlement', desc:"Créez votre compte en choisissant votre profil : ménage, commerce, entreprise ou administration. Localisez-vous en quelques secondes." },
                { n:'02', icon:'🗂️', title:'Tri & Préparation', desc:"Triez vos déchets par catégorie — plastique, papier, métal, verre, organique — dans vos contenants ou sacs EcoCollect." },
                { n:'03', icon:'📋', title:'Déclaration', desc:"Déclarez vos déchets en 3 clics. Choisissez la collecte à domicile ou déposez dans un point de regroupement proche." },
                { n:'04', icon:'🎁', title:'Collecte & Récompenses', desc:"Suivez votre collecte en temps réel, recevez la confirmation et voyez vos points s'accumuler à chaque action." },
              ].map((s,i) => (
                <div key={i} className={`step-card reveal reveal-delay-${i+1}`}>
                  <div className="step-num">{s.n}</div>
                  <div className="step-icon-wrap">{s.icon}</div>
                  <div className="step-title">{s.title}</div>
                  <div className="step-desc">{s.desc}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── WASTE TYPES ── */}
        <section className="waste" id="waste">
          <div className="section-inner">
            <div className="waste-flex">
              <div className="waste-tiles reveal">
                {[
                  { e:'🍶', n:'Plastique PET', s:'Bouteilles, emballages' },
                  { e:'🪣', n:'Plastique PEHD', s:'Bidons, flacons' },
                  { e:'📦', n:'Papier / Carton', s:'Boîtes, journaux' },
                  { e:'🥫', n:'Métal', s:'Canettes, conserves' },
                  { e:'🍾', n:'Verre', s:'Bouteilles, pots' },
                  { e:'🌿', n:'Organique', s:'Déchets alimentaires' },
                ].map((w,i) => (
                  <div key={i} className="waste-tile">
                    <div className="waste-emoji">{w.e}</div>
                    <div className="waste-name">{w.n}</div>
                    <div className="waste-sub">{w.s}</div>
                  </div>
                ))}
              </div>
              <div className="reveal reveal-delay-2">
                <span className="section-label">🗑️ Catégories de déchets</span>
                <h2 className="section-heading">Triez tout,<br/>ne ratez rien.</h2>
                <p className="section-sub">EcoCollect accepte 6 catégories de déchets recyclables. Chaque type trié et déclaré vous rapporte des points et contribue à un environnement plus propre.</p>
                <ul className="feature-list" style={{marginTop:'1.75rem'}}>
                  {[
                    ['Quantités flexibles', 'déclarez en kg, sacs ou unités'],
                    ['Multi-types', 'combinez plusieurs catégories en une seule déclaration'],
                    ['Validation instantanée', 'votre déclaration est traitée en temps réel'],
                    ['Suivi précis', 'visualisez le poids réel collecté après chaque passage'],
                  ].map(([b,t],i) => (
                    <li key={i} className="feature-item">
                      <div className="feature-check">✓</div>
                      <div className="feature-item-text"><strong>{b}</strong> — {t}</div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* ── STATS BAND ── */}
        <section className="stats-band">
          <div className="section-inner">
            <div className="stats-band-inner">
              {[
  { n:'48k+', d:'Producteurs actifs', icon:'♻️' },
  { n:'120T', d:'Déchets valorisés',   icon:'🌍' },
  { n:'6,200',d:'Collectes par mois',  icon:'🚛' },
  { n:'98%',  d:'Satisfaction',        icon:'⭐' },
].map((s,i) => (
  <div key={i} className={`stat-item reveal${i > 0 ? ` reveal-delay-${i}` : ''}`}>
    <div style={{fontSize:'1.8rem', marginBottom:'0.3rem'}}>{s.icon}</div>
    <div className="stat-num">{s.n}</div>
    <div className="stat-desc">{s.d}</div>
  </div>
))}
            </div>
          </div>
        </section>

        {/* ── REWARDS ── */}
        <section className="rewards" id="rewards">
          <div className="section-inner">
            <div className="rewards-inner">
              <div className="reveal">
                <span className="section-label">🏆 Système de récompenses</span>
                <h2 className="section-heading">Chaque déchet<br/>vous rapporte.</h2>
                <p className="section-sub" style={{marginBottom:'2rem'}}>Accumulez des points à chaque collecte validée. Échangez-les contre des avantages, réductions et services exclusifs.</p>
                <ul className="feature-list">
                  {[
                    ['Points automatiques', 'crédités dès la validation de la collecte'],
                    ['Historique complet', 'suivez chaque point gagné et dépensé'],
                    ['Niveaux & badges', 'progressez et montrez votre engagement'],
                    ['Récompenses locales', 'partenaires et offres dans votre commune'],
                  ].map(([b,t],i) => (
                    <li key={i} className="feature-item">
                      <div className="feature-check">✓</div>
                      <div className="feature-item-text"><strong>{b}</strong> — {t}</div>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="rewards-visual reveal reveal-delay-2">
                <div className="reward-chip reward-chip-1">
                  <div className="reward-chip-icon">🎫</div>
                  <div className="reward-chip-txt">
                    <strong>Bon de réduction</strong>
                    <span>-15% chez nos partenaires</span>
                  </div>
                </div>
                <div className="reward-chip reward-chip-2">
                  <div className="reward-chip-icon">⚡</div>
                  <div className="reward-chip-txt">
                    <strong>+50 pts bonus</strong>
                    <span>Collecte express validée</span>
                  </div>
                </div>
                <div className="points-card points-main">
                  <div className="points-header">
                    <div className="points-label">Mon solde EcoPoints</div>
                    <div className="points-badge">🟢 Actif</div>
                  </div>
                  <div className="points-big">2 450</div>
                  <div className="points-unit">points disponibles</div>
                  <div className="points-bar-wrap"><div className="points-bar"></div></div>
                  <div className="points-footer">
                    <span>Niveau Argent</span>
                    <span>550 pts → Or</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── TESTIMONIALS ── */}
        <section className="testimonials" id="about">
          <div className="section-inner">
            <div className="reveal" style={{textAlign:'center', maxWidth:'580px', margin:'0 auto 1rem'}}>
              <span className="section-label">💬 Ils nous font confiance</span>
              <h2 className="section-heading">Ce que disent<br/>nos producteurs.</h2>
            </div>
            <div className="testi-grid">
              {[
                { av:'A', cls:'av1', name:'Aminata K.', role:'Ménage — Douala 3', text:'"Depuis EcoCollect, on ne rate plus aucune collecte. L\'application nous notifie à l\'avance et les points s\'accumulent automatiquement. Vraiment bien pensé."' },
                { av:'J', cls:'av2', name:'Jean-Pierre M.', role:'Commerce — Bafoussam', text:'"En tant que gérant de restaurant, on génère beaucoup de déchets. EcoCollect nous a permis de structurer notre tri et de valoriser nos emballages carton efficacement."' },
                { av:'F', cls:'av3', name:'Fatou B.', role:'Entreprise — Yaoundé', text:'"Notre PME produit du plastique industriel. Avec la fonctionnalité Entreprise, on gère nos flux de déchets proprement et on obtient des attestations pour nos clients."' },
              ].map((t,i) => (
                <div key={i} className={`testi-card reveal reveal-delay-${i+1}`}>
                  <div className="testi-stars">★★★★★</div>
                  <p className="testi-text">{t.text}</p>
                  <div className="testi-author">
                    <div className={`testi-avatar ${t.cls}`}>{t.av}</div>
                    <div>
                      <div className="testi-name">{t.name}</div>
                      <div className="testi-role">{t.role}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        

        {/* ── CTA ── */}
        <section className="cta-section">
          <div className="cta-glow"></div>
          <div className="section-inner" style={{position:'relative'}}>
            <span className="section-label reveal">🌍 Rejoignez le mouvement</span>
            <h2 className="cta-heading reveal">
              Votre déchet,<br/><em>notre ressource.</em>
            </h2>
            <p className="cta-sub reveal">Plus de 48 000 producteurs font déjà partie d'EcoCollect. Commencez gratuitement aujourd'hui et transformez chaque geste en impact.</p>
            <div className="cta-buttons reveal">
              <button className="btn-big" onClick={() => window.location.href = '/register'}>
                <span>🚀</span> Rejoindre EcoCollect
              </button>
              <button className="btn-outline-hero" onClick={() => window.location.href = '/login'}>
                J'ai déjà un compte →
              </button>
            </div>
          </div>
        </section>

        {/* ── FOOTER ── */}
        <footer>
          <div className="footer-inner">
            <div className="footer-top">
              <div>
                <a href="/" className="nav-logo" style={{marginBottom:'0.6rem'}}>
                  <img src={logo} alt="EcoCollect" className="logo-img-nav" />
                  
                </a>
                <p className="footer-tagline">Plateforme intelligente de gestion et valorisation des déchets recyclables.</p>
              </div>
              <div className="footer-cols">
                <div className="footer-col">
                  <h4>Plateforme</h4>
                  <ul>
                    <li><a href="#how">Fonctionnement</a></li>
                    <li><a href="#waste">Types de déchets</a></li>
                    <li><a href="#rewards">Récompenses</a></li>
                    <li><a href="#">Points de dépôt</a></li>
                  </ul>
                </div>
                <div className="footer-col">
                  <h4>Producteurs</h4>
                  <ul>
                    <li><a href="#">Ménages</a></li>
                    <li><a href="#">Commerces</a></li>
                    <li><a href="#">Entreprises</a></li>
                    <li><a href="#">Administrations</a></li>
                  </ul>
                </div>
                <div className="footer-col">
                 // Colonne Plateforme
<ul>
  <li><a href="#how">⚡ Fonctionnement</a></li>
  <li><a href="#waste">♻️ Types de déchets</a></li>
  <li><a href="#rewards">🏆 Récompenses</a></li>
  <li><a href="#">📍 Points de dépôt</a></li>
</ul>

// Colonne Producteurs
<ul>
  <li><a href="#">🏠 Ménages</a></li>
  <li><a href="#">🛒 Commerces</a></li>
  <li><a href="#">🏭 Entreprises</a></li>
  <li><a href="#">🏛️ Administrations</a></li>
</ul>

// Colonne Légal
<ul>
  <li><a href="#">📄 CGU</a></li>
  <li><a href="#">🔒 Confidentialité</a></li>
  <li><a href="#">ℹ️ Mentions légales</a></li>
  <li><a href="#">✉️ Contact</a></li>
</ul>
                </div>
              </div>
            </div>
            <div className="footer-bottom">
              <a href="/" className="nav-logo">
                <img src={logo} alt="EcoCollect" className="logo-img-nav" />
              </a>
              <span>© 2026 <span className="footer-bottom-lime">EcoCollect</span>. Tous droits réservés.</span>
            </div>
          </div>
        </footer>

      </div>
    </>
  );
};

export default Index;