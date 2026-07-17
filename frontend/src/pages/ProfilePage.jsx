import React, { useState, useEffect, useRef } from 'react';
import { User, Mail, Calendar, LogOut, Edit3, Youtube, Clock, FileText, ExternalLink } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { gsap } from 'gsap';
import useAuth from '../store/Useauth';
import profileService from '../services/profileService';

export default function ProfilePage() {
    const { logout } = useAuth();
    const navigate = useNavigate();

    // Local Component State Architecture
    const [profileData, setProfileData] = useState(null);
    const [historyList, setHistoryList] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    // Dom reference hooks for entrance animations
    const sidebarRef = useRef(null);
    const historyPanelRef = useRef(null);

    useEffect(() => {
        const fetchDashboardData = async () => {
            try {
                setIsLoading(true);
                const [profile, history] = await Promise.all([
                    profileService.getUserProfile(),
                    profileService.getUserHistory()
                ]);
                setProfileData(profile);
                setHistoryList(history);
            } catch (err) {
                toast.error(err.message || "Failed to sync account statistics.");
            } finally {
                setIsLoading(false);
            }
        };

        fetchDashboardData();
    }, []);

    // ── Grid Stagger Animation Hook ──────────────────────────────────────────
    useEffect(() => {
        if (!isLoading && profileData) {
            const ctx = gsap.context(() => {
                gsap.fromTo(sidebarRef.current,
                    { x: -30, opacity: 0 },
                    { x: 0, opacity: 1, duration: 0.6, ease: 'power3.out' }
                );
                gsap.fromTo(historyPanelRef.current,
                    { x: 30, opacity: 0 },
                    { x: 0, opacity: 1, duration: 0.6, ease: 'power3.out' },
                    '-=0.4'
                );
                
                const items = historyPanelRef.current?.querySelectorAll('.history-row-item');
                if (items?.length) {
                    gsap.fromTo(items,
                        { y: 15, opacity: 0 },
                        { y: 0, opacity: 1, duration: 0.4, stagger: 0.05, ease: 'power2.out' }
                    );
                }
            });
            return () => ctx.revert();
        }
    }, [isLoading, profileData]);

    const handleLogoutClick = async () => {
        try {
            await logout();
            toast.success('Logged out successfully!');
            navigate('/');
        } catch (error) {
            toast.error('Failed to clear session safely.');
        }
    };

    // Generates fallback uppercase initials from first and last/subsequent space breaks
    const getInitials = (nameString) => {
        if (!nameString) return 'U';
        const parts = nameString.trim().split(/\s+/);
        if (parts.length >= 2) {
            return (parts[0].charAt(0) + parts[1].charAt(0)).toUpperCase();
        }
        return parts[0].substring(0, 2).toUpperCase();
    };

    if (isLoading) {
        return (
            <div className="min-h-screen w-full bg-white flex flex-col items-center justify-center text-gray-400">
                <div className="w-12 h-12 rounded-full border-4 border-t-blue-500 border-r-transparent animate-spin mb-4" />
                <p className="text-gray-700 font-mono text-sm tracking-widest animate-pulse">SYNCHRONIZING PROFILE...</p>
            </div>
        );
    }

    return (
        <div className="min-h-screen w-full bg-white text-black pt-20 lg:pt-24 px-4 sm:px-6 lg:px-8 pb-6 flex flex-col box-border relative overflow-hidden select-none">
            
            {/* Ambient System Glows */}
            <div className="absolute top-[-10%] left-[-10%] w-[45%] h-[45%] bg-blue-600/10 rounded-full blur-[130px] pointer-events-none" />
            <div className="absolute bottom-[-10%] right-[-10%] w-[45%] h-[45%] bg-cyan-500/10 rounded-full blur-[130px] pointer-events-none" />

            {/* Split Screen Application Container */}
            <div className="w-full max-w-7xl mx-auto flex flex-col lg:flex-row gap-6 flex-1 h-full lg:max-h-[calc(100vh-120px)] items-stretch">
                
                {/* ── LEFT LAYOUT SIDEBAR: User Credentials Summary ── */}
                <div 
                    ref={sidebarRef}
                    className="w-full lg:w-1/3 bg-white/10 backdrop-blur-xl border border-white/5 rounded-3xl p-6 flex flex-col justify-between shadow-2xl min-h-[420px] lg:min-h-0"
                >
                    <div className="space-y-6">
                        {/* Avatar Frame Container */}
                        <div className="flex flex-col items-center text-center">
                            <div className="w-24 h-24 rounded-full bg-gradient-to-tr from-blue-500 via-indigo-500 to-cyan-400 p-1 shadow-xl shadow-blue-500/10 relative group mb-4">
                                {profileData?.profile_img ? (
                                    <img 
                                        src={profileData.profile_img} 
                                        alt="Avatar" 
                                        className="w-full h-full object-cover rounded-full"
                                    />
                                ) : (
                                    <div className="w-full h-full bg-blue-500 rounded-full flex items-center justify-center text-white font-bold text-xl tracking-wider text-blue-400">
                                        {getInitials(profileData?.name)}
                                    </div>
                                )}
                            </div>

                            <h2 className="text-xl font-bold text-black tracking-tight capitalize">
                                Welcome Back!
                            </h2>

                            <h2 className="text-xl font-bold text-blue-500 tracking-tight capitalize">
                                {profileData?.name || 'Search explorer'}
                            </h2>
                        </div>

                        {/* Text Fields details list container */}
                        <div className="space-y-3 pt-2">
                            <div className="flex items-center gap-3 px-4 py-3 bg-blue-500 border border-white/5 rounded-2xl">
                                <Mail size={16} className="text-gray-700 flex-shrink-0" />
                                <div className="min-w-0 flex-1">
                                    <p className="text-[10px] text-gray-700 font-bold uppercase tracking-wider">Email Box Address</p>
                                    <p className="text-sm text-gray-200 font-medium truncate">{profileData?.email}</p>
                                </div>
                            </div>

                            <div className="flex items-center gap-3 px-4 py-3 bg-blue-500 border border-white/5 rounded-2xl">
                                <Calendar size={16} className="text-gray-700 flex-shrink-0" />
                                <div className="min-w-0 flex-1">
                                    <p className="text-[10px] text-gray-700 font-bold uppercase tracking-wider">Registration Timestamp</p>
                                    <p className="text-sm text-gray-200 font-medium truncate">
                                        {profileData?.createdAt ? new Date(profileData.createdAt).toLocaleDateString(undefined, { dateStyle: 'long' }) : 'N/A'}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Left Sidebar Footer Settings Control Actions */}
                    <div className="flex flex-col sm:flex-row gap-3 pt-6 border-t border-white/5 mt-6">
                        <button
                            onClick={() => toast.success('Profile editor coming soon!')}
                            className="flex-1 px-4 py-3 bg-white/5 hover:bg-white/10 border border-gray-400 text-black font-medium text-xs rounded-xl transition-all duration-200 flex items-center justify-center gap-2 active:scale-95"
                        >
                            <Edit3 size={14} className="text-gray-300" />
                            Edit Profile
                        </button>
                        
                        <button
                            onClick={handleLogoutClick}
                            className="flex-1 px-4 py-3 bg-gradient-to-r from-red-500/10 to-orange-500/10 hover:from-red-500/20 hover:to-orange-500/20 border border-red-500/20 hover:border-red-500/40 text-red-400 font-semibold text-xs rounded-xl transition-all duration-200 flex items-center justify-center gap-2 active:scale-95"
                        >
                            <LogOut size={14} />
                            Log Out
                        </button>
                    </div>
                </div>

                {/* ── RIGHT LAYOUT PANEL: Scrollable History Activity Log ── */}
                <div 
                    ref={historyPanelRef}
                    className="flex-1 bg-white/10 backdrop-blur-xl border border-white/5 rounded-3xl p-6 flex flex-col min-h-[450px] lg:min-h-0"
                >
                    <div className="flex items-center gap-2 pb-4 border-b border-white/5 mb-4 flex-shrink-0">
                        <Clock size={18} className="text-blue-400" />
                        <h3 className="text-base font-bold text-black tracking-tight">
                            Semantic Exploration Logs ({historyList.length})
                        </h3>
                    </div>

                    {/* Window view limits list to keep viewport scroll contained correctly */}
                    <div className="flex-1 overflow-y-auto pr-1 custom-scrollbar max-h-[400px] lg:max-h-none">
                        <div className="space-y-3">
                            {historyList.length > 0 ? (
                                historyList.map((item) => (
                                    <div 
                                        key={item.id} 
                                        className="history-row-item bg-blue-500 border border-white/5 hover:border-blue-500/20 rounded-2xl p-4 transition-all duration-300 flex flex-col md:flex-row md:items-center justify-between gap-4 group"
                                    >
                                        {/* Column 1 - Description Context Query details */}
                                        <div className="flex items-start gap-3 flex-1 min-w-0">
                                            <FileText size={16} className="text-gray-700 mt-1 flex-shrink-0" />
                                            <div className="min-w-0 flex-1">
                                                <p className="text-xs text-gray-700 font-medium block md:hidden mb-0.5 uppercase tracking-wide text-[10px]">Prompt</p>
                                                <p className="text-sm font-medium text-white tracking-tight truncate md:whitespace-normal md:line-clamp-2">
                                                    {item.description || 'Global broad lookup matching references'}
                                                </p>
                                            </div>
                                        </div>

                                        {/* Column 2 - Time Data logs */}
                                        <div className="flex items-center gap-2 md:w-44 flex-shrink-0">
                                            <div className="min-w-0">
                                                <p className="text-xs text-white font-medium block md:hidden mb-0.5 uppercase tracking-wide text-[10px]">Search Date</p>
                                                <p className="text-xs text-white font-mono">
                                                    {item.searchDate ? new Date(item.searchDate).toLocaleString(undefined, { dateStyle: 'short', timeStyle: 'short' }) : 'N/A'}
                                                </p>
                                            </div>
                                        </div>

                                        {/* Column 3 - Redirect Anchor button wrapper */}
                                        <div className="flex-shrink-0 self-start md:self-center">
                                            <a 
                                                href={item.url} 
                                                target="_blank" 
                                                rel="noopener noreferrer"
                                                className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-red-500 hover:bg-white text-white hover:text-black border border-blue-500/20 hover:border-transparent rounded-xl text-xs font-semibold transition-all duration-300 shadow-md group-hover:scale-105"
                                            >
                                                <Youtube size={14} />
                                                View Video
                                                <ExternalLink size={10} className="opacity-70" />
                                            </a>
                                        </div>

                                    </div>
                                ))
                            ) : (
                                <div className="text-center py-16 bg-blue-500 rounded-2xl border border-dashed border-white/5">
                                    <p className="text-sm text-white">No active historic lookups found in your account.</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

            </div>

            {/* Custom inner Webkit scroll bars values */}
            <style jsx global>{`
                .custom-scrollbar::-webkit-scrollbar {
                    width: 6px;
                }
                .custom-scrollbar::-webkit-scrollbar-track {
                    background: rgba(255, 255, 255, 0.02);
                    border-radius: 8px;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb {
                    background-color: rgba(255, 255, 255, 0.12);
                    border-radius: 8px;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb:hover {
                    background-color: rgba(59, 130, 246, 0.4);
                }
            `}</style>
        </div>
    );
}