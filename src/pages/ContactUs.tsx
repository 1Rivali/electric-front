import {
  Box,
  Button,
  Container,
  FormControl,
  GridItem,
  Heading,
  Icon,
  Input,
  SimpleGrid,
  Stack,
  Text,
  Textarea,
  useColorModeValue,
  useToast,
  VStack,
} from "@chakra-ui/react";
import axios from "axios"; // Import Axios
import { useState } from "react";
import { baseURL } from "../services/api-service";
import {
  FaEnvelope,
  FaGlobe,
  FaMapMarkerAlt,
  FaPhoneAlt,
} from "react-icons/fa";

const ContactUs = () => {
  const formColor = useColorModeValue("black", "white");
  const [file, setFile] = useState<File | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const toast = useToast();

  // Handle form changes
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };
  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const data = new FormData();
      data.append("name", formData.name);
      data.append("email", formData.email);
      data.append("subject", formData.subject);
      data.append("message", formData.message);
      if (file) {
        data.append("attachment", file); // Append file to FormData
      }

      // Send a POST request to the Laravel backend
      await axios.post(`${baseURL}/contactus`, data, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      // Show success message
      toast({
        title: "Message Sent",
        description: "Your message has been sent successfully!",
        status: "success",
        duration: 5000,
        isClosable: true,
      });

      // Reset form
      setFormData({
        name: "",
        email: "",
        subject: "",
        message: "",
      });
      setFile(null);
    } catch {
      // Show error message
      toast({
        title: "Error",
        description:
          "There was an error sending your message. Please try again.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container minW={"full"}>
      <Stack
        spacing={{ base: 8, md: 12 }}
        direction={{ base: "column", md: "row" }}
        px={{ base: 4, md: 12 }}
        width="100%"
        overflow="hidden"
      >
        <Box flex="1" maxW="100%" overflow="hidden">
          <Box mt={8}>
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3627.7936026813845!2d46.8615558!3d24.5963183!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e2f053c2b42e365%3A0xa8c75af2d2533ab8!2sElectrical%20Ways%20Factory%20Company%2C%20Supporting%20System%20and%20Fabrication!5e0!3m2!1sen!2snl!4v1725048677653!5m2!1sen!2snl"
              style={{
                border: 0,
                height: "50vh",
                borderRadius: "24px",
                width: "100%",
              }}
              allowFullScreen={false}
              aria-hidden="false"
              tabIndex={0}
            />
          </Box>
        </Box>

        <Box
          p={8}
          flex="1"
          borderRadius="md"
          maxWidth={{ base: "full", md: "50%" }}
          height={"100%"}
          mx="auto"
        >
          <Text color="brand.500" fontWeight="bold" mb={2}>
            CONTACT
          </Text>
          <Heading mb={6}>Reach Out Anytime</Heading>
          <VStack spacing={4} as="form" onSubmit={handleSubmit}>
            <FormControl isRequired>
              <Input
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Your Name"
                borderColor={formColor}
                focusBorderColor="brand.500"
              />
            </FormControl>

            <FormControl isRequired>
              <Input
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Your Email"
                borderColor={formColor}
                focusBorderColor="brand.500"
              />
            </FormControl>

            <FormControl isRequired>
              <Input
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                placeholder="Subject"
                borderColor={formColor}
                focusBorderColor="brand.500"
              />
            </FormControl>

            <FormControl isRequired>
              <Textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Input Message Here"
                borderColor={formColor}
                focusBorderColor="brand.500"
                height="150px"
              />
            </FormControl>
            <FormControl>
              <Input
                type="file"
                accept=".jpeg,.png,.jpg,.gif,.pdf"
                onChange={handleFileChange}
                borderColor={formColor}
                focusBorderColor="brand.500"
              />
            </FormControl>
            <Button
              type="submit"
              isLoading={loading}
              bg="blue.900"
              color={"white"}
              _hover={{ bg: "blue.700" }}
              width="full"
              mt={4}
            >
              SUBMIT MESSAGE
            </Button>
          </VStack>
        </Box>
      </Stack>

      <Heading textAlign={"center"} my={6}>
        Contact
      </Heading>

      <SimpleGrid
        columns={[1, 4]}
        gap={6}
        width="100%"
        overflow="hidden"
        pb={10}
      >
        <GridItem
          border={"1px solid"}
          borderColor={"brand.500"}
          boxShadow={"-0.5px 17px 32px -11.5px #31639e"}
          p={3}
          justifyContent={"center"}
          display="flex"
          alignItems="center"
        >
          <Icon as={FaPhoneAlt} color="brand.500" boxSize={8} />
          <Box ml={4}>
            <Text fontSize="lg" fontWeight="bold">
              Phone
            </Text>
            <Text>+966-55-439-3300</Text>
          </Box>
        </GridItem>
        <GridItem
          border={"1px solid"}
          borderColor={"brand.500"}
          boxShadow={"-0.5px 17px 32px -11.5px #31639e"}
          p={3}
          justifyContent={"center"}
          display="flex"
          alignItems="center"
        >
          <Icon as={FaEnvelope} color="brand.500" boxSize={8} />
          <Box ml={4}>
            <Text fontSize="lg" fontWeight="bold">
              Email
            </Text>
            <Text>Sales1@electricalways.com</Text>
          </Box>
        </GridItem>
        <GridItem
          border={"1px solid"}
          borderColor={"brand.500"}
          boxShadow={"-0.5px 17px 32px -11.5px #31639e"}
          p={3}
          justifyContent={"center"}
          display="flex"
          alignItems="center"
        >
          <Icon as={FaGlobe} color="brand.500" boxSize={8} />
          <Box ml={4}>
            <Text fontSize="lg" fontWeight="bold">
              Website
            </Text>
            <Text>www.electricalways.com</Text>
          </Box>
        </GridItem>
        <GridItem
          border={"1px solid"}
          borderColor={"brand.500"}
          boxShadow={"-0.5px 17px 32px -11.5px #31639e"}
          p={3}
          justifyContent={"center"}
          display="flex"
          alignItems="center"
        >
          <Icon as={FaMapMarkerAlt} color="brand.500" boxSize={8} />
          <Box ml={4}>
            <Text fontSize="lg" fontWeight="bold">
              Address
            </Text>
            <Text>Industrial Area AL-Mashael 14326, Riyadh, Saudi Arabia</Text>
          </Box>
        </GridItem>
      </SimpleGrid>
    </Container>
  );
};

export default ContactUs;
