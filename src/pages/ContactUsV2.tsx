import {
  Box,
  Button,
  Container,
  FormControl,
  FormLabel,
  Heading,
  Icon,
  Input,
  SimpleGrid,
  Text,
  Textarea,
  useColorModeValue,
  useToast,
  VStack,
  HStack,
  Flex,
  Image,
  InputGroup,
  InputLeftElement,
  FormErrorMessage,
} from "@chakra-ui/react";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";
import { useState } from "react";
import { baseURL } from "../services/api-service";
import {
  FaEnvelope,
  FaGlobe,
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaUser,
  FaTag,
  FaComment,
  FaPaperclip,
  FaPaperPlane,
  FaCheckCircle,
  FaClock,
  FaHeadset,
} from "react-icons/fa";
import FloatingActionButton from "../components/FloatingActionButton";
import { CopyrightFooter } from "../components";

const MotionBox = motion(Box);
const MotionVStack = motion(VStack);
const MotionContainer = motion(Container);

// Modern Hero Section
const ContactHero = () => {
  const textColor = useColorModeValue("white", "white");
  const bgGradient = useColorModeValue(
    "linear(135deg, brand.500 0%, brand.600 50%, brand.700 100%)",
    "linear(135deg, brand.600 0%, brand.700 50%, brand.800 100%)"
  );

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
          spacing={8}
          textAlign="center"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <Text
            fontSize="lg"
            fontWeight="bold"
            textTransform="uppercase"
            letterSpacing="wide"
            color="whiteAlpha.900"
          >
            Get In Touch
          </Text>

          <Heading
            fontSize={{ base: "3xl", md: "4xl", lg: "5xl" }}
            fontWeight="800"
            color={textColor}
            lineHeight="1.2"
            maxW="4xl"
          >
            Let's Build Something{" "}
            <Text as="span" color="brand.200">
              Amazing
            </Text>{" "}
            Together
          </Heading>

          <Text
            fontSize={{ base: "lg", md: "xl" }}
            color="whiteAlpha.900"
            maxW="3xl"
            lineHeight="1.8"
          >
            Ready to discuss your next project? Our team of experts is here to
            help you bring your vision to life. Contact us today and let's start
            the conversation.
          </Text>

          <HStack spacing={8} pt={4}>
            <VStack spacing={2}>
              <Icon as={FaClock} w={6} h={6} color="brand.200" />
              <Text fontSize="sm" color="whiteAlpha.800">
                24/7 Support
              </Text>
            </VStack>
            <VStack spacing={2}>
              <Icon as={FaHeadset} w={6} h={6} color="brand.200" />
              <Text fontSize="sm" color="whiteAlpha.800">
                Expert Team
              </Text>
            </VStack>
            <VStack spacing={2}>
              <Icon as={FaCheckCircle} w={6} h={6} color="brand.200" />
              <Text fontSize="sm" color="whiteAlpha.800">
                Quick Response
              </Text>
            </VStack>
          </HStack>
        </MotionVStack>
      </Container>
    </Box>
  );
};

