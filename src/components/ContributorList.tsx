import React from "react";
import { Box, SimpleGrid, Text, Heading, VStack, useColorModeValue, Stack, HStack, Button } from "@chakra-ui/react";
import { MdLeaderboard } from "react-icons/md";
import { IoMdPerson } from "react-icons/io";


const contributors = [
    {
        id: 1,
        address: "0x01bbf55f42d6ee9d49618a18eee88a08248aa99f14334c2350a5fe71fe0bcda2",
        points: "100000"

    },
    {
        id: 2,
        address: "0x1715b6afb8dfbe887dc69c5cf6e2ad6a19940f50a446bc70c3588eef870ffd9",
        points: "8888"

    },
    {
        id: 3,
        address: "0x4718f5a0fc34cc1af16a1cdee98ffb20c31f5cd61d6ab07201858f4287c938d",
        points: "1000"
    },
];

export default function ContributorList() {
    const bg = useColorModeValue("white", "gray.800");
    return (
        <Box bg="#edf3f8" _dark={{ bg: "#111" }} p={10} minH="100vh" w={"full"}>
            <HStack>
                <Heading fontSize="3xl" p={5} color={"teal.600"}>
                    Top Contributors List
                </Heading>
                <Box alignSelf={"end"} mb={4} mx={2}>
                    <MdLeaderboard size={50} color="gold" />
                </Box>

            </HStack>
            <Text ml={5}>
                Lorem Ipsum, Lorem Ipsum
            </Text>
            <Box bg="#edf3f8" _dark={{ bg: "#111" }} p={10} minH="100vh">
                <Stack spacing={6} mt={6} px={5} justifyContent="center" alignItems="center">
                    {contributors.map(person => (
                   <Stack key={person.id} bg={bg} p={4} rounded="lg" shadow="base" spacing={4} w="100%">
                   <HStack justifyContent="space-between" alignItems="center" wrap="wrap">
                       <HStack spacing={2} align="flex-start" flex="1">
                           <IoMdPerson size={30} color="gold" />
                           <Text fontSize="xl" fontWeight="bold" noOfLines={[2, 3, 4]} flex="1">
                               {person.address}
                           </Text>
                           <Text fontWeight={'semibold'}>{person.points} Points</Text>

                       </HStack>
                   </HStack>
               </Stack>
                    ))}
                </Stack>
            </Box>
        </Box>
    );
}
