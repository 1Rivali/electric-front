import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Spinner,
  VStack,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Textarea,
  useColorModeValue,
} from "@chakra-ui/react";
import { useState } from "react";
import apiService from "../../services/api-service";
import useProduct from "../../hooks/useProduct";
import { Product, ProductImage } from "../../types/types";
import { AddIcon } from "@chakra-ui/icons";
import ImageReorderComponent from "../ImageReorderComponent";

interface EditProductModalProps {
  isOpen: boolean;
  onClose: () => void;
  product: Product;
  onEditSuccess: (product: Product) => void;
}

const EditProductModal = ({
  isOpen,
  onClose,
  product,
  onEditSuccess,
}: EditProductModalProps) => {
  const [title, setTitle] = useState(product.title);
  const [serialNumber, setSerialNumber] = useState(product.serial_number);
  const [description, setDescription] = useState(product.description);
  const [dimensions, setDimensions] = useState(product.dimensions);
  const [keyFeatures, setKeyFeatures] = useState(product.key_features);

  // Dark theme color values
  const labelColor = useColorModeValue("gray.700", "gray.300");

  const { data, isLoading } = useProduct(product.id);
  const [images, setImages] = useState<ProductImage[]>(product.product_images);
  const [loading, setLoading] = useState(false);

  const handleEditSubmit = async () => {
    setLoading(true);
    try {
      const headers = {
        Authorization: localStorage.getItem("token"),
      };

      const data = {
        title,
        description,
        serial_number: serialNumber,
        dimensions,
        key_features: keyFeatures,
      };

      await apiService.post(`/products/${product.id}`, data, { headers });

      // Create updated product object with current images
      const updatedProduct = {
        ...product,
        title,
        description,
        serial_number: serialNumber,
        dimensions,
        key_features: keyFeatures,
        product_images: images,
      };

      onEditSuccess(updatedProduct);
      onClose();
    } catch (error) {
      console.error("Failed to update product:", error);
    } finally {
      setLoading(false);
    }
  };

  const AddNewImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const formData = new FormData();
      formData.append("image", e.target.files[0]);
      formData.append("product_id", `${data.id}`);
      const res = await apiService.post<ProductImage>(
        "/product-images",
        formData,
        {
          headers: { Authorization: localStorage.getItem("token") },
        }
      );
      const updatedImages = [...images, res.data];
      setImages(updatedImages);

      // Trigger refetch after successful image addition
      onEditSuccess({
        ...product,
        title,
        description,
        serial_number: serialNumber,
        dimensions,
        key_features: keyFeatures,
        product_images: updatedImages,
      });
    }
  };

  const handleDeleteImage = (id: number) => {
    apiService
      .delete(`/product-images/${id}`, {
        headers: { Authorization: localStorage.getItem("token") },
      })
      .then(() => {
        const updatedImages = images.filter((img) => img.id !== id);
        setImages(updatedImages);

        // Trigger refetch after successful image deletion
        onEditSuccess({
          ...product,
          title,
          description,
          serial_number: serialNumber,
          dimensions,
          key_features: keyFeatures,
          product_images: updatedImages,
        });
      });
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="6xl" scrollBehavior="inside">
      <ModalOverlay />
      <ModalContent maxH="90vh">
        <ModalHeader>Edit Product</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          {isLoading ? (
            <Spinner />
          ) : (
            <Tabs>
              <TabList>
                <Tab>Product Details</Tab>
                <Tab>Image Management</Tab>
              </TabList>

              <TabPanels>
                <TabPanel>
                  <VStack spacing={6}>
                    <FormControl>
                      <FormLabel fontWeight="semibold" color={labelColor}>
                        Product Title
                      </FormLabel>
                      <Input
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="Enter product title"
                        focusBorderColor="brand.500"
                        size="lg"
                      />
                    </FormControl>

                    <FormControl>
                      <FormLabel fontWeight="semibold" color={labelColor}>
                        Serial Number
                      </FormLabel>
                      <Input
                        value={serialNumber}
                        onChange={(e) => setSerialNumber(e.target.value)}
                        placeholder="Enter serial number"
                        focusBorderColor="brand.500"
                        size="lg"
                      />
                    </FormControl>

                    <FormControl>
                      <FormLabel fontWeight="semibold" color={labelColor}>
                        Dimensions
                      </FormLabel>
                      <Input
                        value={dimensions}
                        onChange={(e) => setDimensions(e.target.value)}
                        placeholder="Enter product dimensions"
                        focusBorderColor="brand.500"
                        size="lg"
                      />
                    </FormControl>

                    <FormControl>
                      <FormLabel fontWeight="semibold" color={labelColor}>
                        Description
                      </FormLabel>
                      <Textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="Enter detailed product description"
                        focusBorderColor="brand.500"
                        size="lg"
                        rows={6}
                        resize="vertical"
                        minH="150px"
                      />
                    </FormControl>

                    <FormControl>
                      <FormLabel fontWeight="semibold" color={labelColor}>
                        Key Features
                      </FormLabel>
                      <Textarea
                        value={keyFeatures}
                        onChange={(e) => setKeyFeatures(e.target.value)}
                        placeholder="Enter key features (one per line or separated by commas)"
                        focusBorderColor="brand.500"
                        size="lg"
                        rows={4}
                        resize="vertical"
                        minH="120px"
                      />
                    </FormControl>
                  </VStack>
                </TabPanel>

                <TabPanel>
                  <VStack spacing={4}>
                    {/* Add New Image Section */}
                    <FormControl>
                      <FormLabel>Add New Image</FormLabel>
                      <Box
                        as="label"
                        width="120px"
                        height="120px"
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                        border="2px dashed"
                        borderColor="brand.500"
                        borderRadius="md"
                        cursor="pointer"
                        bgColor="gray.100"
                        _hover={{ bgColor: "gray.200" }}
                      >
                        <Input
                          type="file"
                          onChange={AddNewImage}
                          display="none"
                        />
                        <AddIcon boxSize={6} color="brand.500" />
                      </Box>
                    </FormControl>

                    {/* Image Reordering Component */}
                    <FormControl>
                      <FormLabel>Reorder Images</FormLabel>
                      <ImageReorderComponent
                        productId={product.id}
                        images={images}
                        onImagesReordered={(reorderedImages) => {
                          setImages(reorderedImages);
                          // Trigger refetch after successful image reordering
                          onEditSuccess({
                            ...product,
                            title,
                            description,
                            serial_number: serialNumber,
                            dimensions,
                            key_features: keyFeatures,
                            product_images: reorderedImages,
                          });
                        }}
                        onDeleteImage={handleDeleteImage}
                      />
                    </FormControl>
                  </VStack>
                </TabPanel>
              </TabPanels>
            </Tabs>
          )}
        </ModalBody>
        <ModalFooter>
          <Button onClick={onClose} mr={3}>
            Cancel
          </Button>
          <Button
            colorScheme="blue"
            onClick={handleEditSubmit}
            isLoading={loading}
          >
            Save
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default EditProductModal;
