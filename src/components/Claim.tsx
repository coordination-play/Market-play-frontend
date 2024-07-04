import { Flex, Box, chakra, Text, Stack, Button, Heading, VStack } from "@chakra-ui/react";
import Link from "next/link";
import React from "react";
import WalletManager from "./ConnectWallet";
import { getSession, signIn, signOut, useSession } from "next-auth/react";

export default function Claim() {
  const { data: session } = useSession();

  return (
    <Flex
      direction="column"
      align="center"
      justify="center"
      h="100vh"  
      w="full"
      bg="#edf3f8"
      _dark={{
        bg: "#3e3e3e",
      }}
    >
      <VStack
        spacing={4}
        w="full"
        maxW="md"  
        px={10}
        py={20}
        bg="white"
        _dark={{
          bg: "gray.800",
        }}
        boxShadow="xl"  
        rounded="lg"  
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
          Start by connecting your twitter account.
          After authenticating your Twitter account, your wallet and twitter account will be linked. 
          This info is required for Organizations to verify your contributions and distribute the rewards.
        </Text>
        <Stack
          mt={8}
          direction="column"
          align="center"
          w="full"
        >
          {session ? (
            <Button colorScheme="teal" size="md" px={7} py={2} mt={2} onClick={() => signOut()}>
              Sign Out Twitter (Welcome, {session.user.name})
            </Button>
          ) : (
            <Button colorScheme="teal" size="md" px={7} py={2} mt={2} onClick={() => signIn('twitter')}>
              Sign In Twitter
            </Button>
          )}
          <WalletManager />
        </Stack>
      </VStack>
    </Flex>
  );
}
