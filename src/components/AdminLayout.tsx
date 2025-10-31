import {
  Box,
  Container,
  Heading,
  VStack,
  useColorModeValue,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Text,
  HStack,
  Icon,
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import { ReactNode } from "react";
import { FaHome, FaChevronRight } from "react-icons/fa";

const MotionBox = motion(Box);
const MotionVStack = motion(VStack);

interface AdminLayoutProps {
  children: ReactNode;
  title: string;
  subtitle?: string;
  icon?: React.ComponentType;
  breadcrumbs?: Array<{
    label: string;
    href?: string;
  }>;
}

const AdminLayout = ({
  children,
  title,
  subtitle,
  icon,
  breadcrumbs = [],
}: AdminLayoutProps) => {
  const bgColor = useColorModeValue("gray.50", "gray.900");
  const cardBg = useColorModeValue("white", "gray.800");
  const borderColor = useColorModeValue("gray.200", "gray.700");

  const bgGradient = useColorModeValue(
    "linear(135deg, brand.500 0%, brand.600 50%, brand.700 100%)",
    "linear(135deg, brand.600 0%, brand.700 50%, brand.800 100%)"
  );

  return (
    <Box minH="100vh" bg={bgColor}>
      {/* Header Section */}
      <MotionBox
        bgGradient={bgGradient}
        py={12}
        position="relative"
        overflow="hidden"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        {/* Background Pattern */}
        <Box
          position="absolute"
          top="0"
          left="0"
          right="0"
          bottom="0"
          opacity={0.1}
          bgImage="radial-gradient(circle at 20% 50%, white 1px, transparent 1px), radial-gradient(circle at 80% 50%, white 1px, transparent 1px)"
          bgSize="40px 40px"
        />

        <Container maxW="7xl" position="relative" zIndex={1}>
          <VStack spacing={6} align="start">
            {/* Breadcrumbs */}
            {breadcrumbs.length > 0 && (
              <Breadcrumb
                spacing="8px"
                separator={<Icon as={FaChevronRight} color="whiteAlpha.700" />}
                color="whiteAlpha.900"
                fontSize="sm"
              >
                <BreadcrumbItem>
                  <BreadcrumbLink href="/" display="flex" alignItems="center">
                    <Icon as={FaHome} mr={1} />
                    Home
                  </BreadcrumbLink>
                </BreadcrumbItem>
                {breadcrumbs.map((crumb, index) => (
                  <BreadcrumbItem key={index} isCurrentPage={!crumb.href}>
                    {crumb.href ? (
                      <BreadcrumbLink href={crumb.href}>
                        {crumb.label}
                      </BreadcrumbLink>
                    ) : (
                      <Text>{crumb.label}</Text>
                    )}
                  </BreadcrumbItem>
                ))}
              </Breadcrumb>
            )}

            {/* Title Section */}
            <HStack spacing={4} align="center">
              {icon && (
                <Box p={3} bg="whiteAlpha.200" borderRadius="lg" color="white">
                  <Icon as={icon} boxSize={6} />
                </Box>
              )}
              <VStack align="start" spacing={1}>
                <Heading
                  fontSize={{ base: "2xl", md: "3xl", lg: "4xl" }}
                  fontWeight="900"
                  color="white"
                  lineHeight="1.1"
                >
                  {title}
                </Heading>
                {subtitle && (
                  <Text
                    fontSize={{ base: "md", md: "lg" }}
                    color="whiteAlpha.900"
                    lineHeight="1.6"
                  >
                    {subtitle}
                  </Text>
                )}
              </VStack>
            </HStack>
          </VStack>
        </Container>
      </MotionBox>

      {/* Content Section */}
      <Container maxW="7xl" py={12}>
        <MotionVStack
          spacing={8}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Box
            w="full"
            bg={cardBg}
            borderRadius="xl"
            p={8}
            boxShadow="xl"
            border="1px solid"
            borderColor={borderColor}
          >
            {children}
          </Box>
        </MotionVStack>
      </Container>
    </Box>
  );
};

export default AdminLayout;
