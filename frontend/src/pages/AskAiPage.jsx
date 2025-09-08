import { useState, useRef, useEffect } from 'react';
import { TiArrowUpThick } from "react-icons/ti";
import { ArrowLeft, Trash2, Copy, Check, Paperclip, Mic, Smile, Settings, Users, Sun, Moon, Send } from 'lucide-react';
import { IoChatbubbleEllipsesSharp } from "react-icons/io5";
import logo from '../images/logo.gif';

const ChatApp = ({ initialMessage, onBack }) => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Hello! I'm your AI assistant. How can I help you today?",
      sender: 'ai',
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [copiedMessageId, setCopiedMessageId] = useState(null);

  const messagesEndRef = useRef(null);
  const textareaRef = useRef(null);
  const headerRef = useRef(null);
  const inputSectionRef = useRef(null);
  const messagesContainerRef = useRef(null);

  // GSAP animations
  useEffect(() => {
    // Import GSAP dynamically
    const script = document.createElement('script');
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js';
    script.onload = () => {
      const { gsap } = window;
      
      // Initial page load animation
      const tl = gsap.timeline();
      
      // Header animation
      tl.fromTo(headerRef.current, 
        { y: -50, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" }
      )
      // Messages container
      .fromTo(messagesContainerRef.current,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, ease: "power2.out" },
        "-=0.4"
      )
      // Input section
      .fromTo(inputSectionRef.current,
        { y: 50, opacity: 0, scale: 0.95 },
        { y: 0, opacity: 1, scale: 1, duration: 0.7, ease: "back.out(1.2)" },
        "-=0.3"
      );

      // Animate initial message
      const initialMessageEl = document.querySelector('[data-message-id="1"]');
      if (initialMessageEl) {
        gsap.fromTo(initialMessageEl,
          { x: -30, opacity: 0, scale: 0.9 },
          { x: 0, opacity: 1, scale: 1, duration: 0.5, ease: "power2.out", delay: 0.5 }
        );
      }
    };
    document.head.appendChild(script);

    return () => {
      if (document.head.contains(script)) {
        document.head.removeChild(script);
      }
    };
  }, []);

  // Animate new messages
  useEffect(() => {
    if (window.gsap && messages.length > 1) {
      const lastMessage = messages[messages.length - 1];
      const messageEl = document.querySelector(`[data-message-id="${lastMessage.id}"]`);
      
      if (messageEl) {
        const { gsap } = window;
        if (lastMessage.sender === 'user') {
          // User message animation (slide in from right)
          gsap.fromTo(messageEl,
            { x: 50, opacity: 0, scale: 0.8 },
            { x: 0, opacity: 1, scale: 1, duration: 0.4, ease: "back.out(1.4)" }
          );
        } else {
          // AI message animation (slide in from left with bounce)
          gsap.fromTo(messageEl,
            { x: -50, opacity: 0, scale: 0.9 },
            { x: 0, opacity: 1, scale: 1, duration: 0.5, ease: "elastic.out(1, 0.8)" }
          );
        }
      }
    }
  }, [messages]);

  // Animate typing indicator
  useEffect(() => {
    if (window.gsap) {
      const { gsap } = window;
      const typingEl = document.querySelector('.typing-indicator');
      
      if (isTyping && typingEl) {
        gsap.fromTo(typingEl,
          { x: -30, opacity: 0, scale: 0.9 },
          { x: 0, opacity: 1, scale: 1, duration: 0.3, ease: "power2.out" }
        );
      }
    }
  }, [isTyping]);

  useEffect(() => {
    if (initialMessage && initialMessage.trim()) {
      setInputValue(initialMessage);
      setTimeout(() => {
        if (textareaRef.current) {
          textareaRef.current.focus();
          textareaRef.current.setSelectionRange(initialMessage.length, initialMessage.length);
        }
      }, 100);
    }
  }, [initialMessage]);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const messageParam = urlParams.get('message');
    if (messageParam && !initialMessage) {
      setInputValue(decodeURIComponent(messageParam));
      setTimeout(() => {
        if (textareaRef.current) {
          textareaRef.current.focus();
        }
      }, 100);
    }
  }, [initialMessage]);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = Math.min(textareaRef.current.scrollHeight, 120) + 'px';
    }
  }, [inputValue]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const sendMessage = async () => {
    if (!inputValue.trim() || isTyping) return;

    // Animate send button
    if (window.gsap) {
      const { gsap } = window;
      const sendBtn = document.querySelector('.send-button');
      gsap.to(sendBtn, { scale: 0.8, duration: 0.1, yoyo: true, repeat: 1 });
    }

    const userMessage = {
      id: Date.now(),
      text: inputValue.trim(),
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    try {
      const response = await fetch('http://localhost:8080/api/chat/ask', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question: userMessage.text }),
      });

      const data = await response.json();

      setTimeout(() => {
        const aiMessage = {
          id: Date.now() + 1,
          text: data.answer || data.error || 'Sorry, something went wrong.',
          sender: 'ai',
          timestamp: new Date()
        };
        setMessages(prev => [...prev, aiMessage]);
        setIsTyping(false);
      }, 800);

    } catch (error) {
      setTimeout(() => {
        const errorMessage = {
          id: Date.now() + 1,
          text: 'Failed to connect to server. Please check if the backend is running on localhost:8080.',
          sender: 'ai',
          timestamp: new Date()
        };
        setMessages(prev => [...prev, errorMessage]);
        setIsTyping(false);
      }, 800);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const formatTime = (date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const clearChat = () => {
    if (window.gsap) {
      const { gsap } = window;
      // Animate messages out before clearing
      gsap.to('.message-item', {
        x: -100,
        opacity: 0,
        duration: 0.3,
        stagger: 0.05,
        onComplete: () => {
          setMessages([{
            id: 1,
            text: "Hello! I'm your AI assistant. How can I help you today?",
            sender: 'ai',
            timestamp: new Date()
          }]);
        }
      });
    } else {
      setMessages([{
        id: 1,
        text: "Hello! I'm your AI assistant. How can I help you today?",
        sender: 'ai',
        timestamp: new Date()
      }]);
    }
  };

  const copyToClipboard = async (text, messageId) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedMessageId(messageId);
      
      // Animate copy feedback
      if (window.gsap) {
        const { gsap } = window;
        const copyBtn = document.querySelector(`[data-copy-btn="${messageId}"]`);
        gsap.to(copyBtn, { scale: 1.2, duration: 0.1, yoyo: true, repeat: 1 });
      }
      
      setTimeout(() => setCopiedMessageId(null), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  const TypingIndicator = () => (
    <div className="typing-indicator flex items-center space-x-2 p-4 bg-[#2d2d2d] rounded-2xl max-w-xs shadow-sm">
      <div className="flex space-x-1">
        <div className="w-2 h-2 bg-gray-600 rounded-full animate-bounce" style={{ animationDelay: '0s' }}></div>
        <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
      </div>
      <span className="text-xs text-gray-400 font-medium">Let me think...</span>
    </div>
  );

  return (
    <div className="h-screen bg-[#212121] flex flex-col overflow-hidden">
      {/* Header Section - Fixed */}
      <div ref={headerRef} className="flex-shrink-0 flex flex-col items-center pt-8 pb-4">
        <div className="w-16 h-16 bg-gradient-to-r rounded-2xl p-1 shadow-2xl hover:scale-105 transition-transform duration-300">
          <img
            src={logo}
            alt="Logo"
            className="w-full h-full rounded-xl object-cover bg-white"
          />
        </div>
        <h2 className="text-3xl font-bold text-white mt-6">How can i help you?</h2>
      </div>

      {/* Chat Messages Section - Scrollable */}
      <div className="flex-1 flex flex-col min-h-0 px-4 max-w-4xl mx-auto w-full">
        <div ref={messagesContainerRef} className="flex-1 overflow-y-auto space-y-4 pr-2 custom-scrollbar pb-4">
          {messages.map((message) => (
            <div
              key={message.id}
              data-message-id={message.id}
              className={`message-item flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'} group`}
            >
              <div className="flex items-end space-x-2 max-w-[85%] lg:max-w-2xl">
                {message.sender === 'ai' && (
                  <div className="w-10 h-10 rounded-full bg-gradient-to-r flex items-center justify-center mb-1 hover:scale-110 transition-transform duration-200">
                    <img
                      src={logo}
                      alt="Logo"
                      className="w-8 h-8 rounded-full object-cover"
                    />
                  </div>
                )}

                <div className="flex flex-col">
                  <div
                    className={`px-5 py-3 rounded-2xl shadow-sm relative hover:shadow-md transition-all duration-200 ${message.sender === 'user'
                      ? 'bg-gradient-to-r bg-white text-black rounded-br-md hover:scale-[1.02]'
                      : 'bg-[#2d2d2d] text-white rounded-bl-md border border-[#3d3d3d] hover:border-[#4d4d4d] hover:scale-[1.02]'
                      }`}
                  >
                    <p className="text-sm leading-relaxed whitespace-pre-wrap">{message.text}</p>
                    {message.sender === 'ai' && (
                      <button
                        data-copy-btn={message.id}
                        onClick={() => copyToClipboard(message.text, message.id)}
                        className="absolute top-1 right-0 opacity-0 group-hover:opacity-100 p-1 hover:bg-[#3d3d3d] rounded transition-all duration-200 hover:scale-110"
                        title="Copy message"
                      >
                        {copiedMessageId === message.id ? (
                          <Check size={14} className="text-green-500" />
                        ) : (
                          <Copy size={14} className="text-gray-400" />
                        )}
                      </button>
                    )}
                  </div>
                  <p
                    className={`text-xs mt-1 px-2 ${message.sender === 'user'
                      ? 'text-gray-500 text-right'
                      : 'text-gray-400 text-left'
                      }`}
                  >
                    {formatTime(message.timestamp)}
                  </p>
                </div>
              </div>
            </div>
          ))}
          {isTyping && (
            <div className="flex justify-start">
              <div className="flex items-end space-x-2">
                <div className="w-10 h-10 rounded-full bg-gradient-to-r flex items-center justify-center mb-1">
                  <img
                    src={logo}
                    alt="Logo"
                    className="w-8 h-8 rounded-full object-cover"
                  />
                </div>
                <TypingIndicator />
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Section - Fixed at bottom */}
        <div ref={inputSectionRef} className="flex-shrink-0 py-4">
          <div className="w-full bg-[#2d2d2d] rounded-2xl shadow-lg border border-[#3d3d3d] p-4 hover:border-[#4d4d4d] transition-all duration-300">
            <div className="flex items-center space-x-3">
              <div className="flex-1 relative">
                <textarea
                  ref={textareaRef}
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Ask anything..."
                  className="w-full px-4 py-3 bg-[#1e1e1e] text-white rounded-xl border border-transparent focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 resize-none overflow-y-auto text-sm leading-relaxed custom-scrollbar hover:bg-[#252525]"
                  rows="1"
                  disabled={isTyping}
                  style={{ minHeight: '48px', maxHeight: '120px' }}
                />
              </div>
              <button
                onClick={sendMessage}
                disabled={!inputValue.trim() || isTyping}
                className="send-button bg-white cursor-pointer text-black p-3 rounded-full transition-all duration-200 transform hover:scale-110 active:scale-95 disabled:scale-100 disabled:cursor-not-allowed shadow-lg hover:shadow-xl disabled:opacity-50"
                title={!inputValue.trim() ? 'Enter a message to send' : 'Send message (Enter)'}
              >
                <TiArrowUpThick className="w-5 h-5 text-black" />
              </button>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes bounce {
          0%, 80%, 100% {
            transform: translateY(0);
          }
          40% {
            transform: translateY(-10px);
          }
        }
        .animate-bounce {
          animation: bounce 1s infinite;
        }

        /* Custom Scrollbar */
        .custom-scrollbar {
          scrollbar-width: thin; /* Firefox */
          scrollbar-color: #6b7280 transparent;
        }
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background-color: #6b7280;
          border-radius: 9999px;
          transition: background-color 0.2s ease;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background-color: #9ca3af;
        }
        .custom-scrollbar::-webkit-scrollbar-button {
          display: none; /* remove arrows */
        }

        /* Smooth transitions for all interactive elements */
        * {
          transition: transform 0.2s ease, box-shadow 0.2s ease;
        }
      `}</style>
    </div>
  );
};

export default ChatApp;