import AsyncStorage from "@react-native-async-storage/async-storage";
import axios, { AxiosError, AxiosRequestConfig } from "axios";

const AUTH_URL = process.env.EXPO_PUBLIC_AUTH_API_URL;

export enum HTTPMethod {
  GET = "get",
  POST = "post",
  PUT = "put",
}

const apiRequest = async <T>(
  url: string,
  method: HTTPMethod,
  accessToken: string,
  authenticate: (accessToken: string, refreshToken: string) => void,
  body?: object
): Promise<T> => {
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
      const response = await axios.post(
        AUTH_URL + "/auth_v1/auth/refresh-token",
        {
          refresh_token: refreshToken,
        }
      );
      if (!response.data || !response.data.credential) {
        throw new Error("Invalid response data");
      }

      const { access_token, refresh_token } = response.data.credential;
      if (!access_token || !refresh_token) {
        throw new Error("Missing access_token or refresh_token");
      }

      authenticate(access_token, refresh_token);
      // Retry the request with the new access token
      return apiRequest<T>(url, method, access_token, authenticate, body);
    }
    throw error;
  }
};

export default apiRequest;
