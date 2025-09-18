import axios from 'axios';

/**
 * Authentication service for handling API requests
 * Centralizes all authentication-related HTTP calls to backend
 */
class AuthService {
    constructor() {
        this.API_URL = 'http://localhost:8080/api/auth';
        
        this.api = axios.create({
            baseURL: this.API_URL,
            headers: {
                'Content-Type': 'application/json',
            },
        });
    }

    async signup(userData) {
        try {
            const response = await this.api.post('/signup', userData);
            
            if (response.data.token) {
                localStorage.setItem('authToken', response.data.token);
                localStorage.setItem('userInfo', JSON.stringify({
                    email: response.data.email,
                    firstName: response.data.firstName,
                    lastName: response.data.lastName
                }));
            }
            
            return response.data;
        } catch (error) {
            if (error.response) {
                throw new Error(error.response.data || 'Registration failed');
            } else if (error.request) {
                throw new Error('Network error. Please check your connection.');
            } else {
                throw new Error('An unexpected error occurred');
            }
        }
    }

    async login(credentials) {
        try {
            const response = await this.api.post('/login', credentials);
            
            if (response.data.token) {
                localStorage.setItem('authToken', response.data.token);
                localStorage.setItem('userInfo', JSON.stringify({
                    email: response.data.email,
                    firstName: response.data.firstName,
                    lastName: response.data.lastName
                }));
            }
            
            return response.data;
        } catch (error) {
            if (error.response) {
                throw new Error(error.response.data || 'Login failed');
            } else if (error.request) {
                throw new Error('Network error. Please check your connection.');
            } else {
                throw new Error('An unexpected error occurred');
            }
        }
    }

    logout() {
        localStorage.removeItem('authToken');
        localStorage.removeItem('userInfo');
    }

    getToken() {
        return localStorage.getItem('authToken');
    }

    getUserInfo() {
        const userInfo = localStorage.getItem('userInfo');
        return userInfo ? JSON.parse(userInfo) : null;
    }

    isAuthenticated() {
        const token = this.getToken();
        if (!token) return false;
        
        try {
            const payload = JSON.parse(atob(token.split('.')[1]));
            const currentTime = Date.now() / 1000;
            
            if (payload.exp < currentTime) {
                this.logout();
                return false;
            }
            
            return true;
        } catch (error) {
            this.logout();
            return false;
        }
    }
}

export default new AuthService();