import {
  Box,
  Button,
  Heading,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { FC } from "react";
import { Link } from "react-router-dom";

interface ContactSectionProps {
  minWidth?: string | object;
  my?: number | object;
  p?: number | object;
  background?: string;
}

const HomeContactSection: FC<ContactSectionProps> = ({
  my = { base: 0, md: 15, lg: 20 },
  p = { base: 5, md: 8, lg: 10 },
  ...rest // This allows extra props to be passed down
}) => {
  const contactGradient = useColorModeValue(
    "rgba(255,255,255,1)",
    "rgba(0,0,0,1)"
  );
  return (
    <Box
      width={"full"}
      my={my}
      p={p}
      background={`radial-gradient(circle, rgba(49,99,158,1) 0%, ${contactGradient} 100%)`}
      textAlign={{ base: "start", md: "center" }}
      {...rest}
    >
      <Text fontSize={{ base: "lg", md: "xl" }} color={"white"}>
        CONTACT
      </Text>
      <Heading
        as={"h3"}
        fontSize={{ base: "3xl", md: "4xl", lg: "5xl" }}
        mt={5}
      >
        Connect with{" "}
        <Text display={"inline"} color={"black"} fontWeight={"bold"}>
          Electrical Ways
        </Text>{" "}
        Today For Steel Fabrication Requirements
      </Heading>
      <Text mt={5} color={"black"} fontSize={{ base: "xl", md: "2xl" }}>
        We are one click away from filling your needs
      </Text>
      <Link to={"contact"}>
        <Button mt={10} backgroundColor={"black"} color={"white"}>
          CONTACT US NOW
        </Button>
      </Link>
    </Box>
  );
};

export default HomeContactSection;
