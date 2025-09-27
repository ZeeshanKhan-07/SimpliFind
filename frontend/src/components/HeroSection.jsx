import React, { useState, useCallback, useEffect, useRef } from 'react';
import { Youtube, ArrowRight, ChevronDown } from 'lucide-react';
import { gsap } from 'gsap';
import TypewriterText from '../components/TypewriterText';
import SearchResultsModal from '../components/SearchResultsModal';

const extractVideoId = (url) => {
    const regex = /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:watch\?v=|embed\/|v\/)|youtu\.be\/)([\w-]{11})/;
    const match = url.match(regex);
    return match ? match[1] : null;
};

const HeroSection = () => {
    const [videoUrl, setVideoUrl] = useState('');
    const [isOpenSearchMenu, setIsOpenSearchMenu] = useState(false);
    const [comments, setComments] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userId, setUserId] = useState(null);

    const heroRef = useRef(null);
    const titleRef = useRef(null);
    const subtitleRef = useRef(null);
    const descriptionRef = useRef(null);
    const inputRef = useRef(null);
    const buttonRef = useRef(null);
    const statsRef = useRef(null);
    const chevronRef = useRef(null);
    const backgroundRef = useRef(null);

    const typewriterWords = [
        'Like Never Before',
        'Powered by Smart AI',
        'Tailored Just for You',
        'With Unmatched Precision',
        'Smarter. Faster. Better.',
    ];

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.set([titleRef.current, subtitleRef.current, descriptionRef.current, inputRef.current, buttonRef.current, statsRef.current], {
                opacity: 0,
                y: 50
            });

            gsap.set(chevronRef.current, {
                opacity: 0,
                y: 20
            });

            gsap.fromTo('.bg-blur-1', {
                scale: 0.8,
                opacity: 0
            }, {
                scale: 1,
                opacity: 1,
                duration: 2,
                ease: "power2.out"
            });

            gsap.fromTo('.bg-blur-2', {
                scale: 0.8,
                opacity: 0
            }, {
                scale: 1,
                opacity: 1,
                duration: 2,
                delay: 0.5,
                ease: "power2.out"
            });

            gsap.fromTo('.bg-blur-3', {
                scale: 0.8,
                opacity: 0
            }, {
                scale: 1,
                opacity: 1,
                duration: 2,
                delay: 1,
                ease: "power2.out"
            });

            const tl = gsap.timeline({ delay: 0.3 });

            tl.to(titleRef.current, {
                opacity: 1,
                y: 0,
                duration: 1,
                ease: "power3.out"
            })
            .to(subtitleRef.current, {
                opacity: 1,
                y: 0,
                duration: 0.8,
                ease: "power3.out"
            }, "-=0.5")
            .to(descriptionRef.current, {
                opacity: 1,
                y: 0,
                duration: 0.8,
                ease: "power3.out"
            }, "-=0.4")
            .to(inputRef.current, {
                opacity: 1,
                y: 0,
                duration: 0.6,
                ease: "power3.out"
            }, "-=0.3")
            .to(buttonRef.current, {
                opacity: 1,
                y: 0,
                duration: 0.6,
                ease: "power3.out"
            }, "-=0.2")
            .to(statsRef.current.children, {
                opacity: 1,
                y: 0,
                duration: 0.5,
                stagger: 0.1,
                ease: "power3.out"
            }, "-=0.1")
            .to(chevronRef.current, {
                opacity: 1,
                y: 0,
                duration: 0.5,
                ease: "power3.out"
            }, "-=0.2");

            gsap.to('.bg-blur-1', {
                y: -20,
                duration: 3,
                repeat: -1,
                yoyo: true,
                ease: "sine.inOut"
            });

            gsap.to('.bg-blur-2', {
                y: 15,
                duration: 4,
                repeat: -1,
                yoyo: true,
                ease: "sine.inOut",
                delay: 1
            });

            gsap.to('.bg-blur-3', {
                rotate: 360,
                duration: 20,
                repeat: -1,
                ease: "none"
            });

            gsap.to(chevronRef.current, {
                y: -10,
                duration: 1.5,
                repeat: -1,
                yoyo: true,
                ease: "power2.inOut",
                delay: 2
            });

        }, heroRef);

        return () => ctx.revert();
    }, []);

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('user')); 
        if (user && user.id) {
            setIsLoggedIn(true);
            setUserId(user.id);
        } else {
            setIsLoggedIn(false);
            setUserId(null);
        }
    }, []);

    const fetchComments = useCallback(async () => {
        const videoId = extractVideoId(videoUrl);

        if (!videoId) {
            setError("Please enter a valid YouTube URL.");
            gsap.fromTo(inputRef.current, {
                x: 0
            }, {
                x: -10,
                duration: 0.1,
                repeat: 5,
                yoyo: true,
                ease: "power2.inOut"
            });
            return;
        }

        setIsLoading(true);
        setError(null);

        gsap.to(buttonRef.current, {
            scale: 0.95,
            duration: 0.1,
            yoyo: true,
            repeat: 1
        });

        try {
            const apiUrl = `http://localhost:8080/api/v1/comments/${videoId}/all`;
            console.log(`Making API call to: ${apiUrl}`);

            const response = await fetch(apiUrl);

            if (!response.ok) {
                const errorText = response.statusText;
                throw new Error(`Network response was not ok: ${errorText}`);
            }

            const data = await response.json();
            
            setComments(data.comments || []); 
            setIsOpenSearchMenu(true);

        } catch (err) {
            console.error("Failed to fetch comments:", err);
            setError(`Failed to load comments: ${err.message}. Please check the URL and try again.`);
            
            gsap.fromTo(inputRef.current, {
                x: 0
            }, {
                x: -5,
                duration: 0.1,
                repeat: 3,
                yoyo: true,
                ease: "power2.inOut"
            });
        } finally {
            setIsLoading(false);
        }
    }, [videoUrl, isLoggedIn, userId]);

    const openSearchMenu = () => {
        fetchComments();
        document.body.style.overflow = 'hidden';
    };

    const closeSearchMenu = useCallback(() => {
        setIsOpenSearchMenu(false);
        document.body.style.overflow = 'unset';
        setComments([]);
    }, []);

    const handleButtonHover = (isHovering) => {
        gsap.to(buttonRef.current, {
            scale: isHovering ? 1.05 : 1,
            duration: 0.3,
            ease: "power2.out"
        });
    };

    const handleStatsHover = (element, isHovering) => {
        gsap.to(element, {
            scale: isHovering ? 1.1 : 1,
            duration: 0.3,
            ease: "power2.out"
        });
    };

    const handleChevronHover = (isHovering) => {
        gsap.to(chevronRef.current, {
            y: isHovering ? -15 : -10,
            duration: 0.3,
            ease: "power2.out"
        });
    };

    return (
        <>
            <section ref={heroRef} className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-black via-gray-900 to-black pt-24">
                <div className="absolute inset-0">
                    <div className="bg-blur-1 absolute top-1/4 left-1/4 w-96 h-96 bg-red-500/10 rounded-full blur-3xl"></div>
                    <div className="bg-blur-2 absolute bottom-1/4 right-1/4 w-96 h-96 bg-pink-500/10 rounded-full blur-3xl"></div>
                    <div className="bg-blur-3 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full h-full bg-gradient-to-r from-transparent via-red-500/5 to-transparent"></div>
                </div>

                <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <div>
                        <h1 ref={titleRef} className="text-4xl sm:text-5xl lg:text-7xl font-bold mb-6 bg-gradient-to-r from-white via-red-200 to-pink-300 bg-clip-text text-transparent leading-tight">
                            Find Similar Comments
                        </h1>
                        
                        <div ref={subtitleRef} className="text-3xl sm:text-4xl lg:text-6xl mt-2 mb-6 bg-gradient-to-r from-red-500 to-pink-500 bg-clip-text text-transparent font-bold">
                            <TypewriterText words={typewriterWords} />
                        </div>

                        <p ref={descriptionRef} className="text-lg sm:text-xl lg:text-2xl text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed px-4">
                            Search and discover similar comments across YouTube videos with our advanced AI-powered search engine.
                            Find the conversations that matter most to you.
                        </p>

                        <div className="max-w-4xl mx-auto mb-12 space-y-4 px-4">
                            <div ref={inputRef} className="relative group">
                                <input
                                    type="text"
                                    placeholder="Paste YouTube video URL..."
                                    value={videoUrl}
                                    onChange={(e) => setVideoUrl(e.target.value)}
                                    className="w-full px-6 py-4 pr-12 bg-black/50 border border-gray-600 rounded-2xl text-white placeholder-gray-400 focus:outline-none focus:border-red-500 focus:ring-2 focus:ring-red-500/20 transition-all duration-300 backdrop-blur-sm text-sm sm:text-base"
                                />
                                <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none z-10">
                                    <Youtube className="text-red-500 opacity-50 w-5 h-5" />
                                </div>
                            </div>
                            {error && <p className="text-red-400 text-sm">{error}</p>}
                            <button
                                ref={buttonRef}
                                onClick={openSearchMenu}
                                onMouseEnter={() => handleButtonHover(true)}
                                onMouseLeave={() => handleButtonHover(false)}
                                disabled={isLoading || !videoUrl}
                                className="group bg-gradient-to-r from-red-500 to-pink-600 text-white px-8 sm:px-12 py-3 sm:py-4 rounded-2xl font-semibold text-base sm:text-lg hover:from-red-600 hover:to-pink-700 transition-all duration-300 hover:shadow-2xl hover:shadow-red-500/25 flex items-center mx-auto space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                <span>{isLoading ? 'Searching...' : 'Search Comments'}</span>
                                {!isLoading && <ArrowRight className="group-hover:translate-x-1 transition-transform duration-300 w-4 h-4 sm:w-5 sm:h-5" />}
                            </button>
                        </div>

                        <div ref={statsRef} className="grid grid-cols-3 gap-6 max-w-3xl mx-auto px-4">
                            <div 
                                className="text-center group cursor-pointer"
                                onMouseEnter={(e) => handleStatsHover(e.currentTarget, true)}
                                onMouseLeave={(e) => handleStatsHover(e.currentTarget, false)}
                            >
                                <div className="text-2xl sm:text-3xl lg:text-4xl font-bold text-red-500 mb-2 transition-transform duration-300">1M+</div>
                                <div className="text-gray-400 text-sm sm:text-base">Comments Analyzed</div>
                            </div>
                            <div 
                                className="text-center group cursor-pointer"
                                onMouseEnter={(e) => handleStatsHover(e.currentTarget, true)}
                                onMouseLeave={(e) => handleStatsHover(e.currentTarget, false)}
                            >
                                <div className="text-2xl sm:text-3xl lg:text-4xl font-bold text-pink-500 mb-2 transition-transform duration-300">50K+</div>
                                <div className="text-gray-400 text-sm sm:text-base">Videos Indexed</div>
                            </div>
                            <div 
                                className="text-center group cursor-pointer"
                                onMouseEnter={(e) => handleStatsHover(e.currentTarget, true)}
                                onMouseLeave={(e) => handleStatsHover(e.currentTarget, false)}
                            >
                                <div className="text-2xl sm:text-3xl lg:text-4xl font-bold text-purple-500 mb-2 transition-transform duration-300">99%</div>
                                <div className="text-gray-400 text-sm sm:text-base">Accuracy Rate</div>
                            </div>
                        </div>
                    </div>

                    <div 
                        ref={chevronRef}
                        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 cursor-pointer"
                        onMouseEnter={() => handleChevronHover(true)}
                        onMouseLeave={() => handleChevronHover(false)}
                    >
                        <ChevronDown className="text-white/50 hover:text-red-500 transition-colors duration-300" size={32} />
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