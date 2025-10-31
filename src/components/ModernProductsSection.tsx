import {
  Box,
  Button,
  Container,
  Heading,
  Text,
  VStack,
  useColorModeValue,
  Flex,
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import ModernProductCategoriesGrid from "./ModernProductCategoriesGrid";
import { Link } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa";

const MotionBox = motion(Box);
const MotionVStack = motion(VStack);

export const ModernProductsSection = () => {
  // Dark mode support
  const textColor = useColorModeValue("gray.800", "white");
  const subtextColor = useColorModeValue("gray.600", "gray.300");
  const cardBgColor = useColorModeValue("brand.50", "gray.700");
  const borderColor = useColorModeValue("gray.200", "gray.600");

  return (
    <Container maxW="7xl" py={20}>
      <MotionVStack
        spacing={16}
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        {/* Header Section */}
        <VStack spacing={6} textAlign="center" maxW="4xl">
          <Text
            fontSize="lg"
            fontWeight="bold"
            color="brand.500"
            textTransform="uppercase"
            letterSpacing="wide"
          >
            Our Products
          </Text>

          <Heading
            fontSize={{ base: "3xl", md: "4xl", lg: "5xl" }}
            fontWeight="800"
            lineHeight="1.2"
            color={textColor}
          >
            Top Shelf Products Customized for Your Needs
          </Heading>

          <Text
            fontSize={{ base: "lg", md: "xl" }}
            color={subtextColor}
            lineHeight="1.8"
            maxW="3xl"
          >
            When considering the material for Cable Management Systems, it is
            important to assess your specific requirements and environmental
            factors to ensure optimal performance.
          </Text>
        </VStack>

        {/* Products Grid */}
        <MotionBox
          w="full"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <ModernProductCategoriesGrid />
        </MotionBox>

        {/* CTA Section */}
        <MotionBox
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <Flex
            direction={{ base: "column", md: "row" }}
            align="center"
            justify="space-between"
            bg={cardBgColor}
            p={8}
            borderRadius="2xl"
            boxShadow="lg"
            border="1px solid"
            borderColor={borderColor}
            w="full"
            gap={6}
          >
            <VStack
              align={{ base: "center", md: "start" }}
              spacing={4}
              flex={1}
            >
              <Heading
                fontSize={{ base: "2xl", md: "3xl" }}
                fontWeight="700"
                color={textColor}
                textAlign={{ base: "center", md: "left" }}
              >
                Ready to Get Started?
              </Heading>
              <Text
                fontSize="lg"
                color={subtextColor}
                textAlign={{ base: "center", md: "left" }}
              >
                Explore our comprehensive range of cable management solutions
              </Text>
            </VStack>

            <Link to="/products">
              <Button
                size="lg"
                bg="brand.500"
                color="white"
                _hover={{
                  bg: "brand.600",
                  transform: "translateY(-2px)",
                  boxShadow: "xl",
                }}
                rightIcon={<FaArrowRight />}
                px={8}
                py={6}
                fontSize="lg"
                borderRadius="full"
                transition="all 0.3s"
                boxShadow="lg"
              >
                View All Products
              </Button>
            </Link>
          </Flex>
        </MotionBox>
      </MotionVStack>
    </Container>
  );
};
