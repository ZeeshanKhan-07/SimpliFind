import React, { useState, memo } from 'react';
import { ThumbsUp, ThumbsDown, MessageCircle, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';

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
    const textContent = comment?.text_display || comment?.text_original || '';

    return (
        <div className="bg-white/5 backdrop-blur-sm border hover:border-black rounded-2xl p-4 mb-4 hover:bg-white/10 border-blue-500/30 transition-all duration-300 group">
            <div className="flex gap-3 mb-3 items-start">
                <div className="flex-shrink-0">
                    {comment?.author && comment.author.profile_image_url ? (
                        <img
                            src={comment.author.profile_image_url}
                            alt={`${mainAuthorName}'s avatar`}
                            className="w-10 h-10 rounded-full border border-white/10 object-cover"
                            onError={(e) => {
                                e.target.style.display = 'none';
                                e.target.nextSibling.style.display = 'flex';
                            }}
                        />
                    ) : null}
                    <div className={`w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 backdrop-blur-sm rounded-full flex items-center justify-center text-black font-semibold text-sm border border-white/10 ${comment?.author && comment.author.profile_image_url ? 'hidden' : 'flex'}`}>
                        {getInitial(comment?.author)}
                    </div>
                </div>

                <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1 flex-wrap">
                        <span className="text-blue-400 font-medium text-sm hover:text-blue-300 transition-colors">
                            @{mainAuthorName}
                        </span>
                        <span className="text-gray-400 text-xs">
                            {formatDate(comment?.published_at)}
                        </span>
                    </div>

                    <p className="text-black text-sm leading-relaxed mb-3 group-hover:text-gray-700 transition-colors"
                        dangerouslySetInnerHTML={{
                            __html: textContent
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
                        <div className="flex items-center gap-1 text-gray-400 hover:text-black transition-colors cursor-pointer">
                            <ThumbsUp size={14} />
                            <span>{comment?.like_count || 0}</span>
                        </div>
                        <div className="flex items-center gap-1 text-gray-400 hover:text-black transition-colors cursor-pointer">
                            <ThumbsDown size={14} />
                            <span>0</span>
                        </div>
                        {comment?.replies && comment.replies.length > 0 && (
                            <button
                                onClick={() => setShowReplies(!showReplies)}
                                className="flex items-center gap-1 text-blue-400 hover:text-blue-300 transition-colors"
                            >
                                <MessageCircle size={14} />
                                <span>{comment?.replies?.length} {comment.replies.length === 1 ? 'Reply' : 'Replies'}</span>
                            </button>
                        )}
                    </div>
                </div>

                {/* Modified Navigation String appending mechanism */}
                <div className="flex-shrink-0 self-center">
                    <Link to={`/ask-ai?message=${encodeURIComponent(textContent + " I want to know more about this.")}`}>
                        <button className="bg-blue-500 hover:bg-blue-600 backdrop-blur-sm text-black px-3 py-1.5 rounded-xl text-xs font-semibold shadow-md shadow-blue-500/20 transition-all duration-300 hover:scale-105 border border-white/10 flex items-center gap-1">
                            <Sparkles size={12} />
                            Ask AI
                        </button>
                    </Link>
                </div>
            </div>

            {showReplies && comment?.replies && comment.replies.length > 0 && (
                <div className="ml-8 border-l border-blue-500/30 pl-4 space-y-3 pt-2">
                    {comment.replies.map((reply, index) => (
                        <div key={reply.id || index} className="flex gap-3">
                            <div className="w-8 h-8 flex-shrink-0">
                                {reply?.author && reply.author.profile_image_url ? (
                                    <img
                                        src={reply.author.profile_image_url}
                                        alt={`${getAuthorName(reply?.author)}'s avatar`}
                                        className="w-8 h-8 rounded-full border border-white/10 object-cover"
                                        onError={(e) => {
                                            e.target.style.display = 'none';
                                            e.target.nextSibling.style.display = 'flex';
                                        }}
                                    />
                                ) : null}
                                <div className={`w-8 h-8 bg-gradient-to-br from-gray-600/80 to-gray-800/80 backdrop-blur-sm rounded-full flex items-center justify-center text-black font-medium text-xs flex-shrink-0 border border-white/10 ${reply?.author && reply.author.profile_image_url ? 'hidden' : 'flex'}`}>
                                    {getInitial(reply?.author)}
                                </div>
                            </div>
                            <div className="flex-1">
                                <div className="flex items-center gap-2 mb-1">
                                    <span className="text-blue-400 font-medium text-xs">
                                        @{getAuthorName(reply?.author)}
                                    </span>
                                    <span className="text-gray-400 text-xs">
                                        {formatDate(reply?.published_at)}
                                    </span>
                                </div>
                                <p className="text-black text-xs leading-relaxed mb-2"
                                    dangerouslySetInnerHTML={{
                                        __html: (reply?.text_display || reply?.text_original || '')
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
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
});

export default CommentCard;