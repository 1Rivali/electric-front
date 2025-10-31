import axios from "axios";
import { ReorderImagesRequest, ReorderImagesResponse } from "../types/types";

export const baseURL = "https://electricalways.com/api";
export const assetsBaseURL = "https://electricalways.com/storage";
// export const baseURL = "http://localhost:8000/api";
// export const assetsBaseURL = "http://localhost:8000/storage";

const apiService = axios.create({
  baseURL: baseURL,
});

export const reorderProductImages = async (
  request: ReorderImagesRequest,
  token: string
): Promise<ReorderImagesResponse> => {
  try {
    const response = await apiService.post<ReorderImagesResponse>(
      "/product-images/reorder",
      request,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error reordering images:", error);
    throw error;
  }
};

export default apiService;
