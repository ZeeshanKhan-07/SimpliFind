import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import HIWImage1 from '../images/HIWImage1.svg';
import HIWImage2 from '../images/HIWImage2.svg';
import HIWImage3 from '../images/HIWImage3.svg';
import HIWImage4 from '../images/HIWImage4.svg';
import HIWImage5 from '../images/HIWImage5.svg';
import HIWImage6 from '../images/HIWImage6.svg';
import HIWImage7 from '../images/HIWImage7.svg';
import HIWImage8 from '../images/HIWImage8.svg';

gsap.registerPlugin(ScrollTrigger);

const steps = [
    { id: 1, image: HIWImage1, caption: "There are thousands of comments. How can I find the relevant ones? I don't have much time." },
    { id: 2, image: HIWImage2, caption: 'Why am I afraid? I have SimpliFind.' },
    { id: 3, image: HIWImage3, caption: 'Found relevant comments in seconds among thousands of comments.' },
    { id: 4, image: HIWImage4, caption: 'Yay! I saved a lot of time.' },
    { id: 5, image: HIWImage5, caption: 'Wait, I have a question about a comment.' },
    { id: 6, image: HIWImage6, caption: "Hi! I'm your AI assistant. Ask me anything about this comment." },
    { id: 7, image: HIWImage7, caption: "I think you've got your answer now." },
    { id: 8, image: HIWImage8, caption: 'Thanks, SimpliFind!' },
];

// Card size in px — used to compute arrow vertical position
const CARD_SIZE = 160; // matches w-40 h-40
const BADGE_H   = 36 + 12; // badge height + mb-3

// Horizontal arrow — simple clean line with arrowhead
const HArrowSVG = ({ flip = false }) => (
    <svg
        viewBox="0 0 80 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ transform: flip ? 'scaleX(-1)' : 'none' }}
        className="w-full h-full"
    >
        <line x1="4" y1="10" x2="70" y2="10" stroke="#9ca3af" strokeWidth="1.6" strokeLinecap="round" />
        <polyline points="60,3 74,10 60,17" fill="none" stroke="#9ca3af" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
);

// Vertical arrow — points downward
const VArrowSVG = () => (
    <svg viewBox="0 0 20 80" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
        <line x1="10" y1="4" x2="10" y2="70" stroke="#9ca3af" strokeWidth="1.6" strokeLinecap="round" />
        <polyline points="3,60 10,74 17,60" fill="none" stroke="#9ca3af" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
);

