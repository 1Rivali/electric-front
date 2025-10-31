import { Link, Stack, Box, useColorModeValue } from "@chakra-ui/react";
import { Link as RouterLink, useLocation } from "react-router-dom";
import { motion } from "framer-motion";

const MotionBox = motion(Box);
const MotionLink = motion(Link);

interface NavLinksProps {
  activeColor: string;
  color: string;
  onClick?: () => void; // Optional onClick handler for mobile
}

const NavLinks: React.FC<NavLinksProps> = ({ activeColor, color, onClick }) => {
  const location = useLocation();

  // Modern V2 theme colors - softer light theme
  const activeBg = useColorModeValue("gray.100", "brand.900");
  const hoverBg = useColorModeValue("gray.50", "gray.700");

  const links = [
    { to: "/", label: "Home" },
    { to: "/credentials", label: "Credentials" },
    { to: "/products", label: "Products" },
    { to: "/contact", label: "Contact Us" },
  ];

  const adminLinks = [
    { to: "/admin/slideshow", label: "Slide show" },
    { to: "/admin/products", label: "Products" },
    { to: "/admin/contactus", label: "Contact Us" },
    { to: "/admin/whychooseus", label: "Why Choose Us" },
    { to: "/admin/credentials", label: "Credentials" },
  ];

  const token = localStorage.getItem("token");
  const currentLinks = token ? adminLinks : links;

  return (
    <Stack
      flexDirection={{ base: "column", md: "row" }}
      alignItems={{ base: "stretch", md: "center" }}
      spacing={{ base: 4, md: 2 }}
      w={{ base: "full", md: "auto" }}
    >
      {currentLinks.map((link, index) => {
        const isActive = location.pathname === link.to;

        return (
          <MotionBox
            key={link.to}
            position="relative"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
          >
            <MotionLink
              as={RouterLink}
              to={link.to}
              px={{ base: 6, md: 4 }}
              py={{ base: 4, md: 3 }}
              borderRadius="xl"
              fontSize={{ base: "lg", md: "md" }}
              fontWeight={isActive ? "700" : "600"}
              color={isActive ? activeColor : color}
              bg={isActive ? activeBg : "transparent"}
              position="relative"
              overflow="hidden"
              _hover={{
                textDecoration: "none",
                color: activeColor,
                bg: isActive ? activeBg : hoverBg,
                transform: "translateY(-2px)",
              }}
              _active={{ transform: "translateY(0)" }}
              transition="all 0.3s ease"
              onClick={onClick}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {/* Active indicator line */}
              {isActive && (
                <MotionBox
                  position="absolute"
                  bottom={{ base: 0, md: "-2px" }}
                  left="50%"
                  w="80%"
                  h="3px"
                  bg={activeColor}
                  borderRadius="full"
                  initial={{ scaleX: 0, x: "-50%" }}
                  animate={{ scaleX: 1, x: "-50%" }}
                  transition={{ duration: 0.3 }}
                />
              )}

              {/* Hover effect background */}
              <Box
                position="absolute"
                top="0"
                left="0"
                right="0"
                bottom="0"
                bg="brand.500"
                opacity={0}
                borderRadius="xl"
                _groupHover={{ opacity: 0.1 }}
                transition="opacity 0.3s ease"
                zIndex={-1}
              />

              {link.label}
            </MotionLink>
          </MotionBox>
        );
      })}
    </Stack>
  );
};

export default NavLinks;
