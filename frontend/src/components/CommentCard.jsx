import React, { useState, memo } from 'react';
import { ThumbsUp, ThumbsDown, MessageCircle } from 'lucide-react';
import { Link } from 'react-router-dom'

const CommentCard = memo(({ comment }) => {
    const [showReplies, setShowReplies] = useState(false);

    const getAuthorName = (author) => {
        return (author && author.display_name) ? author.display_name.replace('@', '') : 'Anonymous';
    };

    const getInitial = (author) => {
        const name = getAuthorName(author);
        return name.charAt(0).toUpperCase();
    };

    const formatDate = (dateString) => {
        if (!dateString) return 'N/A';
        const date = new Date(dateString);
        return date.toLocaleDateString();
    };

    const mainAuthorName = getAuthorName(comment?.author);

    return (
        <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-4 mb-4 hover:bg-white/10 hover:border-white/20 transition-all duration-300 group">
            <div className="flex gap-3 mb-3">
                <div className="flex-shrink-0">
                    {comment?.author && comment.author.profile_image_url ? (
                        <img
                            src={comment.author.profile_image_url}
                            alt={`${mainAuthorName}'s avatar`}
                            className="w-10 h-10 rounded-full border border-white/10"
                            onError={(e) => {
                                e.target.style.display = 'none';
                                e.target.nextSibling.style.display = 'flex';
                            }}
                        />
                    ) : null}
                    <div className={`w-10 h-10 bg-gradient-to-br from-gray-500/80 to-gray-700/80 backdrop-blur-sm rounded-full flex items-center justify-center text-white font-semibold text-sm border border-white/10 ${comment?.author && comment.author.profile_image_url ? 'hidden' : 'flex'}`}>
                        {getInitial(comment?.author)}
                    </div>
                </div>

                <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1 flex-wrap">
                        <span className="text-blue-300 font-medium text-sm hover:text-blue-200 transition-colors">
                            @{mainAuthorName}
                        </span>
                        <span className="text-gray-400 text-xs">
                            {formatDate(comment?.published_at)}
                        </span>
                    </div>

                    <p className="text-white text-sm leading-relaxed mb-3 group-hover:text-gray-100 transition-colors"
                        dangerouslySetInnerHTML={{
                            __html: (comment?.text_display || comment?.text_original || 'Comment text not available.')
                                .replace(/<a[^>]*>/g, '')
                                .replace(/<\/a>/g, '')
                                .replace(/&amp;/g, '&')
                                .replace(/&lt;/g, '<')
                                .replace(/&gt;/g, '>')
                                .replace(/&quot;/g, '"')
                                .replace(/&#39;/g, "'")
                                .replace(/<br\s*\/?>/gi, '\n')
                        }}>
                    </p>

                    <div className="flex items-center gap-4 text-xs">
                        <div className="flex items-center gap-1 text-gray-300 hover:text-white transition-colors cursor-pointer">
                            <ThumbsUp size={14} />
                            <span>{comment?.like_count || 0}</span>
                        </div>
                        <div className="flex items-center gap-1 text-gray-300 hover:text-white transition-colors cursor-pointer">
                            <ThumbsDown size={14} />
                            <span>0</span>
                        </div>
                        {comment?.replies && comment.replies.length > 0 && (
                            <button
                                onClick={() => setShowReplies(!showReplies)}
                                className="flex items-center gap-1 text-blue-300 hover:text-blue-200 transition-colors"
                            >
                                <MessageCircle size={14} />
                                <span>{comment?.replies?.length} {comment.replies.length === 1 ? 'Reply' : 'Replies'}</span>
                            </button>
                        )}
                    </div>
                </div>

                <div className="flex-shrink-0">
                    <Link to={`/ask-ai?message=${encodeURIComponent(
                        (comment?.text_display || comment?.text_original || '') + " Help me to solve this problem"
                    )}`}>
                        <button className="bg-gradient-to-r from-red-500 to-pink-600 backdrop-blur-sm text-white px-3 py-1 rounded-lg text-xs font-medium hover:from-red-600 hover:to-pink-600 transition-all duration-300 hover:scale-105 border border-white/10">
                            Ask AI
                        </button>
                    </Link>
                </div>
            </div>

            {showReplies && comment?.replies && comment.replies.length > 0 && (
                <div className="ml-8 border-l-2 border-white/20 pl-4 space-y-3 animate-[slideDown_0.3s_ease-out]">
                    {comment?.replies?.map((reply, index) => (
                        <div key={reply.id || index} className="flex gap-3">
                            <div className="w-8 h-8 flex-shrink-0">
                                {reply?.author && reply.author.profile_image_url ? (
                                    <img
                                        src={reply.author.profile_image_url}
                                        alt={`${getAuthorName(reply?.author)}'s avatar`}
                                        className="w-8 h-8 rounded-full border border-white/10"
                                        onError={(e) => {
                                            e.target.style.display = 'none';
                                            e.target.nextSibling.style.display = 'flex';
                                        }}
                                    />
                                ) : null}
                                <div className={`w-8 h-8 bg-gradient-to-br from-gray-600/80 to-gray-800/80 backdrop-blur-sm rounded-full flex items-center justify-center text-white font-medium text-xs flex-shrink-0 border border-white/10 ${reply?.author && reply.author.profile_image_url ? 'hidden' : 'flex'}`}>
                                    {getInitial(reply?.author)}
                                </div>
                            </div>
                            <div className="flex-1">
                                <div className="flex items-center gap-2 mb-1">
                                    <span className="text-blue-300 font-medium text-xs hover:text-blue-200 transition-colors">
                                        @{getAuthorName(reply?.author)}
                                    </span>
                                    <span className="text-gray-400 text-xs">
                                        {formatDate(reply?.published_at)}
                                    </span>
                                </div>
                                <p className="text-white text-xs leading-relaxed mb-2 hover:text-gray-100 transition-colors"
                                    dangerouslySetInnerHTML={{
                                        __html: (reply?.text_display || reply?.text_original || 'Reply text not available.')
                                            .replace(/<a[^>]*>/g, '')
                                            .replace(/<\/a>/g, '')
                                            .replace(/&amp;/g, '&')
                                            .replace(/&lt;/g, '<')
                                            .replace(/&gt;/g, '>')
                                            .replace(/&quot;/g, '"')
                                            .replace(/&#39;/g, "'")
                                            .replace(/<br\s*\/?>/gi, '\n')
                                    }}>
                                </p>
                                <div className="flex items-center gap-3 text-xs">
                                    <div className="flex items-center gap-1 text-gray-300 hover:text-white transition-colors cursor-pointer">
                                        <ThumbsUp size={12} />
                                        <span>{reply?.like_count || 0}</span>
                                    </div>
                                    <div className="flex items-center gap-1 text-gray-300 hover:text-white transition-colors cursor-pointer">
                                        <ThumbsDown size={12} />
                                        <span>0</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
});

export default CommentCard;