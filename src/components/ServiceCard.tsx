import {
  Box,
  BoxProps,
  Divider,
  Flex,
  IconButton,
  Text,
} from "@chakra-ui/react";
import { useState } from "react";
import { ArrowLeftIcon, ArrowRightIcon } from "@chakra-ui/icons";

export interface ProductData {
  imageUrl: string;
  title: string;
  subtitle: string;
  description: string;
}

interface ServiceCardProps extends BoxProps {
  images: ProductData[];
}

const ServiceCard: React.FC<ServiceCardProps> = ({ images, ...rest }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showDescription, setShowDescription] = useState(false);

  const currentImage = images[currentIndex];

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent triggering the description toggle
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const handlePrevious = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent triggering the description toggle
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + images.length) % images.length
    );
  };

  const handleToggleDescription = () => {
    setShowDescription((prev) => !prev);
  };

  return (
    <Box
      {...rest}
      width={"100%"}
      height={"300px"}
      position={"relative"}
      backgroundImage={`url(${currentImage.imageUrl})`}
      backgroundSize="cover"
      backgroundPosition="center"
      color="white"
      overflow="hidden"
      cursor="pointer"
      onClick={handleToggleDescription}
    >
      {/* Left Arrow */}
      <IconButton
        aria-label="Previous Image"
        icon={<ArrowLeftIcon />}
        position="absolute"
        left={2}
        top="50%"
        transform="translateY(-50%)"
        bg="rgba(0, 0, 0, 0.5)"
        color="white"
        _hover={{ bg: "rgba(0, 0, 0, 0.8)" }}
        onClick={handlePrevious}
        zIndex={10}
      />

      {/* Right Arrow */}
      <IconButton
        aria-label="Next Image"
        icon={<ArrowRightIcon />}
        position="absolute"
        right={2}
        top="50%"
        transform="translateY(-50%)"
        bg="rgba(0, 0, 0, 0.5)"
        color="white"
        _hover={{ bg: "rgba(0, 0, 0, 0.8)" }}
        onClick={handleNext}
        zIndex={10}
      />

      <Flex
        position={"absolute"}
        bottom={0}
        width="100%"
        direction="column"
        align="flex-start"
        p={4}
        bg="rgba(0, 0, 0, 0.75)"
        transition="all 0.5s ease-in-out"
        justify={showDescription ? "flex-end" : "flex-end"}
        textAlign="start"
        zIndex="10"
      >
        <Text fontSize="xl" fontWeight="bold" mb={2}>
          {currentImage.title}
        </Text>
        <Text color={"brand.500"} fontSize="md" fontWeight="medium">
          {currentImage.subtitle}
        </Text>
        <Divider borderColor={"brand.500"} borderWidth={"1px"} width={"50%"} />
        {showDescription && (
          <Box
            color="white"
            textAlign={"start"}
            transition="all 0.5s ease-in-out"
          >
            <Text fontSize="md" color={"white"}>
              {currentImage.description}
            </Text>
          </Box>
        )}
      </Flex>
    </Box>
  );
};

export default ServiceCard;
