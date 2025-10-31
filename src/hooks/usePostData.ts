import { useState } from "react";
import apiService from "../services/api-service";

type PostDataHook<T> = {
  postData: (
    url: string,
    body: T,
    headers?: Record<string, string>,
    authorized?: boolean
  ) => Promise<any>;
  isLoading: boolean;
  error: string | null;
};

export function usePostData<T = any>(): PostDataHook<T> {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const postData = async (
    url: string,
    body: T,
    headers: Record<string, string> = { "Content-Type": "application/json" },
    authorized: boolean = true
  ) => {
    setIsLoading(true);
    setError(null);
    if (authorized) {
      headers.Authorization = localStorage.getItem("token");
    }

    try {
      const response = await apiService.post(url, body, { headers });
      return response.data;
    } catch (err) {
      setError(
        err.response?.data?.message ||
          err.message ||
          "An unknown error occurred."
      );
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  return { postData, isLoading, error };
}
