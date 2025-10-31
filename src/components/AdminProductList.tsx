import { DeleteIcon, EditIcon } from "@chakra-ui/icons";
import {
  Badge,
  Box,
  HStack,
  IconButton,
  Image,
  Input,
  SimpleGrid,
  Text,
  VStack,
  useColorModeValue,
} from "@chakra-ui/react";
import { useState } from "react";
import { assetsBaseURL } from "../services/api-service";
import EditProductModal from "./AdminProductsModals/EditProductModal";
import { Product } from "../types/types";

function AdminProductList(props) {
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product>(null);
  const [searchTerm, setSearchTerm] = useState("");

  // Dark theme color values
  const cardBg = useColorModeValue("white", "gray.800");
  const borderColor = useColorModeValue("gray.200", "gray.600");
  const titleColor = useColorModeValue("gray.800", "white");
  const textColor = useColorModeValue("gray.600", "gray.300");
  const categoryColor = useColorModeValue("gray.500", "gray.400");
  const actionBorderColor = useColorModeValue("gray.200", "gray.600");

  const openEditModal = (product) => {
    setSelectedProduct(product);
    setIsEditOpen(true);
  };

  const closeEditModal = () => {
    setIsEditOpen(false);
    setSelectedProduct(null);
  };

  return (
    <Box w="100%">
      <Input
        width="100%"
        placeholder="Search products..."
        mb={6}
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        focusBorderColor="brand.500"
        size="lg"
      />

      {props.products.length > 0 ? (
        <SimpleGrid columns={[1, 2, 3]} spacing={6} w="100%">
          {props.products
            .filter((product) =>
              searchTerm
                ? product.title.toLowerCase().includes(searchTerm.toLowerCase())
                : true
            )
            .map((product) => (
              <Box
                key={product.id}
                borderWidth="1px"
                borderColor={borderColor}
                borderRadius="xl"
                p={6}
                display="flex"
                flexDirection="column"
                justifyContent="space-between"
                _hover={{
                  transform: "translateY(-2px)",
                  boxShadow: "lg",
                }}
                transition="all 0.2s"
                bg={cardBg}
                minH="300px"
              >
                {product.product_images.length > 0 && (
                  <Image
                    boxSize="120px"
                    objectFit="cover"
                    src={`${assetsBaseURL}/${product.product_images[0].image_path}`}
                    alt={product.title}
                    borderRadius="lg"
                    mb={4}
                    mx="auto"
                  />
                )}
                <VStack align="start" spacing={3} flex="1">
                  <Text fontWeight="bold" fontSize="lg" color={titleColor}>
                    {product.title}
                  </Text>
                  <Text
                    color={textColor}
                    fontSize="sm"
                    lineHeight="1.5"
                    noOfLines={3}
                    display="-webkit-box"
                    sx={{
                      WebkitLineClamp: 3,
                      WebkitBoxOrient: "vertical",
                      overflow: "hidden",
                    }}
                  >
                    {product.description}
                  </Text>
                  <VStack align="start" spacing={1} w="100%">
                    <Text fontSize="xs" color={categoryColor}>
                      Category:{" "}
                      {product.sub_category.product_line.category.category_name}
                    </Text>
                    <HStack spacing={2} flexWrap="wrap">
                      <Badge colorScheme="blue" variant="subtle" size="sm">
                        {product.sub_category.product_line.name}
                      </Badge>
                      <Badge colorScheme="green" variant="subtle" size="sm">
                        {product.sub_category.name}
                      </Badge>
                    </HStack>
                  </VStack>
                </VStack>
                <HStack
                  justifyContent="flex-end"
                  mt={4}
                  pt={4}
                  borderTop="1px solid"
                  borderColor={actionBorderColor}
                >
                  <IconButton
                    aria-label="Edit Product"
                    icon={<EditIcon />}
                    colorScheme="brand"
                    variant="ghost"
                    onClick={() => openEditModal(product)}
                    _hover={{ bg: "brand.50" }}
                  />
                  <IconButton
                    aria-label="Delete Product"
                    icon={<DeleteIcon />}
                    colorScheme="red"
                    variant="ghost"
                    onClick={() => props.handleDelete(product.id)}
                    _hover={{ bg: "red.50" }}
                  />
                </HStack>
              </Box>
            ))}
        </SimpleGrid>
      ) : (
        <Text color="gray.500" textAlign="center" py={8}>
          No products available
        </Text>
      )}

      {selectedProduct && (
        <EditProductModal
          isOpen={isEditOpen}
          onClose={closeEditModal}
          product={selectedProduct}
          onEditSuccess={props.handleEdit}
        />
      )}
    </Box>
  );
}

export default AdminProductList;
