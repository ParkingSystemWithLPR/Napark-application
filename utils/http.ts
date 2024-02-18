import axios, { AxiosError, AxiosRequestConfig } from "axios";

import { useAuth } from "../store/context/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";

const AUTH_URL = process.env.EXPO_PUBLIC_AUTH_API_URL;

export enum METHOD {
  GET = "get",
  POST = "post",
  PUT = "put",
}

const apiRequest = async <T>(
  url: string,
  method: string,
  body?: object
): Promise<T> => {
  const { accessToken } = useAuth();
  const headers = {
    Authorization: `Bearer ${accessToken}`,
    "Content-Type": "application/json",
  };

  const config: AxiosRequestConfig = {
    url,
    method,
    headers,
    data: body,
  };

  try {
    const response = await axios.request<T>(config);

    return response.data;
  } catch (error) {
    const axiosError = error as AxiosError;
    if (axiosError.response?.status === 401) {
      // Token expired, refresh and retry
      const refreshToken = await AsyncStorage.getItem("refreshToken");
      await axios.post(AUTH_URL + "/auth_v1/auth/refresh-token", {
        refresh_token: refreshToken,
      });
      // Retry the request with the new access token
      return apiRequest<T>(url, method, body);
    }
    throw error;
  }
};

export default apiRequest;
