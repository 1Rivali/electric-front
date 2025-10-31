import {
  Box,
  Container,
  Heading,
  Text,
  VStack,
  HStack,
  SimpleGrid,
  useColorModeValue,
  Button,
  Icon,
  useToast,
  Center,
  Badge,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  FaHome,
  FaChevronRight,
  FaCertificate,
  FaFileAlt,
  FaAward,
  FaClipboardCheck,
  FaDownload,
  FaExternalLinkAlt,
  FaShieldAlt,
  FaIndustry,
  FaCheckCircle,
} from "react-icons/fa";
import axios from "axios";
import { assetsBaseURL, baseURL } from "../services/api-service";
import FloatingActionButton from "../components/FloatingActionButton";
import LogoLoader from "../components/LogoLoader";
import { CopyrightFooter } from "../components";

const MotionBox = motion(Box);
const MotionVStack = motion(VStack);

interface Credential {
  id: number;
  title: string;
  pdf_file: string;
}

// Modern Page Header
const CredentialsHeader = () => {
  const textColor = useColorModeValue("white", "white");
  const bgGradient = useColorModeValue(
    "linear(135deg, brand.500 0%, brand.600 50%, brand.700 100%)",
    "linear(135deg, brand.600 0%, brand.700 50%, brand.800 100%)"
  );

  return (
    <Box bgGradient={bgGradient} py={16} position="relative" overflow="hidden">
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
        <VStack spacing={6} textAlign="center">
          <Breadcrumb
            spacing="8px"
            separator={<Icon as={FaChevronRight} color="whiteAlpha.700" />}
            color="whiteAlpha.800"
          >
            <BreadcrumbItem>
              <BreadcrumbLink as={Link} to="/" _hover={{ color: "white" }}>
                <Icon as={FaHome} mr={1} />
                Home
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbItem isCurrentPage>
              <Text color="white" fontWeight="600">
                Credentials
              </Text>
            </BreadcrumbItem>
          </Breadcrumb>

          <MotionVStack
            spacing={4}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <HStack spacing={4}>
              <Box bg="whiteAlpha.200" p={4} borderRadius="2xl" color="white">
                <Icon as={FaCertificate} w={12} h={12} />
              </Box>
              <VStack align="start" spacing={2}>
                <Heading
                  fontSize={{ base: "3xl", md: "4xl", lg: "5xl" }}
                  fontWeight="800"
                  color={textColor}
                >
                  Our Credentials
                </Heading>
                <Text
                  fontSize={{ base: "lg", md: "xl" }}
                  color="whiteAlpha.900"
                  maxW="3xl"
                >
                  Quality certifications and industry approvals that demonstrate
                  our commitment to excellence
                </Text>
              </VStack>
            </HStack>
          </MotionVStack>
        </VStack>
      </Container>
    </Box>
  );
};

