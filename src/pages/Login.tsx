import React, { useState } from "react";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Heading,
  useToast,
  Flex,
} from "@chakra-ui/react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { baseURL } from "../services/api-service";

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const toast = useToast();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      // Validate inputs
      if (!email || !password) {
        toast({
          title: "Error",
          description: "Email and Password are required",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
        return;
      }

      // Send login request to Laravel API
      const response = await axios.post(`${baseURL}/admin/login`, {
        email,
        password,
      });

      // Handle successful login
      toast({
        title: "Login Successful",
        description: "You are now logged in",
        status: "success",
        duration: 3000,
        isClosable: true,
      });

      // Store the token locally (you can use localStorage or any preferred method)
      const token = response.data.token;
      localStorage.setItem("token", `Bearer ${token}`);
      navigate("/admin/slideshow");
    } catch (error) {
      // Handle login failure
      toast({
        title: "Error",
        description: error.response?.data?.message || "Login failed",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <Flex height="80vh" alignItems="center" justifyContent="center">
      <Box
        width={{ base: "80%", md: "35%" }}
        mx="auto"
        mt={8}
        p={6}
        borderWidth={1}
        borderRadius="lg"
        boxShadow="2xl"
      >
        <Heading mb={6} textAlign="center">
          Admin Login
        </Heading>
        <form onSubmit={handleSubmit}>
          <Stack spacing={4}>
            <FormControl id="email" isRequired>
              <FormLabel>Email</FormLabel>
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
              />
            </FormControl>
            <FormControl id="password" isRequired>
              <FormLabel>Password</FormLabel>
              <Input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
              />
            </FormControl>
            <Button
              type="submit"
              colorScheme="brand"
              variant="solid"
              width="full"
              mt={4}
            >
              Login
            </Button>
          </Stack>
        </form>
      </Box>
    </Flex>
  );
};

export default LoginPage;
