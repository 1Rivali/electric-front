import {
  Box,
  Button,
  FormControl,
  FormLabel,
  HStack,
  IconButton,
  Image,
  Input,
  Select,
  SimpleGrid,
  Textarea,
  useToast,
  useColorModeValue,
} from "@chakra-ui/react";
import { useState } from "react";
import apiService, { assetsBaseURL } from "../services/api-service";
import { AddIcon, DeleteIcon, EditIcon } from "@chakra-ui/icons";
import EditProductLineModal from "./EditProductLineModal";
import EditSubCategoryModal from "./EditSubCategoryModal";

const AdminAddProductForm = (props) => {
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [isSubEditModalOpen, setSubEditModalOpen] = useState(false);
  const toast = useToast();

  // Dark theme color values
  const labelColor = useColorModeValue("gray.700", "gray.300");

  const handleEdit = () => {
    // Open the edit modal
    setEditModalOpen(true);
  };

  const handleProductLineDelete = async () => {
    try {
      await apiService.delete(
        `/categories/product-lines/${props.newProduct.product_line_id}`,
        { headers: { Authorization: localStorage.getItem("token") } }
      );
      toast({
        title: "Product Line Deleted",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      props.handleProductLineDelete(props.newProduct.category_id);
      props.setNewProduct({ ...props.newProduct, product_line_id: "" });
    } catch {
      toast({
        title: "Error",
        description: "An error occurred while deleting the product line.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };
  const handleSubCategoryDelete = async () => {
    try {
      await apiService.delete(
        `/categories/sub-categories/${props.newProduct.subcategory_id}`,
        { headers: { Authorization: localStorage.getItem("token") } }
      );
      toast({
        title: "Sub Category Deleted",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      props.handleSubCategoryDelete(props.newProduct.product_line_id);
      props.setNewProduct({ ...props.newProduct, subcategory_id: "" });
    } catch {
      toast({
        title: "Error",
        description: "An error occurred while deleting the Sub Category.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };
  return (
    <Box as="form" onSubmit={props.handleFormSubmit} w="100%" maxW="md">
      <FormControl mb={4} isRequired>
        <FormLabel fontWeight="semibold" color={labelColor}>
          Product Title
        </FormLabel>
        <Input
          type="text"
          value={props.newProduct.title}
          onChange={(e) =>
            props.setNewProduct({ ...props.newProduct, title: e.target.value })
          }
          placeholder="Enter product title"
          focusBorderColor="brand.500"
          size="lg"
        />
      </FormControl>
      <FormControl mb={4} isRequired>
        <FormLabel fontWeight="semibold" color={labelColor}>
          Serial Number
        </FormLabel>
        <Input
          type="text"
          value={props.newProduct.serial_number}
          onChange={(e) =>
            props.setNewProduct({
              ...props.newProduct,
              serial_number: e.target.value,
            })
          }
          placeholder="Enter product serial number"
          focusBorderColor="brand.500"
          size="lg"
        />
      </FormControl>

      <FormControl mb={4} isRequired>
        <FormLabel fontWeight="semibold" color={labelColor}>
          Dimensions
        </FormLabel>
        <Input
          type="text"
          value={props.newProduct.dimensions}
          onChange={(e) =>
            props.setNewProduct({
              ...props.newProduct,
              dimensions: e.target.value,
            })
          }
          placeholder="Enter product dimensions"
          focusBorderColor="brand.500"
          size="lg"
        />
      </FormControl>

      <FormControl mb={4} isRequired>
        <FormLabel fontWeight="semibold" color={labelColor}>
          Description
        </FormLabel>
        <Textarea
          value={props.newProduct.description}
          onChange={(e) =>
            props.setNewProduct({
              ...props.newProduct,
              description: e.target.value,
            })
          }
          placeholder="Enter detailed product description"
          focusBorderColor="brand.500"
          rows={4}
          resize="vertical"
          minH="120px"
        />
      </FormControl>

      <FormControl mb={4} isRequired>
        <FormLabel fontWeight="semibold" color={labelColor}>
          Key Features
        </FormLabel>
        <Textarea
          value={props.newProduct.key_features}
          onChange={(e) =>
            props.setNewProduct({
              ...props.newProduct,
              key_features: e.target.value,
            })
          }
          placeholder="Enter key features (one per line or separated by commas)"
          focusBorderColor="brand.500"
          rows={3}
          resize="vertical"
          minH="100px"
        />
      </FormControl>

      <FormControl mb={4} isRequired>
        <FormLabel color={labelColor}>Category</FormLabel>
        <Select
          placeholder="Select category"
          value={props.newProduct.category_id}
          onChange={props.handleCategoryChange}
        >
          {props.categories &&
            props.categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.category_name}
              </option>
            ))}
        </Select>
      </FormControl>

      <FormControl mb={4} isRequired>
        <FormLabel color={labelColor}>Product Line</FormLabel>
        <HStack>
          <Select
            placeholder="Select product line"
            value={props.newProduct.product_line_id}
            onChange={props.handleProductLineChange}
            isDisabled={!props.newProduct.category_id}
          >
            {props.productLines.map((productLine) => (
              <option key={productLine.id} value={productLine.id}>
                {productLine.name}
              </option>
            ))}
          </Select>
          <HStack>
            {props.newProduct.category_id && (
              <IconButton
                aria-label="Add new product line"
                icon={<AddIcon />}
                onClick={props.onProductLineModalOpen}
              />
            )}
            {props.newProduct.product_line_id && (
              <HStack>
                <IconButton
                  aria-label="Edit Product Line"
                  icon={<EditIcon />}
                  onClick={handleEdit}
                />
                <IconButton
                  aria-label="Delete Product Line"
                  icon={<DeleteIcon />}
                  onClick={handleProductLineDelete}
                />
              </HStack>
            )}

            {/* Add your Edit Modal here */}
            {isEditModalOpen && (
              <EditProductLineModal
                productLineId={props.newProduct.product_line_id}
                onClose={async () => {
                  await props.handleProductLineDelete(
                    props.newProduct.category_id
                  );
                  return setEditModalOpen(false);
                }}
              />
            )}
          </HStack>
        </HStack>
      </FormControl>
      <FormControl mb={4} isRequired>
        <FormLabel color={labelColor}>Subcategory</FormLabel>
        <HStack>
          <Select
            placeholder="Select subcategory"
            value={props.newProduct.subcategory_id}
            onChange={(e) =>
              props.setNewProduct({
                ...props.newProduct,
                subcategory_id: e.target.value,
              })
            }
            isDisabled={!props.newProduct.product_line_id}
          >
            {props.subcategories.map((subcategory) => (
              <option key={subcategory.id} value={subcategory.id}>
                {subcategory.name}
              </option>
            ))}
          </Select>
          <HStack>
            {props.newProduct.product_line_id && (
              <IconButton
                aria-label="Add new subcategory"
                icon={<AddIcon />}
                onClick={props.onOpen}
              />
            )}
            {props.newProduct.subcategory_id && (
              <HStack>
                <IconButton
                  aria-label="Edit Sub Category"
                  icon={<EditIcon />}
                  onClick={() => {
                    setSubEditModalOpen(true);
                  }}
                />
                <IconButton
                  aria-label="Delete Sub Category"
                  icon={<DeleteIcon />}
                  onClick={handleSubCategoryDelete}
                />
              </HStack>
            )}
            {isSubEditModalOpen && (
              <EditSubCategoryModal
                subCategoryId={props.newProduct.subcategory_id}
                onClose={async () => {
                  await props.handleSubCategoryDelete(
                    props.newProduct.product_line_id
                  );
                  setSubEditModalOpen(false);
                }}
              />
            )}
          </HStack>
        </HStack>
      </FormControl>

      <FormControl mb={4}>
        <FormLabel color={labelColor}>Images</FormLabel>
        {/* <Input type="file" onChange={props.handleImageChange} /> */}
        {
          <Box>
            <SimpleGrid columns={{ base: 2, sm: 3, md: 4 }} spacing={4}>
              <Box
                as="label"
                width="100%"
                height="100%"
                maxW="120px"
                maxH="120px"
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
                  onChange={props.handleImageChange}
                  display="none"
                />
                <AddIcon boxSize={6} color="brand.500" />
              </Box>
              {props.previewImage &&
                props.previewImage.length > 0 &&
                props.previewImage.map((image, idx) => {
                  return (
                    <Box
                      key={idx}
                      maxW="120px"
                      maxH="120px"
                      position="relative"
                      border="2px solid"
                      borderColor="brand.500"
                      borderRadius="md"
                      overflow="hidden"
                      cursor="pointer"
                      onClick={() => {
                        window.open(`${image}`, "_blank");
                      }}
                    >
                      <Image
                        key={idx}
                        src={image}
                        alt="Product preview"
                        width={"full"}
                        height={"full"}
                        objectFit={"contain"}
                      />
                      <IconButton
                        backgroundColor={"red"}
                        position={"absolute"}
                        top={0}
                        left={"0"}
                        icon={<DeleteIcon color={"white"} />}
                        onClick={(e) => {
                          e.stopPropagation();
                          props.removeImage(idx);
                        }}
                        aria-label=""
                      />
                    </Box>
                  );
                })}
            </SimpleGrid>
          </Box>
        }
      </FormControl>

      <Button type="submit" colorScheme="blue" w="full" mt={4}>
        {props.productIdToEdit ? "Update Product" : "Add Product"}
      </Button>
    </Box>
  );
};

export default AdminAddProductForm;