// Modern Credential Card
const CredentialCard = ({
  credential,
  index,
}: {
  credential: Credential;
  index: number;
}) => {
  const cardBg = useColorModeValue("white", "gray.800");
  const borderColor = useColorModeValue("gray.200", "gray.600");
  const textColor = useColorModeValue("gray.800", "white");
  const subtextColor = useColorModeValue("gray.600", "gray.300");

  // Icon mapping based on credential title
  const getCredentialIcon = (title: string) => {
    const titleLower = title.toLowerCase();
    if (titleLower.includes("certificate") || titleLower.includes("iso"))
      return FaCertificate;
    if (titleLower.includes("approval")) return FaAward;
    if (titleLower.includes("test") || titleLower.includes("report"))
      return FaClipboardCheck;
    if (titleLower.includes("catalog")) return FaFileAlt;
    if (titleLower.includes("project")) return FaIndustry;
    return FaShieldAlt;
  };

  const handleOpenDocument = () => {
    window.open(`${assetsBaseURL}/${credential.pdf_file}`, "_blank");
  };

  const handleDownloadDocument = () => {
    const link = document.createElement("a");
    link.href = `${assetsBaseURL}/${credential.pdf_file}`;
    link.download = `${credential.title}.pdf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <MotionBox
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      viewport={{ once: true }}
      whileHover={{ y: -4 }}
    >
      <Box
        bg={cardBg}
        borderRadius="2xl"
        border="1px solid"
        borderColor={borderColor}
        p={8}
        boxShadow="lg"
        _hover={{
          boxShadow: "2xl",
          borderColor: "brand.300",
        }}
        transition="all 0.3s"
        h="full"
        position="relative"
        overflow="hidden"
      >
        {/* Background Pattern */}
        <Box
          position="absolute"
          top="0"
          right="0"
          w="100px"
          h="100px"
          opacity={0.05}
          transform="translate(30px, -30px)"
        >
          <Icon as={getCredentialIcon(credential.title)} w="full" h="full" />
        </Box>

        <VStack spacing={6} align="start" position="relative" zIndex={1}>
          {/* Header */}
          <HStack spacing={4} w="full">
            <Box bg="brand.500" p={3} borderRadius="xl" color="white">
              <Icon as={getCredentialIcon(credential.title)} w={6} h={6} />
            </Box>
            <VStack align="start" spacing={1} flex={1}>
              <Heading fontSize="xl" color={textColor} noOfLines={2}>
                {credential.title}
              </Heading>
              <Badge colorScheme="brand" borderRadius="full" px={3}>
                PDF Document
              </Badge>
            </VStack>
          </HStack>

          {/* Description */}
          <Text color={subtextColor} lineHeight="1.7">
            Official documentation demonstrating our compliance with industry
            standards and commitment to quality excellence.
          </Text>

          {/* Actions */}
          <VStack spacing={3} w="full">
            <Button
              bg="brand.500"
              color="white"
              _hover={{ bg: "brand.600" }}
              _active={{ bg: "brand.700" }}
              rightIcon={<FaExternalLinkAlt />}
              borderRadius="full"
              w="full"
              size="md"
              onClick={handleOpenDocument}
            >
              View Document
            </Button>
            <Button
              variant="outline"
              colorScheme="brand"
              rightIcon={<FaDownload />}
              borderRadius="full"
              w="full"
              size="md"
              onClick={handleDownloadDocument}
            >
              Download PDF
            </Button>
          </VStack>
        </VStack>
      </Box>
    </MotionBox>
  );
};

// Stats Section
const StatsSection = ({ credentialCount }: { credentialCount: number }) => {
  const sectionBg = useColorModeValue("gray.50", "gray.900");
  const textColor = useColorModeValue("gray.800", "white");
  const subtextColor = useColorModeValue("gray.600", "gray.300");

  const stats = [
    {
      icon: FaCertificate,
      label: "Certifications",
      value: credentialCount.toString(),
      color: "brand.500",
    },
    {
      icon: FaAward,
      label: "Industry Awards",
      value: "15+",
      color: "green.500",
    },
    {
      icon: FaCheckCircle,
      label: "Quality Standards",
      value: "ISO Certified",
      color: "blue.500",
    },
    {
      icon: FaShieldAlt,
      label: "Years Experience",
      value: "20+",
      color: "purple.500",
    },
  ];

  return (
    <Box bg={sectionBg} py={20}>
      <Container maxW="7xl">
        <VStack spacing={12}>
          <MotionVStack
            spacing={4}
            textAlign="center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <Heading fontSize={{ base: "2xl", md: "3xl" }} color={textColor}>
              Trusted by Industry Leaders
            </Heading>
            <Text color={subtextColor} maxW="2xl">
              Our credentials reflect our dedication to maintaining the highest
              standards in electrical cable management solutions.
            </Text>
          </MotionVStack>

          <SimpleGrid columns={{ base: 2, md: 4 }} spacing={8} w="full">
            {stats.map((stat, index) => (
              <MotionBox
                key={stat.label}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <VStack spacing={4} textAlign="center">
                  <Box bg={stat.color} p={4} borderRadius="2xl" color="white">
                    <Icon as={stat.icon} w={8} h={8} />
                  </Box>
                  <VStack spacing={1}>
                    <Text fontSize="2xl" fontWeight="bold" color={textColor}>
                      {stat.value}
                    </Text>
                    <Text fontSize="sm" color={subtextColor} fontWeight="600">
                      {stat.label}
                    </Text>
                  </VStack>
                </VStack>
              </MotionBox>
            ))}
          </SimpleGrid>
        </VStack>
      </Container>
    </Box>
  );
};

const CredentialsV2 = () => {
  const [credentials, setCredentials] = useState<Credential[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const toast = useToast();
  const sectionBg = useColorModeValue("white", "gray.800");
  const textColor = useColorModeValue("gray.800", "white");
  const subtextColor = useColorModeValue("gray.600", "gray.300");

  useEffect(() => {
    fetchCredentials();
  }, []);

  const fetchCredentials = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get(`${baseURL}/credentials`);
      setCredentials(response.data);
    } catch {
      toast({
        title: "Error",
        description: "Failed to fetch credentials",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return <LogoLoader text="Loading credentials..." size="xl" />;
  }

  return (
    <Box>
      {/* Header Section */}
      <CredentialsHeader />

      {/* Stats Section */}
      <StatsSection credentialCount={credentials.length} />

      {/* Credentials Section */}
      <Box bg={sectionBg} py={20}>
        <Container maxW="7xl">
          <VStack spacing={12}>
            <MotionVStack
              spacing={4}
              textAlign="center"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <Heading fontSize={{ base: "2xl", md: "3xl" }} color={textColor}>
                Our Official Documents
              </Heading>
              <Text color={subtextColor} maxW="2xl">
                Download and review our comprehensive collection of
                certifications, approvals, and quality documentation.
              </Text>
            </MotionVStack>

            {credentials.length > 0 ? (
              <SimpleGrid
                columns={{ base: 1, md: 2, lg: 3 }}
                spacing={8}
                w="full"
              >
                {credentials.map((credential, index) => (
                  <CredentialCard
                    key={credential.id}
                    credential={credential}
                    index={index}
                  />
                ))}
              </SimpleGrid>
            ) : (
              <Center py={20}>
                <VStack spacing={4}>
                  <Icon as={FaFileAlt} w={16} h={16} color="gray.400" />
                  <Text fontSize="xl" color="gray.500">
                    No credentials available at the moment
                  </Text>
                </VStack>
              </Center>
            )}
          </VStack>
        </Container>
      </Box>

      {/* Floating Action Button */}
      <FloatingActionButton />

      {/* Copyright Footer */}
      <CopyrightFooter />
    </Box>
  );
};

export default CredentialsV2;
