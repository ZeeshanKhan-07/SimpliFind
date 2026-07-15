import React, { useState } from 'react';
import { ArrowRight, Loader2 } from 'lucide-react';
import { searchCommentsApi } from '../services/commentService';
import SearchResultsModal from '../components/SearchResultsModal';

export default function FindComments() {
    const [videoUrl, setVideoUrl] = useState('');
    const [searchQuery, setSearchQuery] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [errorMsg, setErrorMsg] = useState('');
    
    // Modal controls configuration variables
    const [commentsList, setCommentsList] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleProceedSubmit = async (e) => {
        e.preventDefault();
        setErrorMsg('');
        
        if (!videoUrl.trim()) {
            setErrorMsg('Please paste a valid YouTube video link first.');
            return;
        }
        if (!searchQuery.trim()) {
            setErrorMsg('Please enter a description for the comments you want to search.');
            return;
        }

        setIsLoading(true);
        try {
            const data = await searchCommentsApi(videoUrl, searchQuery);
            if (data && data.comments) {
                setCommentsList(data.comments);
                setIsModalOpen(true);
            } else {
                setCommentsList([]);
                setErrorMsg('No results or unexpected response format returned.');
            }
        } catch (err) {
            setErrorMsg(err.message || 'An error occurred while communicating with the backend API.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen w-full bg-white flex flex-col items-center justify-center p-6 text-black selection:bg-blue-500/20">
            <div className="w-full max-w-3xl space-y-8">
                
                <form onSubmit={handleProceedSubmit} className="space-y-6">
                    {/* Input Field 1 - URL Link */}
                    <div className="space-y-2">
                        <label className="block text-base font-bold text-gray-900 tracking-tight">
                            Paste your link here
                        </label>
                        <input
                            type="text"
                            value={videoUrl}
                            onChange={(e) => setVideoUrl(e.target.value)}
                            placeholder="https://www.youtube.com/watch?v=PVm6rPxzazE"
                            className="w-full px-5 py-4 border-2 border-blue-500 text-gray-800 rounded-2xl bg-white focus:outline-none placeholder-gray-400/80 text-[15px] shadow-sm transition-all"
                        />
                    </div>

                    {/* Input Field 2 - Query Prompt Description */}
                    <div className="space-y-2">
                        <label className="block text-base font-bold text-gray-900 tracking-tight">
                            Describe what type of comment you're searching for
                        </label>
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="I am looking for comments related to system design...."
                            className="w-full px-5 py-4 border-2 border-blue-500 text-gray-800 rounded-2xl bg-white focus:outline-none placeholder-gray-400/80 text-[15px] shadow-sm transition-all"
                        />
                    </div>

                    {/* API error response presentation */}
                    {errorMsg && (
                        <p className="text-sm font-medium text-red-600 bg-red-50 p-3 rounded-xl border border-red-200 animate-pulse">
                            {errorMsg}
                        </p>
                    )}

                    {/* Submission Button Trigger Component */}
                    <div className="flex justify-center pt-4">
                        <button
                            type="submit"
                            disabled={isLoading}
                            className="bg-[#0084FF] hover:bg-[#0074E0] disabled:opacity-50 text-white font-semibold px-10 py-4 rounded-full transition-all duration-200 transform active:scale-95 flex items-center justify-center gap-2 text-base shadow-lg shadow-blue-500/20 w-56 h-14"
                        >
                            {isLoading ? (
                                <Loader2 className="animate-spin" size={20} />
                            ) : (
                                <>
                                    Proceed
                                    <ArrowRight size={18} />
                                </>
                            )}
                        </button>
                    </div>
                </form>

            </div>

            {/* Results Modal overlay component setup */}
            <SearchResultsModal
                isOpen={isModalOpen}
                comments={commentsList}
                onClose={() => setIsModalOpen(false)}
            />
        </div>
    );
}