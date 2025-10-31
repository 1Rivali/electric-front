import {
  useDisclosure,
  useToast,
  VStack,
  SimpleGrid,
  Box,
  useColorModeValue,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Heading,
  Text,
  Badge,
  HStack,
  Icon,
  Flex,
} from "@chakra-ui/react";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FaBoxes, FaPlus, FaList, FaChartBar } from "react-icons/fa";
import AdminAddProductForm from "../../components/AdminAddProductForm";
import AdminProductList from "../../components/AdminProductList";
import AddProductLineModal from "../../components/AdminProductsModals/AddProductLineModal";
import AddSubCategoryModal from "../../components/AdminProductsModals/AddSubCategoryModal";
import AdminLayout from "../../components/AdminLayout";
import useCategories from "../../hooks/useCategories";
import { baseURL } from "../../services/api-service";
import { Product } from "../../types/types";

const MotionBox = motion(Box);

const AdminProducts: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [newProduct, setNewProduct] = useState({
    title: "",
    serial_number: "",
    description: "",
    key_features: "",
    dimensions: "",
    category_id: "",
    product_line_id: "", // New product line field
    subcategory_id: "",
  });
  const [productLines, setProductLines] = useState([]);
  const [subcategories, setSubcategories] = useState([]);
  const [productIdToEdit, setProductIdToEdit] = useState<number | null>(null);
  const [newImages, setNewImages] = useState<File[] | []>([]);
  const [previewImage, setPreviewImage] = useState<string[] | []>([]);
  const { data: categories } = useCategories();
  const toast = useToast();

  useEffect(() => {
    fetchProducts();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const {
    isOpen: isProductLineModalOpen,
    onOpen: onProductLineModalOpen,
    onClose: onProductLineModalClose,
  } = useDisclosure();

  const onProductLineClose = () => {
    onProductLineModalClose();
  };
  // Add handler function for adding a new product line

  const { isOpen, onOpen, onClose } = useDisclosure();

  const fetchProducts = async () => {
    try {
      const response = await axios.get(`${baseURL}/products`);
      setProducts(response.data);
    } catch {
      toast({
        title: "Error",
        description: "Failed to fetch products",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await axios.delete(`${baseURL}/products/${id}`, {
        headers: { Authorization: localStorage.getItem("token") || "" },
      });
      toast({
        title: "Success",
        description: "Product deleted successfully",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      fetchProducts();
    } catch {
      toast({
        title: "Error",
        description: "Failed to delete product",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const fetchProductLines = async (categoryId: string) => {
    try {
      const response = await axios.get(
        `${baseURL}/categories/${categoryId}/product-lines`
      );
      setProductLines(response.data);
    } catch {
      toast({
        title: "Error",
        description: "Failed to fetch product lines",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const fetchSubcategories = async (productLineId: string) => {
    try {
      const response = await axios.get(
        `${baseURL}/categories/product-lines/${productLineId}/subcategories`
      );
      setSubcategories(response.data);
    } catch {
      toast({
        title: "Error",
        description: "Failed to fetch subcategories",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const categoryId = e.target.value;
    setNewProduct({
      ...newProduct,
      category_id: categoryId,
      product_line_id: "",
      subcategory_id: "",
    });
    if (categoryId) {
      fetchProductLines(categoryId);
    } else {
      setProductLines([]);
    }
  };

  const handleProductLineChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const productLineId = e.target.value;
    setNewProduct({
      ...newProduct,
      product_line_id: productLineId,
      subcategory_id: "",
    });
    if (productLineId) {
      fetchSubcategories(productLineId);
    } else {
      setSubcategories([]);
    }
  };

  const removeImage = (idx: number) => {
    setNewImages((prev) => prev.filter((_, index) => index !== idx));
    setPreviewImage((prev) => prev.filter((_, index) => index !== idx));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setNewImages((prev) => [...prev, e.target.files[0]]);
      setPreviewImage((prev) => [
        ...prev,
        URL.createObjectURL(e.target.files[0]),
      ]);
    }
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", newProduct.title);
    formData.append("serial_number", newProduct.serial_number);
    formData.append("key_features", newProduct.key_features);
    formData.append("dimensions", newProduct.dimensions);
    formData.append("description", newProduct.description);
    formData.append("sub_category_id", newProduct.subcategory_id);
    if (newImages.length > 0) {
      newImages.forEach((image, idx) => [
        formData.append(`images[${idx}]`, image),
      ]);
    }

    try {
      if (productIdToEdit) {
        await axios.put(`${baseURL}/products/${productIdToEdit}`, formData, {
          headers: { Authorization: localStorage.getItem("token") || "" },
        });
        toast({
          title: "Success",
          description: "Product updated successfully",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
      } else {
        await axios.post(`${baseURL}/products`, formData, {
          headers: { Authorization: localStorage.getItem("token") || "" },
        });
        toast({
          title: "Success",
          description: "Product created successfully",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
      }

      setNewProduct({
        title: "",
        description: "",
        category_id: "",
        product_line_id: "",
        subcategory_id: "",
        serial_number: "",
        key_features: "",
        dimensions: "",
      });
      setNewImages(null);
      setPreviewImage(null);
      setProductIdToEdit(null);
      fetchProducts();
    } catch {
      toast({
        title: "Error",
        description: "Failed to save product",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const cardBg = useColorModeValue("white", "gray.800");
  const borderColor = useColorModeValue("gray.200", "gray.700");
  const textColor = useColorModeValue("gray.800", "white");

  return (
    <AdminLayout
      title="Product Management"
      subtitle="Manage your product catalog, categories, and inventory"
      icon={FaBoxes}
      breadcrumbs={[{ label: "Admin", href: "/admin" }, { label: "Products" }]}
    >
      {/* Statistics Overview */}
      <MotionBox
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        mb={8}
      >
        <SimpleGrid columns={{ base: 1, md: 3 }} spacing={6}>
          <Box
            bg={cardBg}
            p={6}
            borderRadius="xl"
            boxShadow="lg"
            border="1px solid"
            borderColor={borderColor}
          >
            <HStack spacing={4}>
              <Box p={3} bg="brand.100" borderRadius="lg">
                <Icon as={FaBoxes} color="brand.600" boxSize={6} />
              </Box>
              <VStack align="start" spacing={1}>
                <Text fontSize="2xl" fontWeight="bold" color="brand.600">
                  {products.length}
                </Text>
                <Text fontSize="sm" color="gray.500">
                  Total Products
                </Text>
              </VStack>
            </HStack>
          </Box>

          <Box
            bg={cardBg}
            p={6}
            borderRadius="xl"
            boxShadow="lg"
            border="1px solid"
            borderColor={borderColor}
          >
            <HStack spacing={4}>
              <Box p={3} bg="green.100" borderRadius="lg">
                <Icon as={FaChartBar} color="green.600" boxSize={6} />
              </Box>
              <VStack align="start" spacing={1}>
                <Text fontSize="2xl" fontWeight="bold" color="green.600">
                  {categories?.length || 0}
                </Text>
                <Text fontSize="sm" color="gray.500">
                  Categories
                </Text>
              </VStack>
            </HStack>
          </Box>

          <Box
            bg={cardBg}
            p={6}
            borderRadius="xl"
            boxShadow="lg"
            border="1px solid"
            borderColor={borderColor}
          >
            <HStack spacing={4}>
              <Box p={3} bg="blue.100" borderRadius="lg">
                <Icon as={FaList} color="blue.600" boxSize={6} />
              </Box>
              <VStack align="start" spacing={1}>
                <Text fontSize="2xl" fontWeight="bold" color="blue.600">
                  {productLines.length}
                </Text>
                <Text fontSize="sm" color="gray.500">
                  Product Lines
                </Text>
              </VStack>
            </HStack>
          </Box>
        </SimpleGrid>
      </MotionBox>

      {/* Main Content with Tabs */}
      <MotionBox
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <Box
          bg={cardBg}
          borderRadius="xl"
          boxShadow="xl"
          border="1px solid"
          borderColor={borderColor}
          overflow="hidden"
        >
          <Tabs variant="enclosed" colorScheme="brand">
            <TabList bg={useColorModeValue("gray.50", "gray.700")}>
              <Tab _selected={{ bg: cardBg, borderBottomColor: cardBg }}>
                <HStack spacing={2}>
                  <Icon as={FaPlus} boxSize={4} />
                  <Text>Add Product</Text>
                </HStack>
              </Tab>
              <Tab _selected={{ bg: cardBg, borderBottomColor: cardBg }}>
                <HStack spacing={2}>
                  <Icon as={FaList} boxSize={4} />
                  <Text>Product List</Text>
                  <Badge colorScheme="brand" variant="subtle">
                    {products.length}
                  </Badge>
                </HStack>
              </Tab>
            </TabList>

            <TabPanels>
              {/* Add Product Tab */}
              <TabPanel p={8}>
                <Box maxW="4xl" mx="auto">
                  <VStack spacing={6} align="stretch">
                    <Box>
                      <Heading size="lg" color={textColor} mb={2}>
                        Add New Product
                      </Heading>
                      <Text color="gray.500">
                        Fill in the details below to add a new product to your
                        catalog
                      </Text>
                    </Box>

                    <AdminAddProductForm
                      newProduct={newProduct}
                      setNewProduct={setNewProduct}
                      productLines={productLines}
                      subcategories={subcategories}
                      productIdToEdit={productIdToEdit}
                      previewImage={previewImage}
                      categories={categories}
                      onProductLineModalOpen={onProductLineModalOpen}
                      onOpen={onOpen}
                      handleCategoryChange={handleCategoryChange}
                      handleProductLineChange={handleProductLineChange}
                      handleImageChange={handleImageChange}
                      removeImage={removeImage}
                      handleFormSubmit={handleFormSubmit}
                      handleProductLineDelete={fetchProductLines}
                      handleSubCategoryDelete={fetchSubcategories}
                    />
                  </VStack>
                </Box>
              </TabPanel>

              {/* Product List Tab */}
              <TabPanel p={8}>
                <VStack spacing={6} align="stretch">
                  <Flex justify="space-between" align="center">
                    <Box>
                      <Heading size="lg" color={textColor} mb={2}>
                        Product Inventory
                      </Heading>
                      <Text color="gray.500">
                        Manage and edit your existing products
                      </Text>
                    </Box>
                    <Badge size="lg" colorScheme="brand" variant="outline">
                      {products.length} Products
                    </Badge>
                  </Flex>

                  <AdminProductList
                    products={products}
                    handleDelete={handleDelete}
                    handleEdit={fetchProducts}
                  />
                </VStack>
              </TabPanel>
            </TabPanels>
          </Tabs>
        </Box>
      </MotionBox>

      {/* Modals */}
      <AddProductLineModal
        isProductLineModalOpen={isProductLineModalOpen}
        onProductLineClose={onProductLineClose}
        fetchProductLines={fetchProductLines}
        categoryId={newProduct.category_id}
      />
      <AddSubCategoryModal
        isOpen={isOpen}
        onClose={onClose}
        fetchSubcategories={fetchSubcategories}
        productLineId={newProduct.product_line_id}
      />
    </AdminLayout>
  );
};

export default AdminProducts;
