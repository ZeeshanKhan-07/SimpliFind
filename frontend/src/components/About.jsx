import React, { useEffect, useRef } from 'react';
import { ArrowRight } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useNavigate } from 'react-router-dom';
import GroupChat from '../images/GroupChat.svg'

gsap.registerPlugin(ScrollTrigger);

// Replace with your actual illustration import if needed

const bullets = [
    "SimpliFind is the smart way to save time. Instead of scrolling through thousands of YouTube comments, simply paste the video URL and describe the type of comment you're looking for.",
    'SimpliFind will quickly find the most relevant comments that match your needs.',
    'If you want to learn more about a specific comment or have any questions regarding it, our AI assistant is always ready to help by providing detailed insights and explanations.',
];

const About = () => {
    const navigate = useNavigate();

    const sectionRef = useRef(null);
    const headRef = useRef(null);
    const bodyRef = useRef(null);
    const btnRef = useRef(null);
    const imgRef = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {

            // Left column elements
            const leftEls = [
                headRef.current,
                bodyRef.current,
                btnRef.current,
            ].filter(Boolean);

            if (leftEls.length) {
                gsap.fromTo(
                    leftEls,
                    {
                        x: -40,
                        opacity: 0,
                    },
                    {
                        x: 0,
                        opacity: 1,
                        duration: 0.65,
                        stagger: 0.12,
                        ease: 'power3.out',
                        scrollTrigger: {
                            trigger: sectionRef.current,
                            start: 'top 78%',
                            once: true,
                        },
                    }
                );
            }

            // Right image animation
            if (imgRef.current) {
                gsap.fromTo(
                    imgRef.current,
                    {
                        x: 60,
                        opacity: 0,
                    },
                    {
                        x: 0,
                        opacity: 1,
                        duration: 0.8,
                        ease: 'power3.out',
                        scrollTrigger: {
                            trigger: sectionRef.current,
                            start: 'top 78%',
                            once: true,
                            onComplete: startFloat,
                        },
                    }
                );
            }

            function startFloat() {
                if (!imgRef.current) return;

                gsap.to(imgRef.current, {
                    y: -14,
                    duration: 3,
                    repeat: -1,
                    yoyo: true,
                    ease: 'sine.inOut',
                });
            }

        }, sectionRef);

        return () => ctx.revert();
    }, []);

    const onBtnEnter = () => {
        if (!btnRef.current) return;

        gsap.to(btnRef.current, {
            scale: 1.05,
            duration: 0.2,
            ease: 'power2.out',
        });
    };

    const onBtnLeave = () => {
        if (!btnRef.current) return;

        gsap.to(btnRef.current, {
            scale: 1,
            duration: 0.2,
            ease: 'power2.out',
        });
    };

    return (
        <section
            ref={sectionRef}
            className="w-full bg-white py-16 sm:py-20 lg:py-24 px-4 sm:px-8 lg:px-16 overflow-hidden"
        >
            <div className="max-w-6xl mx-auto flex flex-col lg:flex-row items-center gap-12 lg:gap-16">

                {/* LEFT CONTENT */}
                <div className="w-full lg:w-1/2 flex flex-col items-start">

                    <div ref={headRef} style={{ opacity: 0 }}>
                        <h2
                            className="text-3xl sm:text-4xl lg:text-[2.6rem] font-bold text-gray-900 leading-tight mb-6"
                            style={{ fontFamily: "'Georgia', serif" }}
                        >
                            Why Simpli<span className="text-blue-500">Find</span>?
                        </h2>
                    </div>

                    <div
                        ref={bodyRef}
                        className="space-y-3 mb-8"
                        style={{ opacity: 0 }}
                    >
                        {bullets.map((text, i) => (
                            <p
                                key={i}
                                className="text-sm sm:text-[0.95rem] text-gray-600 leading-relaxed"
                            >
                                {text}
                            </p>
                        ))}
                    </div>

                    <button
                        ref={btnRef}
                        onClick={() => navigate('/find-comments')}
                        onMouseEnter={onBtnEnter}
                        onMouseLeave={onBtnLeave}
                        className="inline-flex items-center gap-2 bg-blue-500 hover:bg-blue-600 active:bg-blue-700 text-white font-semibold text-sm sm:text-base px-6 py-3 rounded-full shadow-md hover:shadow-lg hover:shadow-blue-200 transition-colors duration-200"
                        style={{ opacity: 0 }}
                    >
                        Know More
                        <ArrowRight className="w-4 h-4" />
                    </button>

                </div>

                {/* RIGHT IMAGE */}
                <div
                    ref={imgRef}
                    className="w-full lg:w-1/2 flex items-center justify-center"
                    style={{ opacity: 0 }}
                >
                    <img
                        src={GroupChat}
                        alt="Why SimpliFind illustration"
                        className="w-full max-w-xs sm:max-w-sm lg:max-w-md xl:max-w-lg h-auto object-contain select-none"
                        draggable={false}
                    />
                </div>

            </div>
        </section>
    );
};

export default About;