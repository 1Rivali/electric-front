import { HamburgerIcon, MoonIcon, SunIcon } from "@chakra-ui/icons";
import {
  Box,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  Flex,
  HStack,
  IconButton,
  Image,
  Link,
  useColorMode,
  useColorModeValue,
  useDisclosure,
  Container,
} from "@chakra-ui/react";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import NavLinks from "./NavLink";
import logo from "../assets/logo.png";
import { BiLogOut } from "react-icons/bi";
import apiService from "../services/api-service";

const MotionBox = motion(Box);
const MotionFlex = motion(Flex);

const Navbar: React.FC = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { colorMode, toggleColorMode } = useColorMode();
  const navigate = useNavigate();

  // Modern V2 theme colors - softer light theme
  const navBg = useColorModeValue(
    "rgba(248, 249, 250, 0.90)",
    "rgba(26, 32, 44, 0.85)"
  );
  const navBorder = useColorModeValue(
    "rgba(226, 232, 240, 0.8)",
    "rgba(255, 255, 255, 0.1)"
  );
  const textColor = useColorModeValue("gray.700", "white");
  const activeColor = "brand.500";
  const drawerBg = useColorModeValue("gray.50", "gray.800");
  const drawerHeaderBg = useColorModeValue(
    "linear(135deg, brand.500 0%, brand.600 50%, brand.700 100%)",
    "linear(135deg, brand.600 0%, brand.700 50%, brand.800 100%)"
  );

  const handleLogout = () => {
    apiService
      .post(
        "/admin/logout",
        {},
        { headers: { Authorization: localStorage.getItem("token") } }
      )
      .then(() => {});
    localStorage.clear();
    navigate("/");
  };

  return (
    <>
      {/* Modern Glass Morphism Navbar */}
      <MotionBox
        position="fixed"
        top={0}
        left={0}
        right={0}
        zIndex={1000}
        bg={navBg}
        backdropFilter="blur(20px)"
        borderBottom="1px solid"
        borderColor={navBorder}
        boxShadow="0 8px 32px rgba(49, 99, 158, 0.1)"
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <Container maxW="7xl">
          <Flex h={20} alignItems="center" justifyContent="space-between">
            {/* Logo Section */}
            <MotionFlex
              alignItems="center"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <Link
                as={RouterLink}
                to="/"
                _hover={{ transform: "scale(1.05)" }}
                transition="all 0.3s ease"
              >
                <Image
                  src={logo}
                  alt="Electrical Ways Logo"
                  boxSize={{ base: "60px", md: "80px" }}
                  filter="drop-shadow(0 4px 8px rgba(49, 99, 158, 0.2))"
                  _hover={{
                    filter: "drop-shadow(0 6px 12px rgba(49, 99, 158, 0.3))",
                  }}
                  transition="all 0.3s ease"
                />
              </Link>
            </MotionFlex>

            {/* Desktop Navigation Links */}
            <MotionBox
              as="nav"
              display={{ base: "none", lg: "block" }}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <HStack spacing={8}>
                <NavLinks activeColor={activeColor} color={textColor} />
              </HStack>
            </MotionBox>

            {/* Action Buttons */}
            <MotionFlex
              alignItems="center"
              gap={3}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              {/* Color Mode Toggle */}
              <IconButton
                aria-label="Toggle color mode"
                icon={colorMode === "light" ? <MoonIcon /> : <SunIcon />}
                onClick={toggleColorMode}
                variant="ghost"
                size="lg"
                color={textColor}
                bg="whiteAlpha.200"
                _hover={{
                  bg: "brand.500",
                  color: "white",
                  transform: "translateY(-2px)",
                  boxShadow: "0 4px 12px rgba(49, 99, 158, 0.3)",
                }}
                _active={{ transform: "translateY(0)" }}
                transition="all 0.3s ease"
                borderRadius="xl"
              />

              {/* Logout Button (if authenticated) */}
              {localStorage.getItem("token") && (
                <IconButton
                  aria-label="Logout"
                  icon={<BiLogOut />}
                  onClick={handleLogout}
                  variant="ghost"
                  size="lg"
                  color="red.500"
                  bg="whiteAlpha.200"
                  _hover={{
                    bg: "red.500",
                    color: "white",
                    transform: "translateY(-2px)",
                    boxShadow: "0 4px 12px rgba(245, 101, 101, 0.3)",
                  }}
                  _active={{ transform: "translateY(0)" }}
                  transition="all 0.3s ease"
                  borderRadius="xl"
                />
              )}

              {/* Mobile Menu Button */}
              <IconButton
                aria-label="Open Menu"
                icon={<HamburgerIcon />}
                display={{ base: "flex", lg: "none" }}
                onClick={onOpen}
                variant="ghost"
                size="lg"
                color={textColor}
                bg="whiteAlpha.200"
                _hover={{
                  bg: "brand.500",
                  color: "white",
                  transform: "translateY(-2px)",
                  boxShadow: "0 4px 12px rgba(49, 99, 158, 0.3)",
                }}
                _active={{ transform: "translateY(0)" }}
                transition="all 0.3s ease"
                borderRadius="xl"
              />
            </MotionFlex>
          </Flex>
        </Container>
      </MotionBox>

      {/* Add top padding to body content to account for fixed navbar */}
      <Box h="20" />

      {/* Modern Mobile Drawer */}
      <Drawer isOpen={isOpen} placement="right" onClose={onClose} size="sm">
        <DrawerOverlay backdropFilter="blur(10px)" />
        <DrawerContent
          bg={drawerBg}
          borderRadius="2xl 0 0 2xl"
          boxShadow="0 0 50px rgba(0, 0, 0, 0.2)"
        >
          <DrawerCloseButton
            size="lg"
            color="white"
            _hover={{
              bg: "whiteAlpha.200",
              transform: "scale(1.1)",
            }}
            transition="all 0.3s ease"
            borderRadius="xl"
            top={6}
            right={6}
          />

          <DrawerHeader
            bgGradient={drawerHeaderBg}
            color="white"
            fontSize="2xl"
            fontWeight="800"
            py={8}
            borderRadius="0 0 2xl 2xl"
            textAlign="center"
            position="relative"
            overflow="hidden"
          >
            {/* Background Pattern */}
            <Box
              position="absolute"
              top="0"
              left="0"
              right="0"
              bottom="0"
              opacity={0.1}
              bgImage="radial-gradient(circle at 20% 50%, white 1px, transparent 1px), radial-gradient(circle at 80% 50%, white 1px, transparent 1px)"
              bgSize="30px 30px"
            />
            <Box position="relative" zIndex={1}>
              Navigation Menu
            </Box>
          </DrawerHeader>

          <DrawerBody p={8}>
            <NavLinks
              activeColor={activeColor}
              color={textColor}
              onClick={onClose}
            />
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default Navbar;
