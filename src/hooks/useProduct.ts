import useData from "./useData";
import { Product } from "../types/types";

const useProduct = (productId: number) =>
  useData<Product>(`/products/${productId}`, {}, [productId]);
export default useProduct;
