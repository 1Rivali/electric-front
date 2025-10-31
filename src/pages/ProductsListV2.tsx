import {
  Box,
  Container,
  Heading,
  Text,
  VStack,
  HStack,
  SimpleGrid,
  Image,
  useColorModeValue,
  Button,
  Badge,
  Icon,
  useBreakpointValue,
  useToast,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Divider,
  Center,
  Spinner,
  Input,
  InputGroup,
  InputLeftElement,
  Select,
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import {
  FaHome,
  FaChevronRight,
  FaSearch,
  FaFilter,
  FaEye,
  FaArrowRight,
  FaIndustry,
  FaBoxes,
  FaTools,
} from "react-icons/fa";
import axios from "axios";
import ProductCard from "../components/ProductCard";
import useProducts, { Product } from "../hooks/useProducts";
import { assetsBaseURL, baseURL } from "../services/api-service";
import useCategories from "../hooks/useCategories";
import FloatingActionButton from "../components/FloatingActionButton";
import LogoLoader from "../components/LogoLoader";
import { CopyrightFooter } from "../components";

const MotionBox = motion(Box);
const MotionVStack = motion(VStack);

// Modern Page Header
const ProductsHeader = ({ categoryName }: { categoryName: string }) => {
  const textColor = useColorModeValue("white", "white");
  const bgGradient = useColorModeValue(
    "linear(135deg, brand.500 0%, brand.600 50%, brand.700 100%)",
    "linear(135deg, brand.600 0%, brand.700 50%, brand.800 100%)"
  );

  return (
    <Box bgGradient={bgGradient} py={12} position="relative" overflow="hidden">
      {/* Background Pattern */}
      <Box
        position="absolute"
        top="0"
        left="0"
        right="0"
        bottom="0"
        opacity={0.05}
        bgImage="radial-gradient(circle at 20% 50%, white 1px, transparent 1px), radial-gradient(circle at 80% 50%, white 1px, transparent 1px)"
        bgSize="30px 30px"
      />

      <Container maxW="7xl" position="relative" zIndex={1}>
        <VStack spacing={4} textAlign="center">
          <Breadcrumb
            spacing="8px"
            separator={<Icon as={FaChevronRight} color="whiteAlpha.700" />}
            color="whiteAlpha.800"
            fontSize="sm"
          >
            <BreadcrumbItem>
              <BreadcrumbLink as={Link} to="/" _hover={{ color: "white" }}>
                <Icon as={FaHome} mr={1} />
                Home
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbItem>
              <BreadcrumbLink
                as={Link}
                to="/products"
                _hover={{ color: "white" }}
              >
                Products
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbItem isCurrentPage>
              <Text color="white" fontWeight="600">
                {categoryName}
              </Text>
            </BreadcrumbItem>
          </Breadcrumb>

          <MotionVStack
            spacing={3}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <Heading
              fontSize={{ base: "2xl", md: "3xl", lg: "4xl" }}
              fontWeight="800"
              color={textColor}
              textAlign="center"
            >
              {categoryName} Products
            </Heading>
            <Text
              fontSize={{ base: "md", md: "lg" }}
              color="whiteAlpha.900"
              maxW="2xl"
              textAlign="center"
            >
              Explore our comprehensive range of {categoryName.toLowerCase()}{" "}
              solutions designed to meet your specific requirements.
            </Text>
          </MotionVStack>
        </VStack>
      </Container>
    </Box>
  );
};

// Modern Category Sidebar
const ModernCategorySidebar = ({
  categories,
  activeCategory,
  onCategoryChange,
}: {
  categories: Array<{ id: number; category_name: string; image: string }>;
  activeCategory: string;
  onCategoryChange: (categoryId: string) => void;
}) => {
  const sidebarBg = useColorModeValue("white", "gray.800");
  const borderColor = useColorModeValue("gray.200", "gray.700");
  const textColor = useColorModeValue("gray.800", "gray.200");
  const hoverBg = useColorModeValue("brand.50", "gray.700");
  const headerBg = useColorModeValue("gray.50", "gray.700");

  return (
    <Box
      bg={sidebarBg}
      borderRadius="xl"
      border="1px solid"
      borderColor={borderColor}
      boxShadow="xl"
      h="fit-content"
      position="sticky"
      top="6"
      maxH="85vh"
      overflow="hidden"
    >
      {/* Header */}
      <Box bg={headerBg} p={4} borderTopRadius="xl">
        <HStack spacing={3}>
          <Box bg="brand.500" p={2} borderRadius="lg" color="white">
            <Icon as={FaBoxes} w={4} h={4} />
          </Box>
          <VStack align="start" spacing={0}>
            <Heading fontSize="md" color={textColor}>
              Categories
            </Heading>
            <Text
              fontSize="xs"
              color={useColorModeValue("gray.600", "gray.400")}
            >
              {categories.length} available
            </Text>
          </VStack>
        </HStack>
      </Box>

      {/* Categories List */}
      <Box p={2} overflowY="auto" maxH="calc(85vh - 80px)">
        <VStack align="stretch" spacing={1} w="full">
          {categories.map((category) => (
            <MotionBox
              key={category.id}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <HStack
                p={3}
                borderRadius="lg"
                cursor="pointer"
                bg={
                  Number(activeCategory) === category.id
                    ? "brand.500"
                    : "transparent"
                }
                color={
                  Number(activeCategory) === category.id ? "white" : textColor
                }
                _hover={{
                  bg:
                    Number(activeCategory) === category.id
                      ? "brand.600"
                      : hoverBg,
                  transform: "translateX(4px)",
                }}
                onClick={() => onCategoryChange(category.id.toString())}
                transition="all 0.3s"
                border="1px solid"
                borderColor={
                  Number(activeCategory) === category.id
                    ? "brand.500"
                    : "transparent"
                }
                position="relative"
                _before={
                  Number(activeCategory) === category.id
                    ? {
                        content: '""',
                        position: "absolute",
                        left: 0,
                        top: 0,
                        bottom: 0,
                        width: "4px",
                        bg: "white",
                        borderTopLeftRadius: "lg",
                        borderBottomLeftRadius: "lg",
                      }
                    : {}
                }
              >
                <Box
                  bg={
                    Number(activeCategory) === category.id
                      ? "whiteAlpha.200"
                      : "white"
                  }
                  p={2}
                  borderRadius="md"
                  boxShadow="sm"
                >
                  <Image
                    src={`${assetsBaseURL}/${category.image}`}
                    w="24px"
                    h="24px"
                    borderRadius="sm"
                    objectFit="contain"
                  />
                </Box>
                <VStack align="start" spacing={0} flex={1}>
                  <Text fontSize="sm" fontWeight="600" noOfLines={2}>
                    {category.category_name}
                  </Text>
                  <Text fontSize="xs" opacity={0.8}>
                    View products
                  </Text>
                </VStack>
                <Icon
                  as={FaChevronRight}
                  w={3}
                  h={3}
                  opacity={0.6}
                  transform={
                    Number(activeCategory) === category.id
                      ? "translateX(2px)"
                      : "none"
                  }
                  transition="all 0.3s"
                />
              </HStack>
            </MotionBox>
          ))}
        </VStack>
      </Box>
    </Box>
  );
};

// Modern Mobile Category Navigation
const MobileCategoryNav = ({
  categories,
  activeCategory,
  onCategoryChange,
}: {
  categories: Array<{ id: number; category_name: string; image: string }>;
  activeCategory: string;
  onCategoryChange: (categoryId: string) => void;
}) => {
  const cardBg = useColorModeValue("white", "gray.700");
  const borderColor = useColorModeValue("gray.200", "gray.600");

  return (
    <Box overflowX="auto" pb={4} mb={6}>
      <HStack spacing={4} px={2} minW="max-content">
        {categories.map((category) => (
          <MotionBox
            key={category.id}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <VStack
              bg={Number(activeCategory) === category.id ? "brand.500" : cardBg}
              color={
                Number(activeCategory) === category.id ? "white" : "gray.700"
              }
              p={3}
              borderRadius="lg"
              border="2px solid"
              borderColor={
                Number(activeCategory) === category.id
                  ? "brand.500"
                  : borderColor
              }
              cursor="pointer"
              onClick={() => onCategoryChange(category.id.toString())}
              minW="80px"
              spacing={2}
              _hover={{
                transform: "translateY(-2px)",
                boxShadow: "lg",
              }}
              transition="all 0.3s"
            >
              <Image
                src={`${assetsBaseURL}/${category.image}`}
                w="40px"
                h="40px"
                borderRadius="md"
                objectFit="contain"
                bg="white"
                p={1}
              />
              <Text
                fontSize="10px"
                fontWeight="600"
                textAlign="center"
                noOfLines={2}
              >
                {category.category_name}
              </Text>
            </VStack>
          </MotionBox>
        ))}
      </HStack>
    </Box>
  );
};

// Modern Product Lines Grid
const ProductLinesGrid = ({
  productLines,
  onProductLineSelect,
}: {
  productLines: Array<{ id: number; name: string; image: string }>;
  onProductLineSelect: (productLineId: number) => void;
}) => {
  const cardBg = useColorModeValue("white", "gray.700");
  const borderColor = useColorModeValue("gray.200", "gray.600");
  const textColor = useColorModeValue("gray.800", "white");
  const subtextColor = useColorModeValue("gray.600", "gray.300");

  return (
    <SimpleGrid columns={{ base: 1, md: 2, lg: 2 }} spacing={6}>
      {productLines.map((productLine, index) => (
        <MotionBox
          key={productLine.id}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: index * 0.1 }}
          viewport={{ once: true }}
        >
          <VStack
            bg={cardBg}
            borderRadius="2xl"
            overflow="hidden"
            border="1px solid"
            borderColor={borderColor}
            _hover={{
              transform: "translateY(-5px)",
              boxShadow: "2xl",
              borderColor: "brand.300",
            }}
            transition="all 0.3s"
            cursor="pointer"
            onClick={() => onProductLineSelect(productLine.id)}
            h="full"
          >
            <Box
              position="relative"
              w="full"
              h="200px"
              overflow="hidden"
              bg={cardBg}
            >
              <Image
                src={`${assetsBaseURL}/${productLine.image}`}
                alt={productLine.name}
                w="full"
                h="full"
                objectFit="contain"
                p={4}
                fallback={
                  <Center h="200px" bg="gray.100">
                    <Spinner color="brand.500" />
                  </Center>
                }
              />
              <Box
                position="absolute"
                top="3"
                right="3"
                bg="brand.500"
                color="white"
                px={3}
                py={1}
                borderRadius="full"
                fontSize="sm"
                fontWeight="600"
              >
                <Icon as={FaIndustry} mr={1} />
                Product Line
              </Box>
            </Box>

            <VStack p={4} align="start" w="full" spacing={3}>
              <VStack align="start" spacing={1} w="full">
                <Heading fontSize="lg" color={textColor} noOfLines={2}>
                  {productLine.name}
                </Heading>
                <Text fontSize="sm" color={subtextColor} noOfLines={2}>
                  Discover our comprehensive range of{" "}
                  {productLine.name.toLowerCase()}
                  products designed for various industrial applications.
                </Text>
              </VStack>

              <Button
                size="sm"
                bg="brand.500"
                color="white"
                _hover={{ bg: "brand.600" }}
                rightIcon={<FaEye />}
                borderRadius="full"
                w="full"
              >
                View Products
              </Button>
            </VStack>
          </VStack>
        </MotionBox>
      ))}
    </SimpleGrid>
  );
};

