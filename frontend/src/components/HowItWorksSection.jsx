import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Youtube, Search, MessageCircle, ArrowRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const HowItWorksSection = () => {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const stepRefs = useRef([]);
  const lineRef = useRef(null);

  const steps = [
    {
      number: "01",
      title: "Paste Video URL",
      description: "Simply paste any YouTube video URL into our search box and watch the magic begin.",
      icon: <Youtube className="w-12 h-12" />,
      color: "from-red-500 to-pink-600",
      accent: "red-500",
      demo: "https://youtube.com/watch?v=..."
    },
    {
      number: "02",
      title: "Describe Your Search",
      description: "Tell us what kind of comments you're looking for using natural language queries.",
      icon: <Search className="w-12 h-12" />,
      color: "from-red-500 to-pink-600",
      accent: "red-500",
      demo: "Find funny comments about..."
    },
    {
      number: "03",
      title: "Get Smart Results",
      description: "Our AI analyzes thousands of comments and returns the most relevant matches instantly.",
      icon: <MessageCircle className="w-12 h-12" />,
      color: "from-red-500 to-pink-600",
      accent: "red-500",
      demo: "💡 Found 247 matching comments"
    }
  ];

  const addToRefs = (el) => {
    if (el && !stepRefs.current.includes(el)) {
      stepRefs.current.push(el);
    }
  };

  const animateDataFlow = () => {
    const flowTl = gsap.timeline();
    if (lineRef.current) {
      flowTl.to(lineRef.current, {
        strokeDashoffset: 0,
        duration: 1.5,
        ease: "power2.inOut",
      });
    }
  };

  useEffect(() => {
    const masterTl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 70%",
        end: "bottom 30%",
        toggleActions: "play none none reverse",
        onEnter: () => {
          setTimeout(animateDataFlow, 1500);
        }
      }
    });

    masterTl.fromTo(titleRef.current, {
      opacity: 0,
      y: 100,
      scale: 0.8,
      rotationX: 45,
    }, {
      opacity: 1,
      y: 0,
      scale: 1,
      rotationX: 0,
      duration: 1.5,
      ease: "back.out(2)",
    })
    .fromTo(titleRef.current.nextElementSibling, {
      opacity: 0,
      y: 30,
    }, {
      opacity: 1,
      y: 0,
      duration: 1,
      ease: "power3.out",
    }, "-=0.8");

    stepRefs.current.forEach((step, index) => {
      const delay = index * 0.4;
      
      masterTl.fromTo(step, {
        opacity: 0,
        y: 100,
        scale: 0.6,
        rotationY: 45,
      }, {
        opacity: 1,
        y: 0,
        scale: 1,
        rotationY: 0,
        duration: 1.2,
        ease: "back.out(1.7)",
      }, delay)
      .fromTo(step.querySelector('.step-number'), {
        scale: 0,
        rotation: -180,
      }, {
        scale: 1,
        rotation: 0,
        duration: 0.8,
        ease: "elastic.out(1, 0.8)",
      }, delay + 0.3)
      .fromTo(step.querySelector('.step-icon-container'), {
        scale: 0,
        rotation: 180,
      }, {
        scale: 1,
        rotation: 0,
        duration: 0.6,
        ease: "back.out(2)",
      }, delay + 0.5);
    });

    const line = lineRef.current;
    if (line) {
      const lineLength = line.getTotalLength();
      gsap.set(line, { 
        strokeDasharray: lineLength, 
        strokeDashoffset: lineLength,
        filter: "drop-shadow(0 0 8px rgba(59, 130, 246, 0.8))"
      });

      masterTl.to(line, {
        strokeDashoffset: 0,
        duration: 2,
        ease: "power2.inOut",
      }, "-=1")
      .to(line, {
        filter: "drop-shadow(0 0 15px rgba(59, 130, 246, 1))",
        duration: 0.5,
        yoyo: true,
        repeat: 3,
      }, "-=0.5");
    }

    stepRefs.current.forEach((step, index) => {
      const number = step.querySelector('.step-number');
      const card = step.querySelector('.step-card');
      const icon = step.querySelector('.step-icon-container');
      const demo = step.querySelector('.demo-text');
      const glow = step.querySelector('.glow-effect');

      const hoverTl = gsap.timeline({ paused: true });
      
      hoverTl.to([card, number], {
        scale: 1.05,
        duration: 0.4,
        ease: "power2.out",
      })
      .to(number, {
        boxShadow: `0 0 40px var(--tw-red-500)`,
        duration: 0.3,
      }, "<")
      .to(icon, {
        y: -10,
        duration: 0.6,
        ease: "back.out(2)",
      }, "<")
      .to(glow, {
        opacity: 1,
        scale: 1.2,
        duration: 0.4,
      }, "<")
      .fromTo(demo, {
        opacity: 0,
        y: 10,
      }, {
        opacity: 1,
        y: 0,
        duration: 0.3,
      }, "<0.2");

      step.addEventListener('mousemove', (e) => {
        const rect = step.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        
        gsap.to(number, {
          x: x * 0.1,
          y: y * 0.1,
          duration: 0.3,
        });
      });

      step.addEventListener('mouseenter', () => {
        hoverTl.play();
      });
      
      step.addEventListener('mouseleave', () => {
        hoverTl.reverse();
        gsap.to(number, { x: 0, y: 0, duration: 0.5 });
      });

      step.addEventListener('click', animateDataFlow);
    });

    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  return (
    <section ref={sectionRef} id="how-it-works" className="py-32 bg-gradient-to-b from-gray-950 via-gray-900 to-gray-950 text-white overflow-hidden relative">
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full">
          {Array.from({ length: 10 }).map((_, i) => (
            <div
              key={i}
              className="absolute bg-gradient-to-r from-red-500/0 via-red-500/30 to-red-500/0 animate-line-flow"
              style={{
                height: '2px',
                width: `${30 + Math.random() * 50}%`,
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 10}s`,
                transform: `rotate(${Math.random() * 360}deg)`,
              }}
            ></div>
          ))}
        </div>
        <div className="absolute top-1/2 left-1/2 w-72 h-72 bg-pink-600/15 rounded-full blur-3xl animate-pulse-slow -translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-red-500/15 rounded-xl blur-3xl animate-pulse-slow delay-1500"></div>
      </div>

      <style jsx>{`
        @keyframes line-flow {
          0% {
            transform: translateX(-100%) rotate(var(--rotation, 0deg));
            opacity: 0;
          }
          50% {
            transform: translateX(100%) rotate(var(--rotation, 0deg));
            opacity: 0.2;
          }
          100% {
            transform: translateX(200%) rotate(var(--rotation, 0deg));
            opacity: 0;
          }
        }
        @keyframes pulse-slow {
          0%, 100% {
            transform: scale(1) translate(-50%, -50%);
            opacity: 0.2;
          }
          50% {
            transform: scale(1.1) translate(-50%, -50%);
            opacity: 0.4;
          }
        }
        .animate-line-flow {
          animation: line-flow 15s infinite ease-in-out;
          --rotation: 0deg; 
        }
        .animate-pulse-slow {
          animation: pulse-slow 8s infinite ease-in-out;
        }
      `}</style>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-20">
          <h2 ref={titleRef} className="text-5xl md:text-7xl font-black mb-6 bg-gradient-to-r from-red-400 via-pink-500 to-red-600 bg-clip-text text-transparent relative">
            How It Works
            <div className="absolute inset-0 bg-gradient-to-r from-red-400 via-pink-500 to-red-600 bg-clip-text text-transparent blur-sm opacity-50"></div>
          </h2>
          <p className="text-xl text-gray-400 max-w-4xl mx-auto leading-relaxed">
            Experience the future of comment discovery with our AI-powered platform. 
            Three simple steps to unlock insights from millions of YouTube comments.
          </p>
        </div>

        <div className="relative">
          <svg className="hidden lg:block absolute top-[120px] left-0 right-0 w-full h-auto z-0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 100">
            <defs>
              <linearGradient id="flow-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" style={{stopColor:"#EF4444"}} />
                <stop offset="50%" style={{stopColor:"#F97316"}} />
                <stop offset="100%" style={{stopColor:"#EC4899"}} />
              </linearGradient>
              <filter id="glow">
                <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
                <feMerge>
                  <feMergeNode in="coloredBlur"/>
                  <feMergeNode in="SourceGraphic"/>
                </feMerge>
              </filter>
            </defs>
            <path
              ref={lineRef}
              d="M 150 50 Q 300 30 450 50 Q 600 70 850 50"
              stroke="url(#flow-gradient)"
              strokeWidth="3"
              fill="none"
              filter="url(#glow)"
            />
            <g className="animate-pulse">
              <path d="M 400 45 L 410 50 L 400 55 L 405 50 Z" fill="#F97316" />
              <path d="M 600 55 L 610 50 L 600 45 L 605 50 Z" fill="#EC4899" />
            </g>
          </svg>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-20 lg:gap-12">
            {steps.map((step, index) => (
              <div 
                key={index} 
                ref={addToRefs} 
                className="relative flex flex-col items-center text-center group cursor-pointer transform-gpu"
              >
                <div className="glow-effect absolute inset-0 bg-gradient-to-br opacity-0 blur-xl rounded-3xl transform scale-75 transition-all duration-500"
                  style={{background: `linear-gradient(135deg, ${step.accent.replace('-500', '-600')}, transparent)`}}>
                </div>

                <div className="relative mb-10">
                  <div className={`step-number inline-flex items-center justify-center w-24 h-24 bg-gradient-to-br ${step.color} rounded-2xl text-white font-black text-3xl relative z-10 shadow-2xl border border-white/20`}>
                    {step.number}
                    <div className={`absolute inset-0 bg-gradient-to-br ${step.color} rounded-2xl blur opacity-50`}></div>
                  </div>
                </div>
                
                <div className="step-card relative flex flex-col items-center p-8 bg-gradient-to-br from-gray-800/80 via-gray-800/60 to-gray-900/80 rounded-3xl border border-gray-700/50 backdrop-blur-sm shadow-2xl transition-all duration-500 hover:shadow-3xl group-hover:border-opacity-100 group-hover:border-red-500/50">
                  
                  <div className="step-icon-container mb-6 relative">
                    <div className={`text-red-500 transition-all duration-300 relative z-10`}>
                      {step.icon}
                    </div>
                    <div className={`absolute inset-0 bg-red-500 blur-lg opacity-30 scale-150`}></div>
                  </div>
                  
                  <h3 className="text-2xl font-bold text-white mb-4 relative z-10">
                    {step.title}
                  </h3>
                  
                  <p className="text-gray-300 leading-relaxed max-w-sm mx-auto mb-4 relative z-10">
                    {step.description}
                  </p>

                  <div className="demo-text opacity-0 mt-4 px-4 py-2 bg-gray-700/50 rounded-lg text-sm font-mono text-gray-300 border border-gray-600/50">
                    {step.demo}
                  </div>

                  <div className="absolute inset-0 rounded-3xl overflow-hidden">
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-20 bg-gradient-to-r from-transparent via-white to-transparent transform -skew-x-12 translate-x-full group-hover:translate-x-[-200%] transition-all duration-1000"></div>
                  </div>
                </div>

                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute -right-6 top-1/2 transform -translate-y-1/2 z-20">
                    <ArrowRight className="w-6 h-6 text-gray-500 animate-pulse" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;