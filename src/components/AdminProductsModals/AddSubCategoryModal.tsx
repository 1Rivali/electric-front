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
import axios from "axios";
import { useState } from "react";
import { baseURL } from "../../services/api-service";

const AddSubCategoryModal: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  fetchSubcategories: (productLineId: string) => void;
  productLineId: string;
}> = ({ isOpen, onClose, fetchSubcategories, productLineId }) => {
  const [newSubcategory, setNewSubcategory] = useState("");
  const toast = useToast();

  const handleAddSubcategory = async () => {
    try {
      await axios.post(
        `${baseURL}/categories/product-lines/${productLineId}/subcategories`,
        { name: newSubcategory },
        {
          headers: {
            Authorization: localStorage.getItem("token") || "",
          },
        }
      );
      toast({
        title: "Success",
        description: "Subcategory added successfully",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      fetchSubcategories(productLineId);
      setNewSubcategory("");
      onClose();
    } catch {
      toast({
        title: "Error",
        description: "Failed to add subcategory",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Add Subcategory</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <FormControl>
            <FormLabel>Subcategory Name</FormLabel>
            <Input
              placeholder="Enter new subcategory"
              value={newSubcategory}
              onChange={(e) => setNewSubcategory(e.target.value)}
            />
          </FormControl>
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={handleAddSubcategory}>
            Add
          </Button>
          <Button variant="ghost" onClick={onClose}>
            Cancel
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default AddSubCategoryModal;
