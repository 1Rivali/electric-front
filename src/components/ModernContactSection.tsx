import {
  Box,
  Button,
  Container,
  Heading,
  Text,
  VStack,
  HStack,
  Icon,
  useColorModeValue,
  SimpleGrid,
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  FaPhone,
  FaEnvelope,
  FaMapMarkerAlt,
  FaArrowRight,
} from "react-icons/fa";

const MotionBox = motion(Box);
const MotionVStack = motion(VStack);

const ModernContactSection = () => {
  const bgGradient = useColorModeValue(
    "linear(135deg, brand.500 0%, brand.600 50%, brand.700 100%)",
    "linear(135deg, brand.600 0%, brand.700 50%, brand.800 100%)"
  );

  const cardBgColor = useColorModeValue("whiteAlpha.100", "blackAlpha.300");
  const cardBorderColor = useColorModeValue("whiteAlpha.200", "whiteAlpha.100");
  const cardHoverBgColor = useColorModeValue(
    "whiteAlpha.200",
    "blackAlpha.400"
  );
  const iconBgColor = useColorModeValue("whiteAlpha.200", "whiteAlpha.300");
  const buttonBorderColor = useColorModeValue(
    "whiteAlpha.300",
    "whiteAlpha.400"
  );

  const contactInfo = [
    {
      icon: FaPhone,
      title: "Call Us",
      description: "Ready to help you 24/7",
      action: "Call Now",
    },
    {
      icon: FaEnvelope,
      title: "Email Us",
      description: "Get in touch via email",
      action: "Send Email",
    },
    {
      icon: FaMapMarkerAlt,
      title: "Visit Us",
      description: "Come see our facilities",
      action: "Get Directions",
    },
  ];

  return (
    <Box bgGradient={bgGradient} py={20} position="relative" overflow="hidden">
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
        <MotionVStack
          spacing={16}
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          {/* Header */}
          <VStack spacing={6} textAlign="center" color="white">
            <Text
              fontSize="lg"
              fontWeight="bold"
              textTransform="uppercase"
              letterSpacing="wide"
              opacity={0.9}
            >
              Contact Us
            </Text>

            <Heading
              fontSize={{ base: "3xl", md: "4xl", lg: "5xl" }}
              fontWeight="800"
              lineHeight="1.2"
              maxW="4xl"
            >
              Connect with{" "}
              <Text as="span" color="brand.200">
                Electrical Ways
              </Text>{" "}
              Today
            </Heading>

            <Text
              fontSize={{ base: "lg", md: "xl" }}
              opacity={0.9}
              maxW="3xl"
              lineHeight="1.8"
            >
              Ready to discuss your steel fabrication and cable management
              requirements? We're just one click away from fulfilling your
              needs.
            </Text>
          </VStack>

          {/* Contact Cards */}
          <SimpleGrid columns={{ base: 1, md: 3 }} spacing={8} w="full">
            {contactInfo.map((info, index) => (
              <MotionBox
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <VStack
                  bg={cardBgColor}
                  backdropFilter="blur(10px)"
                  p={8}
                  borderRadius="2xl"
                  border="1px solid"
                  borderColor={cardBorderColor}
                  _hover={{
                    transform: "translateY(-5px)",
                    bg: cardHoverBgColor,
                  }}
                  transition="all 0.3s"
                  spacing={6}
                  color="white"
                >
                  <Box bg={iconBgColor} p={4} borderRadius="full">
                    <Icon as={info.icon} w={8} h={8} />
                  </Box>

                  <VStack spacing={2} textAlign="center">
                    <Heading fontSize="xl" fontWeight="700">
                      {info.title}
                    </Heading>
                    <Text opacity={0.8} fontSize="md">
                      {info.description}
                    </Text>
                  </VStack>

                  <Button
                    variant="outline"
                    borderColor={buttonBorderColor}
                    color="white"
                    _hover={{
                      bg: cardHoverBgColor,
                      borderColor: "white",
                    }}
                    size="sm"
                  >
                    {info.action}
                  </Button>
                </VStack>
              </MotionBox>
            ))}
          </SimpleGrid>

          {/* Main CTA */}
          <MotionBox
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <VStack spacing={6}>
              <Link to="/contact">
                <Button
                  size="xl"
                  bg="white"
                  color="brand.600"
                  _hover={{
                    bg: "brand.50",
                    transform: "translateY(-2px)",
                    boxShadow: "2xl",
                  }}
                  rightIcon={<FaArrowRight />}
                  px={12}
                  py={8}
                  fontSize="xl"
                  fontWeight="bold"
                  borderRadius="full"
                  boxShadow="2xl"
                  transition="all 0.3s"
                >
                  Contact Us Now
                </Button>
              </Link>

              <Text color="whiteAlpha.800" fontSize="sm">
                Response time: Within 24 hours
              </Text>
            </VStack>
          </MotionBox>
        </MotionVStack>
      </Container>
    </Box>
  );
};

export default ModernContactSection;
