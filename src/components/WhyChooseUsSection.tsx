import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Heading,
  Image,
  Text,
  VStack,
} from "@chakra-ui/react";
import useWhyChooseUs from "../hooks/useWhyChooseUs"; // Updated hook
import useFooterImages from "../hooks/useFooterImages";
import LogoLoader from "./LogoLoader";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

export const WhyChooseUsSection = () => {
  const { data: reasons, isLoading, error } = useWhyChooseUs(); // Using the updated hook
  const { data: footerImages } = useFooterImages();

  if (isLoading) {
    return <LogoLoader text="Loading why choose us content..." size="lg" />;
  }

  if (error) {
    return <p>Error: {error}</p>; // Display an error message
  }

  return (
    <Box
      display={"flex"}
      flexDirection="column"
      alignContent={"flex-start"}
      mt={10}
      textAlign={"start"}
    >
      <Box
        p={{ base: 6, md: 10 }}
        maxWidth={{ base: "100%", md: "100%" }}
        textAlign={{ base: "start", md: "start" }}
        backgroundSize={"cover"}
      >
        <VStack align="start" spacing={5}>
          <Text
            color="brand.500"
            fontWeight="bold"
            fontSize={{ base: "md", md: "lg" }}
          >
            WHY CHOOSE US
          </Text>
          <Heading as="h1" fontSize={{ base: "2xl", md: "4xl" }}>
            We strive to maintain quality standards to the best
          </Heading>
          <Accordion allowToggle pt={5} w="100%">
            {reasons.map((reason, index) => (
              <AccordionItem key={index}>
                <h2>
                  <AccordionButton>
                    <Box
                      flex="1"
                      textAlign="left"
                      fontWeight="bold"
                      fontSize={{ base: "md", md: "lg" }}
                    >
                      {reason.title}
                    </Box>
                    <AccordionIcon />
                  </AccordionButton>
                </h2>
                <AccordionPanel color="grey" pb={4}>
                  {reason.description}
                </AccordionPanel>
              </AccordionItem>
            ))}
          </Accordion>
        </VStack>
      </Box>

      <Box maxW="full" mx="auto" my={6}>
        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          spaceBetween={50}
          slidesPerView={1}
          navigation
          pagination={{ clickable: true }}
          autoplay={{ delay: 3500 }}
          loop={true}
        >
          {footerImages &&
            footerImages.map((image) => (
              <SwiperSlide key={image.id}>
                <Image
                  src={image.image_path}
                  alt={image.alt_text}
                  objectFit="cover"
                  borderRadius="md"
                  w="100%"
                  h={{ base: "350px", md: "100vh" }}
                />
              </SwiperSlide>
            ))}
        </Swiper>
      </Box>
    </Box>
  );
};
