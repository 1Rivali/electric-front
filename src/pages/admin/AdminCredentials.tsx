import { DeleteIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Divider,
  FormControl,
  FormLabel,
  Heading,
  HStack,
  IconButton,
  Text,
  useToast,
  VStack,
  Input,
  SimpleGrid,
  useColorModeValue,
  Badge,
  Flex,
  Icon,
} from "@chakra-ui/react";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FaCertificate, FaFilePdf, FaPlus } from "react-icons/fa";
import AdminLayout from "../../components/AdminLayout";
import { assetsBaseURL, baseURL } from "../../services/api-service";

const MotionBox = motion(Box);

interface Credential {
  id: number;
  title: string;
  pdf_file: string;
}

const AdminCredentials: React.FC = () => {
  const [credentials, setCredentials] = useState<Credential[]>([]);
  const [newTitle, setNewTitle] = useState<string>("");
  const [newFile, setNewFile] = useState<File | null>(null);
  const toast = useToast();

  useEffect(() => {
    fetchCredentials();
  }, []);

  const fetchCredentials = async () => {
    try {
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
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await axios.delete(`${baseURL}/credentials/${id}`, {
        headers: { Authorization: localStorage.getItem("token") },
      });
      toast({
        title: "Success",
        description: "Credential deleted successfully",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      fetchCredentials();
    } catch {
      toast({
        title: "Error",
        description: "Failed to delete credential",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const handleCredentialSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!newTitle || !newFile) {
      toast({
        title: "Error",
        description: "Please fill out all fields",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    const formData = new FormData();
    formData.append("title", newTitle);
    formData.append("pdf_file", newFile);

    try {
      await axios.post(`${baseURL}/credentials`, formData, {
        headers: {
          Authorization: localStorage.getItem("token"),
          "Content-Type": "multipart/form-data",
        },
      });
      toast({
        title: "Success",
        description: "Credential added successfully",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      setNewTitle("");
      setNewFile(null);
      fetchCredentials();
    } catch {
      toast({
        title: "Error",
        description: "Failed to add credential",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const cardBg = useColorModeValue("white", "gray.800");
  const borderColor = useColorModeValue("gray.200", "gray.700");
  const hoverBg = useColorModeValue("gray.50", "gray.700");
  const textColor = useColorModeValue("gray.800", "white");

  return (
    <AdminLayout
      title="Credentials Management"
      subtitle="Manage company certifications and credential documents"
      icon={FaCertificate}
      breadcrumbs={[
        { label: "Admin", href: "/admin" },
        { label: "Credentials" }
      ]}
    >
      <SimpleGrid columns={{ base: 1, lg: 2 }} spacing={8} w="full">
        {/* Add New Credential Form */}
        <MotionBox
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <Box
            bg={cardBg}
            borderRadius="xl"
            p={6}
            boxShadow="lg"
            border="1px solid"
            borderColor={borderColor}
            h="fit-content"
          >
            <Flex align="center" mb={6}>
              <Icon as={FaPlus} mr={3} color="brand.500" />
              <Heading as="h3" size="lg" color={textColor}>
                Add New Credential
              </Heading>
            </Flex>
            
            <Box as="form" onSubmit={handleCredentialSubmit} w="100%">
              <VStack spacing={4}>
                <FormControl isRequired>
                  <FormLabel color={textColor}>Title</FormLabel>
                  <Input
                    type="text"
                    value={newTitle}
                    onChange={(e) => setNewTitle(e.target.value)}
                    placeholder="Enter credential title"
                    focusBorderColor="brand.500"
                  />
                </FormControl>

                <FormControl isRequired>
                  <FormLabel color={textColor}>PDF File</FormLabel>
                  <Input
                    type="file"
                    accept=".pdf"
                    onChange={(e) => setNewFile(e.target.files?.[0] || null)}
                    focusBorderColor="brand.500"
                    sx={{
                      "::file-selector-button": {
                        border: "none",
                        outline: "none",
                        bg: "brand.500",
                        color: "white",
                        borderRadius: "md",
                        px: 4,
                        py: 2,
                        mr: 3,
                        cursor: "pointer",
                      },
                    }}
                  />
                </FormControl>

                <Button 
                  colorScheme="brand" 
                  type="submit" 
                  width="full"
                  leftIcon={<FaPlus />}
                  size="lg"
                >
                  Add Credential
                </Button>
              </VStack>
            </Box>
          </Box>
        </MotionBox>

        {/* Existing Credentials */}
        <MotionBox
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Box
            bg={cardBg}
            borderRadius="xl"
            p={6}
            boxShadow="lg"
            border="1px solid"
            borderColor={borderColor}
          >
            <Flex align="center" mb={6}>
              <Icon as={FaCertificate} mr={3} color="brand.500" />
              <Heading as="h3" size="lg" color={textColor}>
                Existing Credentials
              </Heading>
              <Badge ml="auto" colorScheme="brand" variant="subtle">
                {credentials.length} total
              </Badge>
            </Flex>

            {credentials.length > 0 ? (
              <VStack spacing={4} align="stretch">
                {credentials.map((credential, index) => (
                  <MotionBox
                    key={credential.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                  >
                    <Box
                      borderWidth="1px"
                      borderColor={borderColor}
                      borderRadius="lg"
                      p={4}
                      _hover={{ 
                        bg: hoverBg,
                        transform: "translateY(-2px)",
                        boxShadow: "md"
                      }}
                      transition="all 0.2s"
                    >
                      <Flex justify="space-between" align="center">
                        <HStack flex="1" spacing={3}>
                          <Icon as={FaFilePdf} color="red.500" boxSize={5} />
                          <VStack align="start" spacing={1}>
                            <Text fontWeight="bold" color={textColor}>
                              {credential.title}
                            </Text>
                            <Button
                              as="a"
                              href={`${assetsBaseURL}/${credential.pdf_file}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              size="sm"
                              variant="link"
                              colorScheme="brand"
                              leftIcon={<FaFilePdf />}
                            >
                              View PDF
                            </Button>
                          </VStack>
                        </HStack>
                        
                        <IconButton
                          aria-label="Delete Credential"
                          icon={<DeleteIcon />}
                          colorScheme="red"
                          variant="ghost"
                          onClick={() => handleDelete(credential.id)}
                          _hover={{ bg: "red.50" }}
                        />
                      </Flex>
                    </Box>
                  </MotionBox>
                ))}
              </VStack>
            ) : (
              <Box textAlign="center" py={8}>
                <Icon as={FaCertificate} boxSize={12} color="gray.400" mb={4} />
                <Text color="gray.500" fontSize="lg">
                  No credentials available
                </Text>
                <Text color="gray.400" fontSize="sm">
                  Add your first credential using the form on the left
                </Text>
              </Box>
            )}
          </Box>
        </MotionBox>
      </SimpleGrid>
    </AdminLayout>
  );
};

export default AdminCredentials;
