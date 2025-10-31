import {
  Box,
  Button,
  VStack,
  Icon,
  useColorModeValue,
  Tooltip,
} from "@chakra-ui/react";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import {
  FaPhone,
  FaEnvelope,
  FaWhatsapp,
  FaPlus,
  FaTimes,
} from "react-icons/fa";

const MotionBox = motion(Box);
const MotionButton = motion(Button);

const FloatingActionButton = () => {
  const [isOpen, setIsOpen] = useState(false);
  const bgColor = useColorModeValue("white", "gray.800");
  const shadowColor = useColorModeValue("gray.200", "gray.700");

  const actionButtons = [
    {
      icon: FaPhone,
      label: "Call Us",
      color: "green.500",
      href: "tel:+966123456789",
    },
    {
      icon: FaEnvelope,
      label: "Email Us",
      color: "blue.500",
      href: "mailto:info@electricalways.com",
    },
    {
      icon: FaWhatsapp,
      label: "WhatsApp",
      color: "green.400",
      href: "https://wa.me/966123456789",
    },
  ];

  return (
    <Box
      position="fixed"
      bottom="8"
      right="8"
      zIndex={1000}
      display={{ base: "block", md: "block" }}
    >
      <VStack spacing={4} align="end">
        <AnimatePresence>
          {isOpen &&
            actionButtons.map((button, index) => (
              <MotionBox
                key={button.label}
                initial={{ opacity: 0, scale: 0, x: 20 }}
                animate={{ opacity: 1, scale: 1, x: 0 }}
                exit={{ opacity: 0, scale: 0, x: 20 }}
                transition={{ duration: 0.2, delay: index * 0.1 }}
              >
                <Tooltip label={button.label} placement="left">
                  <MotionButton
                    as="a"
                    href={button.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    size="lg"
                    borderRadius="full"
                    bg={bgColor}
                    color={button.color}
                    boxShadow="lg"
                    border="1px solid"
                    borderColor={shadowColor}
                    _hover={{
                      transform: "scale(1.1)",
                      boxShadow: "xl",
                      bg: button.color,
                      color: "white",
                    }}
                    transition="all 0.3s"
                    w="56px"
                    h="56px"
                    minW="56px"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Icon as={button.icon} w={6} h={6} />
                  </MotionButton>
                </Tooltip>
              </MotionBox>
            ))}
        </AnimatePresence>

        {/* Main FAB Button */}
        <MotionButton
          size="lg"
          borderRadius="full"
          bg="brand.500"
          color="white"
          boxShadow="2xl"
          _hover={{
            bg: "brand.600",
            transform: "scale(1.05)",
          }}
          onClick={() => setIsOpen(!isOpen)}
          w="64px"
          h="64px"
          minW="64px"
          transition="all 0.3s"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          animate={{ rotate: isOpen ? 45 : 0 }}
        >
          <Icon as={isOpen ? FaTimes : FaPlus} w={6} h={6} />
        </MotionButton>
      </VStack>
    </Box>
  );
};

export default FloatingActionButton;
