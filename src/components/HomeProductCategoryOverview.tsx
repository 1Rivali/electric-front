import {
  Box,
  Button,
  Center,
  Container,
  Divider,
  Heading,
  Image,
  SimpleGrid,
  Stack,
  Text,
  VStack,
} from "@chakra-ui/react";
import React from "react";
import { useNavigate } from "react-router-dom";
import useCategories from "../hooks/useCategories";
import { assetsBaseURL } from "../services/api-service";
import LogoLoader from "./LogoLoader";
interface ProductCategoryProps {
  id: number;
  icon: string;
  title: string;
  description: string;
}

export const CategoryCard: React.FC<ProductCategoryProps> = ({
  id,
  icon,
  title,
  description,
}) => {
  const navigate = useNavigate();
  return (
    <VStack
      // flexDirection={{ base: "column", md: "column" }}
      // spacing={{ base: 6, md: 10 }}
      justify="space-between"
      textAlign="start"
      border={"1px solid"}
      borderColor={"brand.500"}
      py={5}
    >
      <Image src={icon} width={"65px"} height={"65px"} objectFit="contain" />

      <Heading
        textAlign={"center"}
        as="h3"
        size={{ base: "sm", md: "md" }}
        px={5}
        h={"50px"}
      >
        {title}
      </Heading>

      <Divider />

      <Text
        noOfLines={4}
        textOverflow={"ellipsis"}
        color="grey"
        px={5}
        fontSize={{ base: "sm", md: "md" }}
      >
        {description}
      </Text>

      <Button
        backgroundColor={"brand.500"}
        color={"white"}
        onClick={() => navigate(`/category/${id}/products`)}
        fontSize={{ base: "14px", lg: "" }}
        p={{ base: "2" }}
        mt={10}
      >
        View Products
      </Button>
    </VStack>
  );
};

const ProductCategoriesGrid: React.FC = () => {
  const { data, isLoading, error } = useCategories();
  if (isLoading) {
    return <LogoLoader text="Loading product categories..." size="lg" />;
  }
  if (error) {
    return (
      <Center>
        <Heading>Something Wrong Happend</Heading>
      </Center>
    );
  }
  return (
    <Box py={8}>
      <SimpleGrid columns={{ base: 1, md: 1, lg: 4 }} spacing={10}>
        {data.map((category, idx) => (
          <CategoryCard
            key={idx}
            id={category.id}
            icon={`${assetsBaseURL}/${category.image}`}
            title={category.category_name}
            description={category.description}
          />
        ))}
      </SimpleGrid>
    </Box>
  );
};

export default ProductCategoriesGrid;
