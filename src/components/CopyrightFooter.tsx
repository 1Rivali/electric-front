import {
  Box,
  Container,
  HStack,
  Text,
  Link,
  useColorModeValue,
  Divider,
  VStack,
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import arzLogo from "../assets/arz-logo.svg";

const MotionBox = motion(Box);

interface CopyrightFooterProps {
  showDivider?: boolean;
  py?: number | string;
}

const CopyrightFooter: React.FC<CopyrightFooterProps> = ({
  showDivider = true,
  py = 8,
}) => {
  const textColor = useColorModeValue("gray.600", "gray.400");
  const borderColor = useColorModeValue("gray.200", "gray.700");
  const linkColor = useColorModeValue("brand.500", "brand.300");
  const linkHoverColor = useColorModeValue("brand.600", "brand.200");

  const currentYear = new Date().getFullYear();

  return (
    <MotionBox
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      {showDivider && (
        <Container maxW="7xl" px={{ base: 4, md: 8 }}>
          <Divider borderColor={borderColor} mb={6} />
        </Container>
      )}

      <Box py={py} bg={useColorModeValue("gray.50", "gray.800")}>
        <Container maxW="7xl" px={{ base: 4, md: 8 }}>
          <VStack spacing={4}>
            <HStack
              spacing={4}
              flexDirection={{ base: "column", sm: "row" }}
              textAlign={{ base: "center", sm: "left" }}
            >
              <Text fontSize="sm" color={textColor} fontWeight="medium">
                © {currentYear} Electrical Ways. All rights reserved.
              </Text>

              <HStack spacing={2} align="center">
                <Text fontSize="sm" color={textColor}>
                  Developed by
                </Text>
                <Link
                  href="https://aperevolutionzone.com"
                  isExternal
                  display="flex"
                  alignItems="center"
                  _hover={{
                    textDecoration: "none",
                    transform: "translateY(-1px)",
                  }}
                  transition="all 0.2s"
                >
                  <Box
                    as="img"
                    src={arzLogo}
                    alt="Ape Revolution Zone"
                    height="20px"
                    width="auto"
                    filter="brightness(0.8)"
                    _hover={{
                      filter: "brightness(1)",
                    }}
                    transition="filter 0.2s"
                  />
                </Link>
              </HStack>
            </HStack>

            <Text
              fontSize="xs"
              color={textColor}
              textAlign="center"
              opacity={0.8}
            >
              Professional electrical solutions powered by innovation
            </Text>
          </VStack>
        </Container>
      </Box>
    </MotionBox>
  );
};

export default CopyrightFooter;