// Modern Products Grid with Enhanced Cards
const ModernProductsGrid = ({
  subcategories,
}: {
  subcategories: Array<{
    id: number;
    name: string;
    products: Product[];
  }>;
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("name");
  const textColor = useColorModeValue("gray.800", "white");
  const inputBg = useColorModeValue("white", "gray.700");
  const sectionBg = useColorModeValue("gray.50", "gray.800");
  const searchBorderColor = useColorModeValue("gray.200", "gray.600");
  const sectionHeaderBg = useColorModeValue("white", "gray.700");
  const sectionBorderColor = useColorModeValue("gray.200", "gray.600");
  const subtextColor = useColorModeValue("gray.600", "gray.300");
  const dividerColor = useColorModeValue("gray.300", "gray.600");
  const emptyStateBg = useColorModeValue("gray.100", "gray.700");

  // Filter and sort products
  const filteredSubcategories = subcategories
    .map((sub) => ({
      ...sub,
      products: sub.products.filter((product) =>
        (product as Product).title
          .toLowerCase()
          .includes(searchTerm.toLowerCase())
      ),
    }))
    .filter((sub) => sub.products.length > 0);

  return (
    <VStack spacing={10} align="stretch">
      {/* Search and Filter Controls */}
      <Box
        bg={sectionBg}
        p={6}
        borderRadius="xl"
        border="1px solid"
        borderColor={searchBorderColor}
      >
        <VStack spacing={4}>
          <HStack justify="space-between" w="full" flexWrap="wrap" spacing={4}>
            <HStack spacing={3}>
              <Icon as={FaSearch} color="brand.500" w={5} h={5} />
              <Heading fontSize="lg" color={textColor}>
                Find Products
              </Heading>
            </HStack>
          </HStack>

          <HStack spacing={4} w="full" flexWrap="wrap">
            <InputGroup flex={1} maxW="400px">
              <InputLeftElement>
                <Icon as={FaSearch} color="gray.400" />
              </InputLeftElement>
              <Input
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                bg={inputBg}
                borderRadius="full"
                border="2px solid"
                borderColor={searchBorderColor}
                _focus={{
                  borderColor: "brand.500",
                  boxShadow: "0 0 0 1px var(--chakra-colors-brand-500)",
                }}
              />
            </InputGroup>

            <Select
              maxW="200px"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              bg={inputBg}
              borderRadius="full"
              border="2px solid"
              borderColor={useColorModeValue("gray.200", "gray.600")}
              icon={<FaFilter />}
            >
              <option value="name">Sort by Name</option>
              <option value="newest">Newest First</option>
              <option value="oldest">Oldest First</option>
            </Select>
          </HStack>
        </VStack>
      </Box>

      {/* Products by Subcategory */}
      {filteredSubcategories.map((sub, idx) => (
        <MotionBox
          key={sub.id}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: idx * 0.1 }}
          viewport={{ once: true }}
        >
          <VStack align="stretch" spacing={8}>
            {/* Section Header */}
            <Box
              bg={sectionHeaderBg}
              p={6}
              borderRadius="xl"
              border="1px solid"
              borderColor={sectionBorderColor}
              boxShadow="sm"
            >
              <HStack justify="space-between" align="center" flexWrap="wrap">
                <HStack spacing={4}>
                  <Box bg="brand.500" p={3} borderRadius="lg" color="white">
                    <Icon as={FaTools} w={6} h={6} />
                  </Box>
                  <VStack align="start" spacing={1}>
                    <Heading fontSize="2xl" color={textColor}>
                      {sub.name}
                    </Heading>
                    <Text fontSize="sm" color={subtextColor}>
                      Professional cable management solutions
                    </Text>
                  </VStack>
                </HStack>
                <Badge
                  colorScheme="brand"
                  borderRadius="full"
                  px={4}
                  py={2}
                  fontSize="sm"
                  fontWeight="600"
                >
                  {sub.products.length} Products
                </Badge>
              </HStack>
            </Box>

            {/* Products Grid */}
            <SimpleGrid columns={{ base: 1, md: 2, lg: 2 }} spacing={8}>
              {sub.products.map((product, productIndex: number) => (
                <MotionBox
                  key={product.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: productIndex * 0.1 }}
                  viewport={{ once: true }}
                  _hover={{ transform: "translateY(-4px)" }}
                >
                  <ProductCard product={product} />
                </MotionBox>
              ))}
            </SimpleGrid>

            {idx < filteredSubcategories.length - 1 && (
              <Divider borderColor={dividerColor} my={8} borderWidth="2px" />
            )}
          </VStack>
        </MotionBox>
      ))}

      {filteredSubcategories.length === 0 && searchTerm && (
        <Center py={20}>
          <VStack spacing={6}>
            <Box bg={emptyStateBg} p={8} borderRadius="full">
              <Icon as={FaSearch} w={16} h={16} color="gray.400" />
            </Box>
            <VStack spacing={2}>
              <Heading fontSize="xl" color="gray.500">
                No products found
              </Heading>
              <Text color="gray.400" textAlign="center">
                No products match "{searchTerm}". Try adjusting your search
                terms.
              </Text>
            </VStack>
            <Button
              onClick={() => setSearchTerm("")}
              colorScheme="brand"
              size="lg"
              borderRadius="full"
            >
              Clear Search
            </Button>
          </VStack>
        </Center>
      )}
    </VStack>
  );
};

