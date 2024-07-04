import { Flex, Box, chakra, Text, Stack, Button, Heading, VStack, HStack } from "@chakra-ui/react";
import Link from "next/link";
import React from "react";
import { LiaLinkSolid } from "react-icons/lia";
import { BsInfoCircleFill } from "react-icons/bs";


export default function ContributorLinkedSuccess() {
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
                maxW="lg"
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
                <LiaLinkSolid size={60} color="gold" />

                <chakra.span
                    fontSize="3xl"
                    fontWeight="extrabold"
                    _dark={{
                        color: "gray.100",
                    }}
                >
                    Address Linked!
                </chakra.span>
                <HStack>
                    <BsInfoCircleFill   size={20} color="teal"/>
                    <Text>
                        Await reward distribution by the campaign organizer
                    </Text>
                </HStack>
            </VStack>
        </Flex>
    );
}
