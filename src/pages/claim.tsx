import { Flex, Box, chakra, Text, Stack, Button, Heading, VStack } from "@chakra-ui/react";
import Link from "next/link";
import React, { useEffect } from "react";
import WalletManager from "../components/ConnectWallet";
import { getSession, signIn, signOut, useSession } from "next-auth/react";
import Header from "../components/Header";

export default function Claim() {
  const { data: session } = useSession();
  useEffect(() => {
    console.log("session object is", session);
  }, []);
  return (
    <VStack>
        <Header/>
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
          Start by connecting your wallet.
          After connecting your wallet and authenticating your Twitter account, your accounts will be linked. This info is required for Organizations to verify your contributions and distribute the rewards.
        </Text>
        <Stack
          mt={8}
          direction="column"
          align="center"
          w="full"
        >
          {session ? (
            <Button colorScheme="teal" variant={"ghost"} size="md" px={7} py={2} mt={2} onClick={() => signOut()}>
            Hello, {session.user.name}
            </Button>
          ) : (
            <Button colorScheme="teal" variant={"outline"} size="md" px={4} py={2} mt={2} onClick={() => signIn('twitter')}>
              Verify Twitter
            </Button>
          )}
        </Stack>
      </VStack>
    </Flex>
    </VStack>

  );
}
