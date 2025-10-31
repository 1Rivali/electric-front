import {
  Box,
  Center,
  Flex,
  Heading,
  HStack,
  Image,
  SimpleGrid,
  Stack,
  Text,
  useBreakpointValue,
  useColorModeValue,
  useToast,
  VStack,
} from "@chakra-ui/react";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ProductCard from "../components/ProductCard";

import useProducts from "../hooks/useProducts";
import { assetsBaseURL, baseURL } from "../services/api-service";
import useCategories from "../hooks/useCategories";

export default function ProductsList() {
  const { id } = useParams<{ id: string }>();
  const [filterCat, setFilterCat] = useState(id);
  const { data: categories } = useCategories();
  const [productLines, setProductLines] = useState([]);
  const [selectedProductLine, setSelectedProductLine] = useState(null);
  const { data } = useProducts(selectedProductLine);
  const isMobile = useBreakpointValue({ base: true, md: false }); // Determines mobile or desktop
  const categoriesHoverBgColor = useColorModeValue(
    "secondary.100",
    "secondary.500"
  );
  const toast = useToast();

  useEffect(() => {
    fetchProductLines(filterCat);
  }, [filterCat]);

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
  return (
    <Stack direction={isMobile ? "column" : "row"} mt={"2%"}>
      {/* Categories Section */}
      {isMobile ? (
        // Mobile: Horizontal Scrollable Categories
        <Box overflowX="auto" pb={4} mb={4}>
          <Flex gap={4} px={2} direction="row">
            {categories.map((category, idx) => (
              <Box
                key={idx}
                cursor="pointer"
                transition="transform 0.3s, box-shadow 0.3s"
                // transform={
                //   Number(filterCat) === category.id ? "scale(1.05)" : ""
                // }
                boxShadow={Number(filterCat) === category.id ? "xl" : "md"}
                onClick={() => {
                  setFilterCat(category.id.toString());
                  setSelectedProductLine(null);
                }}
                p={4}
                borderRadius={"lg"}
                borderWidth={Number(filterCat) === category.id ? 2 : 1}
                borderColor={
                  // Number(filterCat) === category.id ? "brand.500" : "gray.200"
                  "brand.500"
                }
                _hover={{ transform: "scale(1.05)", boxShadow: "lg" }}
                // _active={{ transform: "scale(1.01)", boxShadow: "2xl" }}
                width={"120px"}
                minWidth={"120px"}
                textAlign="center"
                bg={
                  Number(filterCat) === category.id
                    ? categoriesHoverBgColor
                    : ""
                }
              >
                <Image
                  src={`${assetsBaseURL}/${category.image}`}
                  borderRadius={"full"}
                  width={"60px"}
                  objectFit={"contain"}
                  shadow={"2xl"}
                  mx="auto"
                  mb={2}
                />
                <Text
                  color={
                    Number(filterCat) === category.id ? "brand.500" : "gray.600"
                  }
                  fontWeight={
                    Number(filterCat) === category.id ? "bold" : "normal"
                  }
                  fontSize={"sm"}
                >
                  {category.category_name}
                </Text>
              </Box>
            ))}
          </Flex>
        </Box>
      ) : (
        // Desktop: Fixed Sidebar
        <SimpleGrid
          columns={1}
          height={"80vh"}
          width={"15%"}
          spacing={2}
          position={"fixed"}
          borderRight={"1px solid"}
          borderColor={"brand.500"}
          overflowY={"scroll"}
        >
          {categories.map((category, idx) => (
            <HStack
              key={idx}
              p={5}
              onClick={() => {
                setFilterCat(category.id.toString());
                setSelectedProductLine(null);
              }}
              backgroundColor={
                Number(filterCat) === category.id && categoriesHoverBgColor
              }
              _hover={{
                cursor: "pointer",
                backgroundColor: categoriesHoverBgColor,
                p: "5",
              }}
            >
              <Image
                src={`${assetsBaseURL}/${category.image}`}
                borderRadius={"full"}
                width={"20%"}
                objectFit={"contain"}
                shadow={"2xl"}
              />
              <Text
                color={Number(filterCat) === category.id ? "brand.500" : ""}
                fontWeight={Number(filterCat) === category.id ? "bold" : ""}
              >
                {category.category_name}
              </Text>
            </HStack>
          ))}
        </SimpleGrid>
      )}

      {/* Products Section */}
      {/* <SimpleGrid
        width={"full"}
        ml={isMobile ? "0" : "21%"}
        spacing={10}
        columns={[1, 1, 2, 4]}
      > */}
      {selectedProductLine ? (
        <VStack spacing={20} width={"full"} ml={isMobile ? "0" : "17%"} p={5}>
          {data &&
            // @ts-expect-error 231
            data.map((sub, idx) => {
              return (
                <Box key={idx} borderRadius={"10px"}>
                  {/* <Divider mb={5} borderColor={"brand.500"} /> */}
                  <Heading textAlign={{ base: "center", lg: "start" }} mb={8}>
                    {sub.name}
                  </Heading>
                  <SimpleGrid spacing={10} columns={[1, 1, 2, 3, 4]}>
                    {sub.products.map((product) => (
                      <Center>
                        {" "}
                        <ProductCard product={product} />
                      </Center>
                    ))}
                  </SimpleGrid>
                </Box>
              );
            })}
        </VStack>
      ) : (
        <Stack spacing={20} width={"full"} ml={isMobile ? "0" : "17%"} p={5}>
          <Heading textAlign={"center"}>Product Lines</Heading>
          <SimpleGrid columns={[1, 2]} rowGap={10}>
            {productLines &&
              productLines.map((productLine, index) => (
                <Center key={index}>
                  <Box
                    border={"1px solid"}
                    borderRadius="lg"
                    borderColor={"brand.500"}
                    width="60%"
                    boxShadow="lg"
                    textAlign="start"
                    p={6}
                    _hover={{ transform: "scale(1.1)" }}
                    onClick={() => {
                      setSelectedProductLine(productLine.id);
                    }}
                  >
                    <Image
                      src={`${assetsBaseURL}/${productLine.image}`}
                      alt={productLine.name}
                      objectFit="contain"
                      width={"full"}
                      height="275px"
                    />
                    <Text
                      fontWeight="bold"
                      fontSize="lg"
                      color="brand.500"
                      mb={2}
                    >
                      {productLine.name}
                    </Text>
                    <Text fontSize="sm" color="gray.500">
                      Discover the variety of {productLine.name} products.
                    </Text>
                  </Box>
                </Center>
              ))}
          </SimpleGrid>
        </Stack>
      )}
      {/* </SimpleGrid> */}
    </Stack>
  );
}
