import React, { useState, useRef, useEffect } from 'react';
import { ArrowRight, Loader2, Link2, MessageSquareText, Search, Youtube } from 'lucide-react';
import { gsap } from 'gsap';
import { searchCommentsApi } from '../services/commentService';
import SearchResultsModal from '../components/SearchResultsModal';

export default function FindComments() {
    const [videoUrl, setVideoUrl] = useState('');
    const [searchQuery, setSearchQuery] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [errorMsg, setErrorMsg] = useState('');

    const [commentsList, setCommentsList] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);

    // ── Refs for animation ───────────────────────────────────────────────────
    const pageRef      = useRef(null);
    const headingRef    = useRef(null);
    const subRef        = useRef(null);
    const cardRef       = useRef(null);
    const field1Ref     = useRef(null);
    const field2Ref     = useRef(null);
    const buttonRef     = useRef(null);
    const errorRef      = useRef(null);
    const bubblesRef    = useRef(null);

    // ── Mount animation ──────────────────────────────────────────────────────
    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.set([headingRef.current, subRef.current, cardRef.current], {
                y: 24,
                opacity: 0,
            });

            const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
            tl.to(headingRef.current, { y: 0, opacity: 1, duration: 0.6 })
              .to(subRef.current, { y: 0, opacity: 1, duration: 0.5 }, '-=0.35')
              .to(cardRef.current, { y: 0, opacity: 1, duration: 0.6 }, '-=0.3');

            const fields = [field1Ref.current, field2Ref.current].filter(Boolean);
            gsap.fromTo(
                fields,
                { x: -16, opacity: 0 },
                { x: 0, opacity: 1, duration: 0.45, stagger: 0.12, ease: 'power2.out', delay: 0.55 }
            );

            // Ambient floating comment bubbles drifting up behind the card
            const bubbles = bubblesRef.current?.querySelectorAll('.bubble');
            bubbles?.forEach((el) => {
                const duration = gsap.utils.random(6, 11);
                const delay = gsap.utils.random(0, 4);
                const xDrift = gsap.utils.random(-18, 18);
                gsap.set(el, { y: 40, opacity: 0 });
                gsap.to(el, {
                    y: -260,
                    x: `+=${xDrift}`,
                    opacity: 0,
                    duration,
                    delay,
                    repeat: -1,
                    ease: 'none',
                    onRepeat: () => gsap.set(el, { y: 40, opacity: 0 }),
                    onStart: function () {
                        gsap.to(el, { opacity: 0.9, duration: 1, delay: 0.05 });
                    },
                });
            });
        }, pageRef);

        return () => ctx.revert();
    }, []);

    // ── Error shake ──────────────────────────────────────────────────────────
    useEffect(() => {
        if (errorMsg && errorRef.current) {
            gsap.fromTo(
                errorRef.current,
                { x: -6, opacity: 0 },
                { x: 0, opacity: 1, duration: 0.3, ease: 'power2.out' }
            );
            gsap.fromTo(
                errorRef.current,
                { x: 0 },
                { x: 4, duration: 0.08, repeat: 3, yoyo: true, ease: 'power1.inOut', delay: 0.05 }
            );
        }
    }, [errorMsg]);

    const handleFieldFocus = (ref) => {
        gsap.to(ref.current, { scale: 1.012, duration: 0.25, ease: 'power2.out' });
    };
    const handleFieldBlur = (ref) => {
        gsap.to(ref.current, { scale: 1, duration: 0.25, ease: 'power2.out' });
    };

    const handleButtonEnter = () => {
        if (isLoading) return;
        gsap.to(buttonRef.current, { scale: 1.04, duration: 0.2, ease: 'power2.out' });
    };
    const handleButtonLeave = () => {
        gsap.to(buttonRef.current, { scale: 1, duration: 0.2, ease: 'power2.out' });
    };

    const handleProceedSubmit = async (e) => {
        e.preventDefault();
        setErrorMsg('');

        if (!videoUrl.trim()) {
            setErrorMsg('Please paste a valid YouTube video link first.');
            return;
        }
        if (!searchQuery.trim()) {
            setErrorMsg('Please enter a description for the comments you want to search.');
            return;
        }

        setIsLoading(true);
        gsap.to(buttonRef.current, { scale: 0.97, duration: 0.15, yoyo: true, repeat: 1, ease: 'power1.inOut' });

        try {
            const data = await searchCommentsApi(videoUrl, searchQuery);
            if (data && data.comments) {
                setCommentsList(data.comments);
                setIsModalOpen(true);
            } else {
                setCommentsList([]);
                setErrorMsg('No results or unexpected response format returned.');
            }
        } catch (err) {
            setErrorMsg(err.message || 'An error occurred while communicating with the backend API.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div
            ref={pageRef}
            className="min-h-screen w-full bg-white flex flex-col items-center justify-center px-6 pt-20 pb-16 sm:pt-20 text-black selection:bg-blue-500/20 relative overflow-hidden"
        >
            {/* Ambient background: soft blue glow + drifting comment bubbles */}
            <div className="pointer-events-none absolute inset-0 overflow-hidden">
                <div className="absolute -top-24 -left-24 w-80 h-80 bg-blue-50 rounded-full blur-3xl opacity-70" />
                <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-blue-50 rounded-full blur-3xl opacity-70" />
                <div ref={bubblesRef} className="absolute inset-0">
                    {Array.from({ length: 7 }).map((_, i) => (
                        <div
                            key={i}
                            className="bubble absolute flex items-center justify-center rounded-full bg-blue-50 border border-blue-100"
                            style={{
                                left: `${8 + i * 13}%`,
                                bottom: '-10%',
                                width: 26 + (i % 3) * 6,
                                height: 26 + (i % 3) * 6,
                            }}
                        >
                            <MessageSquareText size={12} className="text-blue-300" />
                        </div>
                    ))}
                </div>
            </div>

            <div className="w-full max-w-2xl space-y-8 relative z-10">

                {/* Heading */}
                <div className="text-center space-y-3">
                    <h1 ref={headingRef} className="text-3xl sm:text-4xl font-bold tracking-tight text-gray-900">
                        Find the comments that actually matter
                    </h1>
                    <p ref={subRef} className="text-gray-500 text-[15px] sm:text-base max-w-lg mx-auto">
                        Paste any YouTube video link, describe what you're looking for, and let SimpliFind dig through the comment section for you.
                    </p>
                </div>

                 <div
                    ref={cardRef}
                    className="bg-white border-2 border-blue-100 rounded-[28px] sm:rounded-3xl shadow-xl shadow-blue-500/[0.07] p-5 sm:p-8 relative"
                >
                    {/* connecting step line, desktop only */}
                    <div className="hidden sm:block absolute left-[46px] top-[92px] bottom-[168px] w-px bg-gradient-to-b from-blue-200 via-blue-100 to-transparent" />
 
                    <form onSubmit={handleProceedSubmit} className="space-y-5 sm:space-y-6">
                        {/* Input Field 1 - URL Link */}
                        <div ref={field1Ref} className="space-y-2">
                            <label className="flex items-center gap-2 text-xs sm:text-sm font-bold text-gray-900 tracking-tight">
                                <span className="flex items-center justify-center w-5 h-5 rounded-full bg-blue-600 text-white text-[10px] font-bold shrink-0">1</span>
                                <span className="uppercase">Paste YouTube video link</span>
                            </label>
                            <div className="relative">
                                <div className="absolute left-3.5 sm:left-4 top-1/2 -translate-y-1/2 flex items-center justify-center w-6 h-6 rounded-lg bg-red-50">
                                    <Youtube size={14} className="text-red-500" />
                                </div>
                                <input
                                    type="text"
                                    value={videoUrl}
                                    onChange={(e) => setVideoUrl(e.target.value)}
                                    onFocus={() => handleFieldFocus(field1Ref)}
                                    onBlur={() => handleFieldBlur(field1Ref)}
                                    placeholder="https://www.youtube.com/watch?v=PVm6rPxzazE"
                                    className="w-full pl-12 sm:pl-14 pr-4 sm:pr-5 py-3.5 sm:py-4 border-2 border-blue-500 text-gray-800 rounded-2xl bg-white focus:outline-none focus:border-blue-600 focus:ring-4 focus:ring-blue-500/10 placeholder-gray-400/80 text-[13.5px] sm:text-[15px] shadow-sm transition-all"
                                />
                            </div>
                        </div>
 
                        {/* Input Field 2 - Query Prompt Description */}
                        <div ref={field2Ref} className="space-y-2">
                            <label className="flex items-center gap-2 text-xs sm:text-sm font-bold text-gray-900 tracking-tight">
                                <span className="flex items-center justify-center w-5 h-5 rounded-full bg-blue-600 text-white text-[10px] font-bold shrink-0">2</span>
                                <span className="uppercase">Describe the comments you want</span>
                            </label>
                            <div className="relative">
                                <div className="absolute left-3.5 sm:left-4 top-1/2 -translate-y-1/2 flex items-center justify-center w-6 h-6 rounded-lg bg-blue-50">
                                    <Search size={14} className="text-blue-500" />
                                </div>
                                <input
                                    type="text"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    onFocus={() => handleFieldFocus(field2Ref)}
                                    onBlur={() => handleFieldBlur(field2Ref)}
                                    placeholder="I'm looking for comments related to system design."
                                    className="w-full pl-12 sm:pl-14 pr-4 sm:pr-5 py-3.5 sm:py-4 border-2 border-blue-500 text-gray-800 rounded-2xl bg-white focus:outline-none focus:border-blue-600 focus:ring-4 focus:ring-blue-500/10 placeholder-gray-400/80 text-[13.5px] sm:text-[15px] shadow-sm transition-all"
                                />
                            </div>
                        </div>

                        {/* API error response presentation */}
                        {errorMsg && (
                            <p
                                ref={errorRef}
                                className="text-sm font-medium text-red-600 bg-red-50 p-3 rounded-xl border border-red-200"
                            >
                                {errorMsg}
                            </p>
                        )}

                        {/* Submission Button Trigger Component */}
                        <div className="flex justify-center pt-2">
                            <button
                                ref={buttonRef}
                                type="submit"
                                disabled={isLoading}
                                onMouseEnter={handleButtonEnter}
                                onMouseLeave={handleButtonLeave}
                                className="bg-[#0084FF] hover:bg-[#0074E0] disabled:opacity-50 text-white font-semibold px-10 py-4 rounded-full transition-colors duration-200 flex items-center justify-center gap-2 text-base shadow-lg shadow-blue-500/20 w-56 h-14"
                            >
                                {isLoading ? (
                                    <Loader2 className="animate-spin" size={20} />
                                ) : (
                                    <>
                                        Proceed
                                        <ArrowRight size={18} />
                                    </>
                                )}
                            </button>
                        </div>
                    </form>
                </div>
            </div>

            {/* Results Modal overlay component setup */}
            <SearchResultsModal
                isOpen={isModalOpen}
                comments={commentsList}
                onClose={() => setIsModalOpen(false)}
            />
        </div>
    );
}