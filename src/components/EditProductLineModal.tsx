import React, { useEffect, useState } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Button,
  FormControl,
  FormLabel,
  Input,
  Image,
  useToast,
} from "@chakra-ui/react";
import apiService, { assetsBaseURL } from "../services/api-service";

const EditProductLineModal = ({ productLineId, onClose }) => {
  const [name, setName] = useState("");

  const [image, setImage] = useState(null);
  const [currentImage, setCurrentImage] = useState("");
  const toast = useToast();

  useEffect(() => {
    // Fetch the existing product line details
    const fetchProductLine = async () => {
      try {
        const response = await apiService.get(
          `/categories/product-lines/${productLineId}`
        );
        const data = response.data;
        setName(data.name);
        setCurrentImage(data.image);
      } catch (error) {
        toast({
          title: "Error",
          description: error.message,
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      }
    };

    if (productLineId) {
      fetchProductLine();
    }
  }, [productLineId, toast]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    let data;

    if (image) {
      data = new FormData();
      data.append("name", name);
      data.append("image", image);
    } else {
      data = { name };
    }

    try {
      await apiService.post(
        `/categories/product-lines/${productLineId}`,
        data,
        {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        }
      );

      toast({
        title: "Product Line Updated",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      onClose(); // Close the modal after success
    } catch {
      toast({
        title: "Error updating product line",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  return (
    <Modal isOpen onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Edit Product Line</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <FormControl mb={4}>
            <FormLabel>Name</FormLabel>
            <Input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Product Line Name"
            />
          </FormControl>

          <FormControl mb={4}>
            <FormLabel>Image</FormLabel>
            <Input type="file" onChange={handleImageChange} />
            {currentImage && image === null ? (
              <Image
                src={`${assetsBaseURL}/${currentImage}`}
                alt="Current Product Line"
                boxSize="100px"
                mt={2}
              />
            ) : (
              image && (
                <Image
                  src={URL.createObjectURL(image)}
                  alt="Current Product Line"
                  boxSize="100px"
                  mt={2}
                />
              )
            )}
          </FormControl>
        </ModalBody>

        <ModalFooter>
          <Button colorScheme="blue" onClick={handleSubmit}>
            Save
          </Button>
          <Button variant="ghost" onClick={onClose}>
            Cancel
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default EditProductLineModal;
