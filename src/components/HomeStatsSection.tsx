import React from "react";
import {
  HStack,
  Heading,
  VStack,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import CountUp from "react-countup";

interface HomeStatsSectionProps {
  title?: string;
  stats: Array<{ value: number; label: string }>;
}

const HomeStatsSection: React.FC<HomeStatsSectionProps> = ({
  title = "Our Factory in Numbers",
  stats,
  ...props
}) => {
  const statsGradient = useColorModeValue(
    "rgba(255,255,255,1)",
    "rgba(0,0,0,1)"
  );
  return (
    <HStack
      width={"full"}
      mt={{ base: "10", md: "20" }}
      p={{ base: 6, md: 12 }}
      background={`radial-gradient(circle, rgba(49,99,158,1) 0%, ${statsGradient} 100%)`}
      flexWrap={{ base: "wrap", md: "nowrap" }}
      alignItems={"flex-start"}
      {...props}
    >
      <Heading
        as={"h4"}
        w={{ base: "100%", md: "20%" }}
        textAlign={{ base: "center", md: "left" }}
        fontSize={{ base: "xl", md: "2xl" }}
        mb={{ base: 6, md: 0 }}
      >
        {title}
      </Heading>
      <HStack
        justify={"space-around"}
        width={"full"}
        flexWrap={{ base: "wrap", md: "nowrap" }}
        spacing={{ base: 6, md: 8 }}
      >
        {stats.map((stat, index) => (
          <VStack key={index}>
            <HStack>
              <CountUp
                style={{ fontSize: "48px", fontWeight: "bold" }}
                duration={3}
                enableScrollSpy
                end={stat.value}
              />
              <Text fontSize={"48px"} fontWeight={"bold"}>
                +
              </Text>
            </HStack>
            <Text fontSize={{ base: "md", md: "lg" }}>{stat.label}</Text>
          </VStack>
        ))}
      </HStack>
    </HStack>
  );
};

export default HomeStatsSection;
