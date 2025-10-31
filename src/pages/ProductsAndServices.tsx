import { Box } from "@chakra-ui/react";
import ProductCategoriesGrid from "../components/HomeProductCategoryOverview";

const ProductsAndServices = () => {
  return (
    <Box px={10}>
      <ProductCategoriesGrid />
    </Box>
  );
};

export default ProductsAndServices;

// <Container maxW={"80%"}>
//       <Container
//         textAlign={"center"}
//         letterSpacing={"2px"}
//         justifyContent={"space-between"}
//         maxW={{ base: "100%", md: "100%" }}
//         my={{ base: 10, md: 10 }}
//       >
//         <Text fontSize={{ base: "md", md: "lg" }} color={"brand.500"}>
//           WHO WE ARE
//         </Text>
//         <Heading as={"h1"} mt={5} fontSize={{ base: "2xl", md: "3xl" }}>
//           Provides You With Best Quality Cable Management Systems
//         </Heading>

//         <Text color={"grey"} mt={5} fontSize={{ base: "lg", md: "2xl" }}>
//           Electrical Ways is a leading manufacturer in Cable Management Systems
//           and has been a prominent name in the industry since 2003, with roots
//           and experience dating back to 1991. We proudly offer a comprehensive
//           range of cable tray solutions to meet the diverse needs of our
//           customers. In addition, we specialize in various steel fabrications,
//           providing custom solutions to fulfill any requirements for contractors
//           on sites and projects.
//         </Text>
//       </Container>
//       <SimpleGrid columns={[1, 2, 3]} width={"full"} spacing={20} p={4}>
//         <ServiceCard images={products[0]} borderRadius="lg" shadow="lg" />
//         <ServiceCard images={products[0]} borderRadius="lg" shadow="lg" />
//         <ServiceCard images={products[0]} borderRadius="lg" shadow="lg" />
//         <ServiceCard images={products[0]} borderRadius="lg" shadow="lg" />
//         <ServiceCard images={products[0]} borderRadius="lg" shadow="lg" />
//         <ServiceCard images={products[0]} borderRadius="lg" shadow="lg" />
//         <ServiceCard images={products[0]} borderRadius="lg" shadow="lg" />
//         <ServiceCard images={products[0]} borderRadius="lg" shadow="lg" />
//       </SimpleGrid>
//     </Container>