// Modern Contact Form
const ModernContactForm = () => {
  const [file, setFile] = useState<File | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const toast = useToast();

  // Dark mode support
  const formBgColor = useColorModeValue("white", "gray.800");
  const inputBgColor = useColorModeValue("gray.50", "gray.700");
  const borderColor = useColorModeValue("gray.200", "gray.600");
  const textColor = useColorModeValue("gray.800", "white");
  const placeholderColor = useColorModeValue("gray.500", "gray.400");

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }
    if (!formData.subject.trim()) newErrors.subject = "Subject is required";
    if (!formData.message.trim()) newErrors.message = "Message is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors({ ...errors, [name]: "" });
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setLoading(true);

    try {
      const data = new FormData();
      data.append("name", formData.name);
      data.append("email", formData.email);
      data.append("subject", formData.subject);
      data.append("message", formData.message);
      if (file) {
        data.append("attachment", file);
      }

      await axios.post(`${baseURL}/contactus`, data, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      toast({
        title: "Message Sent Successfully! 🎉",
        description: "We'll get back to you within 24 hours.",
        status: "success",
        duration: 5000,
        isClosable: true,
      });

      setFormData({ name: "", email: "", subject: "", message: "" });
      setFile(null);
    } catch {
      toast({
        title: "Oops! Something went wrong",
        description: "Please try again or contact us directly.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <MotionBox
      bg={formBgColor}
      p={8}
      borderRadius="2xl"
      boxShadow="2xl"
      border="1px solid"
      borderColor={borderColor}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
    >
      <VStack spacing={6} as="form" onSubmit={handleSubmit}>
        <VStack spacing={2} w="full" align="start">
          <Heading fontSize="2xl" color={textColor}>
            Send us a Message
          </Heading>
          <Text color={useColorModeValue("gray.600", "gray.300")}>
            Fill out the form below and we'll get back to you soon
          </Text>
        </VStack>

        <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6} w="full">
          <FormControl isInvalid={!!errors.name}>
            <FormLabel color={textColor}>Full Name</FormLabel>
            <InputGroup>
              <InputLeftElement>
                <Icon as={FaUser} color={placeholderColor} />
              </InputLeftElement>
              <Input
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="John Doe"
                bg={inputBgColor}
                borderColor={borderColor}
                focusBorderColor="brand.500"
                _hover={{ borderColor: "brand.300" }}
                pl={12}
              />
            </InputGroup>
            <FormErrorMessage>{errors.name}</FormErrorMessage>
          </FormControl>

          <FormControl isInvalid={!!errors.email}>
            <FormLabel color={textColor}>Email Address</FormLabel>
            <InputGroup>
              <InputLeftElement>
                <Icon as={FaEnvelope} color={placeholderColor} />
              </InputLeftElement>
              <Input
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="john@example.com"
                bg={inputBgColor}
                borderColor={borderColor}
                focusBorderColor="brand.500"
                _hover={{ borderColor: "brand.300" }}
                pl={12}
              />
            </InputGroup>
            <FormErrorMessage>{errors.email}</FormErrorMessage>
          </FormControl>
        </SimpleGrid>

        <FormControl isInvalid={!!errors.subject}>
          <FormLabel color={textColor}>Subject</FormLabel>
          <InputGroup>
            <InputLeftElement>
              <Icon as={FaTag} color={placeholderColor} />
            </InputLeftElement>
            <Input
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              placeholder="Project Inquiry"
              bg={inputBgColor}
              borderColor={borderColor}
              focusBorderColor="brand.500"
              _hover={{ borderColor: "brand.300" }}
              pl={12}
            />
          </InputGroup>
          <FormErrorMessage>{errors.subject}</FormErrorMessage>
        </FormControl>

        <FormControl isInvalid={!!errors.message}>
          <FormLabel color={textColor}>Message</FormLabel>
          <InputGroup>
            <InputLeftElement top={3}>
              <Icon as={FaComment} color={placeholderColor} />
            </InputLeftElement>
            <Textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="Tell us about your project requirements..."
              bg={inputBgColor}
              borderColor={borderColor}
              focusBorderColor="brand.500"
              _hover={{ borderColor: "brand.300" }}
              pl={12}
              rows={6}
              resize="vertical"
            />
          </InputGroup>
          <FormErrorMessage>{errors.message}</FormErrorMessage>
        </FormControl>

        <FormControl>
          <FormLabel color={textColor}>Attachment (Optional)</FormLabel>
          <InputGroup>
            <InputLeftElement>
              <Icon as={FaPaperclip} color={placeholderColor} />
            </InputLeftElement>
            <Input
              type="file"
              accept=".jpeg,.png,.jpg,.gif,.pdf,.doc,.docx"
              onChange={handleFileChange}
              bg={inputBgColor}
              borderColor={borderColor}
              focusBorderColor="brand.500"
              _hover={{ borderColor: "brand.300" }}
              pl={12}
              pt={1}
            />
          </InputGroup>
          <Text fontSize="sm" color={placeholderColor} mt={1}>
            Max file size: 10MB (PDF, DOC, Images)
          </Text>
        </FormControl>

        <Button
          type="submit"
          isLoading={loading}
          loadingText="Sending..."
          bg="brand.500"
          color="white"
          _hover={{
            bg: "brand.600",
            transform: "translateY(-2px)",
            boxShadow: "xl",
          }}
          _active={{ bg: "brand.700" }}
          rightIcon={<FaPaperPlane />}
          size="lg"
          w="full"
          borderRadius="full"
          fontWeight="600"
          py={6}
          transition="all 0.3s"
        >
          Send Message
        </Button>
      </VStack>
    </MotionBox>
  );
};

// Modern Contact Info Cards
const ContactInfoCards = () => {
  const cardBgColor = useColorModeValue("white", "gray.700");
  const borderColor = useColorModeValue("gray.200", "gray.600");
  const textColor = useColorModeValue("gray.800", "white");
  const subtextColor = useColorModeValue("gray.600", "gray.300");

  const contactInfo = [
    {
      icon: FaPhoneAlt,
      title: "Phone",
      value: "+966-55-439-3300",
      description: "Mon-Fri 8AM-6PM",
      color: "green.500",
      href: "tel:+966554393300",
    },
    {
      icon: FaEnvelope,
      title: "Email",
      value: "Sales1@electricalways.com",
      description: "We'll respond within 24 hours",
      color: "blue.500",
      href: "mailto:Sales1@electricalways.com",
    },
    {
      icon: FaMapMarkerAlt,
      title: "Address",
      value: "Industrial Area AL-Mashael",
      description: "14326, Riyadh, Saudi Arabia",
      color: "red.500",
      href: "https://maps.google.com/?q=Industrial+Area+AL-Mashael+Riyadh",
    },
    {
      icon: FaGlobe,
      title: "Website",
      value: "www.electricalways.com",
      description: "Visit our online portfolio",
      color: "purple.500",
      href: "https://www.electricalways.com",
    },
  ];

  return (
    <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing={6}>
      {contactInfo.map((info, index) => (
        <MotionBox
          key={index}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: index * 0.1 }}
          viewport={{ once: true }}
        >
          <Box
            as="a"
            href={info.href}
            target="_blank"
            rel="noopener noreferrer"
            display="block"
            _hover={{ textDecoration: "none" }}
          >
            <VStack
              bg={cardBgColor}
              p={6}
              borderRadius="xl"
              boxShadow="lg"
              border="1px solid"
              borderColor={borderColor}
              _hover={{
                transform: "translateY(-5px)",
                boxShadow: "2xl",
                borderColor: info.color,
              }}
              transition="all 0.3s"
              spacing={4}
              align="start"
              h="full"
            >
              <Box
                bg={`${info.color.split(".")[0]}.50`}
                p={3}
                borderRadius="lg"
                color={info.color}
              >
                <Icon as={info.icon} w={6} h={6} />
              </Box>

              <VStack align="start" spacing={2} flex={1}>
                <Text fontSize="lg" fontWeight="700" color={textColor}>
                  {info.title}
                </Text>
                <Text fontSize="md" fontWeight="600" color={info.color}>
                  {info.value}
                </Text>
                <Text fontSize="sm" color={subtextColor}>
                  {info.description}
                </Text>
              </VStack>
            </VStack>
          </Box>
        </MotionBox>
      ))}
    </SimpleGrid>
  );
};

