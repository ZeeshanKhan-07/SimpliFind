import React, { useEffect, useRef } from 'react';
import { User, Mail, Shield, LogOut, Calendar, LayoutDashboard } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { gsap } from 'gsap';
import useAuth from '../store/Useauth';

export default function ProfilePage() {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    // Refs for entry animations
    const cardRef = useRef(null);
    const headerRef = useRef(null);
    const detailsRef = useRef(null);

    // ── Entry Animation ──────────────────────────────────────────────────────
    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.fromTo(cardRef.current, 
                { y: 30, opacity: 0 }, 
                { y: 0, opacity: 1, duration: 0.6, ease: 'power3.out' }
            );
            gsap.fromTo(headerRef.current, 
                { scale: 0.9, opacity: 0 }, 
                { scale: 1, opacity: 1, duration: 0.5, delay: 0.2, ease: 'back.out(1.7)' }
            );
            
            const rows = detailsRef.current?.querySelectorAll('.info-row');
            if (rows?.length) {
                gsap.fromTo(rows, 
                    { x: -20, opacity: 0 }, 
                    { x: 0, opacity: 1, duration: 0.4, stagger: 0.08, delay: 0.3, ease: 'power2.out' }
                );
            }
        });
        return () => ctx.revert();
    }, []);

    const handleLogoutClick = async () => {
        try {
            await logout();
            toast.success('Logged out successfully!');
            navigate('/');
        } catch (error) {
            toast.error('Failed to log out cleanly. Please try again.');
        }
    };

    // Fallback display if access is attempted while state is hydration-empty
    const activeUser = user || {
        displayName: 'Guest User',
        email: 'user@simplifind.com',
        role: 'Standard Member',
        createdAt: new Date().toISOString()
    };

    return (
        <div className="min-h-screen w-full bg-slate-950 flex flex-col items-center justify-start md:justify-center pt-24 sm:pt-28 md:pt-6 p-6 relative overflow-hidden selection:bg-blue-500/30">
            
            {/* Ambient Lighting Accents */}
            <div className="absolute top-[-10%] right-[-10%] w-[50%] h-[50%] bg-blue-600/10 rounded-full blur-[120px] pointer-events-none" />
            <div className="absolute bottom-[-10%] left-[-10%] w-[50%] h-[50%] bg-cyan-500/10 rounded-full blur-[120px] pointer-events-none" />

            {/* Profile Card Interface */}
            <div 
                ref={cardRef} 
                className="w-full max-w-xl bg-slate-900/40 backdrop-blur-xl border border-white/5 rounded-3xl p-6 sm:p-10 shadow-2xl z-10"
            >
                {/* Header Profile Section */}
                <div ref={headerRef} className="flex flex-col items-center text-center pb-6 border-b border-white/5">
                    <div className="w-24 h-24 rounded-full bg-gradient-to-tr from-blue-500 via-indigo-500 to-cyan-400 p-1 shadow-xl shadow-blue-500/20 relative group">
                        <div className="w-full h-full bg-slate-950 rounded-full flex items-center justify-center text-white">
                            <User size={40} className="text-blue-400 group-hover:scale-110 transition-transform duration-300" />
                        </div>
                    </div>
                    
                    <h2 className="text-xl sm:text-2xl font-bold text-white mt-4 tracking-tight">
                        {activeUser.displayName || activeUser.username || 'Welcome Back'}
                    </h2>
                    <span className="px-3 py-1 bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-semibold rounded-full mt-1.5 uppercase tracking-wider">
                        {activeUser.role || 'Active Account'}
                    </span>
                </div>

                {/* Account Details Form Section */}
                <div ref={detailsRef} className="py-6 space-y-4">
                    <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">
                        Account Information
                    </h3>

                    {/* Row 1 - Email Address */}
                    <div className="info-row flex items-center gap-4 px-4 py-3 bg-slate-950/40 border border-white/5 rounded-xl hover:border-white/10 transition-colors">
                        <Mail size={18} className="text-gray-400 flex-shrink-0" />
                        <div className="min-w-0 flex-1">
                            <p className="text-xs text-gray-500 font-medium">Email Address</p>
                            <p className="text-sm text-gray-200 font-medium truncate">{activeUser.email}</p>
                        </div>
                    </div>

                    {/* Row 2 - Security Clearance Role */}
                    <div className="info-row flex items-center gap-4 px-4 py-3 bg-slate-950/40 border border-white/5 rounded-xl hover:border-white/10 transition-colors">
                        <Shield size={18} className="text-gray-400 flex-shrink-0" />
                        <div className="min-w-0 flex-1">
                            <p className="text-xs text-gray-500 font-medium">Security Group</p>
                            <p className="text-sm text-gray-200 font-medium truncate">Authorized User Profile</p>
                        </div>
                    </div>

                    {/* Row 3 - Registration Date */}
                    <div className="info-row flex items-center gap-4 px-4 py-3 bg-slate-950/40 border border-white/5 rounded-xl hover:border-white/10 transition-colors">
                        <Calendar size={18} className="text-gray-400 flex-shrink-0" />
                        <div className="min-w-0 flex-1">
                            <p className="text-xs text-gray-500 font-medium">Member Since</p>
                            <p className="text-sm text-gray-200 font-medium truncate">
                                {activeUser.createdAt ? new Date(activeUser.createdAt).toLocaleDateString() : 'Active'}
                            </p>
                        </div>
                    </div>
                </div>

                {/* Interactive Action Control Section */}
                <div className="pt-4 border-t border-white/5 flex flex-col sm:flex-row gap-3">
                    <button
                        onClick={() => navigate('/find-comments')}
                        className="flex-1 px-5 py-3.5 bg-white/5 hover:bg-white/10 border border-white/10 text-white font-medium text-sm rounded-xl transition-all duration-200 flex items-center justify-center gap-2 active:scale-[0.98]"
                    >
                        <LayoutDashboard size={16} className="text-gray-300" />
                        Find Comments
                    </button>
                    
                    <button
                        onClick={handleLogoutClick}
                        className="flex-1 px-5 py-3.5 bg-gradient-to-r from-red-500/10 to-orange-500/10 hover:from-red-500/20 hover:to-orange-500/20 border border-red-500/30 hover:border-red-500/50 text-red-400 font-semibold text-sm rounded-xl transition-all duration-200 flex items-center justify-center gap-2 active:scale-[0.98]"
                    >
                        <LogOut size={16} />
                        Log Out Account
                    </button>
                </div>

            </div>
        </div>
    );
}