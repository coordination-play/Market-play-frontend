import { Flex, Box, chakra, Text, Stack, Button, Heading, VStack } from "@chakra-ui/react";
import Link from "next/link";
import React from "react";
import { LuPartyPopper } from "react-icons/lu";


export default function CampaignSuccess() {
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
        maxW="lg"  // Limits the width of the content to a reasonable maximum
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
        <LuPartyPopper size={60} color="gold" />

        <chakra.span
          fontSize="3xl"
          fontWeight="extrabold"
          _dark={{
            color: "gray.100",
          }}
        >
          Campaign Created!
          </chakra.span>
        <Text fontSize={'xl'} fontWeight={"bold"} color={"teal"}>
            Here's your campaign ID:
        </Text>
        <Text fontWeight={"medium"}>
            123780
        </Text>
      </VStack>
    </Flex>
  );
}
