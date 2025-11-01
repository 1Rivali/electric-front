import {
  Box,
  Container,
  Heading,
  Text,
  VStack,
  HStack,
  SimpleGrid,
  Icon,
  useColorModeValue,
  Button,
  Image,
  Badge,
  Divider,
  Center,
  Spinner,
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import { useState } from "react";
import {
  FaIndustry,
  FaCog,
  FaShieldAlt,
  FaTools,
  FaCheckCircle,
  FaAward,
  FaUsers,
  FaRocket,
  FaLightbulb,
  FaChartLine,
  FaArrowRight,
} from "react-icons/fa";
import ModernProductCategoriesGrid from "../components/ModernProductCategoriesGrid";
import FloatingActionButton from "../components/FloatingActionButton";
import { CopyrightFooter } from "../components";
import homeoverview1 from "../assets/factory/homeoverview1.webp";
import factory3 from "../assets/factory/3.webp";
import factory4 from "../assets/factory/factory4.webp";

const MotionBox = motion(Box);
const MotionVStack = motion(VStack);

// Modern Hero Section
const ProductsHero = () => {
  const textColor = useColorModeValue("white", "white");
  const bgGradient = useColorModeValue(
    "linear(135deg, brand.500 0%, brand.600 50%, brand.700 100%)",
    "linear(135deg, brand.600 0%, brand.700 50%, brand.800 100%)"
  );

  return (
    <Box
      bgGradient={bgGradient}
      py={20}
      position="relative"
      overflow="hidden"
      minH="70vh"
      display="flex"
      alignItems="center"
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
        bgSize="60px 60px"
      />

      <Container maxW="7xl" position="relative" zIndex={1}>
        <SimpleGrid
          columns={{ base: 1, lg: 2 }}
          spacing={12}
          alignItems="center"
        >
          <MotionVStack
            spacing={8}
            align={{ base: "center", lg: "start" }}
            textAlign={{ base: "center", lg: "left" }}
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <Text
              fontSize="lg"
              fontWeight="bold"
              textTransform="uppercase"
              letterSpacing="wide"
              color="brand.200"
            >
              Our Products & Services
            </Text>

            <Heading
              fontSize={{ base: "3xl", md: "4xl", lg: "5xl" }}
              fontWeight="900"
              color={textColor}
              lineHeight="1.1"
            >
              Premium Cable Management{" "}
              <Text as="span" color="brand.200">
                Solutions
              </Text>
            </Heading>

            <Text
              fontSize={{ base: "lg", md: "xl" }}
              color="whiteAlpha.900"
              lineHeight="1.8"
              maxW="2xl"
            >
              From design to delivery, we provide comprehensive cable management
              systems and steel fabrication solutions that meet the highest
              industry standards.
            </Text>

            <HStack spacing={4} pt={4} justifyContent="center">
              <Button
                size="lg"
                bg="white"
                color="brand.600"
                _hover={{
                  bg: "brand.50",
                  transform: "translateY(-2px)",
                  boxShadow: "xl",
                }}
                rightIcon={<FaArrowRight />}
                px={8}
                py={6}
                fontSize="lg"
                borderRadius="full"
                fontWeight="700"
                boxShadow="2xl"
                transition="all 0.3s"
              >
                Explore Products
              </Button>
            </HStack>
          </MotionVStack>

          <MotionBox
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <Box position="relative">
              <Image
                src="/assets/factory/factory4.webp"
                alt="Factory Overview"
                borderRadius="2xl"
                boxShadow="2xl"
                w="full"
                h="400px"
                loading="lazy"
                objectFit="cover"
                fallback={
                  <Center h="400px" bg="whiteAlpha.200" borderRadius="2xl">
                    <Spinner size="xl" color="white" />
                  </Center>
                }
              />

              {/* Stats Overlay */}
              <Box
                position="absolute"
                bottom="4"
                left="4"
                bg="blackAlpha.700"
                backdropFilter="blur(10px)"
                p={4}
                borderRadius="xl"
                color="white"
              >
                <HStack spacing={6}>
                  <VStack spacing={1} align="start">
                    <Text fontSize="2xl" fontWeight="bold">
                      21+
                    </Text>
                    <Text fontSize="sm" opacity={0.9}>
                      Years Experience
                    </Text>
                  </VStack>
                  <VStack spacing={1} align="start">
                    <Text fontSize="2xl" fontWeight="bold">
                      100+
                    </Text>
                    <Text fontSize="sm" opacity={0.9}>
                      Projects Completed
                    </Text>
                  </VStack>
                </HStack>
              </Box>
            </Box>
          </MotionBox>
        </SimpleGrid>
      </Container>
    </Box>
  );
};

// Company Capabilities Section
const CapabilitiesSection = () => {
  const cardBgColor = useColorModeValue("white", "gray.700");
  const borderColor = useColorModeValue("gray.200", "gray.600");
  const textColor = useColorModeValue("gray.800", "white");
  const subtextColor = useColorModeValue("gray.600", "gray.300");

  const capabilities = [
    {
      icon: FaIndustry,
      title: "Manufacturing Excellence",
      description:
        "State-of-the-art manufacturing facility with latest technology",
      color: "blue.500",
    },
    {
      icon: FaCog,
      title: "Custom Fabrication",
      description: "Tailored solutions for unique project requirements",
      color: "green.500",
    },
    {
      icon: FaShieldAlt,
      title: "Quality Assurance",
      description: "ISO certified processes ensuring consistent quality",
      color: "red.500",
    },
    {
      icon: FaTools,
      title: "Installation Support",
      description: "Complete installation and maintenance services",
      color: "purple.500",
    },
    {
      icon: FaAward,
      title: "Industry Recognition",
      description: "Award-winning solutions trusted by major clients",
      color: "orange.500",
    },
    {
      icon: FaUsers,
      title: "Expert Team",
      description: "Experienced engineers and technical specialists",
      color: "teal.500",
    },
  ];

  return (
    <Box py={20} bg={useColorModeValue("gray.50", "gray.900")}>
      <Container maxW="7xl">
        <MotionVStack
          spacing={16}
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <VStack spacing={6} textAlign="center">
            <Text
              fontSize="lg"
              fontWeight="bold"
              color="brand.500"
              textTransform="uppercase"
              letterSpacing="wide"
            >
              Our Capabilities
            </Text>

            <Heading
              fontSize={{ base: "3xl", md: "4xl", lg: "5xl" }}
              fontWeight="800"
              color={textColor}
              lineHeight="1.2"
              maxW="4xl"
            >
              Why Industry Leaders Choose Us
            </Heading>

            <Text
              fontSize={{ base: "lg", md: "xl" }}
              color={subtextColor}
              lineHeight="1.8"
              maxW="3xl"
            >
              With over two decades of experience, we've built our reputation on
              delivering exceptional cable management solutions that exceed
              expectations.
            </Text>
          </VStack>

          <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={8} w="full">
            {capabilities.map((capability, index) => (
              <MotionBox
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <VStack
                  bg={cardBgColor}
                  p={8}
                  borderRadius="2xl"
                  boxShadow="lg"
                  border="1px solid"
                  borderColor={borderColor}
                  _hover={{
                    transform: "translateY(-5px)",
                    boxShadow: "2xl",
                    borderColor: capability.color,
                  }}
                  transition="all 0.3s"
                  spacing={6}
                  align="start"
                  h="full"
                >
                  <Box
                    bg={`${capability.color.split(".")[0]}.50`}
                    p={4}
                    borderRadius="xl"
                    color={capability.color}
                  >
                    <Icon as={capability.icon} w={8} h={8} />
                  </Box>

                  <VStack align="start" spacing={3} flex={1}>
                    <Heading fontSize="xl" fontWeight="700" color={textColor}>
                      {capability.title}
                    </Heading>
                    <Text color={subtextColor} lineHeight="1.6">
                      {capability.description}
                    </Text>
                  </VStack>
                </VStack>
              </MotionBox>
            ))}
          </SimpleGrid>
        </MotionVStack>
      </Container>
    </Box>
  );
};

// Product Showcase Section
const ProductShowcase = () => {
  const [activeTab, setActiveTab] = useState(0);
  const cardBgColor = useColorModeValue("white", "gray.800");
  const textColor = useColorModeValue("gray.800", "white");
  const subtextColor = useColorModeValue("gray.600", "gray.300");

  const showcaseItems = [
    {
      title: "Cable Tray Systems",
      description:
        "Comprehensive range of cable tray solutions for all applications",
      features: ["Ladder Type", "Perforated", "Wire Mesh", "Solid Bottom"],
      image: homeoverview1,
      badge: "Most Popular",
    },
    {
      title: "Steel Fabrication",
      description:
        "Custom steel fabrication services for industrial applications",
      features: [
        "Structural Steel",
        "Custom Brackets",
        "Support Systems",
        "Enclosures",
      ],
      image: factory3,
      badge: "Custom Solutions",
    },
    {
      title: "Installation Services",
      description: "Professional installation and maintenance services",
      features: ["Site Survey", "Installation", "Testing", "Maintenance"],
      image: factory4,
      badge: "Full Service",
    },
  ];

  return (
    <Box py={20} bg={cardBgColor}>
      <Container maxW="7xl">
        <MotionVStack
          spacing={16}
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <VStack spacing={6} textAlign="center">
            <Text
              fontSize="lg"
              fontWeight="bold"
              color="brand.500"
              textTransform="uppercase"
              letterSpacing="wide"
            >
              Product Showcase
            </Text>

            <Heading
              fontSize={{ base: "3xl", md: "4xl", lg: "5xl" }}
              fontWeight="800"
              color={textColor}
              lineHeight="1.2"
            >
              Explore Our Solutions
            </Heading>
          </VStack>

          {/* Tab Navigation */}
          <HStack
            spacing={4}
            flexWrap="wrap"
            justify="center"
            bg={useColorModeValue("gray.100", "gray.700")}
            p={2}
            borderRadius="full"
          >
            {showcaseItems.map((item, index) => (
              <Button
                key={index}
                variant={activeTab === index ? "solid" : "ghost"}
                bg={activeTab === index ? "brand.500" : "transparent"}
                color={activeTab === index ? "white" : textColor}
                _hover={{
                  bg: activeTab === index ? "brand.600" : "whiteAlpha.200",
                }}
                onClick={() => setActiveTab(index)}
                borderRadius="full"
                px={6}
                py={3}
                fontSize="md"
                fontWeight="600"
                transition="all 0.3s"
              >
                {item.title}
              </Button>
            ))}
          </HStack>

          {/* Tab Content */}
          <SimpleGrid
            columns={{ base: 1, lg: 2 }}
            spacing={12}
            alignItems="center"
            w="full"
          >
            <MotionBox
              key={activeTab}
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <VStack align="start" spacing={6}>
                <Box>
                  <Badge
                    colorScheme="brand"
                    fontSize="sm"
                    px={3}
                    py={1}
                    borderRadius="full"
                    mb={4}
                  >
                    {showcaseItems[activeTab].badge}
                  </Badge>
                  <Heading fontSize="3xl" color={textColor} mb={4}>
                    {showcaseItems[activeTab].title}
                  </Heading>
                  <Text fontSize="xl" color={subtextColor} lineHeight="1.7">
                    {showcaseItems[activeTab].description}
                  </Text>
                </Box>

                <Divider />

                <Box w="full">
                  <Text fontSize="lg" fontWeight="600" color={textColor} mb={4}>
                    Key Features:
                  </Text>
                  <SimpleGrid columns={2} spacing={3}>
                    {showcaseItems[activeTab].features.map((feature, index) => (
                      <HStack key={index} spacing={3}>
                        <Icon as={FaCheckCircle} color="green.500" />
                        <Text color={subtextColor}>{feature}</Text>
                      </HStack>
                    ))}
                  </SimpleGrid>
                </Box>

                <Button
                  bg="brand.500"
                  color="white"
                  _hover={{ bg: "brand.600", transform: "translateY(-2px)" }}
                  rightIcon={<FaArrowRight />}
                  size="lg"
                  borderRadius="full"
                  px={8}
                  transition="all 0.3s"
                >
                  Learn More
                </Button>
              </VStack>
            </MotionBox>

            <MotionBox
              key={`image-${activeTab}`}
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Box position="relative">
                <Image
                  src={showcaseItems[activeTab].image}
                  alt={showcaseItems[activeTab].title}
                  borderRadius="2xl"
                  boxShadow="2xl"
                  w="full"
                  h="400px"
                  objectFit="cover"
                  fallback={
                    <Center h="400px" bg="gray.200" borderRadius="2xl">
                      <Spinner size="xl" color="brand.500" />
                    </Center>
                  }
                />

                {/* Overlay with stats */}
                <Box
                  position="absolute"
                  top="4"
                  right="4"
                  bg="whiteAlpha.900"
                  backdropFilter="blur(10px)"
                  p={4}
                  borderRadius="xl"
                  boxShadow="lg"
                >
                  <VStack spacing={2} align="center">
                    <Icon as={FaRocket} w={6} h={6} color="brand.500" />
                    <Text fontSize="sm" fontWeight="600" color="gray.800">
                      Premium Quality
                    </Text>
                  </VStack>
                </Box>
              </Box>
            </MotionBox>
          </SimpleGrid>
        </MotionVStack>
      </Container>
    </Box>
  );
};

// Innovation Section
const InnovationSection = () => {
  const bgColor = useColorModeValue("gray.50", "gray.900");
  const textColor = useColorModeValue("gray.800", "white");
  const subtextColor = useColorModeValue("gray.600", "gray.300");

  const innovations = [
    {
      icon: FaLightbulb,
      title: "Innovative Design",
      description: "Cutting-edge solutions that push industry boundaries",
    },
    {
      icon: FaChartLine,
      title: "Continuous Improvement",
      description: "Always evolving to meet changing market needs",
    },
    {
      icon: FaRocket,
      title: "Future-Ready",
      description: "Solutions designed for tomorrow's challenges",
    },
  ];

  return (
    <Box bg={bgColor} py={20}>
      <Container maxW="7xl">
        <SimpleGrid
          columns={{ base: 1, lg: 2 }}
          spacing={16}
          alignItems="center"
        >
          <MotionVStack
            align="start"
            spacing={8}
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <VStack align="start" spacing={4}>
              <Text
                fontSize="lg"
                fontWeight="bold"
                color="brand.500"
                textTransform="uppercase"
                letterSpacing="wide"
              >
                Innovation & Excellence
              </Text>

              <Heading
                fontSize={{ base: "3xl", md: "4xl" }}
                fontWeight="800"
                color={textColor}
                lineHeight="1.2"
              >
                Pioneering the Future of Cable Management
              </Heading>

              <Text fontSize="xl" color={subtextColor} lineHeight="1.8">
                Our commitment to innovation drives us to develop solutions that
                not only meet today's requirements but anticipate tomorrow's
                needs.
              </Text>
            </VStack>

            <VStack align="start" spacing={6} w="full">
              {innovations.map((innovation, index) => (
                <MotionBox
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  w="full"
                >
                  <HStack align="start" spacing={4}>
                    <Box
                      bg="brand.50"
                      p={3}
                      borderRadius="lg"
                      color="brand.500"
                    >
                      <Icon as={innovation.icon} w={6} h={6} />
                    </Box>
                    <VStack align="start" spacing={2} flex={1}>
                      <Text fontWeight="700" fontSize="lg" color={textColor}>
                        {innovation.title}
                      </Text>
                      <Text color={subtextColor} lineHeight="1.6">
                        {innovation.description}
                      </Text>
                    </VStack>
                  </HStack>
                </MotionBox>
              ))}
            </VStack>
          </MotionVStack>

          <MotionBox
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <Box
              bg="brand.500"
              p={8}
              borderRadius="2xl"
              color="white"
              textAlign="center"
              position="relative"
              overflow="hidden"
            >
              <Box
                position="absolute"
                top="0"
                left="0"
                right="0"
                bottom="0"
                opacity={0.1}
                bgImage="radial-gradient(circle, white 1px, transparent 1px)"
                bgSize="20px 20px"
              />

              <VStack spacing={6} position="relative" zIndex={1}>
                <Icon as={FaAward} w={16} h={16} color="brand.200" />
                <Heading fontSize="2xl" fontWeight="700">
                  Ready to Transform Your Project?
                </Heading>
                <Text fontSize="lg" opacity={0.9} lineHeight="1.7">
                  Join hundreds of satisfied clients who trust us with their
                  cable management needs.
                </Text>
                <Button
                  bg="white"
                  color="brand.600"
                  _hover={{
                    bg: "brand.50",
                    transform: "translateY(-2px)",
                  }}
                  size="lg"
                  rightIcon={<FaArrowRight />}
                  borderRadius="full"
                  px={8}
                  fontWeight="700"
                  transition="all 0.3s"
                >
                  Get Started Today
                </Button>
              </VStack>
            </Box>
          </MotionBox>
        </SimpleGrid>
      </Container>
    </Box>
  );
};

const ProductsAndServicesV2 = () => {
  const sectionBgColor = useColorModeValue("white", "gray.800");

  return (
    <Box>
      {/* Hero Section */}
      <ProductsHero />

      {/* Product Categories */}
      <Box bg={sectionBgColor} py={20}>
        <Container maxW="7xl">
          <MotionVStack
            spacing={12}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <VStack spacing={4} textAlign="center">
              <Text
                fontSize="lg"
                fontWeight="bold"
                color="brand.500"
                textTransform="uppercase"
                letterSpacing="wide"
              >
                Product Categories
              </Text>
              <Heading
                fontSize={{ base: "2xl", md: "3xl" }}
                color={useColorModeValue("gray.800", "white")}
              >
                Comprehensive Solutions for Every Need
              </Heading>
            </VStack>

            <ModernProductCategoriesGrid />
          </MotionVStack>
        </Container>
      </Box>

      {/* Capabilities Section */}
      <CapabilitiesSection />

      {/* Product Showcase */}
      <ProductShowcase />

      {/* Innovation Section */}
      <InnovationSection />

      {/* Floating Action Button */}
      <FloatingActionButton />

      {/* Copyright Footer */}
      <CopyrightFooter />
    </Box>
  );
};

export default ProductsAndServicesV2;
