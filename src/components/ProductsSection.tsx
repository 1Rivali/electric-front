import {
  Box,
  Button,
  Container,
  Heading,
  Text,
  useBreakpointValue,
} from "@chakra-ui/react";
import ProductCategoriesGrid from "./HomeProductCategoryOverview";
import { Link } from "react-router-dom";

export const ProductsSection = () => {
  const isMobile = useBreakpointValue({ base: true, md: false });
  return (
    <Box letterSpacing={"2px"}>
      {isMobile ? (
        <Box
          display="flex"
          flexDirection={{ base: "column", md: "row" }}
          alignItems="flex-start"
          px={{ base: 0, lg: 8 }}
        >
          <ProductCategoriesGrid />

          <Box
            textAlign={{ base: "start", md: "start" }}
            mb={20}
            mt={{ base: 10, md: 0 }}
            minWidth={"100%"}
          >
            <Text fontSize={{ base: "lg", md: "xl" }} color="brand.500">
              OUR PRODUCTS
            </Text>
            <Heading as="h3" fontSize={{ base: "3xl", md: "5xl" }} mt={5}>
              We Offer Top Shelf Products That's Customized for Your Need.
            </Heading>
            <Text mt={5} color="grey" fontSize={{ base: "lg", md: "2xl" }}>
              When considering the material for Cable Management Systems, it is
              important to assess your specific requirements and environmental
              factors.
            </Text>
            <Link to="/products">
              <Button
                mt={10}
                backgroundColor="brand.500"
                color="white"
                _hover={{ bg: "brand.600" }}
              >
                VIEW MORE
              </Button>
            </Link>
          </Box>
        </Box>
      ) : (
        <Container minWidth={"100%"} alignContent={"flex-start"}>
          <Container textAlign={"center"} maxWidth={"80%"} my={10}>
            <Text fontSize={"xl"} color={"brand.500"}>
              OUR PRODUCTS
            </Text>
            <Heading as={"h3"} fontSize={"5xl"} mt={5}>
              We Offer Top Shelf Products That's Customized for your Need.
            </Heading>
            <Text mt={5} color={"grey"} fontSize={"2xl"}>
              When considering the material for Cable Management System, it is
              important to assess your specific requirements.
            </Text>
            <Link to={"/products"}>
              <Button mt={10} backgroundColor={"brand.500"} color={"white"}>
                VIEW MORE
              </Button>
            </Link>
          </Container>
          <ProductCategoriesGrid />
        </Container>
      )}
    </Box>
  );
};
