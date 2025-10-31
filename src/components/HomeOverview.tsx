import {
  Box,
  Container,
  Heading,
  HStack,
  Icon,
  Image,
  Text,
  useColorModeValue,
  VStack,
} from "@chakra-ui/react";
import CountUp from "react-countup";
import { PiMedalBold } from "react-icons/pi";
import homeOverview1 from "../assets/factory/homeoverview1.webp";
import homeOverview2 from "../assets/factory/3.webp";

function GradientCard(props) {
  return (
    <VStack
      borderRadius={"32px"}
      py={{
        base: 5,
        md: 10,
      }}
      fontSize={{
        base: "40px",
        md: "64px",
      }}
      background={`linear-gradient(to bottom, ${props.experienceColor} 0%, rgba(49,99,158,1) 100%)`}
      height={"100%"}
      width={"full"}
    >
      <Icon
        width={{
          base: "40px",
          md: "50px",
          lg: "75px",
        }}
        height={{
          base: "40px",
          md: "50px",
          lg: "75px",
        }}
        as={PiMedalBold}
      />
      <HStack>
        <CountUp
          style={{
            fontSize: "65px",
            fontWeight: "bold",
          }}
          duration={3}
          enableScrollSpy
          end={21}
        />
        <Text fontSize={"65px"} fontWeight={"bold"}>
          +
        </Text>
      </HStack>
      <Heading
        fontSize={{
          base: "16px",
          md: "24px",
        }}
        width={"80%"}
        as={"h3"}
      >
        Years of Experience
      </Heading>
    </VStack>
  );
}

function WhoWeAre() {
  return (
    <Container
      textAlign={"start"}
      letterSpacing={"2px"}
      justifyContent={"start"}
      maxW={{
        base: "100%",
        lg: "50%",
      }}
      mt={{
        base: 10,
        md: 0,
      }}
    >
      <Text
        fontSize={{
          base: "md",
          md: "lg",
        }}
        color={"brand.500"}
      >
        WHO WE ARE
      </Text>
      <Heading
        as={"h1"}
        mt={5}
        fontSize={{
          base: "2xl",
          md: "3xl",
        }}
      >
        Provides You With Best Quality Cable Management Systems
      </Heading>

      <Text
        color={"grey"}
        mt={5}
        fontSize={{
          base: "lg",
          md: "2xl",
        }}
      >
        Electrical Ways is a leading manufacturer in Cable Management Systems
        and has been a prominent name in the industry since 2003, with roots and
        experience dating back to 1991. We proudly offer a comprehensive range
        of cable tray solutions to meet the diverse needs of our customers. In
        addition, we specialize in various steel fabrications, providing custom
        solutions to fulfill any requirements for contractors on sites and
        projects.
      </Text>
    </Container>
  );
}

export default function HomeOverview() {
  const experienceColor = useColorModeValue(
    "rgba(255,255,255,1)",
    "rgba(0,0,0,1)"
  );
  return (
    <HStack flexWrap={"wrap"}>
      <Box width={{ base: "100%", lg: "40%" }} height={"min-content"}>
        <Image
          borderRadius={"32px"}
          src={homeOverview2}
          width={"full"}
          height={"300px"}
        />
        <HStack>
          <GradientCard experienceColor={experienceColor} />
          <Image
            borderRadius={"32px"}
            left={{ base: "50%", md: "50%" }}
            src={homeOverview1}
            width={"60%"}
          />
        </HStack>
      </Box>
      <WhoWeAre />
    </HStack>
  );
}

{
  /* <HStack
py={{ base: "16px", md: "32px" }}
px={{ base: "16px", md: "32px", lg: "64px" }}
justify={"space-between"}
flexWrap={"wrap"}
alignItems={"flex-start"}
>
<Box>
  <Image
    position={"relative"}
    borderRadius={"32px"}
    src={homeOverview2}
    width={{ base: "100%", md: "400px", lg: "500px" }}
    height={{ base: "200px", md: "250px" }}
  />
  <HStack position={"relative"}>
    <GradientCard experienceColor={experienceColor} />
    <Image
      position={"absolute"}
      borderRadius={"32px"}
      left={{ base: "50%", md: "50%" }}
      src={homeOverview1}
      width={{ base: "150px", md: "300px", lg: "340px" }}
      height={{ base: "300px", md: "400px", lg: "440px" }}
    />
  </HStack>
</Box>
<WhoWeAre />
</HStack> */
}
