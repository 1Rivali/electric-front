import {
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
  useToast,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import apiService from "../services/api-service";

const EditSubCategoryModal = ({ subCategoryId, onClose }) => {
  const [name, setName] = useState("");

  const toast = useToast();

  useEffect(() => {
    // Fetch the existing product line details
    const fetchSubCategory = async () => {
      try {
        const response = await apiService.get(
          `/categories/sub-categories/${subCategoryId}`
        );
        const data = response.data;
        setName(data.name);
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

    if (subCategoryId) {
      fetchSubCategory();
    }
  }, [subCategoryId, toast]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await apiService.put(
        `/categories/sub-categories/${subCategoryId}`,
        { name },
        {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        }
      );

      toast({
        title: "Sub Category Updated",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      onClose(); // Close the modal after success
    } catch {
      toast({
        title: "Error updating Sub Category",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <Modal isOpen onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Edit Sub Category</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <FormControl mb={4}>
            <FormLabel>Name</FormLabel>
            <Input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Sub Category Name"
            />
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

export default EditSubCategoryModal;
