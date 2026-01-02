import React, { useState, useEffect, useRef } from 'react';

export default function App() {
  const [isBioModalOpen, setIsBioModalOpen] = useState(false);
  const [isAssessmentModalOpen, setIsAssessmentModalOpen] = useState(false);
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const observerRef = useRef<IntersectionObserver | null>(null);

  // Scroll Animation Observer
  useEffect(() => {
    const observerOptions = { root: null, rootMargin: '0px', threshold: 0.1 };
    observerRef.current = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          if (observerRef.current) observerRef.current.unobserve(entry.target);
        }
      });
    }, observerOptions);

    document.querySelectorAll('.slide-up').forEach(section => { 
        if(observerRef.current) observerRef.current.observe(section); 
    });

    return () => {
      if(observerRef.current) observerRef.current.disconnect();
    };
  }, []);

  // Modal Body Lock
  useEffect(() => {
    if (isBioModalOpen || isAssessmentModalOpen || isContactModalOpen || isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }, [isBioModalOpen, isAssessmentModalOpen, isContactModalOpen, isMobileMenuOpen]);

  const handleAssessmentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Thank you for your interest. We will contact you shortly.");
    setIsAssessmentModalOpen(false);
  };

  const scrollToSection = (e: React.MouseEvent, id: string) => {
    e.preventDefault();
    setIsMobileMenuOpen(false); // Close mobile menu if open
    const element = document.getElementById(id);
    if (element) {
      const headerOffset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.scrollY - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  };

  return (
    <>
      {/* 1. OPAQUE TOP BAR (Visual Cap) */}
      <header className="fixed top-0 left-0 w-full h-14 md:h-16 bg-[var(--manuscript-buff)] z-50 border-b-2 border-[var(--stone-dark)] px-4 md:px-8 flex justify-between items-center">
        <div className="flex items-center gap-4">
          <span className="text-[10px] md:text-xs font-bold uppercase tracking-widest bg-[var(--stone-dark)] text-[var(--manuscript-buff)] px-2 py-1">Estd. 2012</span>
          <button 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden text-lg border border-[var(--stone-dark)] w-8 h-8 flex items-center justify-center hover:bg-[var(--stone-dark)] hover:text-white transition-colors z-50 relative"
          >
            <i className={`fa-solid ${isMobileMenuOpen ? 'fa-xmark' : 'fa-bars'}`}></i>
          </button>
        </div>
        <div className="flex items-center gap-2">
          {/* Mini Live Indicator */}
          <div className="w-2 h-2 rounded-full bg-[var(--laterite-red)] animate-pulse"></div>
          <span className="text-[10px] md:text-xs font-bold uppercase tracking-widest hidden md:inline-block">Bhubaneswar /// Odisha</span>
        </div>
      </header>

      {/* MOBILE MENU OVERLAY */}
      <div className={`fixed inset-0 bg-[var(--stone-dark)] z-40 transition-transform duration-300 ease-in-out md:hidden flex flex-col justify-center items-center ${isMobileMenuOpen ? 'translate-y-0' : '-translate-y-full'}`}>
        <div className="flex flex-col gap-8 text-center text-[var(--manuscript-buff)]">
          <a href="#faculty" onClick={(e) => scrollToSection(e, 'faculty')} className="text-2xl font-serif font-bold italic hover:text-[var(--laterite-red)] transition-colors">Faculty</a>
          <a href="#curriculum" onClick={(e) => scrollToSection(e, 'curriculum')} className="text-2xl font-serif font-bold italic hover:text-[var(--laterite-red)] transition-colors">Curriculum</a>
          <a href="#certificate-sample" onClick={(e) => scrollToSection(e, 'certificate-sample')} className="text-2xl font-serif font-bold italic hover:text-[var(--laterite-red)] transition-colors">Certification</a>
          <a href="#contact" onClick={(e) => scrollToSection(e, 'contact')} className="text-2xl font-serif font-bold italic hover:text-[var(--laterite-red)] transition-colors">Contact</a>
          <button 
            onClick={() => { setIsMobileMenuOpen(false); setIsAssessmentModalOpen(true); }}
            className="mt-8 border border-[var(--manuscript-buff)] px-6 py-3 font-bold uppercase text-xs tracking-widest hover:bg-[var(--manuscript-buff)] hover:text-[var(--stone-dark)] transition-colors"
          >
            Book Assessment
          </button>
        </div>
      </div>

      {/* 2. Main Wrapper */}
      {/* Removed overflow-hidden to allow sticky positioning to work and prevent scroll locking issues */}
      <div className="w-full min-h-screen pt-20 pb-20 px-4 md:px-12 lg:px-16">
        
        {/* Navigation / Branding */}
        <nav className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 md:mb-16 relative z-30 pointer-events-auto">
          <div className="relative group cursor-pointer w-full md:w-auto">
            {/* Massive, Structural Typography */}
            <h1 className="text-5xl sm:text-7xl md:text-9xl lg:text-[10rem] font-serif font-black leading-[0.8] tracking-tighter text-[var(--stone-dark)] transform -ml-1">
              ATHENA
            </h1>
            <div className="flex flex-col sm:flex-row sm:items-center gap-3 mt-4">
              <div className="h-px w-12 bg-[var(--laterite-red)] hidden sm:block"></div>
              <div className="flex flex-wrap gap-x-2 text-xs md:text-sm font-sans font-bold uppercase tracking-[0.2em] group-hover:text-[var(--laterite-red)] transition-colors">
                <span>Music Academy</span>
                <span className="text-[var(--laterite-red)]">///</span>
                <span>Vocal Department</span>
              </div>
            </div>
          </div>
          
          <div className="hidden md:flex flex-col items-end gap-1 text-xs lg:text-sm font-bold uppercase tracking-widest mt-6 md:mt-0">
            <a href="#faculty" onClick={(e) => scrollToSection(e, 'faculty')} className="hover:bg-[var(--stone-dark)] hover:text-white px-3 py-1 transition-all relative group cursor-pointer">
              <span className="group-hover:mr-2 transition-all">Faculty</span>
            </a>
            <a href="#curriculum" onClick={(e) => scrollToSection(e, 'curriculum')} className="hover:bg-[var(--stone-dark)] hover:text-white px-3 py-1 transition-all relative group cursor-pointer">
              <span className="group-hover:mr-2 transition-all">Curriculum</span>
            </a>
            <a href="#certificate-sample" onClick={(e) => scrollToSection(e, 'certificate-sample')} className="hover:bg-[var(--stone-dark)] hover:text-white px-3 py-1 transition-all relative group cursor-pointer">
              <span className="group-hover:mr-2 transition-all">Certification</span>
            </a>
            <a href="#contact" onClick={(e) => scrollToSection(e, 'contact')} className="hover:bg-[var(--stone-dark)] hover:text-white px-3 py-1 transition-all relative group cursor-pointer">
              <span className="group-hover:mr-2 transition-all">Contact</span>
            </a>
          </div>
        </nav>

        {/* Hero Section: Non-Conventional Layout */}
        <section className="grid grid-cols-1 md:grid-cols-12 gap-0 brutal-border border-b-0 slide-up">
          
          {/* Left: Text Manifesto */}
          <div className="col-span-1 md:col-span-7 p-6 sm:p-8 md:p-12 md:brutal-border-r border-b md:border-b-0 relative overflow-hidden group bg-white">
            {/* Abstract Watermark */}
            <div className="absolute -bottom-10 -right-10 text-[12rem] text-[var(--laterite-red)] opacity-10 font-serif italic leading-none pointer-events-none">
              Vo
            </div>
            
            <h2 className="text-3xl sm:text-4xl lg:text-6xl font-serif italic leading-[1.1] mb-8 relative z-10">
              "Find a <span className="text-[var(--laterite-red)]">healthy</span>,<br /> confident, and <br />
              <span className="relative inline-block px-2">
                <span className="absolute inset-0 bg-[var(--stone-dark)] transform -skew-x-6 origin-bottom-left z-0"></span>
                <span className="relative z-10 text-[var(--manuscript-buff)] not-italic">expressive voice</span>
              </span>."
            </h2>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-8 text-sm font-medium leading-relaxed max-w-lg relative z-10 border-l-2 border-[var(--laterite-red)] pl-6">
              <p>
                Every voice is unique. We do not just teach songs; we build the instrument. From <strong>posture</strong> to <strong>performance</strong>.
              </p>
              <p>
                Led by Anita Basu Mallick, instrumental in bringing the Rockschool system to West Bengal. Find your musical way.
              </p>
            </div>

            <div className="mt-12 flex flex-col sm:flex-row gap-4 pointer-events-auto">
              <button 
                onClick={() => setIsAssessmentModalOpen(true)}
                className="w-full sm:w-auto bg-[var(--stone-dark)] text-white px-8 py-4 font-bold uppercase tracking-widest hover:bg-[var(--laterite-red)] transition-colors border-2 border-[var(--stone-dark)] active:scale-95"
              >
                Start Journey
              </button>
            </div>
          </div>

          {/* Right: Image with Blend Mode */}
          <div className="col-span-1 md:col-span-5 bg-[var(--stone-dark)] relative h-[400px] md:h-auto overflow-hidden border-b-2 md:border-b-0">
            <img src="https://raw.githubusercontent.com/bongchong-in/athenamusicacademy/refs/heads/main/images/hero.jpg" className="absolute inset-0 w-full h-full object-cover opacity-80 mix-blend-luminosity hover:scale-105 transition-transform duration-[2s]" alt="Microphone" />
            
            {/* Overlay Graphic */}
            <div className="absolute inset-0 bg-[var(--laterite-red)] mix-blend-overlay opacity-40"></div>
            
            {/* Floating Info Card */}
            <div className="absolute top-4 right-4 bg-[var(--manuscript-buff)] border-2 border-[var(--stone-dark)] p-3 z-20 shadow-[4px_4px_0_0_rgba(0,0,0,1)]">
              <div className="flex items-center gap-2 mb-1">
                <div className="frequency-bars text-[var(--laterite-red)]">
                  <div className="freq-bar"></div><div className="freq-bar"></div><div className="freq-bar"></div><div className="freq-bar"></div>
                </div>
                <span className="text-[10px] font-bold uppercase">Focus</span>
              </div>
              <div className="text-xs font-serif italic">Western Contemporary</div>
            </div>
          </div>
        </section>

        {/* Marquee Strip: High Contrast Signal */}
        <div className="brutal-border bg-[var(--laterite-red)] text-white py-3 marquee-container font-mono text-xs sm:text-sm uppercase tracking-widest border-t-0 slide-up">
          <div className="marquee-content">
            Strong Technique /// Voice Care & Health /// Musical Understanding /// Posture & Presence /// Rockschool Exams /// Real Stage Experience /// Strong Technique /// Voice Care & Health /// Musical Understanding /// Posture & Presence ///
          </div>
        </div>

        {/* Faculty Section: The Mentor */}
        <section id="faculty" className="mt-24 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start slide-up">
          
          {/* Sticky Title */}
          <div className="col-span-1 lg:col-span-4 lg:sticky lg:top-24 z-10 pr-0 lg:pr-8">
            <div className="border-t-2 border-[var(--stone-dark)] pt-2 mb-4">
              <span className="text-xs font-bold uppercase tracking-[0.3em]">Faculty Profile</span>
            </div>
            <h2 className="text-5xl sm:text-6xl md:text-7xl font-serif font-black leading-[0.85] mb-6 text-[var(--stone-dark)]">
              Anita<br /><span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--laterite-red)] to-[var(--stone-dark)] italic">Basu</span><br />Mallick
            </h2>
            
            <div className="bg-white p-6 border-2 border-[var(--stone-dark)] shadow-[4px_4px_0_0_var(--laterite-red)]">
              <ul className="space-y-3 text-xs font-mono">
                <li className="flex justify-between border-b border-gray-200 pb-1">
                  <span>ROLE</span>
                  <span className="font-bold uppercase text-right">Chair, Vocal Dept</span>
                </li>
                <li className="flex justify-between border-b border-gray-200 pb-1">
                  <span>FOUNDER</span>
                  <span className="font-bold uppercase text-right">Institute of Music & Expression</span>
                </li>
                <li className="flex justify-between border-b border-gray-200 pb-1">
                  <span>SPECIAL</span>
                  <span className="font-bold uppercase text-right">Western Contemporary</span>
                </li>
                 <li className="flex justify-between pb-1">
                  <span>EXP</span>
                  <span className="font-bold text-right">26+ YEARS</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Content */}
          <div className="col-span-1 lg:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-0 brutal-border bg-[var(--stone-dark)]">
            {/* Image */}
            <div className="relative aspect-[4/5] border-b-2 md:border-b-0 md:border-r-2 border-[var(--manuscript-buff)] overflow-hidden group">
              <img src="https://raw.githubusercontent.com/bongchong-in/athenamusicacademy/refs/heads/main/images/profile.jpg" alt="Anita Portrait" className="w-full h-full object-cover grayscale contrast-125 group-hover:scale-110 transition-transform duration-700" />
              <div className="absolute inset-0 bg-[var(--laterite-red)] mix-blend-color opacity-50"></div>
            </div>
            
            {/* Text Block */}
            <div className="p-8 md:p-12 flex flex-col justify-between bg-[var(--manuscript-buff)]">
              <div>
                <i className="fa-solid fa-quote-left text-4xl text-[var(--laterite-red)] mb-6 opacity-40"></i>
                <p className="text-lg sm:text-xl font-serif leading-snug mb-8">
                  "Qualifications matter, but what matters to me is helping singers find a healthy, confident, and expressive voice."
                </p>
              </div>
              
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="h-px flex-1 bg-[var(--stone-dark)]"></div>
                  <span className="text-[10px] font-bold uppercase tracking-widest">About</span>
                </div>
                <p className="font-sans text-sm leading-relaxed">
                  A veteran vocalist with over 26 years of experience. Anita is a defining figure in Eastern India's music scene and the pioneer who brought the Rockschool examination system to West Bengal. She combines rigorous academic standards with a holistic approach to artistic expression.
                </p>
                <button onClick={() => setIsBioModalOpen(true)} className="w-full py-3 border-2 border-[var(--stone-dark)] font-bold uppercase text-xs hover:bg-[var(--stone-dark)] hover:text-white transition-colors">
                  Read Full Profile
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* The Vocal Architecture (Curriculum) */}
        <section id="curriculum" className="mt-32 slide-up">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 border-b-4 border-[var(--stone-dark)] pb-4 gap-2">
            <h2 className="text-4xl sm:text-5xl md:text-7xl font-serif font-black text-[var(--stone-dark)]">
              Vocal <span className="italic text-[var(--laterite-red)]">Architecture</span>
            </h2>
            <span className="text-xs font-bold uppercase tracking-widest text-[var(--stone-dark)] bg-white px-2 py-1 border border-[var(--stone-dark)]">Curriculum Matrix</span>
          </div>

          {/* Grid Layout */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            
            {/* Module 1 */}
            <div className="group relative p-8 border-2 border-[var(--stone-dark)] bg-white hover:bg-[var(--stone-dark)] hover:text-white transition-all duration-300 min-h-[300px] flex flex-col justify-between shadow-[4px_4px_0_0_var(--stone-dark)]">
              <div className="flex justify-between items-start">
                <span className="text-[10px] font-mono border border-current px-1 inline-block">01 /// FOUNDATION</span>
                <div className="frequency-bars opacity-0 group-hover:opacity-100 transition-opacity"><div className="freq-bar"></div><div className="freq-bar"></div><div className="freq-bar"></div></div>
              </div>
              <div>
                <h3 className="text-3xl font-serif italic mb-2">Technique & Health</h3>
                <p className="text-sm opacity-80 leading-relaxed mb-4">
                  We focus on strong vocal technique to ensure your voice is powerful and sustainable.
                </p>
                <div className="flex flex-wrap gap-2">
                  <span className="text-[10px] font-bold uppercase border border-current px-2 py-1 rounded-full">Breath Control</span>
                  <span className="text-[10px] font-bold uppercase border border-current px-2 py-1 rounded-full">Range</span>
                  <span className="text-[10px] font-bold uppercase border border-current px-2 py-1 rounded-full">Hygiene</span>
                </div>
              </div>
            </div>

            {/* Module 2 */}
            <div className="group relative p-8 border-2 border-[var(--stone-dark)] bg-[var(--laterite-red)] text-white min-h-[300px] flex flex-col justify-between shadow-[4px_4px_0_0_var(--stone-dark)]">
              <div className="flex justify-between items-start">
                <span className="text-[10px] font-mono border border-current px-1 inline-block">02 /// LANGUAGE</span>
                <i className="fa-solid fa-music text-xl"></i>
              </div>
              <div>
                <h3 className="text-3xl font-serif italic mb-2">Musical Understanding</h3>
                <p className="text-sm opacity-90 leading-relaxed mb-4">
                  Singing is more than sound. Learn to read, write, and understand the mechanics of music.
                </p>
                <div className="flex flex-wrap gap-2">
                  <span className="text-[10px] font-bold uppercase bg-white/20 px-2 py-1">Sight Reading</span>
                  <span className="text-[10px] font-bold uppercase bg-white/20 px-2 py-1">Notation</span>
                  <span className="text-[10px] font-bold uppercase bg-white/20 px-2 py-1">Rhythm</span>
                </div>
              </div>
            </div>

            {/* Module 3 */}
            <div className="group relative p-8 border-2 border-[var(--stone-dark)] bg-[var(--manuscript-buff)] hover:bg-[var(--stone-dark)] hover:text-white transition-all duration-300 min-h-[300px] flex flex-col justify-between shadow-[4px_4px_0_0_var(--stone-dark)]">
              <div className="flex justify-between items-start">
                <span className="text-[10px] font-mono border border-current px-1 inline-block">03 /// VESSEL</span>
                <i className="fa-solid fa-person-rays text-xl opacity-0 group-hover:opacity-100 transition-opacity"></i>
              </div>
              <div>
                <h3 className="text-3xl font-serif italic mb-2">Posture & Presence</h3>
                <p className="text-sm opacity-80 leading-relaxed mb-4">
                  Correcting physical alignment to unlock resonance and build stage confidence.
                </p>
                <div className="flex flex-wrap gap-2">
                  <span className="text-[10px] font-bold uppercase border border-current px-2 py-1 rounded-full">Alignment</span>
                  <span className="text-[10px] font-bold uppercase border border-current px-2 py-1 rounded-full">Stagecraft</span>
                </div>
              </div>
            </div>

            {/* Module 4 */}
            <div className="group relative p-8 border-2 border-[var(--stone-dark)] bg-white hover:bg-[var(--stone-dark)] hover:text-white transition-all duration-300 min-h-[300px] flex flex-col justify-between shadow-[4px_4px_0_0_var(--stone-dark)]">
              <div className="flex justify-between items-start">
                <span className="text-[10px] font-mono border border-current px-1 inline-block">04 /// OUTCOME</span>
                <i className="fa-solid fa-star text-xl opacity-0 group-hover:opacity-100 transition-opacity text-[var(--laterite-red)]"></i>
              </div>
              <div>
                <h3 className="text-3xl font-serif italic mb-2">Certification & Stage</h3>
                <p className="text-sm opacity-80 leading-relaxed mb-4">
                  Preparing you for formal qualifications and the reality of live performance.
                </p>
                <div className="flex flex-wrap gap-2">
                  <span className="text-[10px] font-bold uppercase border border-current px-2 py-1 rounded-full">Rockschool UK</span>
                  <span className="text-[10px] font-bold uppercase border border-current px-2 py-1 rounded-full">Auditions</span>
                </div>
              </div>
            </div>

          </div>
        </section>

        {/* New Section: Sample Certificate */}
        <section id="certificate-sample" className="mt-32 slide-up">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 border-b-4 border-[var(--stone-dark)] pb-4 gap-2">
                <h2 className="text-4xl sm:text-5xl md:text-7xl font-serif font-black text-[var(--stone-dark)]">
                  Global <span className="italic text-[var(--laterite-red)]">Standard</span>
                </h2>
                <span className="text-xs font-bold uppercase tracking-widest text-[var(--stone-dark)] bg-white px-2 py-1 border border-[var(--stone-dark)]">Sample Qualification</span>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 brutal-border bg-[var(--stone-dark)]">
                {/* Text Context */}
                <div className="col-span-1 lg:col-span-5 p-8 md:p-12 bg-[var(--manuscript-buff)] border-b-2 lg:border-b-0 lg:border-r-2 border-[var(--stone-dark)] flex flex-col justify-center">
                    <h3 className="text-3xl font-serif italic mb-6">Recognized Worldwide</h3>
                    <p className="font-sans text-sm leading-relaxed mb-6">
                        At Athena, we prepare students for globally recognized examinations such as <strong>Rockschool (RSL Awards)</strong> and <strong>Trinity College London</strong>. These certifications provide a structured path for progression and are valued internationally by conservatories and universities.
                    </p>
                    <ul className="space-y-4 text-xs font-bold uppercase tracking-widest">
                        <li className="flex items-center gap-3">
                            <i className="fa-solid fa-check text-[var(--laterite-red)]"></i>
                            <span>UCAS Points for Higher Grades</span>
                        </li>
                        <li className="flex items-center gap-3">
                            <i className="fa-solid fa-check text-[var(--laterite-red)]"></i>
                            <span>Performance & Technical Focus</span>
                        </li>
                        <li className="flex items-center gap-3">
                            <i className="fa-solid fa-check text-[var(--laterite-red)]"></i>
                            <span>Graded Music Exams 1-8</span>
                        </li>
                    </ul>
                </div>
                
                {/* Certificate Image */}
                <div className="col-span-1 lg:col-span-7 bg-[var(--stone-dark)] p-4 md:p-8 flex items-center justify-center">
                    <div className="relative border-4 border-white shadow-[8px_8px_0_0_var(--laterite-red)]">
                        <img 
                            src="https://raw.githubusercontent.com/bongchong-in/athenamusicacademy/refs/heads/main/images/certificate.jpg" 
                            alt="Sample Music Certificate" 
                            className="w-full h-auto object-cover max-h-[600px]"
                        />
                    </div>
                </div>
            </div>
        </section>

        {/* Footer / Location */}
        <section id="contact" className="mt-32 bg-stone-texture p-6 sm:p-8 md:p-12 border-2 border-[var(--stone-dark)] text-white relative overflow-hidden slide-up">
          <div className="relative z-10 grid md:grid-cols-2 gap-12 items-end">
            <div className="space-y-6">
              {/* Branding & Address */}
              <div>
                  <h2 className="text-5xl sm:text-6xl md:text-8xl font-serif font-black leading-none">ATHENA</h2>
                  <div className="h-1 w-24 bg-[var(--stone-dark)] mt-8 mb-8"></div>
                  <address className="not-italic font-mono text-sm sm:text-base leading-loose opacity-90">
                    PLOT NO. 32/B, DISTRICT CENTER<br />
                    CHANDRASEKHARPUR<br />
                    BHUBANESWAR, ODISHA<br />
                    INDIA - 751016
                  </address>
              </div>
            </div>

            {/* Right Column */}
            <div className="flex flex-col justify-end items-end h-full w-full">
              <div className="flex flex-col gap-4 w-full md:max-w-md">
                  {/* Phone CTA */}
                  <div onClick={() => setIsContactModalOpen(true)} className="cursor-pointer group w-full">
                     <div className="border-2 border-white p-6 hover:bg-white hover:text-[var(--stone-dark)] transition-all duration-300">
                        <span className="text-[10px] font-bold uppercase tracking-widest block mb-2 opacity-80 group-hover:opacity-100">Get in touch</span>
                        <div className="text-xl sm:text-2xl font-serif font-black flex items-center gap-3">
                            <i className="fa-solid fa-phone-flip text-lg"></i>
                            <span>+91 90900 23423</span>
                        </div>
                     </div>
                  </div>

                  {/* Button */}
                  <button 
                    onClick={() => setIsAssessmentModalOpen(true)}
                    className="w-full bg-white text-[var(--stone-dark)] px-8 py-5 font-bold uppercase tracking-widest hover:bg-[var(--stone-dark)] hover:text-white transition-colors border-4 border-transparent hover:border-white shadow-[4px_4px_0_0_var(--stone-dark)]"
                  >
                    Book Assessment
                  </button>
              </div>
            </div>
          </div>

          {/* Decorative Big Text (Background) */}
          <div className="absolute -bottom-10 -left-10 text-[15rem] font-serif font-black text-white opacity-10 pointer-events-none whitespace-nowrap blend-difference">
            VOICE
          </div>
        </section>

      </div>

      {/* 3. OPAQUE BOTTOM BAR (Visual Cap) */}
      <div className="fixed bottom-0 left-0 w-full h-14 md:h-16 bg-[var(--manuscript-buff)] z-50 border-t-2 border-[var(--stone-dark)] px-4 md:px-8 flex justify-between items-center">
        <div 
          onClick={() => setIsAssessmentModalOpen(true)}
          className="flex items-center gap-2 cursor-pointer group"
        >
          <div className="frequency-bars text-[var(--stone-dark)] h-3 scale-50">
            <div className="freq-bar"></div><div className="freq-bar"></div><div className="freq-bar"></div>
          </div>
          <span className="hidden md:block text-xs font-bold uppercase tracking-widest text-[var(--stone-dark)] group-hover:text-[var(--laterite-red)] transition-colors">Start your musical journey</span>
        </div>
        <button 
          onClick={() => setIsAssessmentModalOpen(true)}
          className="text-[10px] md:text-xs font-bold uppercase tracking-widest bg-[var(--laterite-red)] text-white px-3 py-1 cursor-pointer hover:bg-[var(--stone-dark)] transition-colors shadow-[2px_2px_0_0_var(--stone-dark)]"
        >
          Admissions Open
        </button>
      </div>

      {/* MODAL POPUP (Bio) */}
      <div className={`fixed inset-0 z-[60] transition-opacity duration-300 ${isBioModalOpen ? '' : 'pointer-events-none'}`}>
        {/* Overlay */}
        <div 
            className={`absolute inset-0 bg-[var(--stone-dark)]/95 backdrop-blur-sm modal-overlay ${isBioModalOpen ? 'opacity-100' : 'opacity-0'}`} 
            onClick={() => setIsBioModalOpen(false)}
        ></div>
        
        {/* Content */}
        <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] max-w-3xl bg-[var(--manuscript-buff)] border-2 border-[var(--stone-dark)] shadow-[8px_8px_0px_0px_var(--laterite-red)] max-h-[90vh] overflow-y-auto transform modal-content ${isBioModalOpen ? 'opacity-100 scale-100 translate-x-[-50%] translate-y-[-50%]' : 'opacity-0 scale-95 translate-x-[-50%] translate-y-[-50%]'}`}>
          <div className="sticky top-0 bg-[var(--stone-dark)] text-[var(--manuscript-buff)] p-4 flex justify-between items-center border-b-2 border-[var(--stone-dark)] z-10">
            <span className="text-xs font-bold uppercase tracking-widest">Faculty Profile</span>
            <button onClick={() => setIsBioModalOpen(false)} className="hover:text-[var(--laterite-red)] transition-colors">
              <i className="fa-solid fa-xmark text-xl"></i>
            </button>
          </div>
          <div className="p-6 md:p-10">
            {/* Header */}
            <div className="mb-8 border-b-2 border-[var(--stone-dark)] pb-6">
              <h2 className="text-4xl font-serif font-black leading-none mb-4">
                Anita<br /><span className="text-[var(--laterite-red)] italic">Basu</span> Mallick
              </h2>
              <div className="flex flex-wrap gap-2">
                <span className="text-[10px] font-bold uppercase bg-[var(--stone-dark)] text-white px-2 py-1">Faculty Chair, Athena</span>
                <span className="text-[10px] font-bold uppercase border border-[var(--stone-dark)] px-2 py-1">Founder, IME</span>
                <span className="text-[10px] font-bold uppercase border border-[var(--stone-dark)] px-2 py-1">Western Contemporary</span>
              </div>
            </div>

            {/* Professional Overview */}
            <div className="space-y-6 font-sans text-sm md:text-base leading-relaxed text-[var(--stone-dark)]">
              <p>
                <span className="font-bold">Anita Basu Mallick</span> is a veteran vocalist and educator with over <span className="font-bold">26 years of experience</span> in both teaching and performing. A defining figure in the contemporary music landscape of Eastern India, she combines rigorous academic standards with a holistic approach to artistic expression.
              </p>
              <p>
                 She is currently a lead faculty member at <span className="font-bold italic">Athena Music Academy</span>, where she spearheads the Vocal Department, bringing her decades of expertise to the next generation of aspiring singers.
              </p>

              {/* Grid: Credentials & Outcome */}
              <div className="grid md:grid-cols-2 gap-6 my-8">
                <div className="bg-[var(--stone-dark)] text-white p-6 shadow-[4px_4px_0_0_var(--laterite-red)]">
                   <h3 className="font-serif text-lg italic mb-3 text-[var(--manuscript-buff)]">Credentials & Achievements</h3>
                   <ul className="space-y-3 text-sm">
                      <li className="flex gap-2">
                         <i className="fa-solid fa-medal text-[var(--laterite-red)] mt-1"></i>
                         <span><strong>Grade 8 Distinction</strong> in Western Contemporary Vocals from Rockschool UK.</span>
                      </li>
                      <li className="flex gap-2">
                         <i className="fa-solid fa-location-dot text-[var(--laterite-red)] mt-1"></i>
                         <span>Instrumental in introducing the <strong>Rockschool examination system</strong> to West Bengal.</span>
                      </li>
                      <li className="flex gap-2">
                         <i className="fa-solid fa-building-columns text-[var(--laterite-red)] mt-1"></i>
                         <span>Founder of the <strong>Institute of Music and Expression</strong>.</span>
                      </li>
                   </ul>
                </div>
                <div className="border-2 border-[var(--stone-dark)] p-6 bg-white">
                    <h3 className="font-serif text-lg italic mb-3 text-[var(--laterite-red)]">The Outcome</h3>
                    <ul className="space-y-2 text-sm">
                       <li className="border-b border-gray-200 pb-1">
                          <strong>Formal Examinations:</strong> Guiding students through Rockschool/Trinity.
                       </li>
                       <li className="border-b border-gray-200 pb-1">
                          <strong>Live Performance:</strong> Developing stagecraft for real-world gigs.
                       </li>
                       <li>
                          <strong>Artistic Expression:</strong> Cultivating a healthy, confident voice.
                       </li>
                    </ul>
                </div>
              </div>

              {/* Teaching Philosophy */}
              <div>
                 <div className="flex items-center gap-3 mb-4">
                    <div className="h-px w-8 bg-[var(--laterite-red)]"></div>
                    <h3 className="font-bold uppercase text-xs tracking-widest">Teaching Philosophy</h3>
                 </div>
                 <p className="mb-4">
                    Anita’s methodology moves beyond standard drills. She works closely with each student to help them find their "musical way". Her curriculum focuses on four critical pillars:
                 </p>
                 <div className="grid grid-cols-2 gap-4 text-xs font-bold uppercase tracking-wider">
                    <div className="p-3 border border-[var(--stone-dark)] bg-white/50">Technique & Longevity</div>
                    <div className="p-3 border border-[var(--stone-dark)] bg-white/50">Voice Care & Health</div>
                    <div className="p-3 border border-[var(--stone-dark)] bg-white/50">Musical Understanding</div>
                    <div className="p-3 border border-[var(--stone-dark)] bg-white/50">Posture & Presence</div>
                 </div>
              </div>
            </div>

            {/* Personal Note */}
            <div className="mt-10 p-6 bg-[var(--laterite-red)] text-white relative border-2 border-[var(--stone-dark)]">
              <i className="fa-solid fa-quote-left text-4xl absolute -top-5 -left-3 text-[var(--stone-dark)] text-white opacity-100 drop-shadow-[2px_2px_0_rgba(0,0,0,1)]"></i>
              <p className="font-serif italic text-lg leading-relaxed pt-2">
                "Qualifications matter, but what matters to me is helping singers find a healthy, confident, and expressive voice. I trust we’re going to make this happen, and you’re going to be on your musical journey real soon."
              </p>
              <div className="mt-4 text-right text-xs font-bold uppercase tracking-widest opacity-80">— Anita Basu Mallick</div>
            </div>
          </div>
        </div>
      </div>

      {/* MODAL POPUP (Assessment Form) */}
      <div className={`fixed inset-0 z-[60] transition-opacity duration-300 ${isAssessmentModalOpen ? '' : 'pointer-events-none'}`}>
        {/* Overlay */}
        <div 
            className={`absolute inset-0 bg-[var(--stone-dark)]/95 backdrop-blur-sm modal-overlay ${isAssessmentModalOpen ? 'opacity-100' : 'opacity-0'}`} 
            onClick={() => setIsAssessmentModalOpen(false)}
        ></div>
        
        {/* Content */}
        <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] max-w-md bg-[var(--manuscript-buff)] border-2 border-[var(--stone-dark)] shadow-[8px_8px_0px_0px_var(--laterite-red)] max-h-[90vh] overflow-y-auto transform modal-content ${isAssessmentModalOpen ? 'opacity-100 scale-100 translate-x-[-50%] translate-y-[-50%]' : 'opacity-0 scale-95 translate-x-[-50%] translate-y-[-50%]'}`}>
          <div className="sticky top-0 bg-[var(--stone-dark)] text-[var(--manuscript-buff)] p-4 flex justify-between items-center border-b-2 border-[var(--stone-dark)] z-10">
            <span className="text-xs font-bold uppercase tracking-widest">Start Journey</span>
            <button onClick={() => setIsAssessmentModalOpen(false)} className="hover:text-[var(--laterite-red)] transition-colors">
              <i className="fa-solid fa-xmark text-xl"></i>
            </button>
          </div>
          <div className="p-6 md:p-8">
            <div className="mb-6">
              <h2 className="text-3xl font-serif font-black leading-none mb-2 text-[var(--stone-dark)]">
                Book <span className="text-[var(--laterite-red)] italic">Assessment</span>
              </h2>
              <p className="text-xs font-mono opacity-70">
                Begin your vocal transformation. We will contact you to schedule your initial voice analysis.
              </p>
            </div>
            
            <form onSubmit={handleAssessmentSubmit} className="space-y-4">
              <div className="group">
                 <label className="block text-[10px] font-bold uppercase tracking-widest mb-1 group-focus-within:text-[var(--laterite-red)] transition-colors">Name</label>
                 <input 
                    type="text" 
                    required 
                    className="w-full bg-transparent border-2 border-[var(--stone-dark)] p-3 text-sm focus:bg-white outline-none transition-colors placeholder:text-[var(--stone-dark)]/30" 
                    placeholder="ENTER FULL NAME" 
                 />
              </div>
              <div className="group">
                 <label className="block text-[10px] font-bold uppercase tracking-widest mb-1 group-focus-within:text-[var(--laterite-red)] transition-colors">Email</label>
                 <input 
                    type="email" 
                    required 
                    className="w-full bg-transparent border-2 border-[var(--stone-dark)] p-3 text-sm focus:bg-white outline-none transition-colors placeholder:text-[var(--stone-dark)]/30" 
                    placeholder="EMAIL ADDRESS" 
                 />
              </div>
              <div className="group">
                 <label className="block text-[10px] font-bold uppercase tracking-widest mb-1 group-focus-within:text-[var(--laterite-red)] transition-colors">Phone</label>
                 <input 
                    type="tel" 
                    required 
                    className="w-full bg-transparent border-2 border-[var(--stone-dark)] p-3 text-sm focus:bg-white outline-none transition-colors placeholder:text-[var(--stone-dark)]/30" 
                    placeholder="PHONE NUMBER" 
                 />
              </div>

              <button type="submit" className="w-full bg-[var(--stone-dark)] text-white py-4 font-bold uppercase tracking-widest hover:bg-[var(--laterite-red)] transition-colors mt-4 border-2 border-transparent">
                Submit Request
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* MODAL POPUP (Contact) */}
      <div className={`fixed inset-0 z-[60] transition-opacity duration-300 ${isContactModalOpen ? '' : 'pointer-events-none'}`}>
        {/* Overlay */}
        <div 
            className={`absolute inset-0 bg-[var(--stone-dark)]/95 backdrop-blur-sm modal-overlay ${isContactModalOpen ? 'opacity-100' : 'opacity-0'}`} 
            onClick={() => setIsContactModalOpen(false)}
        ></div>
        
        {/* Content */}
        <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] max-w-sm bg-[var(--manuscript-buff)] border-2 border-[var(--stone-dark)] shadow-[8px_8px_0px_0px_var(--laterite-red)] transform modal-content ${isContactModalOpen ? 'opacity-100 scale-100 translate-x-[-50%] translate-y-[-50%]' : 'opacity-0 scale-95 translate-x-[-50%] translate-y-[-50%]'}`}>
          <div className="bg-[var(--stone-dark)] text-[var(--manuscript-buff)] p-4 flex justify-between items-center border-b-2 border-[var(--stone-dark)]">
            <span className="text-xs font-bold uppercase tracking-widest">Contact Options</span>
            <button onClick={() => setIsContactModalOpen(false)} className="hover:text-[var(--laterite-red)] transition-colors">
              <i className="fa-solid fa-xmark text-xl"></i>
            </button>
          </div>
          
          <div className="p-8 flex flex-col gap-4">
            <div className="text-center mb-6">
                <h3 className="text-3xl font-serif font-black text-[var(--stone-dark)] mb-2">+91 90900 23423</h3>
                <div className="h-px w-16 bg-[var(--laterite-red)] mx-auto mb-2"></div>
                <p className="text-[10px] font-bold uppercase tracking-widest opacity-60">Admissions & Enquiries</p>
            </div>

            <a 
                href="tel:+919090023423" 
                className="group flex items-center justify-between px-6 py-4 border-2 border-[var(--stone-dark)] hover:bg-[var(--stone-dark)] hover:text-white transition-all duration-300"
            >
                <span className="font-bold uppercase tracking-widest text-sm">Call Us</span>
                <i className="fa-solid fa-phone-flip text-lg group-hover:rotate-12 transition-transform"></i>
            </a>

            <a 
                href="https://wa.me/919090023423" 
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center justify-between px-6 py-4 border-2 border-[var(--stone-dark)] hover:bg-[var(--stone-dark)] hover:text-white transition-all duration-300"
            >
                <span className="font-bold uppercase tracking-widest text-sm">WhatsApp</span>
                <i className="fa-brands fa-whatsapp text-xl group-hover:scale-110 transition-transform"></i>
            </a>
          </div>
        </div>
      </div>
    </>
  );
}