// Modern Map Section
const ModernMapSection = () => {
  const mapBgColor = useColorModeValue("gray.50", "gray.900");
  const textColor = useColorModeValue("gray.800", "white");

  return (
    <Box bg={mapBgColor} py={20}>
      <Container maxW="7xl">
        <MotionVStack
          spacing={12}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <VStack spacing={4} textAlign="center">
            <Heading fontSize={{ base: "2xl", md: "3xl" }} color={textColor}>
              Visit Our Factory
            </Heading>
            <Text
              fontSize="lg"
              color={useColorModeValue("gray.600", "gray.300")}
              maxW="2xl"
            >
              Located in the heart of Riyadh's industrial district, our
              state-of-the-art facility is equipped with the latest technology
              and machinery.
            </Text>
          </VStack>

          <MotionBox
            w="full"
            borderRadius="2xl"
            overflow="hidden"
            boxShadow="2xl"
            border="1px solid"
            borderColor={useColorModeValue("gray.200", "gray.600")}
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <Box position="relative">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3627.7936026813845!2d46.8615558!3d24.5963183!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e2f053c2b42e365%3A0xa8c75af2d2533ab8!2sElectrical%20Ways%20Factory%20Company%2C%20Supporting%20System%20and%20Fabrication!5e0!3m2!1sen!2snl!4v1725048677653!5m2!1sen!2snl"
                style={{
                  border: 0,
                  height: "400px",
                  width: "100%",
                }}
                allowFullScreen={false}
                aria-hidden="false"
                tabIndex={0}
                title="Electrical Ways Factory Location"
              />

              {/* Map overlay with company info */}
              <Box
                position="absolute"
                top={4}
                left={4}
                bg="whiteAlpha.900"
                backdropFilter="blur(10px)"
                p={4}
                borderRadius="lg"
                boxShadow="lg"
                maxW="300px"
              >
                <VStack align="start" spacing={2}>
                  <Text fontWeight="700" color="gray.800">
                    Electrical Ways Factory
                  </Text>
                  <Text fontSize="sm" color="gray.600">
                    Industrial Area AL-Mashael, Riyadh
                  </Text>
                  <HStack spacing={4} fontSize="xs" color="gray.500">
                    <Text>Open: Mon-Fri 8AM-6PM</Text>
                  </HStack>
                </VStack>
              </Box>
            </Box>
          </MotionBox>
        </MotionVStack>
      </Container>
    </Box>
  );
};