const HowItWorks = () => {
    const sectionRef  = useRef(null);
    const headingRef  = useRef(null);
    const card1Refs   = useRef([]); // row 1 cards (steps 1-4)
    const card2Refs   = useRef([]); // row 2 cards (steps 5-8, visual order 8→5)
    const ha1Refs     = useRef([]); // row 1 h-arrows
    const ha2Refs     = useRef([]); // row 2 h-arrows
    const vaRef       = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Heading
            gsap.fromTo(headingRef.current,
                { y: 28, opacity: 0 },
                { y: 0, opacity: 1, duration: 0.7, ease: 'power3.out',
                  scrollTrigger: { trigger: headingRef.current, start: 'top 86%' } }
            );

            // Row 1 cards — stagger cascade
            card1Refs.current.forEach((el, i) => {
                if (!el) return;
                gsap.fromTo(el,
                    { y: 36, opacity: 0 },
                    { y: 0, opacity: 1, duration: 0.5, ease: 'power3.out', delay: i * 0.1,
                      scrollTrigger: { trigger: sectionRef.current, start: 'top 70%' } }
                );
            });

            // Row 1 arrows — draw after card appears
            ha1Refs.current.forEach((el, i) => {
                if (!el) return;
                gsap.fromTo(el,
                    { scaleX: 0, opacity: 0 },
                    { scaleX: 1, opacity: 1, duration: 0.35, ease: 'power2.out',
                      delay: (i + 1) * 0.1 + 0.15,
                      transformOrigin: 'left center',
                      scrollTrigger: { trigger: sectionRef.current, start: 'top 70%' } }
                );
            });

            // Vertical arrow
            if (vaRef.current) {
                gsap.fromTo(vaRef.current,
                    { scaleY: 0, opacity: 0 },
                    { scaleY: 1, opacity: 1, duration: 0.4, ease: 'power2.out',
                      delay: 0.45,
                      transformOrigin: 'top center',
                      scrollTrigger: { trigger: sectionRef.current, start: 'top 70%' } }
                );
            }

            // Row 2 cards
            card2Refs.current.forEach((el, i) => {
                if (!el) return;
                gsap.fromTo(el,
                    { y: 36, opacity: 0 },
                    { y: 0, opacity: 1, duration: 0.5, ease: 'power3.out', delay: i * 0.1,
                      scrollTrigger: { trigger: sectionRef.current, start: 'top 60%' } }
                );
            });

            // Row 2 arrows
            ha2Refs.current.forEach((el, i) => {
                if (!el) return;
                gsap.fromTo(el,
                    { scaleX: 0, opacity: 0 },
                    { scaleX: 1, opacity: 1, duration: 0.35, ease: 'power2.out',
                      delay: (i + 1) * 0.1 + 0.15,
                      transformOrigin: 'left center',
                      scrollTrigger: { trigger: sectionRef.current, start: 'top 60%' } }
                );
            });

        }, sectionRef);

        return () => ctx.revert();
    }, []);

    // Row 2 display order is 8 → 7 → 6 → 5 (right to left in the image)
    const row2 = [...steps.slice(4)].reverse();

    return (
        <section id="how-it-works" ref={sectionRef} className="w-full bg-white py-16 sm:py-20 lg:py-24 px-4 sm:px-6">
            <div className="max-w-6xl mx-auto">

                {/* Heading */}
                <h2
                    ref={headingRef}
                    className="text-center text-3xl sm:text-4xl lg:text-[2.75rem] font-bold text-gray-900 mb-14 lg:mb-20 leading-tight"
                    style={{ opacity: 0, fontFamily: "'Georgia', serif" }}
                >
                    This is how Simpli<span className="text-blue-500">Find</span> works
                </h2>

                {/* ── DESKTOP (lg+) ─────────────────────────────────────────── */}
                <div className="hidden lg:block">

                    {/*
                      Layout strategy:
                      Each row uses CSS grid with explicit columns:
                        [card] [arrow-gap] [card] [arrow-gap] [card] [arrow-gap] [card]
                      Arrow gap columns are fixed width (64px) so arrows don't squish.
                      Cards get equal 1fr each.
                      Arrows are positioned to vertically center on the IMAGE area
                      (badge + card center), not the whole card+caption cell.
                    */}

                    {/* ROW 1 — steps 1 → 4, arrows pointing right */}
                    <div
                        className="grid items-start mb-0"
                        style={{ gridTemplateColumns: '1fr 64px 1fr 64px 1fr 64px 1fr' }}
                    >
                        {steps.slice(0, 4).map((step, i) => (
                            <React.Fragment key={step.id}>
                                {/* Card cell */}
                                <div
                                    ref={el => (card1Refs.current[i] = el)}
                                    className="flex flex-col items-center"
                                    style={{ opacity: 0 }}
                                >
                                    <div className="w-9 h-9 rounded-full bg-blue-500 text-white flex items-center justify-center font-bold text-sm mb-3 shadow-md shadow-blue-200">
                                        {step.id}
                                    </div>
                                    <div className="w-40 h-40 rounded-2xl border border-gray-200 bg-white shadow-sm overflow-hidden flex items-center justify-center p-2.5 hover:shadow-md transition-shadow duration-300">
                                        <img src={step.image} alt={`Step ${step.id}`} className="w-full h-full object-contain" draggable={false} />
                                    </div>
                                    <p className="mt-3 text-center text-xs text-gray-500 leading-snug max-w-[9rem]">{step.caption}</p>
                                </div>

                                {/* Arrow gap cell — only between cards (not after last) */}
                                {i < 3 && (
                                    <div
                                        ref={el => (ha1Refs.current[i] = el)}
                                        className="flex items-center"
                                        style={{
                                            opacity: 0,
                                            // push arrow down to vertically center it on the card image
                                            // badge(36) + mb-3(12) + half card(80) - half arrow height(10) = 118px
                                            paddingTop: '118px',
                                            height: '100%',
                                        }}
                                    >
                                        <div style={{ width: '64px', height: '20px' }}>
                                            <HArrowSVG />
                                        </div>
                                    </div>
                                )}
                            </React.Fragment>
                        ))}
                    </div>

                    {/* VERTICAL ARROW — right side, connecting step 4 (right col) down to step 5 */}
                    <div className="grid" style={{ gridTemplateColumns: '1fr 64px 1fr 64px 1fr 64px 1fr' }}>
                        {/* empty cols 1-6 */}
                        {[0,1,2,3,4,5].map(n => <div key={n} />)}
                        {/* col 7 = rightmost card column → arrow goes here */}
                        <div className="flex justify-center" style={{ height: '64px' }}>
                            <div
                                ref={el => (vaRef.current = el)}
                                style={{ opacity: 0, width: '20px', height: '64px' }}
                            >
                                <VArrowSVG />
                            </div>
                        </div>
                    </div>

                    {/* ROW 2 — steps 8 → 5, arrows pointing left (flip) */}
                    <div
                        className="grid items-start"
                        style={{ gridTemplateColumns: '1fr 64px 1fr 64px 1fr 64px 1fr' }}
                    >
                        {row2.map((step, i) => (
                            <React.Fragment key={step.id}>
                                <div
                                    ref={el => (card2Refs.current[i] = el)}
                                    className="flex flex-col items-center"
                                    style={{ opacity: 0 }}
                                >
                                    <div className="w-9 h-9 rounded-full bg-blue-500 text-white flex items-center justify-center font-bold text-sm mb-3 shadow-md shadow-blue-200">
                                        {step.id}
                                    </div>
                                    <div className="w-40 h-40 rounded-2xl border border-gray-200 bg-white shadow-sm overflow-hidden flex items-center justify-center p-2.5 hover:shadow-md transition-shadow duration-300">
                                        <img src={step.image} alt={`Step ${step.id}`} className="w-full h-full object-contain" draggable={false} />
                                    </div>
                                    <p className="mt-3 text-center text-xs text-gray-500 leading-snug max-w-[9rem]">{step.caption}</p>
                                </div>

                                {i < 3 && (
                                    <div
                                        ref={el => (ha2Refs.current[i] = el)}
                                        className="flex items-center"
                                        style={{
                                            opacity: 0,
                                            paddingTop: '118px',
                                            height: '100%',
                                        }}
                                    >
                                        {/* flip=true so arrow points LEFT (← snake direction) */}
                                        <div style={{ width: '64px', height: '20px' }}>
                                            <HArrowSVG flip={true} />
                                        </div>
                                    </div>
                                )}
                            </React.Fragment>
                        ))}
                    </div>
                </div>

                {/* ── MOBILE / TABLET (< lg) ────────────────────────────────── */}
                <div className="lg:hidden grid grid-cols-2 gap-x-6 gap-y-10 place-items-center">
                    {steps.map((step, i) => (
                        <div
                            key={step.id}
                            className="flex flex-col items-center"
                            style={{ opacity: 0, transform: 'translateY(28px)' }}
                            ref={el => {
                                if (!el) return;
                                ScrollTrigger.create({
                                    trigger: el,
                                    start: 'top 92%',
                                    once: true,
                                    onEnter: () =>
                                        gsap.to(el, {
                                            opacity: 1, y: 0,
                                            duration: 0.5, ease: 'power3.out',
                                            delay: (i % 2) * 0.1,
                                        }),
                                });
                            }}
                        >
                            <div className="w-8 h-8 rounded-full bg-blue-500 text-white flex items-center justify-center font-bold text-xs mb-2.5 shadow-md shadow-blue-200">
                                {step.id}
                            </div>
                            <div className="w-32 h-32 sm:w-36 sm:h-36 rounded-2xl border border-gray-200 bg-white shadow-sm overflow-hidden flex items-center justify-center p-2">
                                <img src={step.image} alt={`Step ${step.id}`} className="w-full h-full object-contain" draggable={false} />
                            </div>
                            <p className="mt-2.5 text-center text-[0.65rem] sm:text-xs text-gray-500 leading-snug max-w-[8rem]">
                                {step.caption}
                            </p>
                        </div>
                    ))}
                </div>

            </div>
        </section>
    );
};

export default HowItWorks;