import {
  Button,
  FormControl,
  FormLabel,
  Image,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useToast,
} from "@chakra-ui/react";
import axios from "axios";
import { useState } from "react";
import { baseURL } from "../../services/api-service";

const AddProductLineModal: React.FC<{
  isProductLineModalOpen: boolean;
  onProductLineClose: () => void;
  fetchProductLines: (categoryId: string) => void;
  categoryId: string;
}> = ({
  isProductLineModalOpen,
  onProductLineClose,
  fetchProductLines,
  categoryId,
}) => {
  const [newProductLineName, setNewProductLineName] = useState("");
  const [newProductLineImage, setNewProductLineImage] = useState<File | null>(
    null
  );
  const toast = useToast();

  const handleAddProductLine = async () => {
    const formData = new FormData();
    formData.append("name", newProductLineName);
    if (newProductLineImage) {
      formData.append("image", newProductLineImage);
    }

    try {
      await axios.post(
        `${baseURL}/categories/${categoryId}/product-lines`,
        formData,
        {
          headers: {
            Authorization: localStorage.getItem("token") || "",
          },
        }
      );
      toast({
        title: "Success",
        description: "Product line added successfully",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      fetchProductLines(categoryId);
      setNewProductLineName("");
      setNewProductLineImage(null);
      onProductLineClose();
    } catch {
      toast({
        title: "Error",
        description: "Failed to add product line",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };
  return (
    <Modal isOpen={isProductLineModalOpen} onClose={onProductLineClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Add Product Line</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <FormControl mb={4} isRequired>
            <FormLabel>Product Line Name</FormLabel>
            <Input
              placeholder="Enter product line name"
              value={newProductLineName}
              onChange={(e) => setNewProductLineName(e.target.value)}
            />
          </FormControl>
          <FormControl mb={4}>
            <FormLabel>Image (Optional)</FormLabel>
            <Input
              type="file"
              onChange={(e) => {
                if (e.target.files) {
                  const file = e.target.files[0];
                  setNewProductLineImage(file); // setNewProductLineImagePreview(URL.createObjectURL(file));
                }
              }}
            />
            {newProductLineImage && (
              <Image
                src={URL.createObjectURL(newProductLineImage)}
                alt="Product Line Preview"
                mt={2}
                borderRadius="md"
                maxH="200px"
                objectFit="cover"
              />
            )}
          </FormControl>
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={handleAddProductLine}>
            Add
          </Button>
          <Button variant="ghost" onClick={onProductLineClose}>
            Cancel
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default AddProductLineModal;
