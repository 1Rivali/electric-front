import {
  Box,
  Collapse,
  Text,
  IconButton,
  useDisclosure,
} from "@chakra-ui/react";
import { ChevronDownIcon, ChevronUpIcon } from "@chakra-ui/icons";

export default function DropDownText({
  title,
  content,
  defaultIsOpen = true,
}: {
  title: string;
  content: string;
  defaultIsOpen?: boolean;
}) {
  const { isOpen, onToggle } = useDisclosure({ defaultIsOpen: defaultIsOpen });

  return (
    <Box width={"100%"} mb={4} onClick={onToggle} cursor={"pointer"}>
      <Box display="flex" alignItems="center" justifyContent="space-between">
        <Text as="h2" fontSize="2xl" color="brand.500">
          {title}
        </Text>
        <IconButton
          aria-label="Toggle Description"
          icon={isOpen ? <ChevronUpIcon /> : <ChevronDownIcon />}
          variant="ghost"
          bgColor={"transparent"}
          fontSize={"3xl"}
          color={"brand.500"}
          onClick={onToggle}
        />
      </Box>
      <Collapse in={isOpen} animateOpacity>
        <Text
          fontSize="lg"
          color="gray.600" // Replace with `modalDescriptionColor` if defined
          textAlign="start"
          lineHeight="2"
          mt={4}
        >
          {content}
        </Text>
      </Collapse>
    </Box>
  );
}
