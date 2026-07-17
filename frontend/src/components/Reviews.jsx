import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const Reviews = () => {
  const sectionRef = useRef(null);
  const scrollContainerRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const reviews = [
    { 
      id: 1, 
      name: 'Aarav Sharma', 
      role: 'Content Creator (150k+ Subs)', 
      image: '/images/profile1.png', 
      stars: 5, 
      text: '"SimpliFind completely transformed how I interact with my community. Instead of scrolling through 2,000 comments manually, I can instantly isolate product feature requests or script bugs using the semantic search filter."' 
    },
    { 
      id: 2, 
      name: 'Priya Nair', 
      role: 'EdTech Educator @ Udemy', 
      image: '/images/profile2.png', 
      stars: 5, 
      text: '"My programming course videos get hundreds of comment queries a day. Using SimpliFind, I can instantly filter students asking specific questions about github repositories or installation issues. The Ask AI follow-up tool is a lifesaver."' 
    },
    { 
      id: 3, 
      name: 'Rohan Mehta', 
      role: 'Full-Stack Developer', 
      image: '/images/profile3.png', 
      stars: 5, 
      text: '"I use YouTube tutorials to keep sharp on system design. When I am stuck on a code snippet, I plug the URL into SimpliFind and search for errors others faced. It saves me hours of aimless wandering in the native comment section."' 
    },
    { 
      id: 4, 
      name: 'Ananya Iyer', 
      role: 'Tech Reviewer & Vlogger', 
      image: '/images/profile4.png', 
      stars: 5, 
      text: '"The layout is clean and incredibly intuitive. I love how it groups similar user critiques together. It makes gathering audience feedback for my upcoming electronics breakdown videos totally frictionless."' 
    },
    { 
      id: 5, 
      name: 'Kabir Verma', 
      role: 'DevOps Engineer', 
      image: '/images/profile5.png', 
      stars: 5, 
      text: '"Finding specific terminal commands or cloud configs shared by users deep in tutorial descriptions or sub-replies used to be impossible. SimpliFind indexes the sub-thread lists flawlessly every single time."' 
    },
    { 
      id: 6, 
      name: 'Zoya Khan', 
      role: 'Community Manager @ Startup', 
      image: '/images/profile6.png', 
      stars: 5, 
      text: '"We ran an experimental live coding stream and wanted to extract constructive feedback about our framework. SimpliFind gave us clear categorical filtering and immediate answers to custom natural prompts."' 
    },
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.stories-header', 
        { opacity: 0, y: 30 },
        { 
          opacity: 1, 
          y: 0, 
          duration: 0.8, 
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 85%',
            toggleActions: 'play none none reverse'
          }
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleScroll = (direction) => {
    let nextIndex = currentIndex;
    
    if (direction === 'prev') {
      nextIndex = currentIndex === 0 ? reviews.length - 1 : currentIndex - 1;
    } else {
      nextIndex = currentIndex === reviews.length - 1 ? 0 : currentIndex + 1;
    }

    setCurrentIndex(nextIndex);

    const container = scrollContainerRef.current;
    if (container) {
      const cardElement = container.querySelector('.review-card');
      if (cardElement) {
        const cardWidth = cardElement.offsetWidth + 24; // Width + gap spacing
        container.scrollTo({
          left: nextIndex * cardWidth,
          behavior: 'smooth',
        });
      }
    }
  };

  return (
    <section 
      id="reviews" 
      ref={sectionRef} 
      className="w-full bg-white py-16 lg:py-24 overflow-hidden border-t border-gray-100 relative"
    >
      {/* Light Radial Glow Highlights */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60%] h-[60%] bg-blue-500/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="w-full relative px-6 z-10">
        
        {/* Header Section */}
        <div className="stories-header text-center mb-12">
          <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl lg:text-[40px]">
            Loved by <span className="text-blue-500">Creators & Developers</span>
          </h2>
        </div>

        {/* Navigation Wrapper Frame */}
        <div className="relative mx-auto w-full max-w-5xl flex items-center justify-center group">
          
          {/* Left Arrow Button */}
          <button
            onClick={() => handleScroll('prev')}
            className="absolute left-[-20px] lg:left-[-60px] z-20 flex h-11 w-11 items-center justify-center rounded-full border border-gray-200 bg-white text-gray-700 shadow-md transition-all hover:bg-gray-50 hover:scale-105 active:scale-95"
            aria-label="Previous Review"
          >
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          {/* Horizontally Scrollable Window Frame */}
          <div 
            ref={scrollContainerRef}
            className="w-full overflow-x-auto scroll-smooth snap-x snap-mandatory scrollbar-none"
            style={{ pointerEvents: 'auto' }}
          >
            <div className="flex gap-6 pb-4 w-max">
              {reviews.map((review) => (
                <div
                  key={review.id}
                  className="review-card w-[calc(100vw-48px)] sm:w-[320px] md:w-[330px] shrink-0 bg-white border border-gray-100 rounded-[28px] p-7 text-left shadow-[0_4px_25px_rgba(0,0,0,0.02)] snap-center flex flex-col justify-between transition-all duration-300 hover:shadow-[0_12px_30px_rgba(0,0,0,0.05)] hover:border-blue-500/20"
                >
                  <div>
                    {/* Blue double quote decoration */}
                    <div className="text-blue-500 text-4xl font-serif leading-none select-none mb-2">
                      ““
                    </div>

                    {/* Premium Golden Star Ratings */}
                    <div className="flex gap-1 mb-4">
                      {[...Array(review.stars)].map((_, i) => (
                        <svg 
                          key={i} 
                          className="h-4 w-4 text-amber-500 fill-current" 
                          viewBox="0 0 20 20"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>

                    {/* Review Copy */}
                    <p className="text-[14px] leading-relaxed text-gray-600 font-medium mb-6">
                      {review.text}
                    </p>
                  </div>

                  {/* Profile Avatar Footer Layout */}
                  <div className="flex items-center gap-3 pt-4 border-t border-gray-50">
                    <img 
                      src={review.image} 
                      alt={`${review.name}'s profile avatar`} 
                      className="h-10 w-10 rounded-full object-cover border border-gray-100 bg-gray-55"
                      onError={(e) => {
                        e.target.src = `https://api.dicebear.com/7.x/initials/svg?seed=${review.name}&backgroundColor=0284c7&textColor=ffffff`;
                      }}
                    />
                    <div>
                      <h4 className="text-[14px] font-bold text-gray-900 leading-tight">
                        {review.name}
                      </h4>
                      <p className="text-[11px] font-semibold text-gray-400 mt-0.5">
                        {review.role}
                      </p>
                    </div>
                  </div>

                </div>
              ))}
            </div>
          </div>

          {/* Right Arrow Button */}
          <button
            onClick={() => handleScroll('next')}
            className="absolute right-[-20px] lg:right-[-60px] z-20 flex h-11 w-11 items-center justify-center rounded-full border border-gray-200 bg-white text-gray-700 shadow-md transition-all hover:bg-gray-50 hover:text-gray-900 hover:scale-105 active:scale-95"
            aria-label="Next Review"
          >
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 5l7 7-7 7" />
            </svg>
          </button>

        </div>

      </div>
    </section>
  );
};