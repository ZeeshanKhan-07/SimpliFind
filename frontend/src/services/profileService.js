import axios from 'axios';

class ProfileService {
    constructor() {
        this.BASE_URL = 'http://localhost:8080/api/user-profile';
    }

    _getAuthToken() {
        try {
            const localState = localStorage.getItem('application_state');
            if (localState) {
                const parsed = JSON.parse(localState);
                return parsed?.state?.accessToken || null;
            }
        } catch (e) {
            console.error("Error reading application state token", e);
        }
        return null;
    }

    async getUserProfile() {
        try {
            const token = this._getAuthToken();
            const response = await axios.get(this.BASE_URL, {
                headers: {
                    'Authorization': token ? `Bearer ${token}` : '',
                    'Content-Type': 'application/json'
                }
            });
            return response.data;
        } catch (error) {
            throw new Error(error.response?.data?.message || 'Failed to download profile details.');
        }
    }

    async getUserHistory() {
        try {
            const token = this._getAuthToken();
            const response = await axios.get(`${this.BASE_URL}/history`, {
                headers: {
                    'Authorization': token ? `Bearer ${token}` : '',
                    'Content-Type': 'application/json'
                }
            });
            return response.data;
        } catch (error) {
            throw new Error(error.response?.data?.message || 'Failed to download user search logs.');
        }
    }
}

export default new ProfileService();