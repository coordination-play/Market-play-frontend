import React from "react";
import { Box, SimpleGrid, Text, Heading, VStack, useColorModeValue, Stack, HStack, Button } from "@chakra-ui/react";
import dayjs from "dayjs";
import { FaRectangleList } from "react-icons/fa6";
import { RiBardFill } from "react-icons/ri";


const campaigns = [
    {
        id: 1,
        name: "Spring Awareness",
        startDate: "2024-10-01",
        endDate: "2024-11-01",
        tokenAllotted: "100000"

    },
    {
        id: 2,
        name: "Summer Sale",
        startDate: "2023-07-01",
        endDate: "2024-08-01",
        tokenAllotted: "8888"

    },
    {
        id: 3,
        name: "Winter Fest",
        startDate: "2023-12-15",
        endDate: "2024-01-15",
        tokenAllotted: "1000"
    },
    {
        id: 4,
        name: "Summer Sale",
        startDate: "2023-07-01",
        endDate: "2024-08-01",
        tokenAllotted: "8888"

    },
    {
        id: 5,
        name: "Winter Fest",
        startDate: "2023-12-15",
        endDate: "2024-01-15",
        tokenAllotted: "1000"
    },  
    {
        id: 6,
        name: "Summer Sale",
        startDate: "2023-07-01",
        endDate: "2024-08-01",
        tokenAllotted: "8888"

    },
    {
        id: 7,
        name: "Winter Fest",
        startDate: "2023-12-15",
        endDate: "2024-01-15",
        tokenAllotted: "1000"
    },
    // Add more campaigns as needed
];

export default function CampaignList() {
    const bg = useColorModeValue("white", "gray.800");

    const getDaysInfo = (startDate, endDate) => {
        const now = dayjs();
        const start = dayjs(startDate);
        const end = dayjs(endDate);
        if (now.isBefore(start)) {
            return `Starts in ${start.diff(now, 'days')} days`;
        } else if (now.isBefore(end)) {
            return `Ends in ${end.diff(now, 'days')} days`;
        } else {
            return `Campaign ended`;
        }
    };

    return (
        <Box bg="#edf3f8" _dark={{ bg: "#111" }} p={10} minH="100vh" w={"full"}>
            <HStack>
                <Heading fontSize="3xl" p={5} color={"teal.600"}>
                    Campaign List
                </Heading>
                <Box alignSelf={"end"} mb={4} mx={2}>
                    <FaRectangleList size={50} color="gold" />
                </Box>

            </HStack>
            <Text ml={5}>
                Lorem Ipsum, Lorem Ipsum
            </Text>
            <Box bg="#edf3f8" _dark={{ bg: "#111" }} p={10} minH="100vh">
            <SimpleGrid columns={{ base: 1, md: 3 }} spacing={6} mt={6}  px={5} justifyContent="center" alignItems="center">
                {campaigns.map(campaign => (
                    <Stack key={campaign.id} bg={bg} p={4} rounded="lg" shadow="base" spacing={4} w="100%" maxWidth="400px">
                        <HStack justifyContent="space-between" alignItems="center">
                            <HStack>
                                <RiBardFill size={30} color="gold" />
                                <Text fontSize="xl" fontWeight="bold">{campaign.name}</Text>
                            </HStack>
                            <Button size="sm" colorScheme="teal">View</Button>
                        </HStack>
                        <Text>Token Allotted: {campaign.tokenAllotted} USDC</Text>
                        <Text color="blue.500">{getDaysInfo(campaign.startDate, campaign.endDate)}</Text>
                    </Stack>
                ))}
            </SimpleGrid>
        </Box>
        </Box>
    );
}
