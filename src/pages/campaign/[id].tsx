import { useRouter } from 'next/router'
import { Box, SimpleGrid, GridItem, Text, Heading, VStack, Divider, HStack, Button } from "@chakra-ui/react";
import React from "react";
import { AiOutlineFileText } from "react-icons/ai";
import DownloadDataButton from '../../components/DownloadCSV';
import UploadCSVButton from '../../components/UploadCSV';
import { useAccount } from "@starknet-react/core";

export default function CampaignDetails() {
    const { account, address, status } = useAccount();
    const router = useRouter()

    // Dummy data for demonstration
    const campaignData = {
        campaignId: router.query.id,
        campaignName: "fetched campaign name",
        campaignDescription: "fetched desc",
        tokenAddress: "0x04730a1c577be4d4d4752b18e71b1fefbb91239cc4967ec2dbd89347e0e99bd9",
        tokenAllocation: 100000,
        campaignStart: "2023-09-01", // in datetime type
        campaignEnd: "2023-09-30",  // in datatime type
        minFollowers: 0.35,
        minImpressions: 1.25,
        maxMentions: 1.75,
        viewExponent: 4,
        twitterId: 12222222
    };

    return (
        <Box bg="#edf3f8" _dark={{ bg: "#111" }} p={20} minH="100vh" w="full">
            <HStack spacing={10} alignItems="start">
                <VStack spacing={4} align="stretch" w="full">
                    <HStack>
                        <Heading fontSize="3xl" fontWeight="medium" mb={4} textAlign="left" color={"teal.600"}>
                            Campaign Details
                        </Heading>
                        <Box alignSelf={"end"} mb={6} mx={2}>
                            <AiOutlineFileText size={50} color="gold" />
                        </Box>
                    </HStack>
                    <VStack spacing={5}>
                        <SimpleGrid columns={{ base: 1, md: 3 }} w="full" p={4} bg="white" _dark={{ bg: "gray.700" }} rounded="md" shadow="base">
                            <GridItem my={2}>
                                <Text fontWeight="bold">Campaign Name:</Text>
                                <Text>{campaignData.campaignId}</Text>
                            </GridItem>
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
                                <Text fontWeight="bold">Min Followers</Text>
                                <Text>{campaignData.minFollowers}</Text>
                            </GridItem>
                            <GridItem>
                                <Text fontWeight="bold">Min Impressions</Text>
                                <Text>{campaignData.minImpressions}</Text>
                            </GridItem>
                            <GridItem>
                                <Text fontWeight="bold">Max Mentions</Text>
                                <Text>{campaignData.maxMentions}</Text>
                            </GridItem>
                            <GridItem>
                                <Text fontWeight="bold">View Exponent</Text>
                                <Text>{campaignData.viewExponent}</Text>
                            </GridItem>
                            <GridItem>
                                <Text fontWeight="bold">Twitter Account Id</Text>
                                <Text>{campaignData.twitterId}</Text>
                            </GridItem>
                        </SimpleGrid>
                    </VStack>
                </VStack>
                <VStack spacing={3} align="stretch" position="sticky" top={50}>
                    <UploadCSVButton />
                    <DownloadDataButton
                        campaignStart={0}
                        campaignEnd={0}
                        viewExponent={0}
                        minFollowers={0}
                        minImpressions={0}
                        maxMentions={0}
                        targetUserId={0}
                    />
                    <Button colorScheme="teal" size="md" width="full">Settle Campaign</Button>
                </VStack>
            </HStack>
        </Box>
    );
}
