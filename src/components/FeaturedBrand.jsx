import React, { useEffect, useRef, useState } from 'react';

const brands = [
  { id: 1, logo: '/images/desktopSlide/desktop1.jpg', name: 'Aurora Tech' },
  { id: 2, logo: '/images/desktopSlide/desktop2.jpg', name: 'Celeste Apparel' },
  { id: 3, logo: '/images/desktopSlide/desktop3.jpg', name: 'Nexa Home' },
  { id: 4, logo: '/images/desktopSlide/desktop4.jpg', name: 'Pulse Gadgets' },
  { id: 5, logo: '/images/desktopSlide/desktop5.jpg', name: 'Lumen Beauty' },
];

export default function FeaturedBrand() {
  const containerRef = useRef(null);
  const timerRef = useRef(null);
  const [isPaused, setIsPaused] = useState(false);

  // Autoplay: scroll by one "page" every interval
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const getStep = () => {
      // Attempt to measure a brand card; fallback to half container width
      const card = container.querySelector('[data-brand]');
      const gap = 24; // matches gap-6 (1.5rem ~ 24px)
      return card ? card.offsetWidth + gap : Math.floor(container.clientWidth / 2);
    };

    const start = () => {
      if (timerRef.current) return;
      timerRef.current = setInterval(() => {
        if (isPaused) return;
        const step = getStep();
        // If we're near the end, jump back to start for seamless loop
        if (container.scrollLeft + container.clientWidth >= container.scrollWidth - 10) {
          container.scrollTo({ left: 0, behavior: 'smooth' });
        } else {
          container.scrollBy({ left: step, behavior: 'smooth' });
        }
      }, 2600);
    };

    const stop = () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
    };

    start();
    return () => stop();
  }, [isPaused]);

  // Pause on user interaction
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const onEnter = () => setIsPaused(true);
    const onLeave = () => setIsPaused(false);

    container.addEventListener('mouseenter', onEnter);
    container.addEventListener('focusin', onEnter);
    container.addEventListener('mouseleave', onLeave);
    container.addEventListener('focusout', onLeave);

    return () => {
      container.removeEventListener('mouseenter', onEnter);
      container.removeEventListener('focusin', onEnter);
      container.removeEventListener('mouseleave', onLeave);
      container.removeEventListener('focusout', onLeave);
    };
  }, []);

  const scrollByAmount = (dir = 1) => {
    const container = containerRef.current;
    if (!container) return;
    const card = container.querySelector('[data-brand]');
    const gap = 24;
    const step = card ? card.offsetWidth + gap : Math.floor(container.clientWidth / 2);
    container.scrollBy({ left: step * dir, behavior: 'smooth' });
  };

  return (
    <section className="py-12">
      <div className="max-w-7xl mx-auto px-4 lg:px-6">
        <div className="relative rounded-2xl overflow-hidden bg-[#111827] p-6 md:p-10 text-white">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
            <div>
              <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight">
                Trusted by innovative brands worldwide
              </h2>
              <p className="mt-2 text-sm text-sky-100/85 max-w-2xl">
                We collaborate with established labels and emerging creators to bring curated collections,
                exclusive launches, and certified partners — all showcased below. Browse partner logos, learn
                about collaborations, or reach out to join our partner network.
              </p>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => scrollByAmount(-1)}
                aria-label="Previous brands"
                className="inline-flex items-center justify-center h-10 px-3 rounded-md bg-white/10 hover:bg-white/20 transition focus:outline-none"
              >
                ‹
              </button>
              <button
                onClick={() => scrollByAmount(1)}
                aria-label="Next brands"
                className="inline-flex items-center justify-center h-10 px-3 rounded-md bg-white/10 hover:bg-white/20 transition focus:outline-none"
              >
                ›
              </button>
              <a
                href="#partner"
                className="hidden md:inline-block ml-2 px-4 py-2 rounded-md bg-white text-indigo-700 font-medium hover:opacity-95"
              >
                Partner with us
              </a>
            </div>
          </div>

          {/* Brands carousel */}
          <div
            ref={containerRef}
            className="relative overflow-x-auto scrollbar-hide snap-x snap-mandatory scroll-smooth"
            tabIndex={0}
            aria-label="Featured brand logos carousel"
          >
            <div className="flex items-center gap-6 py-4">
              {/* Render twice for extended scrollable range; keeps manual + autoplay feel good */}
              {[...brands, ...brands].map((brand, idx) => (
                <div
                  key={`${brand.id}-${idx}`}
                  data-brand
                  className="flex-shrink-0 w-40 h-28 md:w-48 md:h-32 bg-white/10 backdrop-blur-sm rounded-xl border border-white/10 flex items-center justify-center p-3 transform transition hover:scale-105 hover:shadow-2xl"
                  role="group"
                  aria-label={brand.name}
                >
                  <img
                    src={brand.logo}
                    alt={brand.name}
                    loading="lazy"
                    className="max-h-16 md:max-h-20 object-contain filter grayscale opacity-90 group-hover:grayscale-0 group-hover:opacity-100 transition"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Decorative SVG */}
          <svg
            className="pointer-events-none absolute -right-10 -bottom-6 opacity-30 w-64 h-64"
            viewBox="0 0 120 120"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden
          >
            <defs>
              <linearGradient id="g" x1="0" x2="1">
                <stop offset="0" stopColor="#fff" stopOpacity="0.2" />
                <stop offset="1" stopColor="#fff" stopOpacity="0.02" />
              </linearGradient>
            </defs>
            <circle cx="60" cy="60" r="50" fill="url(#g)" />
          </svg>
        </div>

        {/* Caption / Extra */}
        <div className="mt-6 text-center md:text-left">
          <p className="text-sm text-gray-600">
            Our partner network spans tech innovators, fashion houses, and home brands — each vetted for quality and reliability.
            Want your brand featured? Click "Partner with us" to learn about collaboration opportunities, co-marketing, and more.
          </p>
        </div>
      </div>
    </section>
  );
}
