import {
  Box,
  Center,
  VStack,
  Text,
  useColorModeValue,
  Image,
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import logo from "../assets/logo.png";

const MotionBox = motion(Box);
const MotionImage = motion(Image);

interface LogoLoaderProps {
  text?: string;
  size?: "sm" | "md" | "lg" | "xl";
  showText?: boolean;
}

const LogoLoader: React.FC<LogoLoaderProps> = ({
  text = "Loading...",
  size = "lg",
  showText = true,
}) => {
  const textColor = useColorModeValue("gray.600", "gray.400");

  // Size configurations
  const sizeConfig = {
    sm: { logoSize: "40px", textSize: "sm" },
    md: { logoSize: "60px", textSize: "md" },
    lg: { logoSize: "80px", textSize: "lg" },
    xl: { logoSize: "120px", textSize: "xl" },
  };

  const { logoSize, textSize } = sizeConfig[size];

  return (
    <Center py={20}>
      <VStack spacing={6}>
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
            boxSize={logoSize}
            objectFit="contain"
            filter="drop-shadow(0 4px 8px rgba(0, 0, 0, 0.1))"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          />
        </MotionBox>

        {showText && (
          <MotionBox
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            <Text
              fontSize={textSize}
              color={textColor}
              fontWeight="medium"
              textAlign="center"
            >
              {text}
            </Text>
          </MotionBox>
        )}
      </VStack>
    </Center>
  );
};

export default LogoLoader;
