import { DeleteIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
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
  Textarea,
} from "@chakra-ui/react";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FaStar, FaPlus, FaCheckCircle } from "react-icons/fa";
import AdminLayout from "../../components/AdminLayout";
import { baseURL } from "../../services/api-service";

const MotionBox = motion(Box);

interface WhyChooseUs {
  id: number;
  title: string;
  description: string;
}

const AdminWhyChooseUs: React.FC = () => {
  const [entries, setEntries] = useState<WhyChooseUs[]>([]);
  const [newTitle, setNewTitle] = useState<string>("");
  const [newDescription, setNewDescription] = useState<string>("");
  const toast = useToast();

  // Fetch existing entries on component mount
  useEffect(() => {
    fetchEntries();
  }, []);

  const fetchEntries = async () => {
    try {
      const response = await axios.get(`${baseURL}/whychooseus`);
      setEntries(response.data);
    } catch {
      toast({
        title: "Error",
        description: "Failed to fetch entries",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await axios.delete(`${baseURL}/whychooseus/${id}`, {
        headers: { Authorization: localStorage.getItem("token") },
      });
      toast({
        title: "Success",
        description: "Entry deleted successfully",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      fetchEntries(); // Refresh entries after delete
    } catch {
      toast({
        title: "Error",
        description: "Failed to delete entry",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const handleEntrySubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!newTitle || !newDescription) {
      toast({
        title: "Error",
        description: "Please fill out all fields",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    try {
      await axios.post(
        `${baseURL}/whychooseus`,
        {
          title: newTitle,
          description: newDescription,
        },
        {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        }
      );
      toast({
        title: "Success",
        description: "Entry added successfully",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      setNewTitle("");
      setNewDescription("");
      fetchEntries(); // Refresh entries after adding
    } catch {
      toast({
        title: "Error",
        description: "Failed to add entry",
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
      title="Why Choose Us Management"
      subtitle="Manage the reasons why customers should choose your services"
      icon={FaStar}
      breadcrumbs={[
        { label: "Admin", href: "/admin" },
        { label: "Why Choose Us" },
      ]}
    >
      <SimpleGrid columns={{ base: 1, lg: 2 }} spacing={8} w="full">
        {/* Add New Entry Form */}
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
                Add New Entry
              </Heading>
            </Flex>

            <Box as="form" onSubmit={handleEntrySubmit} w="100%">
              <VStack spacing={4}>
                <FormControl isRequired>
                  <FormLabel color={textColor}>Title</FormLabel>
                  <Input
                    type="text"
                    value={newTitle}
                    onChange={(e) => setNewTitle(e.target.value)}
                    placeholder="Enter entry title"
                    focusBorderColor="brand.500"
                  />
                </FormControl>

                <FormControl isRequired>
                  <FormLabel color={textColor}>Description</FormLabel>
                  <Textarea
                    value={newDescription}
                    onChange={(e) => setNewDescription(e.target.value)}
                    placeholder="Enter entry description"
                    focusBorderColor="brand.500"
                    rows={4}
                    resize="vertical"
                  />
                </FormControl>

                <Button
                  colorScheme="brand"
                  type="submit"
                  width="full"
                  leftIcon={<FaPlus />}
                  size="lg"
                >
                  Add Entry
                </Button>
              </VStack>
            </Box>
          </Box>
        </MotionBox>

        {/* Existing Entries */}
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
              <Icon as={FaStar} mr={3} color="brand.500" />
              <Heading as="h3" size="lg" color={textColor}>
                Existing Entries
              </Heading>
              <Badge ml="auto" colorScheme="brand" variant="subtle">
                {entries.length} total
              </Badge>
            </Flex>

            {entries.length > 0 ? (
              <VStack spacing={4} align="stretch">
                {entries.map((entry, index) => (
                  <MotionBox
                    key={entry.id}
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
                        boxShadow: "md",
                      }}
                      transition="all 0.2s"
                    >
                      <Flex justify="space-between" align="start">
                        <HStack flex="1" spacing={3} align="start">
                          <Icon
                            as={FaCheckCircle}
                            color="green.500"
                            boxSize={5}
                            mt={1}
                          />
                          <VStack align="start" spacing={2} flex="1">
                            <Text
                              fontWeight="bold"
                              color={textColor}
                              fontSize="lg"
                            >
                              {entry.title}
                            </Text>
                            <Text color="gray.600" lineHeight="1.6">
                              {entry.description}
                            </Text>
                          </VStack>
                        </HStack>

                        <IconButton
                          aria-label="Delete Entry"
                          icon={<DeleteIcon />}
                          colorScheme="red"
                          variant="ghost"
                          onClick={() => handleDelete(entry.id)}
                          _hover={{ bg: "red.50" }}
                        />
                      </Flex>
                    </Box>
                  </MotionBox>
                ))}
              </VStack>
            ) : (
              <Box textAlign="center" py={8}>
                <Icon as={FaStar} boxSize={12} color="gray.400" mb={4} />
                <Text color="gray.500" fontSize="lg">
                  No entries available
                </Text>
                <Text color="gray.400" fontSize="sm">
                  Add your first "Why Choose Us" entry using the form on the
                  left
                </Text>
              </Box>
            )}
          </Box>
        </MotionBox>
      </SimpleGrid>
    </AdminLayout>
  );
};

export default AdminWhyChooseUs;
