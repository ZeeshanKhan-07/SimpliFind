import { create } from "zustand";
import { persist } from "zustand/middleware";
import AuthService from "../services/AuthService";

const LOCAL_KEY = "application_state";

const Useauth = create(
  persist(
    (set, get) => ({
      accessToken: null,
      refreshToken: null,
      user: null,
      authStatus: false,
      authLoading: false,

      changeLocalLoginData: (accessToken, refreshToken, user, authStatus) => {
        set({ accessToken, refreshToken, user, authStatus });
      },

      login: async (loginData) => {
        set({ authLoading: true });

        try {
          const loginResponseData = await AuthService.login(loginData);

          set({
            accessToken: loginResponseData.accessToken,
            refreshToken: loginResponseData.refreshToken,
            user: loginResponseData.user,
            authStatus: true,
          });

          return loginResponseData;
        } catch (error) {
          throw error;
        } finally {
          set({ authLoading: false });
        }
      },

      logout: async () => {
        set({ authLoading: true });

        try {
          await AuthService.logout();
        } catch (error) {
          console.error("Logout error:", error);
        } finally {
          set({
            accessToken: null,
            refreshToken: null,
            user: null,
            authStatus: false,
            authLoading: false,
          });
        }
      },

      checkLogin: () => {
        return get().accessToken && get().authStatus;
      },
    }),
    {
      name: LOCAL_KEY,
      partialize: (state) => ({
        accessToken: state.accessToken,
        refreshToken: state.refreshToken,
        user: state.user,
        authStatus: state.authStatus,
      }),
    },
  ),
);

export default Useauth;