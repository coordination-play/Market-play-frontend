import { Link as ChakraLink, Button } from "@chakra-ui/react";

import { Container } from "./Container";

export const CTA = () => (
  <Container
    flexDirection="row"
    position="fixed"
    bottom={0}
    width="full"
    maxWidth="3xl"
    pb={8}
  >
    <Button
      as={ChakraLink}
      isExternal
      href="/create"
      variant="outline"
      colorScheme="teal"
      rounded="button"
      flexGrow={1}
      mx={2}
      size={"lg"}
      width="full"
    >
      For Organizations
    </Button>
    <Button
      as={ChakraLink}
      isExternal
      href="/claim"
      variant="solid"
      size={"lg"}
      colorScheme="teal"
      rounded="button"
      flexGrow={3}
      mx={2}
      width="full"
    >
      For Contributors
    </Button>
  </Container>
);
