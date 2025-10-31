import { useState } from "react";
import { useToast } from "@chakra-ui/react";
import { ProductImage, ImageOrderItem } from "../types/types";
import { reorderProductImages } from "../services/api-service";

interface UseImageReorderProps {
  productId: number;
  initialImages: ProductImage[];
  onReorderSuccess?: (images: ProductImage[]) => void;
}

interface UseImageReorderReturn {
  images: ProductImage[];
  isLoading: boolean;
  hasChanges: boolean;
  setImages: (images: ProductImage[]) => void;
  reorderImages: (newOrder: ProductImage[]) => void;
  saveOrder: () => Promise<void>;
  resetOrder: () => void;
}

export const useImageReorder = ({
  productId,
  initialImages,
  onReorderSuccess,
}: UseImageReorderProps): UseImageReorderReturn => {
  const [images, setImages] = useState<ProductImage[]>(initialImages);
  const [isLoading, setIsLoading] = useState(false);
  const [hasChanges, setHasChanges] = useState(false);
  const toast = useToast();

  const reorderImages = (newOrder: ProductImage[]) => {
    // Update order_position for all items
    const updatedImages = newOrder.map((item, index) => ({
      ...item,
      order_position: index,
    }));

    setImages(updatedImages);
    setHasChanges(true);
  };

  const saveOrder = async () => {
    setIsLoading(true);
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("No authentication token found");
      }

      const imageOrders: ImageOrderItem[] = images.map((img, index) => ({
        id: img.id,
        order_position: index,
      }));

      const response = await reorderProductImages(
        {
          product_id: productId,
          image_orders: imageOrders,
        },
        token
      );

      setImages(response.images);
      setHasChanges(false);

      if (onReorderSuccess) {
        onReorderSuccess(response.images);
      }

      toast({
        title: "Images reordered successfully!",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    } catch (error) {
      console.error("Failed to reorder images:", error);
      toast({
        title: "Failed to reorder images",
        description: "Please try again",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const resetOrder = () => {
    setImages(initialImages);
    setHasChanges(false);
  };

  return {
    images,
    isLoading,
    hasChanges,
    setImages,
    reorderImages,
    saveOrder,
    resetOrder,
  };
};

export default useImageReorder;
