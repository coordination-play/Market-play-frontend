import { Flex, Box, chakra, Text, Stack, Button, Heading, VStack } from "@chakra-ui/react";
import Link from "next/link";
import React from "react";
import WalletManager from "./ConnectWallet";

export default function Claim() {
  return (
    <Flex
      direction="column"
      align="center"
      justify="center"
      h="100vh"  // Makes the Flex container take up the full viewport height
      w="full"
      bg="#edf3f8"
      _dark={{
        bg: "#3e3e3e",
      }}
    >
      <VStack
        spacing={4}
        w="full"
        maxW="md"  // Limits the width of the content to a reasonable maximum
        px={10}
        py={20}
        bg="white"
        _dark={{
          bg: "gray.800",
        }}
        boxShadow="xl"  // Adds a shadow for better visibility on both light and dark backgrounds
        rounded="lg"  // Gives the container rounded corners
        textAlign="center"
      >
        <chakra.span
          fontSize="3xl"
          fontWeight="extrabold"
          color="gray.900"
          _dark={{
            color: "gray.100",
          }}
        >
          Ready to claim your rewards?
        </chakra.span>
        <Text>
        Start by connecting your wallet.
          After connecting your wallet and authenticating your twitter account, your accounts will be linked. This info is required for Organizations to verify your contributions and distribute the rewards.
        </Text>
        <Stack
        mt={8}
          direction="column"
          align="center"
          w="full"
        >
          <Button colorScheme="teal" size="md" px={7} py={2} mt={2}>
            Get Started
          </Button>
          <WalletManager />
        </Stack>
      </VStack>
    </Flex>
  );
}
