import { Center, Container, Image } from "@chakra-ui/react";
import PartnersCircle from "./PartnersCircle";
import { circularImages } from "../constants/data";
import saudiMap from "../assets/sa.svg";

export function PartnersMapMobile() {
  return (
    <Container position={"relative"} my={20} minWidth={"fit-content"}>
      <Center>
        <Image src={saudiMap} />
      </Center>
      <PartnersCircle
        right={"3%"}
        bottom={"29%"}
        src={circularImages[0]}
        zIndex={10}
        size={{
          base: "32px",
          md: "75px",
        }}
      />
      <PartnersCircle
        right={"18%"}
        bottom={"33%"}
        src={circularImages[1]}
        zIndex={10}
        size={{
          base: "32px",
          md: "75px",
        }}
      />
      <PartnersCircle
        right={"37%"}
        bottom={"10%"}
        src={circularImages[2]}
        zIndex={10}
        size={{
          base: "32px",
          md: "75px",
        }}
      />
      <PartnersCircle
        right={"50%"}
        bottom={"50%"}
        src={circularImages[3]}
        zIndex={10}
        size={{
          base: "32px",
          md: "75px",
        }}
      />
      <PartnersCircle
        right={"40%"}
        bottom={"40%"}
        src={circularImages[4]}
        zIndex={10}
        size={{
          base: "32px",
          md: "75px",
        }}
      />
      <PartnersCircle
        right={"30%"}
        bottom={"30%"}
        src={circularImages[5]}
        zIndex={10}
        size={{
          base: "32px",
          md: "75px",
        }}
      />
      <PartnersCircle
        left={"20%"}
        top={"20%"}
        src={circularImages[6]}
        zIndex={10}
        size={{
          base: "32px",
          md: "75px",
        }}
      />
      <PartnersCircle
        left={"30%"}
        top={"50%"}
        src={circularImages[7]}
        zIndex={10}
        size={{
          base: "32px",
          md: "75px",
        }}
      />
      <PartnersCircle
        left={"35%"}
        top={"70%"}
        src={circularImages[8]}
        zIndex={10}
        size={{
          base: "32px",
          md: "75px",
        }}
      />
      <PartnersCircle
        left={"19%"}
        top={"3%"}
        src={circularImages[9]}
        zIndex={10}
        size={{
          base: "32px",
          md: "75px",
        }}
      />
      <PartnersCircle
        left={"39%"}
        top={"20%"}
        src={circularImages[10]}
        zIndex={10}
        size={{
          base: "32px",
          md: "75px",
        }}
      />
      <PartnersCircle
        left={"20%"}
        top={"38%"}
        src={circularImages[11]}
        zIndex={10}
        size={{
          base: "32px",
          md: "75px",
        }}
      />
      <PartnersCircle
        right={"35%"}
        top={"25%"}
        src={circularImages[12]}
        zIndex={10}
        size={{
          base: "32px",
          md: "75px",
        }}
      />
    </Container>
  );
}
