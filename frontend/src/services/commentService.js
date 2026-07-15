import axios from 'axios';

/**
 * Extracts the 11-character video ID from various YouTube URL formats.
 */
const extractVideoId = (url) => {
    if (!url) return null;
    
    // Clean string whitespace padding
    const cleanUrl = url.trim();

    // 1. Try matching using a comprehensive YouTube regex pattern
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    const match = cleanUrl.match(regExp);
    
    if (match && match[2] && match[2].length === 11) {
        return match[2];
    }

    // 2. Fallback check for URLSearchParams if standard RegExp execution didn't hit
    try {
        if (cleanUrl.includes('watch')) {
            const urlObj = new URL(cleanUrl);
            const searchId = urlObj.searchParams.get('v');
            if (searchId) return searchId;
        }
    } catch (e) {
        // Fall through if URL parsing crashed on pseudo malformed strings
    }

    // 3. Last resort fallback: If they just passed a raw 11-character string string directly
    if (cleanUrl.length === 11) {
        return cleanUrl;
    }

    return null;
};

export const searchCommentsApi = async (youtubeUrl, query) => {
    const videoId = extractVideoId(youtubeUrl);
    
    // Explicit throw helps prevent unnecessary broken payloads going to the backend
    if (!videoId) {
        throw new Error('Could not parse a valid 11-character YouTube Video ID from the link provided.');
    }

    try {
        const localStateString = localStorage.getItem('application_state');
        let accessToken = null;

        if (localStateString) {
            const parsedData = JSON.parse(localStateString);
            accessToken = parsedData?.state?.accessToken;
        }
        
        const response = await axios.post(
            'http://localhost:8080/api/chat/search-comments',
            { videoId, query }, // This will now cleanly be: "Gz-LzeUDzg"
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': accessToken ? `Bearer ${accessToken}` : ''
                }
            }
        );

        return response.data;
    } catch (error) {
        console.error("API error during comment search:", error);
        if (error.response && error.response.data && error.response.data.message) {
            throw new Error(error.response.data.message);
        }
        throw new Error(error.message || 'Failed to connect to backend server.');
    }
};