const ProductsListV2 = () => {
  const { id } = useParams<{ id: string }>();
  const [filterCat, setFilterCat] = useState(id);
  const { data: categories } = useCategories();
  const [productLines, setProductLines] = useState([]);
  const [selectedProductLine, setSelectedProductLine] = useState<number | null>(
    null
  );
  const { data } = useProducts(selectedProductLine);
  const productData = data as
    | Array<{ id: number; name: string; products: Product[] }>
    | undefined;
  const isMobile = useBreakpointValue({ base: true, lg: false });
  const toast = useToast();
  const sectionBg = useColorModeValue("gray.50", "gray.800");
  const contentBg = useColorModeValue("white", "gray.900");
  const borderColor = useColorModeValue("gray.200", "gray.700");
  const headingColor = useColorModeValue("gray.800", "white");
  const subtextColor = useColorModeValue("gray.600", "gray.400");

  // Get current category name
  const currentCategory = categories?.find(
    (cat) => cat.id.toString() === filterCat
  );

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

  useEffect(() => {
    if (filterCat) {
      fetchProductLines(filterCat);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filterCat]);

  const handleCategoryChange = (categoryId: string) => {
    setFilterCat(categoryId);
    setSelectedProductLine(null);
  };

  const handleProductLineSelect = (productLineId: number) => {
    setSelectedProductLine(productLineId);
  };

  const handleBackToProductLines = () => {
    setSelectedProductLine(null);
  };

  if (!categories || categories.length === 0) {
    return <LogoLoader text="Loading categories..." size="xl" />;
  }

  return (
    <Box>
      {/* Header Section */}
      <ProductsHeader
        categoryName={currentCategory?.category_name || "Products"}
      />

      <Box bg={sectionBg} minH="100vh" py={8}>
        <Container maxW="7xl">
          {isMobile ? (
            <VStack spacing={8} align="stretch">
              {/* Mobile Category Navigation */}
              <Box
                bg={contentBg}
                borderRadius="xl"
                p={4}
                boxShadow="lg"
                border="1px solid"
                borderColor={borderColor}
              >
                <MobileCategoryNav
                  categories={categories}
                  activeCategory={filterCat || ""}
                  onCategoryChange={handleCategoryChange}
                />
              </Box>

              {/* Mobile Content */}
              <Box
                bg={contentBg}
                borderRadius="xl"
                p={6}
                boxShadow="xl"
                border="1px solid"
                borderColor={borderColor}
                minH="70vh"
              >
                {selectedProductLine ? (
                  <VStack spacing={8} align="stretch">
                    <HStack
                      justify="space-between"
                      align="center"
                      pb={4}
                      borderBottom="1px solid"
                      borderColor={borderColor}
                    >
                      <Button
                        leftIcon={
                          <FaArrowRight
                            style={{ transform: "rotate(180deg)" }}
                          />
                        }
                        variant="outline"
                        onClick={handleBackToProductLines}
                        colorScheme="brand"
                        size="sm"
                        borderRadius="full"
                      >
                        Back to Product Lines
                      </Button>
                      <Badge
                        colorScheme="blue"
                        px={3}
                        py={1}
                        borderRadius="full"
                      >
                        Products View
                      </Badge>
                    </HStack>
                    {productData && (
                      <ModernProductsGrid subcategories={productData} />
                    )}
                  </VStack>
                ) : (
                  <VStack spacing={8} align="stretch">
                    <Box textAlign="center" py={6}>
                      <VStack spacing={4}>
                        <Box
                          bg="brand.500"
                          p={4}
                          borderRadius="full"
                          color="white"
                          mx="auto"
                          w="fit-content"
                        >
                          <Icon as={FaBoxes} w={8} h={8} />
                        </Box>
                        <VStack spacing={2}>
                          <Heading fontSize="xl" color={headingColor}>
                            Choose a Product Line
                          </Heading>
                          <Text color={subtextColor} fontSize="sm">
                            Select from our comprehensive range of product lines
                          </Text>
                        </VStack>
                      </VStack>
                    </Box>
                    <ProductLinesGrid
                      productLines={productLines}
                      onProductLineSelect={handleProductLineSelect}
                    />
                  </VStack>
                )}
              </Box>
            </VStack>
          ) : (
            <SimpleGrid columns={{ base: 1, lg: 4 }} spacing={8}>
              {/* Desktop Sidebar */}
              <Box gridColumn="span 1">
                <ModernCategorySidebar
                  categories={categories}
                  activeCategory={filterCat || ""}
                  onCategoryChange={handleCategoryChange}
                />
              </Box>

              {/* Desktop Content */}
              <Box gridColumn="span 3">
                <Box
                  bg={contentBg}
                  borderRadius="xl"
                  p={8}
                  boxShadow="xl"
                  border="1px solid"
                  borderColor={borderColor}
                  minH="80vh"
                >
                  {selectedProductLine ? (
                    <VStack spacing={8} align="stretch">
                      <HStack
                        justify="space-between"
                        align="center"
                        pb={6}
                        borderBottom="2px solid"
                        borderColor={borderColor}
                      >
                        <HStack spacing={4}>
                          <Button
                            leftIcon={
                              <FaArrowRight
                                style={{ transform: "rotate(180deg)" }}
                              />
                            }
                            variant="outline"
                            onClick={handleBackToProductLines}
                            colorScheme="brand"
                            size="md"
                            borderRadius="full"
                          >
                            Back to Product Lines
                          </Button>
                        </HStack>
                        <HStack spacing={3}>
                          <Badge
                            colorScheme="blue"
                            px={4}
                            py={2}
                            borderRadius="full"
                            fontSize="sm"
                          >
                            Products View
                          </Badge>
                          <Badge
                            colorScheme="green"
                            px={4}
                            py={2}
                            borderRadius="full"
                            fontSize="sm"
                          >
                            {productData && productData.length > 0
                              ? productData.reduce(
                                  (acc: number, sub) =>
                                    acc + (sub.products?.length || 0),
                                  0
                                )
                              : 0}{" "}
                            Items
                          </Badge>
                        </HStack>
                      </HStack>
                      {productData && (
                        <ModernProductsGrid subcategories={productData} />
                      )}
                    </VStack>
                  ) : (
                    <VStack spacing={10} align="stretch">
                      <Box textAlign="center" py={8}>
                        <VStack spacing={6}>
                          <Box
                            bg="brand.500"
                            p={6}
                            borderRadius="2xl"
                            color="white"
                            mx="auto"
                            w="fit-content"
                          >
                            <Icon as={FaBoxes} w={12} h={12} />
                          </Box>
                          <VStack spacing={3}>
                            <Heading fontSize="2xl" color={headingColor}>
                              Choose a Product Line
                            </Heading>
                            <Text color={subtextColor} fontSize="lg" maxW="md">
                              Select from our comprehensive range of product
                              lines to explore our solutions
                            </Text>
                          </VStack>
                          <HStack spacing={2}>
                            <Badge
                              colorScheme="brand"
                              px={3}
                              py={1}
                              borderRadius="full"
                            >
                              {productLines.length} Product Lines Available
                            </Badge>
                          </HStack>
                        </VStack>
                      </Box>
                      <ProductLinesGrid
                        productLines={productLines}
                        onProductLineSelect={handleProductLineSelect}
                      />
                    </VStack>
                  )}
                </Box>
              </Box>
            </SimpleGrid>
          )}
        </Container>
      </Box>

      {/* Floating Action Button */}
      <FloatingActionButton />

      {/* Copyright Footer */}
      <CopyrightFooter />
    </Box>
  );
};

export default ProductsListV2;
