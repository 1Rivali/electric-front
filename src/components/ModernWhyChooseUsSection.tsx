import {
  Box,
  Container,
  Heading,
  Text,
  VStack,
  HStack,
  Icon,
  SimpleGrid,
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Image,
  useColorModeValue,
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import {
  FaAward,
  FaCog,
  FaShieldAlt,
  FaUsers,
  FaIndustry,
  FaCertificate,
} from "react-icons/fa";

import useWhyChooseUs from "../hooks/useWhyChooseUs";
import useFooterImages from "../hooks/useFooterImages";
import LogoLoader from "./LogoLoader";

const MotionBox = motion(Box);
const MotionVStack = motion(VStack);

const ModernWhyChooseUsSection = () => {
  const { data: reasons, isLoading, error } = useWhyChooseUs();
  const { data: footerImages } = useFooterImages();

  const bgGradient = useColorModeValue(
    "linear(to-br, gray.50, white)",
    "linear(to-br, gray.900, gray.800)"
  );

  const textColor = useColorModeValue("gray.800", "white");
  const subtextColor = useColorModeValue("gray.600", "gray.300");
  const cardBgColor = useColorModeValue("white", "gray.700");
  const cardBorderColor = useColorModeValue("gray.100", "gray.600");
  const cardHoverBorderColor = useColorModeValue("brand.200", "brand.400");
  const accordionBgColor = useColorModeValue("white", "gray.700");
  const accordionHoverBgColor = useColorModeValue("gray.50", "gray.600");
  const accordionExpandedBgColor = useColorModeValue("brand.50", "brand.800");
  const accordionExpandedTextColor = useColorModeValue(
    "brand.700",
    "brand.200"
  );
  const accordionBorderColor = useColorModeValue("gray.100", "gray.600");

  const features = [
    {
      icon: FaAward,
      title: "Quality Excellence",
      description: "ISO certified manufacturing processes",
    },
    {
      icon: FaCog,
      title: "Custom Solutions",
      description: "Tailored to your specific requirements",
    },
    {
      icon: FaShieldAlt,
      title: "Reliable Products",
      description: "Built to last with premium materials",
    },
    {
      icon: FaUsers,
      title: "Expert Support",
      description: "Dedicated team for all your needs",
    },
    {
      icon: FaIndustry,
      title: "Industry Leader",
      description: "21+ years of proven experience",
    },
    {
      icon: FaCertificate,
      title: "Certified Quality",
      description: "Meeting international standards",
    },
  ];

  if (isLoading) {
    return <LogoLoader text="Loading why choose us content..." size="xl" />;
  }

  if (error) {
    return (
      <Container maxW="7xl" py={20}>
        <Text color="red.500" textAlign="center">
          Error loading content: {error}
        </Text>
      </Container>
    );
  }

  return (
    <Box bg={bgGradient} py={20}>
      <Container maxW="7xl">
        <MotionVStack
          spacing={16}
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          {/* Header Section */}
          <VStack spacing={6} textAlign="center">
            <Text
              fontSize="lg"
              fontWeight="bold"
              color="brand.500"
              textTransform="uppercase"
              letterSpacing="wide"
            >
              Why Choose Us
            </Text>

            <Heading
              fontSize={{ base: "3xl", md: "4xl", lg: "5xl" }}
              fontWeight="800"
              lineHeight="1.2"
              maxW="4xl"
              color={textColor}
            >
              We Strive to Maintain Quality Standards to the Best
            </Heading>

            <Text
              fontSize={{ base: "lg", md: "xl" }}
              color={subtextColor}
              lineHeight="1.8"
              maxW="3xl"
            >
              With over two decades of experience, we've built our reputation on
              delivering excellence in every project we undertake.
            </Text>
          </VStack>

          {/* Features Grid */}
          <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={8} w="full">
            {features.map((feature, index) => (
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
                  borderColor={cardBorderColor}
                  _hover={{
                    transform: "translateY(-5px)",
                    boxShadow: "2xl",
                    borderColor: cardHoverBorderColor,
                  }}
                  transition="all 0.3s"
                  spacing={6}
                  align="start"
                  h="full"
                >
                  <Box bg="brand.50" p={4} borderRadius="xl" color="brand.500">
                    <Icon as={feature.icon} w={8} h={8} />
                  </Box>

                  <VStack align="start" spacing={3}>
                    <Heading fontSize="xl" fontWeight="700" color={textColor}>
                      {feature.title}
                    </Heading>
                    <Text color={subtextColor} lineHeight="1.6">
                      {feature.description}
                    </Text>
                  </VStack>
                </VStack>
              </MotionBox>
            ))}
          </SimpleGrid>

          {/* Detailed Reasons Accordion */}
          {reasons && reasons.length > 0 && (
            <MotionBox
              w="full"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              viewport={{ once: true }}
            >
              <VStack spacing={8}>
                <Heading
                  fontSize={{ base: "2xl", md: "3xl" }}
                  textAlign="center"
                  fontWeight="700"
                >
                  Learn More About Our Approach
                </Heading>

                <Box
                  bg={accordionBgColor}
                  borderRadius="2xl"
                  boxShadow="xl"
                  overflow="hidden"
                  w="full"
                  maxW="4xl"
                  mx="auto"
                >
                  <Accordion allowToggle>
                    {reasons.map((reason, index) => (
                      <AccordionItem
                        key={index}
                        border="none"
                        borderBottom="1px solid"
                        borderBottomColor={accordionBorderColor}
                      >
                        <AccordionButton
                          py={6}
                          px={8}
                          _hover={{ bg: accordionHoverBgColor }}
                          _expanded={{
                            bg: accordionExpandedBgColor,
                            color: accordionExpandedTextColor,
                          }}
                          transition="all 0.3s"
                        >
                          <Box
                            flex="1"
                            textAlign="left"
                            fontWeight="bold"
                            fontSize={{ base: "lg", md: "xl" }}
                          >
                            {reason.title}
                          </Box>
                          <AccordionIcon />
                        </AccordionButton>

                        <AccordionPanel
                          pb={6}
                          px={8}
                          color={subtextColor}
                          fontSize="lg"
                          lineHeight="1.7"
                        >
                          {reason.description}
                        </AccordionPanel>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </Box>
              </VStack>
            </MotionBox>
          )}

          {/* Image Slideshow */}
          {footerImages && footerImages.length > 0 && (
            <MotionBox
              w="full"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              viewport={{ once: true }}
            >
              <VStack spacing={8}>
                <Heading
                  fontSize={{ base: "2xl", md: "3xl" }}
                  textAlign="center"
                  fontWeight="700"
                >
                  Our Work in Action
                </Heading>

                <Box
                  w="full"
                  borderRadius="2xl"
                  overflow="hidden"
                  boxShadow="2xl"
                >
                  <Swiper
                    modules={[Navigation, Pagination, Autoplay]}
                    spaceBetween={0}
                    slidesPerView={1}
                    navigation
                    pagination={{ clickable: true }}
                    autoplay={{ delay: 4000, disableOnInteraction: false }}
                    loop={true}
                    style={
                      {
                        "--swiper-navigation-color": "#31639e",
                        "--swiper-pagination-color": "#31639e",
                      } as any
                    }
                  >
                    {footerImages.map((image) => (
                      <SwiperSlide key={image.id}>
                        <Box position="relative">
                          <Image
                            src={image.image_path}
                            alt={image.alt_text}
                            objectFit="cover"
                            w="100%"
                            h={{ base: "300px", md: "500px" }}
                          />
                          <Box
                            position="absolute"
                            bottom="0"
                            left="0"
                            right="0"
                            bg="blackAlpha.600"
                            color="white"
                            p={6}
                          >
                            <Text
                              fontSize="lg"
                              fontWeight="semibold"
                              textAlign="center"
                            >
                              {image.alt_text}
                            </Text>
                          </Box>
                        </Box>
                      </SwiperSlide>
                    ))}
                  </Swiper>
                </Box>
              </VStack>
            </MotionBox>
          )}
        </MotionVStack>
      </Container>
    </Box>
  );
};

export default ModernWhyChooseUsSection;
