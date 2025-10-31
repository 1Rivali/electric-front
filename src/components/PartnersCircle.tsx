import React from "react";
import { Circle, Image, ResponsiveValue, SquareProps } from "@chakra-ui/react";

interface PartnersCircleProps extends SquareProps {
  src: string;
  zIndex?: number;
  size?: ResponsiveValue<string | number> | string;
  top?: ResponsiveValue<string | number> | string | number;
  right?: ResponsiveValue<string | number> | string | number;
  left?: ResponsiveValue<string | number> | string | number;
  bottom?: ResponsiveValue<string | number> | string | number;
}

const PartnersCircle: React.FC<PartnersCircleProps> = ({
  src,
  zIndex = 1,
  size = "90px",
  top,
  right,
  left,
  bottom,
  ...props
}) => {
  return (
    <Circle
      //   p={{ base: 2, md: 3 }}
      objectFit="contain"
      backgroundColor={"white"}
      zIndex={zIndex}
      top={top}
      right={right}
      left={left}
      bottom={bottom}
      position="absolute"
      boxShadow="0px 30px 64px 0px #617bb3"
      size={size}
      {...props}
    >
      <Image width={"65%"} height={"65%"} objectFit={"contain"} src={src} />
    </Circle>
  );
};

export default PartnersCircle;
