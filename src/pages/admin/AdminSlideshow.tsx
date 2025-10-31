import { DeleteIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Heading,
  HStack,
  IconButton,
  Image,
  Input,
  Text,
  useToast,
  VStack,
  SimpleGrid,
  useColorModeValue,
  Badge,
  Flex,
  Icon,
  Grid,
  GridItem,
  AspectRatio,
  Center,
  Spinner,
} from "@chakra-ui/react";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FaImages, FaImage, FaUpload, FaEye } from "react-icons/fa";
import AdminLayout from "../../components/AdminLayout";
import { baseURL } from "../../services/api-service";

const MotionBox = motion(Box);

interface FooterImage {
  id: number;
  image_path: string;
  alt_text: string;
}

const AdminSlideshow: React.FC = () => {
  const [images, setImages] = useState<FooterImage[]>([]);
  const [newImage, setNewImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [altText, setAltText] = useState<string>("");
  const [uploading, setUploading] = useState(false);
  const [loading, setLoading] = useState(true);
  const toast = useToast();

  // Fetch footer images on component mount
  useEffect(() => {
    fetchImages();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const fetchImages = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${baseURL}/footer-images`);
      setImages(response.data);
    } catch {
      toast({
        title: "Error",
        description: "Failed to fetch images",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await axios.delete(`${baseURL}/footer-images/${id}`, {
        headers: { Authorization: localStorage.getItem("token") },
      });
      toast({
        title: "Success",
        description: "Image deleted successfully",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      // Refresh images after delete
      fetchImages();
    } catch {
      toast({
        title: "Error",
        description: "Failed to delete image",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const handleImageUpload = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!newImage) {
      toast({
        title: "Error",
        description: "Please select an image",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    const formData = new FormData();
    formData.append("image", newImage);
    formData.append("alt_text", altText);

    try {
      setUploading(true);
      await axios.post(`${baseURL}/footer-images`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: localStorage.getItem("token"),
        },
      });
      toast({
        title: "Success",
        description: "Image uploaded successfully",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      setNewImage(null);
      setAltText("");
      setPreview(null); // Clear the preview after upload
      fetchImages(); // Refresh image list
    } catch {
      toast({
        title: "Error",
        description: "Failed to upload image",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    } finally {
      setUploading(false);
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null;
    setNewImage(file);

    if (file) {
      setPreview(URL.createObjectURL(file)); // Set image preview
    } else {
      setPreview(null); // Clear preview if no file is selected
    }
  };

  const cardBg = useColorModeValue("white", "gray.800");
  const borderColor = useColorModeValue("gray.200", "gray.700");
  const textColor = useColorModeValue("gray.800", "white");

  if (loading) {
    return (
      <AdminLayout
        title="Footer Images Management"
        subtitle="Manage slideshow and footer images displayed across the website"
        icon={FaImages}
        breadcrumbs={[
          { label: "Admin", href: "/admin" },
          { label: "Footer Images" },
        ]}
      >
        <Center py={20}>
          <VStack spacing={4}>
            <Spinner size="xl" color="brand.500" thickness="4px" />
            <Text color="gray.500">Loading images...</Text>
          </VStack>
        </Center>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout
      title="Footer Images Management"
      subtitle="Manage slideshow and footer images displayed across the website"
      icon={FaImages}
      breadcrumbs={[
        { label: "Admin", href: "/admin" },
        { label: "Footer Images" },
      ]}
    >
      <VStack spacing={8} w="full">
        {/* Statistics */}
        <MotionBox
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          w="full"
        >
          <SimpleGrid columns={{ base: 1, md: 3 }} spacing={6}>
            <Box
              bg={cardBg}
              p={6}
              borderRadius="xl"
              boxShadow="lg"
              border="1px solid"
              borderColor={borderColor}
            >
              <HStack spacing={4}>
                <Box p={3} bg="brand.100" borderRadius="lg">
                  <Icon as={FaImages} color="brand.600" boxSize={6} />
                </Box>
                <VStack align="start" spacing={1}>
                  <Text fontSize="2xl" fontWeight="bold" color="brand.600">
                    {images.length}
                  </Text>
                  <Text fontSize="sm" color="gray.500">
                    Total Images
                  </Text>
                </VStack>
              </HStack>
            </Box>

            <Box
              bg={cardBg}
              p={6}
              borderRadius="xl"
              boxShadow="lg"
              border="1px solid"
              borderColor={borderColor}
            >
              <HStack spacing={4}>
                <Box p={3} bg="green.100" borderRadius="lg">
                  <Icon as={FaUpload} color="green.600" boxSize={6} />
                </Box>
                <VStack align="start" spacing={1}>
                  <Text fontSize="2xl" fontWeight="bold" color="green.600">
                    {preview ? "1" : "0"}
                  </Text>
                  <Text fontSize="sm" color="gray.500">
                    Ready to Upload
                  </Text>
                </VStack>
              </HStack>
            </Box>

            <Box
              bg={cardBg}
              p={6}
              borderRadius="xl"
              boxShadow="lg"
              border="1px solid"
              borderColor={borderColor}
            >
              <HStack spacing={4}>
                <Box p={3} bg="blue.100" borderRadius="lg">
                  <Icon as={FaEye} color="blue.600" boxSize={6} />
                </Box>
                <VStack align="start" spacing={1}>
                  <Text fontSize="2xl" fontWeight="bold" color="blue.600">
                    {images.filter((img) => img.alt_text).length}
                  </Text>
                  <Text fontSize="sm" color="gray.500">
                    With Alt Text
                  </Text>
                </VStack>
              </HStack>
            </Box>
          </SimpleGrid>
        </MotionBox>

        {/* Upload Section */}
        <MotionBox
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          w="full"
        >
          <Box
            bg={cardBg}
            borderRadius="xl"
            p={8}
            boxShadow="xl"
            border="1px solid"
            borderColor={borderColor}
          >
            <VStack spacing={6}>
              <Box textAlign="center">
                <Heading size="lg" color={textColor} mb={2}>
                  Upload New Image
                </Heading>
                <Text color="gray.500">
                  Add a new footer image to your slideshow collection
                </Text>
              </Box>

              <Box as="form" onSubmit={handleImageUpload} w="full" maxW="2xl">
                <Grid
                  templateColumns={{ base: "1fr", lg: "1fr 1fr" }}
                  gap={8}
                  alignItems="start"
                >
                  {/* Form Section */}
                  <GridItem>
                    <VStack spacing={4}>
                      <FormControl isRequired>
                        <FormLabel color={textColor} fontWeight="semibold">
                          Select Image
                        </FormLabel>
                        <Box
                          border="2px dashed"
                          borderColor={newImage ? "brand.500" : "gray.300"}
                          borderRadius="lg"
                          p={6}
                          textAlign="center"
                          bg={newImage ? "brand.50" : "gray.50"}
                          transition="all 0.2s"
                          position="relative"
                          cursor="pointer"
                          _hover={{ borderColor: "brand.500", bg: "brand.50" }}
                        >
                          <Input
                            type="file"
                            accept="image/*"
                            onChange={handleImageChange}
                            position="absolute"
                            top="0"
                            left="0"
                            width="100%"
                            height="100%"
                            opacity="0"
                            cursor="pointer"
                          />
                          <VStack spacing={3}>
                            <Icon as={FaUpload} boxSize={8} color="brand.500" />
                            <Text fontWeight="semibold" color={textColor}>
                              {newImage
                                ? newImage.name
                                : "Click to upload or drag and drop"}
                            </Text>
                            <Text fontSize="sm" color="gray.500">
                              PNG, JPG, GIF up to 10MB
                            </Text>
                          </VStack>
                        </Box>
                      </FormControl>

                      <FormControl>
                        <FormLabel color={textColor} fontWeight="semibold">
                          Alt Text (Optional)
                        </FormLabel>
                        <Input
                          type="text"
                          value={altText}
                          onChange={(e) => setAltText(e.target.value)}
                          placeholder="Describe the image for accessibility"
                          focusBorderColor="brand.500"
                        />
                      </FormControl>

                      <Button
                        colorScheme="brand"
                        type="submit"
                        width="full"
                        leftIcon={<FaUpload />}
                        size="lg"
                        isLoading={uploading}
                        loadingText="Uploading..."
                        isDisabled={!newImage}
                      >
                        Upload Image
                      </Button>
                    </VStack>
                  </GridItem>

                  {/* Preview Section */}
                  <GridItem>
                    {preview ? (
                      <VStack spacing={3}>
                        <Text fontWeight="semibold" color={textColor}>
                          Preview
                        </Text>
                        <AspectRatio ratio={16 / 9} w="full" maxW="300px">
                          <Image
                            src={preview}
                            alt="Preview"
                            borderRadius="lg"
                            objectFit="cover"
                            border="2px solid"
                            borderColor="brand.200"
                            boxShadow="lg"
                          />
                        </AspectRatio>
                      </VStack>
                    ) : (
                      <Box
                        border="2px dashed"
                        borderColor="gray.300"
                        borderRadius="lg"
                        p={8}
                        textAlign="center"
                        bg="gray.50"
                      >
                        <VStack spacing={3}>
                          <Icon as={FaImage} boxSize={12} color="gray.400" />
                          <Text color="gray.500">
                            Image preview will appear here
                          </Text>
                        </VStack>
                      </Box>
                    )}
                  </GridItem>
                </Grid>
              </Box>
            </VStack>
          </Box>
        </MotionBox>

        {/* Images Gallery */}
        <MotionBox
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          w="full"
        >
          <Box
            bg={cardBg}
            borderRadius="xl"
            p={8}
            boxShadow="xl"
            border="1px solid"
            borderColor={borderColor}
          >
            <Flex align="center" justify="space-between" mb={6}>
              <Box>
                <Heading size="lg" color={textColor} mb={2}>
                  Image Gallery
                </Heading>
                <Text color="gray.500">Manage your existing footer images</Text>
              </Box>
              <Badge size="lg" colorScheme="brand" variant="outline">
                {images.length} Images
              </Badge>
            </Flex>

            {images.length > 0 ? (
              <Grid
                templateColumns={{
                  base: "repeat(1, 1fr)",
                  sm: "repeat(2, 1fr)",
                  md: "repeat(3, 1fr)",
                  lg: "repeat(4, 1fr)",
                }}
                gap={6}
              >
                {images.map((image, index) => (
                  <MotionBox
                    key={image.id}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.4, delay: index * 0.05 }}
                  >
                    <Box
                      borderWidth="1px"
                      borderColor={borderColor}
                      borderRadius="xl"
                      overflow="hidden"
                      _hover={{
                        transform: "translateY(-4px)",
                        boxShadow: "xl",
                      }}
                      transition="all 0.3s"
                      bg={cardBg}
                    >
                      <AspectRatio ratio={16 / 9}>
                        <Image
                          src={image.image_path}
                          alt={image.alt_text || "Footer image"}
                          objectFit="cover"
                        />
                      </AspectRatio>

                      <Box p={4}>
                        <VStack align="start" spacing={2}>
                          <Text
                            fontWeight="semibold"
                            color={textColor}
                            fontSize="sm"
                            noOfLines={2}
                          >
                            {image.alt_text || "No description"}
                          </Text>

                          <HStack justify="space-between" w="full">
                            <Badge
                              colorScheme="blue"
                              variant="subtle"
                              size="sm"
                            >
                              Footer Image
                            </Badge>

                            <IconButton
                              aria-label="Delete Image"
                              icon={<DeleteIcon />}
                              colorScheme="red"
                              variant="ghost"
                              size="sm"
                              onClick={() => handleDelete(image.id)}
                              _hover={{ bg: "red.50" }}
                            />
                          </HStack>
                        </VStack>
                      </Box>
                    </Box>
                  </MotionBox>
                ))}
              </Grid>
            ) : (
              <Box textAlign="center" py={12}>
                <Icon as={FaImage} boxSize={16} color="gray.400" mb={6} />
                <Heading size="md" color="gray.500" mb={2}>
                  No Images Found
                </Heading>
                <Text color="gray.400" mb={6}>
                  Upload your first footer image to get started
                </Text>
                <Button
                  colorScheme="brand"
                  leftIcon={<FaUpload />}
                  onClick={() => {
                    const fileInput = document.querySelector(
                      'input[type="file"]'
                    ) as HTMLInputElement;
                    fileInput?.click();
                  }}
                >
                  Upload First Image
                </Button>
              </Box>
            )}
          </Box>
        </MotionBox>
      </VStack>
    </AdminLayout>
  );
};

export default AdminSlideshow;
