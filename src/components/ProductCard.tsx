import {
  Box,
  Button,
  Heading,
  IconButton,
  Image,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  SimpleGrid,
  Text,
  useColorModeValue,
  useDisclosure,
  Fade,
  VStack,
  HStack,
  Badge,
  Icon,
  Center,
  Spinner,
} from "@chakra-ui/react";
import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";
import {
  FaEye,
  FaTimes,
  FaImage,
  FaInfoCircle,
  FaRuler,
  FaStar,
} from "react-icons/fa";
import { motion } from "framer-motion";
import { Product } from "../hooks/useProducts";
import { assetsBaseURL } from "../services/api-service";
import { useState } from "react";

const MotionBox = motion(Box);

const ProductCard = ({ product }: { product: Product }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [isImageVisible, setIsImageVisible] = useState(true);

  // Modern color scheme
  const cardBg = useColorModeValue("white", "gray.800");
  const cardBorder = useColorModeValue("gray.200", "gray.600");
  const textColor = useColorModeValue("gray.800", "white");
  const subtextColor = useColorModeValue("gray.600", "gray.300");
  const modalBg = useColorModeValue("white", "gray.800");
  const modalBorder = useColorModeValue("gray.200", "gray.600");
  const overlayBg = useColorModeValue("blackAlpha.600", "blackAlpha.800");

  const images = product.product_images;

  const handleImageChange = (index: number) => {
    setIsImageVisible(false); // Start fade-out animation
    setTimeout(() => {
      setSelectedImageIndex(index); // Change the image index
      setIsImageVisible(true); // Start fade-in animation
    }, 300); // Match this timeout with the fade-out duration
  };

  const handleNextImage = () => {
    const nextIndex = (selectedImageIndex + 1) % images.length; // Loop to the first image if at the end
    handleImageChange(nextIndex);
  };

  const handlePreviousImage = () => {
    const prevIndex = (selectedImageIndex - 1 + images.length) % images.length; // Loop to the last image if at the beginning
    handleImageChange(prevIndex);
  };

  return (
    <MotionBox whileHover={{ y: -4 }} transition={{ duration: 0.3 }}>
      <Box
        bg={cardBg}
        borderRadius="2xl"
        border="1px solid"
        borderColor={cardBorder}
        overflow="hidden"
        boxShadow="lg"
        _hover={{
          boxShadow: "2xl",
          borderColor: "brand.300",
        }}
        transition="all 0.3s"
        h="full"
      >
        {/* Product Image Container */}
        <Box position="relative" overflow="hidden">
          <Image
            src={
              images.length > 0
                ? `${assetsBaseURL}/${images[0].image_path}`
                : ``
            }
            alt={product.title}
            h="240px"
            w="full"
            objectFit="contain"
            bg={useColorModeValue("gray.50", "gray.700")}
            fallback={
              <Center h="240px" bg={useColorModeValue("gray.100", "gray.700")}>
                <Spinner color="brand.500" />
              </Center>
            }
          />

          {/* Product Badge */}
          <Box
            position="absolute"
            top="3"
            right="3"
            bg="brand.500"
            color="white"
            px={3}
            py={1}
            borderRadius="full"
            fontSize="sm"
            fontWeight="600"
          >
            <Icon as={FaImage} mr={1} />
            {images.length} Images
          </Box>
        </Box>

        {/* Product Details */}
        <VStack p={6} align="start" spacing={4}>
          <VStack align="start" spacing={2} w="full">
            <Heading fontSize="lg" color={textColor} noOfLines={2}>
              {product.title}
            </Heading>
            {product.serial_number && (
              <Badge colorScheme="gray" borderRadius="full" px={2}>
                {product.serial_number}
              </Badge>
            )}
            <Text fontSize="sm" color={subtextColor} noOfLines={3}>
              {product.description}
            </Text>
          </VStack>

          <Button
            bg="brand.500"
            color="white"
            _hover={{ bg: "brand.600" }}
            _active={{ bg: "brand.700" }}
            rightIcon={<FaEye />}
            borderRadius="full"
            w="full"
            size="md"
            onClick={onOpen}
          >
            View Details
          </Button>
        </VStack>
      </Box>

      {/* Modern Modal for Product Details */}
      <Modal isOpen={isOpen} onClose={onClose} size="6xl" isCentered>
        <ModalOverlay bg={overlayBg} backdropFilter="blur(4px)" />
        <ModalContent
          bg={modalBg}
          borderRadius="2xl"
          border="1px solid"
          borderColor={modalBorder}
          boxShadow="2xl"
          m={4}
          maxH="90vh"
          overflowY="auto"
        >
          <ModalHeader p={8} pb={0}>
            <HStack justify="space-between" align="start">
              <VStack align="start" spacing={3}>
                <HStack spacing={3}>
                  <Box bg="brand.500" p={2} borderRadius="lg" color="white">
                    <Icon as={FaInfoCircle} w={5} h={5} />
                  </Box>
                  <Heading fontSize="2xl" color={textColor} fontWeight="700">
                    {product.title}
                  </Heading>
                </HStack>
                {product.serial_number && (
                  <Badge colorScheme="brand" px={3} py={1} borderRadius="full">
                    Serial: {product.serial_number}
                  </Badge>
                )}
              </VStack>
              <IconButton
                aria-label="Close"
                icon={<FaTimes />}
                variant="ghost"
                colorScheme="gray"
                onClick={onClose}
                borderRadius="full"
              />
            </HStack>
          </ModalHeader>

          <ModalBody p={8}>
            <SimpleGrid columns={{ base: 1, lg: 2 }} spacing={8}>
              {/* Image Gallery Section */}
              <VStack spacing={6}>
                {/* Main Image */}
                <Box
                  position="relative"
                  w="full"
                  bg={useColorModeValue("gray.50", "gray.700")}
                  borderRadius="xl"
                  overflow="hidden"
                  border="1px solid"
                  borderColor={cardBorder}
                >
                  <Fade in={isImageVisible}>
                    <Image
                      src={
                        images.length > 0
                          ? `${assetsBaseURL}/${images[selectedImageIndex].image_path}`
                          : ""
                      }
                      objectFit="contain"
                      alt={product.title}
                      w="full"
                      h="400px"
                      fallback={
                        <Center h="400px">
                          <Spinner color="brand.500" />
                        </Center>
                      }
                    />
                  </Fade>

                  {/* Navigation Buttons */}
                  {images.length > 1 && (
                    <>
                      <IconButton
                        aria-label="Previous image"
                        icon={<ChevronLeftIcon fontSize="2xl" />}
                        position="absolute"
                        left="4"
                        top="50%"
                        transform="translateY(-50%)"
                        onClick={handlePreviousImage}
                        bg="whiteAlpha.900"
                        color="brand.500"
                        _hover={{ bg: "white" }}
                        borderRadius="full"
                        size="lg"
                      />
                      <IconButton
                        aria-label="Next image"
                        icon={<ChevronRightIcon fontSize="2xl" />}
                        position="absolute"
                        right="4"
                        top="50%"
                        transform="translateY(-50%)"
                        onClick={handleNextImage}
                        bg="whiteAlpha.900"
                        color="brand.500"
                        _hover={{ bg: "white" }}
                        borderRadius="full"
                        size="lg"
                      />
                    </>
                  )}

                  {/* Image Counter */}
                  <Box
                    position="absolute"
                    top="4"
                    right="4"
                    bg="blackAlpha.700"
                    color="white"
                    px={3}
                    py={1}
                    borderRadius="full"
                    fontSize="sm"
                  >
                    {selectedImageIndex + 1} / {images.length}
                  </Box>
                </Box>

                {/* Thumbnail Gallery */}
                {images.length > 1 && (
                  <SimpleGrid columns={5} spacing={3} w="full">
                    {images.map((image, index) => (
                      <MotionBox
                        key={index}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <Box
                          border="2px solid"
                          borderColor={
                            index === selectedImageIndex
                              ? "brand.500"
                              : cardBorder
                          }
                          borderRadius="lg"
                          overflow="hidden"
                          cursor="pointer"
                          onClick={() => handleImageChange(index)}
                          _hover={{ borderColor: "brand.300" }}
                          transition="all 0.2s"
                        >
                          <Image
                            src={`${assetsBaseURL}/${image.image_path}`}
                            objectFit="contain"
                            alt={product.title}
                            w="full"
                            h="60px"
                            bg={useColorModeValue("gray.50", "gray.700")}
                          />
                        </Box>
                      </MotionBox>
                    ))}
                  </SimpleGrid>
                )}
              </VStack>

              {/* Product Information Section */}
              <VStack spacing={6} align="stretch">
                {/* Product Description */}
                <Box
                  bg={useColorModeValue("gray.50", "gray.700")}
                  p={6}
                  borderRadius="xl"
                  border="1px solid"
                  borderColor={cardBorder}
                >
                  <HStack spacing={3} mb={4}>
                    <Icon as={FaInfoCircle} color="brand.500" />
                    <Heading fontSize="lg" color={textColor}>
                      Description
                    </Heading>
                  </HStack>
                  <Text color={subtextColor} lineHeight="1.8">
                    {product.description || "No description available."}
                  </Text>
                </Box>

                {/* Dimensions */}
                {product.dimensions && (
                  <Box
                    bg={useColorModeValue("gray.50", "gray.700")}
                    p={6}
                    borderRadius="xl"
                    border="1px solid"
                    borderColor={cardBorder}
                  >
                    <HStack spacing={3} mb={4}>
                      <Icon as={FaRuler} color="brand.500" />
                      <Heading fontSize="lg" color={textColor}>
                        Dimensions
                      </Heading>
                    </HStack>
                    <Text color={subtextColor} lineHeight="1.8">
                      {product.dimensions}
                    </Text>
                  </Box>
                )}

                {/* Key Features */}
                {product.key_features && (
                  <Box
                    bg={useColorModeValue("gray.50", "gray.700")}
                    p={6}
                    borderRadius="xl"
                    border="1px solid"
                    borderColor={cardBorder}
                  >
                    <HStack spacing={3} mb={4}>
                      <Icon as={FaStar} color="brand.500" />
                      <Heading fontSize="lg" color={textColor}>
                        Key Features
                      </Heading>
                    </HStack>
                    <Text
                      color={subtextColor}
                      lineHeight="1.8"
                      whiteSpace="pre-line"
                    >
                      {product.key_features}
                    </Text>
                  </Box>
                )}
              </VStack>
            </SimpleGrid>
          </ModalBody>

          <ModalFooter p={8} pt={0}>
            <HStack spacing={4} w="full">
              <Button
                bg="brand.500"
                color="white"
                _hover={{ bg: "brand.600" }}
                _active={{ bg: "brand.700" }}
                onClick={onClose}
                borderRadius="full"
                size="lg"
                flex={1}
              >
                Close
              </Button>
            </HStack>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </MotionBox>
  );
};

export default ProductCard;
