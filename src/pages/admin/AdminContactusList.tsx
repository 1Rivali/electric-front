import React, { useEffect, useState } from "react";
import {
  Box,
  Heading,
  Spinner,
  Stack,
  Text,
  VStack,
  useColorModeValue,
  Flex,
  Divider,
  IconButton,
  HStack,
  Link,
  Badge,
  Icon,
  SimpleGrid,
} from "@chakra-ui/react";
import axios from "axios";
import { motion } from "framer-motion";
import { assetsBaseURL, baseURL } from "../../services/api-service";
import {
  FaEnvelope,
  FaUser,
  FaChevronUp,
  FaChevronDown,
  FaFileAlt,
  FaInbox,
  FaClock,
} from "react-icons/fa";
import AdminLayout from "../../components/AdminLayout";

const MotionBox = motion(Box);

interface ContactUs {
  id: number;
  name: string;
  email: string;
  subject: string;
  message: string;
  created_at: string;
  attachment_path: string;
}

const AdminContactUsList = () => {
  const [contacts, setContacts] = useState<ContactUs[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [expandedContacts, setExpandedContacts] = useState<{
    [key: number]: boolean;
  }>({});

  const bgColor = useColorModeValue("gray.100", "black");
  const textColor = useColorModeValue("gray.800", "white");

  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const response = await axios.get(`${baseURL}/contactus`, {
          headers: { Authorization: localStorage.getItem("token") },
        });
        setContacts(response.data);

        const expandedState = response.data.reduce(
          (acc: { [key: number]: boolean }, contact: ContactUs) => {
            acc[contact.id] = false;
            return acc;
          },
          {}
        );
        setExpandedContacts(expandedState);
      } catch {
        setError("Failed to load contacts.");
      } finally {
        setLoading(false);
      }
    };

    fetchContacts();
  }, []);

  const toggleExpand = (id: number) => {
    setExpandedContacts((prevState) => ({
      ...prevState,
      [id]: !prevState[id],
    }));
  };

  const cardBg = useColorModeValue("white", "gray.800");
  const borderColor = useColorModeValue("gray.200", "gray.700");
  const hoverBg = useColorModeValue("gray.50", "gray.700");

  return (
    <AdminLayout
      title="Contact Messages"
      subtitle="View and manage customer inquiries and contact form submissions"
      icon={FaInbox}
      breadcrumbs={[
        { label: "Admin", href: "/admin" },
        { label: "Contact Messages" }
      ]}
    >
      {loading ? (
        <Box display="flex" justifyContent="center" alignItems="center" py={12}>
          <VStack spacing={4}>
            <Spinner size="xl" color="brand.500" thickness="4px" />
            <Text color="gray.500">Loading contact messages...</Text>
          </VStack>
        </Box>
      ) : error ? (
        <Box textAlign="center" py={12}>
          <Icon as={FaInbox} boxSize={12} color="red.400" mb={4} />
          <Text color="red.500" fontSize="lg" fontWeight="semibold">
            {error}
          </Text>
        </Box>
      ) : contacts.length === 0 ? (
        <Box textAlign="center" py={12}>
          <Icon as={FaInbox} boxSize={16} color="gray.400" mb={6} />
          <Heading size="md" color="gray.500" mb={2}>
            No Messages Found
          </Heading>
          <Text color="gray.400">
            Contact messages will appear here when customers submit the contact form.
          </Text>
        </Box>
      ) : (
        <VStack spacing={6} align="stretch">
          {/* Stats Header */}
          <SimpleGrid columns={{ base: 1, md: 3 }} spacing={4} mb={4}>
            <Box
              bg={cardBg}
              p={4}
              borderRadius="lg"
              border="1px solid"
              borderColor={borderColor}
              textAlign="center"
            >
              <Text fontSize="2xl" fontWeight="bold" color="brand.500">
                {contacts.length}
              </Text>
              <Text fontSize="sm" color="gray.500">
                Total Messages
              </Text>
            </Box>
            
            <Box
              bg={cardBg}
              p={4}
              borderRadius="lg"
              border="1px solid"
              borderColor={borderColor}
              textAlign="center"
            >
              <Text fontSize="2xl" fontWeight="bold" color="green.500">
                {contacts.filter(c => c.attachment_path).length}
              </Text>
              <Text fontSize="sm" color="gray.500">
                With Attachments
              </Text>
            </Box>
            
            <Box
              bg={cardBg}
              p={4}
              borderRadius="lg"
              border="1px solid"
              borderColor={borderColor}
              textAlign="center"
            >
              <Text fontSize="2xl" fontWeight="bold" color="blue.500">
                {contacts.filter(c => 
                  new Date(c.created_at) > new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
                ).length}
              </Text>
              <Text fontSize="sm" color="gray.500">
                This Week
              </Text>
            </Box>
          </SimpleGrid>

          {/* Contact Messages */}
          <Stack spacing={4}>
            {contacts.map((contact, index) => (
              <MotionBox
                key={contact.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
              >
                <Box
                  bg={cardBg}
                  borderRadius="xl"
                  boxShadow="md"
                  border="1px solid"
                  borderColor={borderColor}
                  overflow="hidden"
                  _hover={{ 
                    boxShadow: "lg",
                    transform: "translateY(-1px)"
                  }}
                  transition="all 0.2s"
                >
                  {/* Header */}
                  <Flex 
                    justify="space-between" 
                    align="center" 
                    p={6}
                    bg={expandedContacts[contact.id] ? hoverBg : "transparent"}
                    borderBottom={expandedContacts[contact.id] ? "1px solid" : "none"}
                    borderColor={borderColor}
                  >
                    <HStack spacing={4}>
                      <Box
                        p={2}
                        bg="brand.100"
                        borderRadius="lg"
                        color="brand.600"
                      >
                        <Icon as={FaUser} boxSize={4} />
                      </Box>
                      <VStack align="start" spacing={1}>
                        <Text fontSize="lg" fontWeight="bold" color={textColor}>
                          {contact.name}
                        </Text>
                        <HStack spacing={4} fontSize="sm" color="gray.500">
                          <HStack>
                            <Icon as={FaEnvelope} />
                            <Text>{contact.email}</Text>
                          </HStack>
                          <HStack>
                            <Icon as={FaClock} />
                            <Text>
                              {new Date(contact.created_at).toLocaleDateString()}
                            </Text>
                          </HStack>
                        </HStack>
                      </VStack>
                    </HStack>

                    <HStack spacing={2}>
                      {contact.attachment_path && (
                        <Badge colorScheme="green" variant="subtle">
                          Attachment
                        </Badge>
                      )}
                      <IconButton
                        icon={
                          expandedContacts[contact.id] ? (
                            <FaChevronUp />
                          ) : (
                            <FaChevronDown />
                          )
                        }
                        aria-label="Toggle Details"
                        variant="ghost"
                        colorScheme="brand"
                        onClick={() => toggleExpand(contact.id)}
                      />
                    </HStack>
                  </Flex>

                  {/* Expanded Content */}
                  {expandedContacts[contact.id] && (
                    <Box p={6}>
                      <VStack spacing={6} align="stretch">
                        {/* Subject */}
                        <Box>
                          <Text fontSize="sm" fontWeight="semibold" color="brand.500" mb={2}>
                            SUBJECT
                          </Text>
                          <Text fontSize="lg" fontWeight="semibold" color={textColor}>
                            {contact.subject}
                          </Text>
                        </Box>

                        <Divider borderColor={borderColor} />

                        {/* Message */}
                        <Box>
                          <Text fontSize="sm" fontWeight="semibold" color="brand.500" mb={3}>
                            MESSAGE
                          </Text>
                          <Text color={textColor} lineHeight="1.6">
                            {contact.message}
                          </Text>
                        </Box>

                        {/* Attachment */}
                        {contact.attachment_path && (
                          <>
                            <Divider borderColor={borderColor} />
                            <Box>
                              <Text fontSize="sm" fontWeight="semibold" color="brand.500" mb={3}>
                                ATTACHMENT
                              </Text>
                              <HStack>
                                <Icon as={FaFileAlt} color="red.500" />
                                <Link
                                  href={`${assetsBaseURL}/${contact.attachment_path}`}
                                  color="brand.500"
                                  fontWeight="semibold"
                                  isExternal
                                  _hover={{ textDecoration: "underline" }}
                                >
                                  Download Attachment
                                </Link>
                              </HStack>
                            </Box>
                          </>
                        )}
                      </VStack>
                    </Box>
                  )}
                </Box>
              </MotionBox>
            ))}
          </Stack>
        </VStack>
      )}
    </AdminLayout>
  );
};

export default AdminContactUsList;
