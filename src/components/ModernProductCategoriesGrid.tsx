import {
  Box,
  Button,
  Center,
  Heading,
  Image,
  SimpleGrid,
  Text,
  VStack,
  Icon,
  useColorModeValue,
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import React from "react";
import { useNavigate } from "react-router-dom";
import { FaArrowRight, FaExclamationTriangle } from "react-icons/fa";
import useCategories from "../hooks/useCategories";
import { assetsBaseURL } from "../services/api-service";
import LogoLoader from "./LogoLoader";

const MotionBox = motion(Box);
const MotionVStack = motion(VStack);

interface ProductCategoryProps {
  id: number;
  icon: string;
  title: string;
  description: string;
  index: number;
}

export const ModernCategoryCard: React.FC<ProductCategoryProps> = ({
  id,
  icon,
  title,
  description,
  index,
}) => {
  const navigate = useNavigate();

  // Dark mode support
  const cardBgColor = useColorModeValue("white", "gray.700");
  const cardBorderColor = useColorModeValue("gray.200", "gray.600");
  const cardHoverBorderColor = useColorModeValue("brand.300", "brand.400");
  const textColor = useColorModeValue("gray.800", "white");
  const subtextColor = useColorModeValue("gray.600", "gray.300");
  const iconBgColor = useColorModeValue("brand.50", "brand.900");

  return (
    <MotionBox
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      viewport={{ once: true }}
    >
      <MotionVStack
        bg={cardBgColor}
        p={8}
        borderRadius="2xl"
        boxShadow="lg"
        border="2px solid"
        borderColor={cardBorderColor}
        _hover={{
          transform: "translateY(-8px)",
          boxShadow: "2xl",
          borderColor: cardHoverBorderColor,
        }}
        transition="all 0.3s cubic-bezier(0.4, 0, 0.2, 1)"
        spacing={6}
        align="center"
        h="full"
        position="relative"
        overflow="hidden"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        {/* Background gradient effect */}
        <Box
          position="absolute"
          top="0"
          left="0"
          right="0"
          h="4px"
          bgGradient="linear(to-r, brand.400, brand.600)"
          borderTopRadius="2xl"
          opacity={0.8}
        />

        {/* Subtle background pattern */}
        <Box
          position="absolute"
          top="0"
          left="0"
          right="0"
          bottom="0"
          opacity={0.03}
          bgImage="radial-gradient(circle at 20% 50%, currentColor 1px, transparent 1px), radial-gradient(circle at 80% 50%, currentColor 1px, transparent 1px)"
          bgSize="30px 30px"
          color="brand.500"
          pointerEvents="none"
        />

        {/* Icon container */}
        <MotionBox
          bg={iconBgColor}
          p={4}
          borderRadius="xl"
          border="2px solid"
          borderColor={useColorModeValue("brand.100", "brand.800")}
          whileHover={{ scale: 1.1, rotate: 5 }}
          transition={{ duration: 0.3 }}
        >
          <Image
            src={icon}
            width="60px"
            height="60px"
            objectFit="contain"
            alt={title}
            loading="lazy"
            fallback={
              <Center w="60px" h="60px">
                <Icon as={FaExclamationTriangle} color="gray.400" />
              </Center>
            }
          />
        </MotionBox>

        {/* Content */}
        <VStack spacing={4} flex={1} w="full">
          <Heading
            fontSize={{ base: "lg", md: "xl" }}
            fontWeight="700"
            color={textColor}
            textAlign="center"
            lineHeight="1.3"
            noOfLines={2}
          >
            {title}
          </Heading>

          <Text
            fontSize={{ base: "sm", md: "md" }}
            color={subtextColor}
            textAlign="center"
            lineHeight="1.6"
            noOfLines={3}
            px={2}
          >
            {description}
          </Text>
        </VStack>

        {/* Action button */}
        <MotionBox w="full" maxW="200px">
          <Button
            bg="brand.500"
            color="white"
            _hover={{
              bg: "brand.600",
              transform: "translateY(-2px)",
              boxShadow: "lg",
            }}
            _active={{
              bg: "brand.700",
              transform: "translateY(0)",
            }}
            onClick={() => navigate(`/category/${id}/products`)}
            rightIcon={<FaArrowRight />}
            size="md"
            borderRadius="full"
            fontWeight="600"
            px={6}
            transition="all 0.3s cubic-bezier(0.4, 0, 0.2, 1)"
            boxShadow="md"
            w="full"
            position="relative"
            overflow="hidden"
            _before={{
              content: '""',
              position: "absolute",
              top: 0,
              left: "-100%",
              width: "100%",
              height: "100%",
              background:
                "linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)",
              transition: "left 0.5s",
            }}
            _groupHover={{
              _before: {
                left: "100%",
              },
            }}
          >
            View Products
          </Button>
        </MotionBox>
      </MotionVStack>
    </MotionBox>
  );
};

const ModernProductCategoriesGrid: React.FC = () => {
  const { data, isLoading, error } = useCategories();

  // Dark mode support
  const errorTextColor = useColorModeValue("red.500", "red.300");
  const errorBgColor = useColorModeValue("red.50", "red.900");

  if (isLoading) {
    return <LogoLoader text="Loading our amazing products..." size="xl" />;
  }

  if (error) {
    return (
      <Center py={20}>
        <VStack
          spacing={4}
          bg={errorBgColor}
          p={8}
          borderRadius="xl"
          border="1px solid"
          borderColor={useColorModeValue("red.200", "red.700")}
        >
          <Icon as={FaExclamationTriangle} color={errorTextColor} boxSize={8} />
          <Heading fontSize="xl" color={errorTextColor}>
            Oops! Something went wrong
          </Heading>
          <Text color={errorTextColor} textAlign="center">
            We couldn't load the product categories. Please try again later.
          </Text>
        </VStack>
      </Center>
    );
  }

  if (!data || data.length === 0) {
    return (
      <Center py={20}>
        <VStack spacing={4}>
          <Text fontSize="xl" color={useColorModeValue("gray.600", "gray.400")}>
            No product categories available at the moment.
          </Text>
        </VStack>
      </Center>
    );
  }

  return (
    <Box py={8}>
      <MotionBox
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        <SimpleGrid
          columns={{ base: 1, sm: 2, md: 3, lg: 4 }}
          spacing={{ base: 6, md: 8 }}
          w="full"
        >
          {data.map((category, idx) => (
            <ModernCategoryCard
              key={category.id}
              index={idx}
              id={category.id}
              icon={`${assetsBaseURL}/${category.image}`}
              title={category.category_name}
              description={category.description}
            />
          ))}
        </SimpleGrid>
      </MotionBox>
    </Box>
  );
};

export default ModernProductCategoriesGrid;
