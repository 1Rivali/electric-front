import {
  Box,
  Button,
  Heading,
  HStack,
  Image,
  SimpleGrid,
  useColorModeValue,
  VStack,
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import logo from "../assets/logo.png";
import { saudiMapStates } from "../constants/data";
import PartnersCircle from "./PartnersCircle";

export default function PartnersMap() {
  const [animatingIndex, setAnimatingIndex] = useState<number | null>(0);
  const [isStopped, setIsStopped] = useState(false); // Track if animation is stopped
  const intervalRef = useRef(null); // Ref to store the interval
  const contactUsNowBgColor = useColorModeValue("black", "brand.600");
  useEffect(() => {
    const getRandomIndex = (): number => {
      const randIdx = Math.floor(Math.random() * saudiMapStates.length);
      if (saudiMapStates[randIdx].images.length !== 0) {
        return randIdx;
      }
      return getRandomIndex();
    };
    if (!isStopped) {
      intervalRef.current = setInterval(() => {
        setAnimatingIndex(getRandomIndex());
      }, 2000);
    }

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current); // Clear interval when component unmounts or re-renders
    };
  }, [isStopped]);

  const handlePathClick = (index: number) => {
    setIsStopped(true); // Stop the interval
    setAnimatingIndex(index); // Set the clicked index
  };

  const MotionBox = motion(Box); // Wrap Box component with motion for animation
  const MotionHeading = motion(Heading); // Wrap Heading component with motion

  const staggeredVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        staggerChildren: 0.1, // Stagger animation for children
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <HStack>
      {/* Map SVG Section */}
      <Box height={"100vh"} width={"70%"} position="relative" mb={20}>
        <svg
          height="100%"
          width="100%"
          fill="#31639e"
          stroke="#ffffff"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth=".5"
          version="1.1"
          viewBox="0 0 1000 824"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g id="features">
            {saudiMapStates.map((state, index) => (
              <path
                key={state.id}
                d={state.d}
                id={state.id}
                name={state.name}
                filter={
                  animatingIndex === index
                    ? "brightness(0.8)"
                    : "brightness(0.5)"
                }
                style={{ transition: "filter 1s ease" }}
                onClick={() => handlePathClick(index)} // Add click handler
              />
            ))}
          </g>
        </svg>
        {saudiMapStates.map(
          (state, idx) =>
            animatingIndex === idx && (
              <PartnersCircle
                key={idx}
                src={logo}
                zIndex={10}
                size={"5vw"}
                position={"absolute"}
                {...state.intialAnimationPos}
              />
            )
        )}
      </Box>

      {/* Creative Image Bubble Layout */}
      <VStack width={"50%"} position="relative" height={"100vh"} padding={4}>
        {animatingIndex !== null && (
          <MotionHeading
            textAlign={"center"}
            mb={4}
            variants={staggeredVariants}
            initial="hidden"
            animate="visible"
          >
            {saudiMapStates[animatingIndex].name}
          </MotionHeading>
        )}
        {saudiMapStates[animatingIndex].images.length > 0 ? (
          <SimpleGrid columns={{ base: 2, md: 5 }} spacing={4} width="100%">
            {animatingIndex !== null &&
              saudiMapStates[animatingIndex].images.map((img, idx) => (
                <MotionBox
                  key={idx}
                  border="2px solid"
                  borderColor={"brand.500"}
                  borderRadius="md"
                  overflow="hidden"
                  width={"80px"}
                  height={"80px"}
                  variants={itemVariants}
                  initial="hidden"
                  animate="visible"
                >
                  <Image
                    src={img}
                    alt={`Partner ${idx}`}
                    width="100%"
                    height="100%"
                    objectFit={"contain"}
                    bgColor={"white"}
                  />
                </MotionBox>
              ))}
          </SimpleGrid>
        ) : (
          <VStack
            width={"full"}
            height={"full"}
            alignItems={"start"}
            mt={"25%"}
            spacing={4}
          >
            <MotionHeading
              variants={staggeredVariants}
              initial="hidden"
              animate="visible"
            >
              No Clients Yet
            </MotionHeading>
            <MotionHeading
              color={"brand.500"}
              variants={staggeredVariants}
              initial="hidden"
              animate="visible"
            >
              Be Our First Client in {saudiMapStates[animatingIndex].name}
            </MotionHeading>
            <Link to={"contact"}>
              <Button
                mt={10}
                backgroundColor={contactUsNowBgColor}
                color={"white"}
              >
                CONTACT US NOW
              </Button>
            </Link>
          </VStack>
        )}
      </VStack>
    </HStack>
  );
}
