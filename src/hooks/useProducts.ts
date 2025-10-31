import { CanceledError } from "axios";

import apiService from "../services/api-service";
import { useEffect, useState } from "react";

export interface ProductImage {
  id: number;
  product_id: number;
  image_path: string;
  created_at: string;
  updated_at: string;
}

export interface Product {
  id: number;
  sub_category_id: number;
  title: string;
  description: string;
  created_at: string;
  updated_at: string;
  key_features: string | null;
  serial_number: string | null;
  dimensions: string | null;
  product_images: ProductImage[];
}

export interface SubCategory {
  id: number;
  category_id: number;
  name: string;
  created_at: string;
  updated_at: string;
  products: Product[];
}

export interface Category {
  id: number;
  category_name: string;
  description: string;
  image: string;
  created_at: string;
  updated_at: string;
  sub_categories: SubCategory[];
}

const useProducts = (categoryId) => {
  const [data, setData] = useState();
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const controller = new AbortController();
    setIsLoading(true);
    apiService
      .get(`/categories/product-lines/${categoryId}/subcategories`, {
        signal: controller.signal,
      })
      .then((res) => {
        setData(res.data);
        setIsLoading(false);
      })
      .catch((err) => {
        if (err instanceof CanceledError) {
          return;
        }
        setError(err.message);
        setIsLoading(false);
      });
    return () => controller.abort();
  }, [categoryId]);

  return { data, error, isLoading };
};
// const useProducts = (categoryId: number | null | string) =>
//   useData<Category>(`/categories/${categoryId}`, {}, [categoryId]);

export default useProducts;