const ContactUsV2 = () => {
  const sectionBgColor = useColorModeValue("white", "gray.800");

  return (
    <Box>
      {/* Hero Section */}
      <ContactHero />

      {/* Contact Info Cards */}
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
                Contact Information
              </Text>
              <Heading
                fontSize={{ base: "2xl", md: "3xl" }}
                color={useColorModeValue("gray.800", "white")}
              >
                Multiple Ways to Reach Us
              </Heading>
            </VStack>

            <ContactInfoCards />
          </MotionVStack>
        </Container>
      </Box>

      {/* Contact Form and Map Section */}
      <Box bg={useColorModeValue("gray.50", "gray.900")} py={20}>
        <Container maxW="7xl">
          <SimpleGrid
            columns={{ base: 1, lg: 2 }}
            spacing={12}
            alignItems="start"
          >
            <ModernContactForm />

            <MotionBox
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <VStack spacing={8} align="start">
                <VStack align="start" spacing={4}>
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
                    fontSize={{ base: "xl", md: "2xl" }}
                    color={useColorModeValue("gray.800", "white")}
                  >
                    Experience Excellence in Every Project
                  </Heading>
                </VStack>

                <VStack align="start" spacing={6}>
                  {[
                    {
                      icon: FaCheckCircle,
                      title: "Quick Response Time",
                      description:
                        "We respond to all inquiries within 24 hours",
                    },
                    {
                      icon: FaHeadset,
                      title: "Expert Consultation",
                      description: "Get advice from our experienced engineers",
                    },
                    {
                      icon: FaClock,
                      title: "24/7 Support",
                      description:
                        "Round-the-clock support for urgent projects",
                    },
                  ].map((feature, index) => (
                    <HStack key={index} align="start" spacing={4}>
                      <Box
                        bg="brand.50"
                        p={2}
                        borderRadius="lg"
                        color="brand.500"
                      >
                        <Icon as={feature.icon} w={5} h={5} />
                      </Box>
                      <VStack align="start" spacing={1}>
                        <Text
                          fontWeight="600"
                          color={useColorModeValue("gray.800", "white")}
                        >
                          {feature.title}
                        </Text>
                        <Text
                          fontSize="sm"
                          color={useColorModeValue("gray.600", "gray.300")}
                        >
                          {feature.description}
                        </Text>
                      </VStack>
                    </HStack>
                  ))}
                </VStack>
              </VStack>
            </MotionBox>
          </SimpleGrid>
        </Container>
      </Box>

      {/* Map Section */}
      <ModernMapSection />

      {/* Floating Action Button */}
      <FloatingActionButton />

      {/* Copyright Footer */}
      <CopyrightFooter />
    </Box>
  );
};

export default ContactUsV2;
