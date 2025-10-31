import {
  Box,
  Container,
  Heading,
  Text,
  useBreakpointValue,
  VStack,
  HStack,
  Button,
  SimpleGrid,
  Icon,
  Image,
  useColorModeValue,
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import { FaArrowRight, FaIndustry, FaCog, FaShieldAlt } from "react-icons/fa";
import CountUp from "react-countup";

import ModernContactSection from "../components/ModernContactSection";
import PartnersMap from "../components/PartnersMap";
import { PartnersMapMobile } from "../components/PartnersMapMobile";
import { ModernProductsSection } from "../components/ModernProductsSection";
import ModernWhyChooseUsSection from "../components/ModernWhyChooseUsSection";
import FloatingActionButton from "../components/FloatingActionButton";
import { CopyrightFooter } from "../components";
import ParticleBackground from "../components/ParticleBackground";
import VideoBackground from "../components/VideoBackground";
import homeOverview1 from "../assets/factory/homeoverview1.webp";
import homeOverview2 from "../assets/factory/3.webp";

const MotionBox = motion(Box);
const MotionVStack = motion(VStack);

// Modern Hero Section
const ModernHero = () => {
  return (
    <Box position="relative" height="100vh" overflow="hidden">
      <VideoBackground />
      <ParticleBackground />

      {/* Hero Overlay Content */}
      <Box
        position="absolute"
        top="0"
        left="0"
        right="0"
        bottom="0"
        bg="blackAlpha.400"
        display="flex"
        alignItems="center"
        justifyContent="center"
        zIndex={3}
      >
        <Container maxW="7xl" textAlign="center">
          <MotionVStack
            spacing={8}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
          >
            <Heading
              fontSize={{ base: "4xl", md: "6xl", lg: "7xl" }}
              fontWeight="900"
              color="white"
              textShadow="2xl"
              lineHeight="1.1"
            >
              ELECTRICAL
              <Text as="span" color="brand.300" display="block">
                WAYS
              </Text>
            </Heading>

            <Text
              fontSize={{ base: "lg", md: "xl", lg: "2xl" }}
              color="whiteAlpha.900"
              maxW="3xl"
              fontWeight="500"
              textShadow="lg"
            >
              Leading manufacturer of Cable Management Systems since 2003,
              delivering excellence across the Kingdom
            </Text>

            <HStack spacing={6} pt={4} justifyContent="center">
              <Button
                size="lg"
                bg="brand.500"
                color="white"
                _hover={{ bg: "brand.600", transform: "translateY(-2px)" }}
                rightIcon={<FaArrowRight />}
                px={8}
                py={6}
                fontSize="lg"
                borderRadius="full"
                boxShadow="2xl"
                transition="all 0.3s"
                onClick={() => {
                  document.getElementById("products-section")?.scrollIntoView({
                    behavior: "smooth",
                  });
                }}
              >
                Explore Products
              </Button>
            </HStack>
          </MotionVStack>
        </Container>
      </Box>

      {/* Scroll Indicator */}
      {/* <Box
        position="absolute"
        bottom="8"
        left="50%"
        transform="translateX(-50%)"
        zIndex={2}
      >
        <MotionBox
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <Box
            w="2px"
            h="12"
            bg="white"
            mx="auto"
            borderRadius="full"
            opacity={0.7}
          />
        </MotionBox>
      </Box> */}
    </Box>
  );
};

// Modern Stats Section
const ModernStats = () => {
  const stats = [
    { value: 21, label: "Years of Experience", icon: FaIndustry },
    { value: 50, label: "Clients in the Kingdom", icon: FaCog },
    { value: 100, label: "Projects Completed", icon: FaShieldAlt },
  ];

  const bgGradient = useColorModeValue(
    "linear(to-r, brand.50, brand.100)",
    "linear(to-r, gray.900, gray.800)"
  );

  const cardBgColor = useColorModeValue("white", "gray.700");
  const textColor = useColorModeValue("gray.600", "gray.300");

  return (
    <Box bg={bgGradient} py={20}>
      <Container maxW="7xl">
        <SimpleGrid columns={{ base: 1, md: 3 }} spacing={8}>
          {stats.map((stat, index) => (
            <MotionBox
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              viewport={{ once: true }}
            >
              <VStack
                bg={cardBgColor}
                p={8}
                borderRadius="2xl"
                boxShadow="xl"
                _hover={{
                  transform: "translateY(-5px)",
                  boxShadow: "2xl",
                }}
                transition="all 0.3s"
                spacing={4}
              >
                <Icon as={stat.icon} w={12} h={12} color="brand.500" />
                <HStack>
                  <CountUp
                    end={stat.value}
                    duration={3}
                    enableScrollSpy
                    style={{
                      fontSize: "3rem",
                      fontWeight: "bold",
                      color: "#31639e",
                    }}
                  />
                  <Text fontSize="3xl" fontWeight="bold" color="brand.500">
                    +
                  </Text>
                </HStack>
                <Text
                  fontSize="lg"
                  fontWeight="semibold"
                  textAlign="center"
                  color={textColor}
                >
                  {stat.label}
                </Text>
              </VStack>
            </MotionBox>
          ))}
        </SimpleGrid>
      </Container>
    </Box>
  );
};

// Modern About Section
const ModernAbout = () => {
  return (
    <Container maxW="7xl" py={20}>
      <SimpleGrid columns={{ base: 1, lg: 2 }} spacing={16} alignItems="center">
        {/* Images Section */}
        <MotionBox
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <Box position="relative">
            <Image
              src={homeOverview2}
              alt="Factory Overview"
              borderRadius="2xl"
              boxShadow="2xl"
              w="full"
              h="300px"
              objectFit="cover"
            />

            <Box
              position="absolute"
              bottom="-20px"
              right="-20px"
              w="200px"
              h="200px"
              borderRadius="2xl"
              overflow="hidden"
              boxShadow="2xl"
              border="4px solid white"
            >
              <Image
                src={homeOverview1}
                alt="Manufacturing Process"
                w="full"
                h="full"
                objectFit="cover"
              />
            </Box>

            {/* Experience Badge */}
            <Box
              position="absolute"
              top="-20px"
              left="-20px"
              bg="brand.500"
              color="white"
              p={6}
              borderRadius="2xl"
              boxShadow="xl"
              textAlign="center"
            >
              <Text fontSize="3xl" fontWeight="bold">
                21+
              </Text>
              <Text fontSize="sm" fontWeight="semibold">
                Years
              </Text>
            </Box>
          </Box>
        </MotionBox>

        {/* Content Section */}
        <MotionBox
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <VStack align="start" spacing={6}>
            <Text
              fontSize="lg"
              fontWeight="bold"
              color="brand.500"
              textTransform="uppercase"
              letterSpacing="wide"
            >
              Who We Are
            </Text>

            <Heading
              fontSize={{ base: "3xl", md: "4xl", lg: "5xl" }}
              lineHeight="1.2"
              fontWeight="800"
            >
              Best Quality Cable Management Systems
            </Heading>

            <Text fontSize="xl" color="gray.600" lineHeight="1.8">
              Electrical Ways is a leading manufacturer in Cable Management
              Systems and has been a prominent name in the industry since 2003,
              with roots and experience dating back to 1991.
            </Text>

            <Text fontSize="lg" color="gray.600" lineHeight="1.7">
              We proudly offer a comprehensive range of cable tray solutions to
              meet the diverse needs of our customers. In addition, we
              specialize in various steel fabrications, providing custom
              solutions to fulfill any requirements for contractors on sites and
              projects.
            </Text>

            <Button
              size="lg"
              bg="brand.500"
              color="white"
              _hover={{ bg: "brand.600" }}
              rightIcon={<FaArrowRight />}
              px={8}
              py={6}
              borderRadius="full"
              mt={4}
            >
              Learn More
            </Button>
          </VStack>
        </MotionBox>
      </SimpleGrid>
    </Container>
  );
};

const HomePageV2: React.FC = () => {
  const isMobile = useBreakpointValue({ base: true, lg: false });

  return (
    <Box>
      {/* Modern Hero Section */}
      <ModernHero />

      {/* Projects Map Section */}
      <Box py={20} bg={useColorModeValue("gray.50", "gray.900")}>
        <Container maxW="7xl" textAlign="center">
          <MotionVStack
            spacing={8}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <Heading
              fontSize={{ base: "3xl", md: "4xl", lg: "5xl" }}
              fontWeight="800"
              color={useColorModeValue("gray.800", "white")}
            >
              Our Projects Across The Region
            </Heading>
            {!isMobile ? <PartnersMap /> : <PartnersMapMobile />}
          </MotionVStack>
        </Container>
      </Box>

      {/* Modern About Section */}
      <ModernAbout />

      {/* Modern Stats Section */}
      <ModernStats />

      {/* Products Section */}
      <Box id="products-section">
        <ModernProductsSection />
      </Box>

      {/* Contact Section */}
      <ModernContactSection />

      {/* Why Choose Us Section */}
      <ModernWhyChooseUsSection />

      {/* Floating Action Button */}
      <FloatingActionButton />

      {/* Copyright Footer */}
      <CopyrightFooter />
    </Box>
  );
};

export default HomePageV2;
