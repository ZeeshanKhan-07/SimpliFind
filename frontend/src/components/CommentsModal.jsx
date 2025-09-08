import React, { useState, useEffect, useMemo } from 'react';
import { X, Search, ChevronLeft, ChevronRight } from 'lucide-react';
import CommentCard from './CommentCard';

function CommentsModal({ comments, isOpen, onClose }) {
    const [searchQuery, setSearchQuery] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(10);

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isOpen]);

    useEffect(() => {
        setCurrentPage(1);
    }, [searchQuery]);

    const filteredComments = useMemo(() => {
        if (!searchQuery.trim()) return comments;

        const query = searchQuery.toLowerCase();
        return comments.filter(comment => {
            const commentText = comment?.text_display || comment?.text_original || '';
            const authorName = comment?.author?.display_name || '';
            
            const matchesMain = commentText.toLowerCase().includes(query) ||
                               authorName.toLowerCase().includes(query);
            
            const matchesReplies = comment?.replies?.some(reply => {
                const replyText = reply?.text_display || reply?.text_original || '';
                const replyAuthor = reply?.author?.display_name || '';
                return replyText.toLowerCase().includes(query) ||
                       replyAuthor.toLowerCase().includes(query);
            });
            
            return matchesMain || matchesReplies;
        });
    }, [comments, searchQuery]);

    const paginatedComments = useMemo(() => {
        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        return filteredComments.slice(startIndex, endIndex);
    }, [filteredComments, currentPage, itemsPerPage]);

    const totalPages = Math.ceil(filteredComments.length / itemsPerPage);

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    const getPaginationRange = () => {
        const range = [];
        const showPages = 5;
        let start = Math.max(1, currentPage - Math.floor(showPages / 2));
        let end = Math.min(totalPages, start + showPages - 1);
        
        if (end - start < showPages - 1) {
            start = Math.max(1, end - showPages + 1);
        }
        
        for (let i = start; i <= end; i++) {
            range.push(i);
        }
        return range;
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
            <div
                className="absolute inset-0 bg-black/50 backdrop-blur-sm"
                onClick={onClose}
            ></div>

            <div className="relative z-10 w-full max-w-4xl max-h-[90vh] mx-4 animate-[modalSlideIn_0.3s_ease-out]">
                <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl shadow-2xl relative overflow-hidden">
                    <div className="p-4 sm:p-6 border-b border-white/10">
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="text-xl sm:text-2xl font-bold text-white">Similar Comments</h2>
                            <button
                                onClick={onClose}
                                className="text-white/60 hover:text-white transition-colors p-2 hover:bg-white/10 rounded-lg"
                            >
                                <X size={24} />
                            </button>
                        </div>

                        <div className="relative">
                            <input
                                type="text"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full px-4 py-3 pl-12 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:border-white/40 focus:ring-2 focus:ring-white/10 transition-all duration-300 text-sm sm:text-base"
                                placeholder="Enter your comment to find similar ones..."
                            />
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-white/50" size={18} />
                        </div>
                    </div>

                    <div className="max-h-[50vh] overflow-y-auto p-4 sm:p-6 custom-scrollbar">
                        <div className="space-y-4">
                            {paginatedComments.length > 0 ? (
                                paginatedComments.map((comment, index) => (
                                    <CommentCard key={comment.id || index} comment={comment} />
                                ))
                            ) : (
                                <p className="text-center text-gray-400 py-8">
                                    {searchQuery ? 'No comments match your search.' : 'No comments available.'}
                                </p>
                            )}
                        </div>
                    </div>

                    {totalPages > 1 && (
                        <div className="p-4 sm:p-6 border-t border-white/10 bg-white/5">
                            <div className="flex items-center justify-between">
                                <p className="text-gray-400 text-xs sm:text-sm">
                                    Showing {Math.min(filteredComments.length, (currentPage - 1) * itemsPerPage + 1)}-{Math.min(filteredComments.length, currentPage * itemsPerPage)} of {filteredComments.length} comments
                                </p>
                                
                                <div className="flex items-center space-x-2">
                                    <button
                                        onClick={() => handlePageChange(currentPage - 1)}
                                        disabled={currentPage === 1}
                                        className="p-2 rounded-lg bg-white/10 border border-white/20 text-white disabled:opacity-50 disabled:cursor-not-allowed hover:bg-white/20 transition-colors"
                                    >
                                        <ChevronLeft size={16} />
                                    </button>
                                    
                                    <div className="flex space-x-1">
                                        {getPaginationRange().map(page => (
                                            <button
                                                key={page}
                                                onClick={() => handlePageChange(page)}
                                                className={`px-3 py-1 rounded-lg text-sm transition-colors ${
                                                    page === currentPage
                                                        ? 'bg-red-500 text-white'
                                                        : 'bg-white/10 border border-white/20 text-white hover:bg-white/20'
                                                }`}
                                            >
                                                {page}
                                            </button>
                                        ))}
                                    </div>
                                    
                                    <button
                                        onClick={() => handlePageChange(currentPage + 1)}
                                        disabled={currentPage === totalPages}
                                        className="p-2 rounded-lg bg-white/10 border border-white/20 text-white disabled:opacity-50 disabled:cursor-not-allowed hover:bg-white/20 transition-colors"
                                    >
                                        <ChevronRight size={16} />
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            <style jsx>{`
                @keyframes modalSlideIn {
                    from {
                        opacity: 0;
                        transform: scale(0.95) translateY(-20px);
                    }
                    to {
                        opacity: 1;
                        transform: scale(1) translateY(0);
                    }
                }
                .custom-scrollbar::-webkit-scrollbar {
                    width: 8px;
                }
                .custom-scrollbar::-webkit-scrollbar-track {
                    background: rgba(255, 255, 255, 0.05);
                    border-radius: 10px;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb {
                    background-color: rgba(255, 255, 255, 0.2);
                    border-radius: 10px;
                    border: 2px solid rgba(255, 255, 255, 0.1);
                }
                .custom-scrollbar::-webkit-scrollbar-thumb:hover {
                    background-color: rgba(255, 255, 255, 0.3);
                }
            `}</style>
        </div>
    );
}

export default CommentsModal;