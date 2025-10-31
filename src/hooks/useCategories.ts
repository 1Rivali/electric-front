import { Category } from "../types/types";
import useData from "./useData";

const useCategories = () => useData<Category[]>("/categories");

export default useCategories;
