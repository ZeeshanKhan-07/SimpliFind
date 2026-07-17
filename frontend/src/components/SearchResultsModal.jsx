import React, { useState, useMemo, useEffect } from 'react';
import { X, Search, ChevronLeft, ChevronRight } from 'lucide-react';
import CommentCard from './CommentCard';

function SearchResultsModal({ comments, isOpen, onClose }) {
    const [searchQuery, setSearchQuery] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(10);

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => { document.body.style.overflow = 'unset'; };
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
            return commentText.toLowerCase().includes(query) || authorName.toLowerCase().includes(query);
        });
    }, [comments, searchQuery]);

    const paginatedComments = useMemo(() => {
        const startIndex = (currentPage - 1) * itemsPerPage;
        return filteredComments.slice(startIndex, startIndex + itemsPerPage);
    }, [filteredComments, currentPage, itemsPerPage]);

    const totalPages = Math.ceil(filteredComments.length / itemsPerPage);

    const getPaginationRange = () => {
        const range = [];
        const showPages = 5;
        let start = Math.max(1, currentPage - Math.floor(showPages / 2));
        let end = Math.min(totalPages, start + showPages - 1);
        if (end - start < showPages - 1) start = Math.max(1, end - showPages + 1);
        for (let i = start; i <= end; i++) range.push(i);
        return range;
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-blue/60 backdrop-blur-md" onClick={onClose}></div>

            <div className="relative z-10 w-full max-w-4xl bg-white backdrop-blur-xl border border-white/10 rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
                
                {/* Header configuration */}
                <div className="p-6 border-b border-white/10">
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="text-xl font-bold text-black">Matching Comments ({filteredComments.length})</h2>
                        <button onClick={onClose} className="text-black/60 hover:text-black p-2 hover:bg-white/10 rounded-xl transition-all">
                            <X size={20} />
                        </button>
                    </div>
                    <div className="relative">
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full px-4 py-3 pl-12 bg-white/5 border border-gray-500 rounded-xl text-black placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all text-sm"
                            placeholder="Filter found results..."
                        />
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                    </div>
                </div>

                {/* Items View list */}
                <div className="flex-1 overflow-y-auto p-6 custom-scrollbar">
                    <div className="space-y-2">
                        {paginatedComments.length > 0 ? (
                            paginatedComments.map((comment, idx) => (
                                <CommentCard key={comment.id || idx} comment={comment} />
                            ))
                        ) : (
                            <p className="text-center text-gray-400 py-12">No matching results found.</p>
                        )}
                    </div>
                </div>

                {/* Footer and dynamic pagination container */}
                {totalPages > 1 && (
                    <div className="p-4 border-t border-white/10 bg-white/5 flex flex-col sm:flex-row items-center justify-between gap-4">
                        <p className="text-gray-400 text-xs sm:text-sm">
                            Showing {((currentPage - 1) * itemsPerPage) + 1} - {Math.min(currentPage * itemsPerPage, filteredComments.length)} of {filteredComments.length} entries
                        </p>
                        
                        <div className="flex items-center space-x-2">
                            <button
                                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                                disabled={currentPage === 1}
                                className="p-2 rounded-lg bg-white/5 border border-white/10 text-black disabled:opacity-30 disabled:cursor-not-allowed hover:bg-white/10"
                            >
                                <ChevronLeft size={16} />
                            </button>
                            
                            <div className="flex space-x-1">
                                {getPaginationRange().map(page => (
                                    <button
                                        key={page}
                                        onClick={() => setCurrentPage(page)}
                                        className={`px-3 py-1 rounded-lg text-sm transition-all ${
                                            page === currentPage
                                                ? 'bg-blue-500 text-black font-medium shadow-md shadow-blue-500/20'
                                                : 'bg-white/5 border border-white/10 text-gray-300 hover:bg-white/10'
                                        }`}
                                    >
                                        {page}
                                    </button>
                                ))}
                            </div>
                            
                            <button
                                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                                disabled={currentPage === totalPages}
                                className="p-2 rounded-lg bg-white/5 border border-white/10 text-black disabled:opacity-30 disabled:cursor-not-allowed hover:bg-white/10"
                            >
                                <ChevronRight size={16} />
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default SearchResultsModal;