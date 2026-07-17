import axios from "axios";

class AuthService {
  constructor() {
    this.API_URL = "http://localhost:8080/api/auth";

    this.api = axios.create({
      baseURL: this.API_URL,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  _getPersistedState() {
    try {
      const raw = localStorage.getItem("application_state");
      return raw ? (JSON.parse(raw)?.state ?? {}) : {};
    } catch {
      return {};
    }
  }

  async signup(userData) {
    try {
      const response = await this.api.post("/signup", userData);
      return response.data;
    } catch (error) {
      throw this._handleError(error, "Registration failed");
    }
  }

  async verifyOtp(email, verificationCode) {
    try {
      const response = await this.api.post("/verify", {
        email,
        verificationCode,
      });
      return response.data;
    } catch (error) {
      throw this._handleError(error, "OTP Verification failed");
    }
  }

  async login(credentials) {
    try {
      const response = await this.api.post("/login", credentials);
      return response.data;
    } catch (error) {
      throw this._handleError(error, "Login failed");
    }
  }

  async logout() {
    try {
      const { accessToken } = this._getPersistedState();

      await this.api.post(
        "/logout",
        {},
        accessToken
          ? { headers: { Authorization: `Bearer ${accessToken}` } }
          : {},
      );
    } catch (error) {
      console.error("Logout request failed:", error?.message ?? error);
    }
  }

  getAccessToken() {
    return this._getPersistedState().accessToken ?? null;
  }

  getRefreshToken() {
    return this._getPersistedState().refreshToken ?? null;
  }

  getUserInfo() {
    return this._getPersistedState().user ?? null;
  }

  isAuthenticated() {
    const token = this.getAccessToken();
    if (!token) return false;

    try {
      const payload = JSON.parse(atob(token.split(".")[1]));
      const isExpired = payload.exp < Date.now() / 1000;

      if (isExpired) {
        console.warn("Access token has expired.");
        return false;
      }

      return true;
    } catch {
      console.error("Failed to decode token.");
      return false;
    }
  }

  _handleError(error, fallback = "Something went wrong") {
    if (error.response) {
      const status = error.response.status;
      const serverMessage = error.response.data?.message ?? error.response.data;

      if (typeof serverMessage === "string" && serverMessage.trim()) {
        return new Error(serverMessage);
      }

      const statusMessages = {
        400: "Invalid request. Please check your input.",
        401: "Invalid email or password.",
        403: "Account is disabled. Please contact support.",
        404: "Account not found.",
        409: "An account with this email already exists.",
        500: "Server error. Please try again later.",
      };

      return new Error(statusMessages[status] ?? fallback);
    }

    if (error.request) {
      return new Error("Unable to reach the server. Check your connection.");
    }

    return new Error(error.message ?? fallback);
  }
}

export default new AuthService();
