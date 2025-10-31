import {
  Box,
  VStack,
  HStack,
  Text,
  useColorModeValue,
  Image,
} from "@chakra-ui/react";
import { motion, AnimatePresence } from "framer-motion";
import logo from "../assets/logo.png";

const MotionBox = motion(Box);
const MotionImage = motion(Image);

interface FullScreenLoaderProps {
  isVisible: boolean;
  text?: string;
}

const FullScreenLoader: React.FC<FullScreenLoaderProps> = ({
  isVisible,
  text = "Loading Electrical Ways...",
}) => {
  const bgColor = useColorModeValue("white", "gray.900");
  const textColor = useColorModeValue("gray.600", "gray.400");

  return (
    <AnimatePresence>
      {isVisible && (
        <MotionBox
          position="fixed"
          top="0"
          left="0"
          right="0"
          bottom="0"
          bg={bgColor}
          zIndex={9999}
          display="flex"
          alignItems="center"
          justifyContent="center"
          initial={{ opacity: 1 }}
          exit={{
            opacity: 0,
            scale: 0.95,
          }}
          transition={{
            duration: 0.5,
            ease: "easeInOut",
          }}
        >
          <VStack spacing={8}>
            <MotionBox
              animate={{
                rotate: 360,
                scale: [1, 1.1, 1],
              }}
              transition={{
                rotate: {
                  duration: 2,
                  repeat: Infinity,
                  ease: "linear",
                },
                scale: {
                  duration: 1.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                },
              }}
            >
              <MotionImage
                src={logo}
                alt="Electrical Ways Logo"
                boxSize="120px"
                objectFit="contain"
                filter="drop-shadow(0 8px 16px rgba(0, 0, 0, 0.1))"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
              />
            </MotionBox>

            <MotionBox
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.6 }}
            >
              <Text
                fontSize="xl"
                color={textColor}
                fontWeight="medium"
                textAlign="center"
                letterSpacing="wide"
              >
                {text}
              </Text>
            </MotionBox>

            {/* Loading dots animation */}
            <MotionBox
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1, duration: 0.5 }}
            >
              <VStack spacing={2}>
                <HStack spacing={1}>
                  {[0, 1, 2].map((index) => (
                    <MotionBox
                      key={index}
                      w="8px"
                      h="8px"
                      bg="brand.500"
                      borderRadius="full"
                      animate={{
                        scale: [1, 1.2, 1],
                        opacity: [0.5, 1, 0.5],
                      }}
                      transition={{
                        duration: 1.5,
                        repeat: Infinity,
                        delay: index * 0.2,
                        ease: "easeInOut",
                      }}
                    />
                  ))}
                </HStack>
              </VStack>
            </MotionBox>
          </VStack>
        </MotionBox>
      )}
    </AnimatePresence>
  );
};

export default FullScreenLoader;
