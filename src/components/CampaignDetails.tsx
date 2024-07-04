import { Box, SimpleGrid, GridItem, Text, Heading, VStack, Divider, HStack, Button } from "@chakra-ui/react";
import React from "react";
import { AiTwotoneReconciliation } from "react-icons/ai";
import WalletManager from "./ConnectWallet";

export default function CampaignDetails() {
    // Dummy data for demonstration
    const campaignData = {
        campaignName: "Spring Awareness",
        campaignDescription: "A campaign to increase awareness of our spring collection. A campaign to increase awareness of our spring collection.A campaign to increase awareness of our spring collection.A campaign to increase awareness of our spring collection.A campaign to increase awareness of our spring collection.A campaign to increase awareness of our spring collection.A campaign to increase awareness of our spring collection.A campaign to increase awareness of our spring collection.A campaign to increase awareness of our spring collection.vA campaign to increase awareness of our spring collection.A campaign to increase awareness of our spring collection.A campaign to increase awareness of our spring collection.",
        tokenAddress: "0x04730a1c577be4d4d4752b18e71b1fefbb91239cc4967ec2dbd89347e0e99bd9",
        tokenAllocation: "100,000 USDC",
        campaignStart: "2023-09-01",
        campaignEnd: "2023-09-30",
        likeWeight: "0.35",
        retweetWeight: "1.25",
        bookmarkWeight: "1.75"
    };

    return (
        <Box bg="#edf3f8" _dark={{ bg: "#111" }} p={20} minH="100vh" w="full">
            <HStack spacing={10} alignItems="start">
                <VStack spacing={4} align="stretch" w="full">
                    <HStack>
                        <Heading fontSize="3xl" fontWeight="medium" mb={4} textAlign="left" color={"teal.700"}>
                            Campaign Details
                        </Heading>
                        <Box alignSelf={"end"} mb={4} mx={2}>
                            <AiTwotoneReconciliation size={50} color="teal" />
                        </Box>
                    </HStack>
                    <VStack spacing={5}>
                        <SimpleGrid columns={{ base: 1, md: 3 }} w="full" p={4} bg="white" _dark={{ bg: "gray.700" }} rounded="md" shadow="base">
                            <GridItem my={2}>
                                <Text fontWeight="bold">Campaign Name:</Text>
                                <Text>{campaignData.campaignName}</Text>
                            </GridItem>
                            <GridItem colSpan={{ base: 1, md: 3 }} my={3}>
                                <Text fontWeight="bold">Description:</Text>
                                <Text>{campaignData.campaignDescription}</Text>
                            </GridItem>
                            <GridItem colSpan={{ base: 1, md: 2 }} my={3}>
                                <Text fontWeight="bold">Token Address:</Text>
                                <Text>{campaignData.tokenAddress}</Text>
                            </GridItem>
                            <GridItem my={3}>
                                <Text fontWeight="bold">Budget Allocation:</Text>
                                <Text>{campaignData.tokenAllocation}</Text>
                            </GridItem>
                            <GridItem my={3}>
                                <Text fontWeight="bold">Campaign Start:</Text>
                                <Text>{campaignData.campaignStart}</Text>
                            </GridItem>
                            <GridItem my={3}>
                                <Text fontWeight="bold">Campaign End:</Text>
                                <Text>{campaignData.campaignEnd}</Text>
                            </GridItem>
                        </SimpleGrid>
                        <Divider my={4} />
                        <Heading fontSize="lg" fontWeight="semibold" alignSelf="flex-start" color={"blue.600"}>
                            Tweet Rewards
                        </Heading>
                        <SimpleGrid columns={{ base: 1, md: 3 }} w="full" p={4} bg="white" _dark={{ bg: "gray.700" }} rounded="md" shadow="base">
                            <GridItem>
                                <Text fontWeight="bold">Like Weight:</Text>
                                <Text>{campaignData.likeWeight}</Text>
                            </GridItem>
                            <GridItem>
                                <Text fontWeight="bold">Retweet Weight:</Text>
                                <Text>{campaignData.retweetWeight}</Text>
                            </GridItem>
                            <GridItem>
                                <Text fontWeight="bold">Bookmark Weight:</Text>
                                <Text>{campaignData.bookmarkWeight}</Text>
                            </GridItem>
                        </SimpleGrid>
                    </VStack>
                </VStack>
                <VStack spacing={3} align="stretch" position="sticky" top={40}>
                    <WalletManager/>
                    <Button colorScheme="teal" size="md">Upload CSV</Button>
                    <Button colorScheme="teal" size="md">Distribute Rewards</Button>
                    {/* <Button colorScheme="teal" size="md">Delete Campaign</Button>
                    <Button colorScheme="teal" size="md">Export Data</Button> */}
                </VStack>
            </HStack>
        </Box>
    );
}
