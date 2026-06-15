import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useNavigate } from 'react-router-dom';

gsap.registerPlugin(ScrollTrigger);

// ── Feature data ──────────────────────────────────────────────────────────────
const features = [
    {
        id: 1,
        title: 'SMART SEARCH',
        description:
            'Paste any YouTube video URL and describe the type of comment youre looking for. Our AI instantly surfaces the most relevant results.',
        // SVG: magnifying glass
        icon: (
            <svg viewBox="0 0 48 48" fill="none" className="w-9 h-9" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="21" cy="21" r="13" />
                <line x1="31" y1="31" x2="43" y2="43" />
            </svg>
        ),
    },
    {
        id: 2,
        title: 'INSTANT RESULTS',
        description:
            'No more endless scrolling. Find thousands of related comments in seconds, ranked by relevance so the best ones surface first.',
        // SVG: lightning bolt
        icon: (
            <svg viewBox="0 0 48 48" fill="none" className="w-9 h-9" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="28,6 14,26 24,26 20,42 34,22 24,22 28,6" />
            </svg>
        ),
    },
    {
        id: 3,
        title: 'AI ASSISTANT',
        description:
            'Have a question about a comment? Our built-in AI assistant can explain context, provide insights, and answer anything youre curious about.',
        // SVG: chat bubble with sparkle
        icon: (
            <svg viewBox="0 0 48 48" fill="none" className="w-9 h-9" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M8 8h32a2 2 0 012 2v20a2 2 0 01-2 2H16l-8 8V10a2 2 0 012-2z" />
                <line x1="17" y1="20" x2="31" y2="20" />
                <line x1="17" y1="26" x2="25" y2="26" />
            </svg>
        ),
    },
    {
        id: 4,
        title: 'TIME SAVER',
        description:
            'Save hours youd otherwise spend manually reading through comment sections. SimpliFind does the heavy lifting so you can focus on what matters.',
        // SVG: clock
        icon: (
            <svg viewBox="0 0 48 48" fill="none" className="w-9 h-9" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="24" cy="24" r="17" />
                <polyline points="24,13 24,24 32,30" />
            </svg>
        ),
    },
];

// ── Card component ────────────────────────────────────────────────────────────
// Alternates: odd cards (1,3) = blue bg, even cards (2,4) = white bg
// Matches the image's alternating pattern exactly
const FeatureCard = ({ feature, index, cardRef }) => {
    const isBlue = index % 2 === 0; // 0-indexed: 0,2 → blue; 1,3 → white

    return (
        <div
            ref={cardRef}
            style={{ opacity: 0, transform: 'translateY(40px)' }}
            className={`
                relative flex flex-col items-center text-center
                rounded-2xl px-7 py-10
                transition-all duration-300
                hover:-translate-y-2 hover:shadow-xl
                cursor-default
                ${isBlue
                    ? 'bg-blue-500 text-white shadow-lg shadow-blue-200'
                    : 'bg-white text-gray-800 shadow-md border border-gray-100'}
            `}
        >
            {/* Icon circle */}
            <div
                className={`
                    w-16 h-16 rounded-full flex items-center justify-center mb-6 flex-shrink-0
                    ${isBlue
                        ? 'bg-white/20 text-white'
                        : 'bg-blue-50 text-blue-500'}
                `}
            >
                {feature.icon}
            </div>

            {/* Title */}
            <h3
                className={`
                    text-sm font-bold tracking-widest mb-4 uppercase
                    ${isBlue ? 'text-white' : 'text-blue-500'}
                `}
            >
                {feature.title}
            </h3>

            {/* Description */}
            <p
                className={`
                    text-sm leading-relaxed mb-8 flex-1
                    ${isBlue ? 'text-blue-100' : 'text-gray-500'}
                `}
            >
                {feature.description}
            </p>

            {/* "MORE" link */}
            <span
                className={`
                    text-xs font-bold tracking-widest uppercase
                    border-b-2 pb-0.5
                    ${isBlue
                        ? 'text-white border-white/60 hover:border-white'
                        : 'text-blue-500 border-blue-300 hover:border-blue-500'}
                    transition-colors duration-200 cursor-pointer
                `}
            >
                MORE
            </span>
        </div>
    );
};

// ── Section ───────────────────────────────────────────────────────────────────
const FeaturesSection = () => {
    const sectionRef  = useRef(null);
    const headingRef  = useRef(null);
    const cardRefs    = useRef([]);

    useEffect(() => {
        const ctx = gsap.context(() => {

            // Heading
            gsap.fromTo(
                headingRef.current,
                { y: 28, opacity: 0 },
                {
                    y: 0, opacity: 1,
                    duration: 0.65,
                    ease: 'power3.out',
                    scrollTrigger: {
                        trigger: headingRef.current,
                        start: 'top 86%',
                        once: true,
                    },
                }
            );

            // Cards stagger in
            cardRefs.current.forEach((el, i) => {
                if (!el) return;
                gsap.fromTo(
                    el,
                    { y: 48, opacity: 0 },
                    {
                        y: 0, opacity: 1,
                        duration: 0.55,
                        ease: 'power3.out',
                        delay: i * 0.1,
                        scrollTrigger: {
                            trigger: sectionRef.current,
                            start: 'top 72%',
                            once: true,
                        },
                    }
                );
            });

        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section
            ref={sectionRef}
            id="features"
            className="w-full py-16 sm:py-20 lg:py-24 px-4 sm:px-8 bg-white"
        >
            <div className="max-w-6xl mx-auto">

                {/* Heading */}
                <div ref={headingRef} className="text-center mb-12 lg:mb-16" style={{ opacity: 0 }}>
                    <p className="text-xs font-semibold uppercase tracking-widest text-blue-500 mb-3">
                        What we offer
                    </p>
                    <h2
                        className="text-3xl sm:text-4xl lg:text-[2.6rem] font-bold text-gray-900 leading-tight"
                        style={{ fontFamily: "'Georgia', serif" }}
                    >
                        Everything you need to find
                        <br className="hidden sm:block" />
                        <span className="text-blue-500"> what matters</span>
                    </h2>
                </div>

                {/* Cards grid — 1 col mobile, 2 col tablet, 4 col desktop */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-6">
                    {features.map((feature, i) => (
                        <FeatureCard
                            key={feature.id}
                            feature={feature}
                            index={i}
                            cardRef={el => (cardRefs.current[i] = el)}
                        />
                    ))}
                </div>

            </div>
        </section>
    );
};

export default FeaturesSection;