"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { usePathname, useRouter } from "next/navigation";
import * as authApi from "@/services/auth";
import { getMe } from "@/services/user";
import { isOnboardingPending } from "@/services/onboardingStorage";
import { clearAuthTokens, getAccessToken, getRefreshToken, storeAuthTokens } from "@/services/tokenStorage";
import type { AuthResponse, LoginRequest, MeResponse, RegisterRequest } from "@/types/api";

interface AuthContextValue {
  user: MeResponse | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (payload: LoginRequest) => Promise<void>;
  register: (payload: RegisterRequest) => Promise<void>;
  logout: () => void;
  refreshSession: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

async function hydrateFromAuthResponse(response: AuthResponse): Promise<MeResponse> {
  storeAuthTokens(response.accessToken, response.refreshToken, response.expiresIn);
  return getMe();
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [user, setUser] = useState<MeResponse | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const logout = useCallback(() => {
    clearAuthTokens();
    setUser(null);
  }, []);

  const refreshSession = useCallback(async () => {
    const refreshToken = getRefreshToken();
    if (!refreshToken) {
      logout();
      return;
    }
    const response = await authApi.refresh(refreshToken);
    const me = await hydrateFromAuthResponse(response);
    setUser(me);
  }, [logout]);

  const login = useCallback(async (payload: LoginRequest) => {
    const response = await authApi.login(payload);
    const me = await hydrateFromAuthResponse(response);
    setUser(me);
  }, []);

  const register = useCallback(async (payload: RegisterRequest) => {
    const response = await authApi.register(payload);
    const me = await hydrateFromAuthResponse(response);
    setUser(me);
  }, []);

  useEffect(() => {
    const bootstrap = async () => {
      try {
        const token = getAccessToken();
        if (!token) {
          setIsLoading(false);
          return;
        }
        const me = await getMe();
        setUser(me);
      } catch {
        try {
          await refreshSession();
        } catch {
          logout();
        }
      } finally {
        setIsLoading(false);
      }
    };

    void bootstrap();
  }, [logout, refreshSession]);

  useEffect(() => {
    if (isLoading || !user) return;
    if (!isOnboardingPending()) return;
    if (pathname?.startsWith("/onboarding")) return;
    if (pathname === "/login" || pathname === "/register") return;
    router.replace("/onboarding/bienvenue");
  }, [isLoading, pathname, router, user]);

  const value = useMemo<AuthContextValue>(
    () => ({
      user,
      isAuthenticated: Boolean(user),
      isLoading,
      login,
      register,
      logout,
      refreshSession,
    }),
    [isLoading, login, logout, refreshSession, register, user]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuthContext(): AuthContextValue {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuthContext must be used inside AuthProvider");
  }
  return context;
}
