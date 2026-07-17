import { useState, useRef, useEffect } from 'react';
import { TiArrowUpThick } from "react-icons/ti";
import { Copy, Check } from 'lucide-react';
import logo from '../images/logo.gif';
import chatService from '../services/chatService';

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

  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js';
    script.onload = () => {
      const { gsap } = window;

      const tl = gsap.timeline();

      tl.fromTo(headerRef.current,
        { y: -30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.7, ease: "power3.out" }
      )
      .fromTo(messagesContainerRef.current,
        { y: 24, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5, ease: "power2.out" },
        "-=0.35"
      )
      .fromTo(inputSectionRef.current,
        { y: 40, opacity: 0, scale: 0.97 },
        { y: 0, opacity: 1, scale: 1, duration: 0.6, ease: "back.out(1.2)" },
        "-=0.25"
      );

      const initialMessageEl = document.querySelector('[data-message-id="1"]');
      if (initialMessageEl) {
        gsap.fromTo(initialMessageEl,
          { x: -30, opacity: 0, scale: 0.9 },
          { x: 0, opacity: 1, scale: 1, duration: 0.5, ease: "power2.out", delay: 0.4 }
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

  useEffect(() => {
    if (window.gsap && messages.length > 1) {
      const lastMessage = messages[messages.length - 1];
      const messageEl = document.querySelector(`[data-message-id="${lastMessage.id}"]`);

      if (messageEl) {
        const { gsap } = window;
        if (lastMessage.sender === 'user') {
          gsap.fromTo(messageEl,
            { x: 50, opacity: 0, scale: 0.8 },
            { x: 0, opacity: 1, scale: 1, duration: 0.4, ease: "back.out(1.4)" }
          );
        } else {
          gsap.fromTo(messageEl,
            { x: -50, opacity: 0, scale: 0.9 },
            { x: 0, opacity: 1, scale: 1, duration: 0.5, ease: "elastic.out(1, 0.8)" }
          );
        }
      }
    }
  }, [messages]);

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
      const answerText = await chatService.askQuestion(userMessage.text);

      setTimeout(() => {
        const aiMessage = {
          id: Date.now() + 1,
          text: answerText || 'Sorry, something went wrong.',
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
          text: error.message || 'Failed to connect to server. Please check if the backend is running on localhost:8080.',
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

  const copyToClipboard = async (text, messageId) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedMessageId(messageId);

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
    <div className="typing-indicator flex items-center space-x-2 p-4 bg-blue-50 border border-blue-100 rounded-2xl max-w-xs shadow-sm">
      <div className="flex space-x-1">
        <div className="w-2 h-2 bg-blue-300 rounded-full animate-bounce" style={{ animationDelay: '0s' }}></div>
        <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
        <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
      </div>
      <span className="text-xs text-gray-500 font-medium">Let me think...</span>
    </div>
  );

  return (
    // pt-14/pt-16 reserves space for the fixed Navbar (h-14 sm:h-16) so content never sits under it
    <div className="h-screen bg-white flex flex-col overflow-hidden pt-14 sm:pt-16">
      <div ref={headerRef} className="flex-shrink-0 flex flex-col items-center pt-6 pb-3">
        <div className="w-14 h-14 bg-blue-50 border-2 border-blue-100 rounded-2xl p-1 shadow-sm hover:scale-105 transition-transform duration-300">
          <img
            src={logo}
            alt="Logo"
            className="w-full h-full rounded-xl object-cover bg-white"
          />
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mt-4">How can I help you?</h2>
      </div>

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
                  <div className="w-10 h-10 rounded-full bg-blue-50 border border-blue-100 flex items-center justify-center mb-1 hover:scale-110 transition-transform duration-200">
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
                      ? 'bg-blue-500 text-white rounded-br-md hover:scale-[1.02]'
                      : 'bg-blue-50 text-gray-900 rounded-bl-md border border-blue-100 hover:border-blue-200 hover:scale-[1.02]'
                      }`}
                  >
                    <p className="text-sm leading-relaxed whitespace-pre-wrap">{message.text}</p>
                    {message.sender === 'ai' && (
                      <button
                        data-copy-btn={message.id}
                        onClick={() => copyToClipboard(message.text, message.id)}
                        className="absolute top-1 right-0 opacity-0 group-hover:opacity-100 p-1 hover:bg-blue-100 rounded transition-all duration-200 hover:scale-110"
                        title="Copy message"
                      >
                        {copiedMessageId === message.id ? (
                          <Check size={14} className="text-green-600" />
                        ) : (
                          <Copy size={14} className="text-blue-400" />
                        )}
                      </button>
                    )}
                  </div>
                  <p
                    className={`text-xs mt-1 px-2 ${message.sender === 'user'
                      ? 'text-gray-400 text-right'
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
                <div className="w-10 h-10 rounded-full bg-blue-50 border border-blue-100 flex items-center justify-center mb-1">
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

        <div ref={inputSectionRef} className="flex-shrink-0 py-4">
          <div className="w-full bg-white rounded-2xl shadow-lg shadow-blue-500/5 border-2 border-blue-500 p-4 transition-all duration-300">
            <div className="flex items-center space-x-3">
              <div className="flex-1 relative">
                <textarea
                  ref={textareaRef}
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Ask anything..."
                  className="w-full px-4 py-3 bg-white text-gray-800 rounded-xl border border-transparent focus:outline-none focus:ring-2 focus:ring-blue-200 transition-all duration-200 resize-none overflow-y-auto text-sm leading-relaxed custom-scrollbar placeholder-gray-400"
                  rows="1"
                  disabled={isTyping}
                  style={{ minHeight: '48px', maxHeight: '120px' }}
                />
              </div>
              <button
                onClick={sendMessage}
                disabled={!inputValue.trim() || isTyping}
                className="send-button bg-[#0084FF] hover:bg-[#0074E0] cursor-pointer text-white p-3 rounded-full transition-all duration-200 transform hover:scale-110 active:scale-95 disabled:scale-100 disabled:cursor-not-allowed shadow-lg shadow-blue-500/20 disabled:opacity-50"
                title={!inputValue.trim() ? 'Enter a message to send' : 'Send message (Enter)'}
              >
                <TiArrowUpThick className="w-5 h-5 text-white" />
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
            transform: translateY(-6px);
          }
        }
        .animate-bounce {
          animation: bounce 1s infinite;
        }

        .custom-scrollbar {
          scrollbar-width: thin;
          scrollbar-color: #93c5fd transparent;
        }
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background-color: #93c5fd;
          border-radius: 9999px;
          transition: background-color 0.2s ease;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background-color: #60a5fa;
        }
        .custom-scrollbar::-webkit-scrollbar-button {
          display: none;
        }

        * {
          transition: transform 0.2s ease, box-shadow 0.2s ease;
        }
      `}</style>
    </div>
  );
};

export default ChatApp;