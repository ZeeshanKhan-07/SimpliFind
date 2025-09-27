import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { FaYoutube, FaBrain, FaFilter, FaBolt, FaChartLine, FaFileExport } from 'react-icons/fa';

gsap.registerPlugin(ScrollTrigger);

const features = [
  {
    icon: <FaYoutube />,
    title: "Seamless Video Integration",
    description: "Effortlessly fetch and securely store thousands of comments from any YouTube video URL with a single click.",
    color: "from-red-500 to-rose-500",
  },
  {
    icon: <FaBrain />,
    title: "AI Semantic Search",
    description: "Go beyond keywords. Our machine learning models understand meaning and context to find comments with identical intent.",
    color: "from-purple-500 to-indigo-500",
  },
  {
    icon: <FaFilter />,
    title: "Advanced Smart Filtering",
    description: "Drill down into data with powerful filters by sentiment, date, and relevance to pinpoint exactly what you're looking for.",
    color: "from-green-500 to-emerald-500",
  },
  {
    icon: <FaBolt />,
    title: "Real-Time Speed & Scale",
    description: "Experience lightning-fast search results, with our optimized infrastructure designed to handle vast amounts of data in milliseconds.",
    color: "from-yellow-500 to-orange-500",
  },
];

const AsymmetricalFeatures = () => {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const cardsRef = useRef([]);

  useEffect(() => {
    gsap.fromTo([titleRef.current, titleRef.current.nextElementSibling], {
      opacity: 0,
      y: 50,
    }, {
      opacity: 1,
      y: 0,
      duration: 1.2,
      stagger: 0.3,
      ease: "power3.out",
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 80%",
        toggleActions: "play none none reverse",
      }
    });

    cardsRef.current.forEach((card, index) => {
      const isEven = index % 2 === 0;
      gsap.fromTo(card, {
        opacity: 0,
        y: isEven ? 100 : 50,
      }, {
        opacity: 1,
        y: 0,
        duration: 1.5,
        ease: "power3.out",
        scrollTrigger: {
          trigger: card,
          start: "top 85%",
          toggleActions: "play none none reverse",
        }
      });
    });

    cardsRef.current.forEach(card => {
      const gradient = card.querySelector('.gradient-border');
      gsap.set(gradient, {
        width: '0%',
        height: '0%',
        top: '50%',
        left: '50%',
      });

      const hoverTimeline = gsap.timeline({ paused: true });
      hoverTimeline.to(gradient, {
        width: '100%',
        height: '100%',
        top: '0%',
        left: '0%',
        duration: 0.4,
        ease: 'power2.out'
      }).to(card, {
        y: -10,
        scale: 1.05,
        duration: 0.4,
        ease: 'power2.out',
      }, "<");

      card.addEventListener('mouseenter', () => hoverTimeline.play());
      card.addEventListener('mouseleave', () => hoverTimeline.reverse());
    });
  }, []);

  return (
    <section ref={sectionRef} id="features-asymmetrical" className="py-24 bg-gray-950 text-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 ref={titleRef} className="text-4xl md:text-5xl font-extrabold mb-4 bg-gradient-to-r from-gray-100 to-gray-400 bg-clip-text text-transparent">
            Your Journey to Insightful Data
          </h2>
          <p className="text-xl text-gray-500 max-w-3xl mx-auto">
            Experience a new level of discovery with our advanced, AI-powered toolkit.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              ref={el => (cardsRef.current[index] = el)}
              className={`relative p-8 rounded-3xl bg-gray-800/50 hover:bg-gray-800/70 shadow-xl transition-colors duration-300 transform-gpu cursor-pointer
                ${index % 3 === 0 ? 'lg:col-span-2' : ''}
                ${index % 2 !== 0 ? 'md:mt-16' : ''}
              `}
            >
              {/* Animated gradient border */}
              <div className={`gradient-border absolute rounded-3xl z-0 inset-0 ${feature.color} opacity-30`}></div>
              
              <div className="relative z-10">
                <div className={`p-4 rounded-full inline-block bg-black/40 mb-6 transition-transform duration-300`}>
                  <span className="w-10 h-10 text-white">{feature.icon}</span>
                </div>
                <h3 className="text-3xl font-bold mb-3">{feature.title}</h3>
                <p className="text-gray-400 leading-relaxed text-lg">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AsymmetricalFeatures;