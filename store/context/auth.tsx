import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { ReactNode, createContext, useContext, useState } from "react";

const AUTH_URL = process.env.EXPO_PUBLIC_AUTH_API_URL;

interface IAuthContext {
  accessToken: string;
  isAuthenticated: boolean;
  authenticate: (accessToken: string, refreshToken: string) => void;
  login: (email: string, password: string) => void;
  logout: () => void;
}

export const AuthContext = createContext<IAuthContext>({
  accessToken: "",
  isAuthenticated: false,
  authenticate: () => {},
  login: () => {},
  logout: () => {},
});

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

const AuthContextProvider = ({ children }: { children: ReactNode }) => {
  const [authToken, setAuthToken] = useState<string>("");

  const authenticate = (accessToken: string, refreshToken: string) => {
    setAuthToken(accessToken);
    AsyncStorage.setItem("authToken", accessToken);
    AsyncStorage.setItem("refreshToken", refreshToken);
  };

  const logout = () => {
    setAuthToken("");
    AsyncStorage.removeItem("authToken");
    AsyncStorage.removeItem("refreshToken");
  };

  const login = async (email: string, password: string) => {
    const response = await axios.post(AUTH_URL + "/auth_v1/auth/login", {
      email,
      password,
    });

    if (!response.data || !response.data.credential) {
      throw new Error("Invalid response data");
    }

    const { access_token, refresh_token } = response.data.credential;
    if (!access_token || !refresh_token) {
      throw new Error("Missing access_token or refresh_token");
    }

    authenticate(access_token, refresh_token);
  };

  const value: IAuthContext = {
    accessToken: authToken,
    isAuthenticated: !!authToken,
    authenticate,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthContextProvider;
