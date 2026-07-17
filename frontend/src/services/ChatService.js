import axios from 'axios';

class ChatService {
    constructor() {
        this.API_URL = 'http://localhost:8080/api/chat';

        this.api = axios.create({
            baseURL: this.API_URL,
            headers: {
                'Content-Type': 'application/json',
            },
        });

        this.api.interceptors.request.use((config) => {
            const token = this.getAccessToken();
            if (token) {
                config.headers.Authorization = `Bearer ${token}`;
            }
            return config;
        });
    }

    _getPersistedState() {
        try {
            const raw = localStorage.getItem('application_state');
            return raw ? JSON.parse(raw)?.state ?? {} : {};
        } catch {
            return {};
        }
    }


    getAccessToken() {
        return this._getPersistedState().accessToken ?? null;
    }

    async askQuestion(prompt) {
        try {
            const response = await this.api.get('/ask', {
                params: { prompt },
                responseType: 'text',
                transformResponse: [(data) => data], 
            });
            return response.data;
        } catch (error) {
            throw this._handleError(error, 'Failed to get a response from the assistant');
        }
    }

   
    async searchComments(videoId, query) {
        try {
            const response = await this.api.post('/search-comments', { videoId, query });
            return response.data;
        } catch (error) {
            throw this._handleError(error, 'Failed to search comments');
        }
    }

   
    _handleError(error, fallback = 'Something went wrong') {
        if (error.response) {
            const status = error.response.status;
            const serverMessage =
                error.response.data?.message ?? error.response.data;

            if (typeof serverMessage === 'string' && serverMessage.trim()) {
                return new Error(serverMessage);
            }

            const statusMessages = {
                400: 'Invalid request. Please check your input.',
                401: 'Your session has expired. Please log in again.',
                403: 'You do not have permission to do that.',
                404: 'Resource not found.',
                500: 'Server error. Please try again later.',
            };

            return new Error(statusMessages[status] ?? fallback);
        }

        if (error.request) {
            return new Error('Unable to reach the server. Check your connection.');
        }

        return new Error(error.message ?? fallback);
    }
}

export default new ChatService();