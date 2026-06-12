import React, { useState, useCallback, useEffect, useRef } from 'react';
import { ArrowRight } from 'lucide-react';
import { gsap } from 'gsap';
import { useNavigate } from 'react-router-dom';
import TypewriterText from '../components/TypewriterText';
import SearchResultsModal from '../components/SearchResultsModal';
import useAuth from '../store/Useauth';

const typewriterWords = [
    'In YouTube Conversations',
    'In Millions of Comments',
    'Inside Viral Discussions',
    'In Community Feedback',
    'In Trending Videos',
    'In Meaningful Conversation',
    'Across Comment Sections',
    'In Real Audience Opinions',
    'Among Millions of Viewers',
    'Inside Every Discussion',
    'Across Global Conversation',
];

const HeroSection = () => {
    const { authStatus } = useAuth();
    const navigate = useNavigate();

    const [isOpenSearchMenu, setIsOpenSearchMenu] = useState(false);
    const [comments, setComments] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const sectionRef = useRef(null);
    const headlineRef = useRef(null);
    const typewriterRef = useRef(null);
    const bodyRef = useRef(null);
    const ctaRef = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.set(
                [headlineRef.current, typewriterRef.current, bodyRef.current, ctaRef.current],
                { opacity: 0, y: 28 }
            );

            const tl = gsap.timeline({ delay: 0.1, defaults: { ease: 'power3.out' } });

            tl.to(headlineRef.current,   { opacity: 1, y: 0, duration: 0.7 })
              .to(typewriterRef.current, { opacity: 1, y: 0, duration: 0.6 }, '-=0.4')
              .to(bodyRef.current,       { opacity: 1, y: 0, duration: 0.55 }, '-=0.3')
              .to(ctaRef.current,        { opacity: 1, y: 0, duration: 0.5 },  '-=0.25');
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    const handleTryNow = () => {
        gsap.timeline()
            .to(ctaRef.current, { scale: 0.96, duration: 0.1, ease: 'power2.in' })
            .to(ctaRef.current, { scale: 1,    duration: 0.2, ease: 'power2.out' });

        if (authStatus) {
            navigate('/find-comments');
        } else {
            navigate('/login');
        }
    };

    const closeSearchMenu = useCallback(() => {
        setIsOpenSearchMenu(false);
        document.body.style.overflow = 'unset';
        setComments([]);
    }, []);

    return (
        <>
            {/*
              ── Height fix ───────────────────────────────────────────────────
              Replaced  min-h-screen  with a fixed compact height.
              Removed the large py-20/py-28 vertical padding from the inner div.
              Added overflow-hidden so nothing bleeds out.
            */}
            <section
                ref={sectionRef}
                className="flex items-center justify-center bg-white overflow-hidden"
                style={{ minHeight: 'calc(100vh - 56px)', paddingTop: '56px' }}
            >
                <div className="w-full max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center py-10 sm:py-14">

                    {/* Static headline */}
                    <h1
                        ref={headlineRef}
                        className="text-4xl sm:text-5xl lg:text-[3.5rem] font-bold text-gray-900 leading-tight mb-2"
                        style={{ fontFamily: "'Georgia', 'Times New Roman', serif" }}
                    >
                        Find&nbsp; What&nbsp;Matters,
                    </h1>

                    {/*
                      ── Typewriter line ──────────────────────────────────────
                      - Slightly smaller than the headline: text-3xl / text-4xl / text-5xl
                        vs headline's text-4xl / text-5xl / text-[3.5rem]
                      - min-h keeps layout stable while text changes
                      - mb reduced to keep spacing tight
                    */}
                    <div
                        ref={typewriterRef}
                        className="text-3xl sm:text-4xl lg:text-5xl font-bold text-blue-500 leading-tight mb-8 sm:mb-10"
                        style={{
                            fontFamily: "'Georgia', 'Times New Roman', serif",
                            minHeight: '1.25em',
                        }}
                    >
                        <TypewriterText words={typewriterWords} />
                    </div>

                    {/* Body copy */}
                    <p
                        ref={bodyRef}
                        className="text-sm sm:text-base text-gray-500 max-w-lg mx-auto leading-relaxed mb-8 sm:mb-10"
                    >
                        Discover similar comments and conversations across YouTube videos.
                        Find the discussions that matter most to you and get quick answers with
                        our built-in chat assistant.
                    </p>

                    {/* CTA */}
                    <div ref={ctaRef} className="flex justify-center">
                        <button
                            onClick={handleTryNow}
                            disabled={isLoading}
                            className="
                                inline-flex items-center gap-2
                                bg-blue-500 hover:bg-blue-600 active:bg-blue-700
                                text-white font-semibold text-base sm:text-lg
                                px-8 sm:px-10 py-2.5 sm:py-3
                                rounded-full
                                shadow-md hover:shadow-lg hover:shadow-blue-200
                                transition-all duration-200
                                disabled:opacity-60 disabled:cursor-not-allowed
                            "
                        >
                            <span>Try Now</span>
                            <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
                        </button>
                    </div>
                </div>
            </section>

            <SearchResultsModal
                isOpen={isOpenSearchMenu}
                onClose={closeSearchMenu}
                comments={comments}
                isLoading={isLoading}
            />
        </>
    );
};

export default HeroSection;