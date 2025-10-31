import useData from "./useData";
import { FooterImage } from "../types/types";

const useFooterImages = () => {
  return useData<FooterImage[]>("/footer-images");
};

export default useFooterImages;
