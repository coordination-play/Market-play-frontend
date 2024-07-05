import React from "react";
import { Box, SimpleGrid, Text, Heading, VStack, useColorModeValue, Stack, HStack, Button, Spinner } from "@chakra-ui/react";
import dayjs from "dayjs";
import { Dispatch, Ref, SetStateAction, useRef, useEffect, useState } from 'react'
import { OrganisationABI, RegistryABI, CONTRACTS_ADDRESSES } from "../contracts/contracts";

import { FaRectangleList } from "react-icons/fa6";
import { RiBardFill } from "react-icons/ri";
import { useGetAllCampaignDetails, useGetOrganisationOwner } from "../contracts/read/Organisation";

import {
    UseContractReadResult,
    useContractRead
  } from "@starknet-react/core";
  import { useAccount, useConnect, useDisconnect, Connector, useNetwork } from "@starknet-react/core";


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
    const { address } = useAccount();
    const { isConnected } = useAccount();
    console.log("address", address, isConnected)
    // const { data, isLoading } = useGetAllCampaignDetails();
    // const { data, isLoading } = useGetOrganisationOwner();
    const { data: data, isLoading, isError, isSuccess, error } = useContractRead({
        abi: OrganisationABI,
        address: CONTRACTS_ADDRESSES.ORGANISATION,
        functionName: "get_all_campaigns",
        args: [],
        watch: true,
    });
    
    let campaigns2 =[];

    function unixTimestampToDate(unixTimestamp: number): string {
        // Create a new Date object using the Unix timestamp (in milliseconds)
        const date = new Date(unixTimestamp * 1000);
      
        // Format the date to a readable string
        const formattedDate = `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;
      
        return formattedDate;
      }
    const getDaysInfo = (startDate, endDate) => {
        const now = dayjs();
        const start = dayjs(unixTimestampToDate(startDate));
        const end = dayjs(unixTimestampToDate(endDate));
        if (now.isBefore(start)) {
            return `Starts in ${start.diff(now, 'days')} days`;
        } else if (now.isBefore(end)) {
            return `Ends in ${end.diff(now, 'days')} days`;
        } else {
            return `Campaign ended`;
        }
    };

    function bigIntToWords(bigNumber: bigint): string {
        let hexString = bigNumber.toString(16).toUpperCase(); // Convert BigInt to a hex string and make it uppercase
    
        // Ensure the hex string has an even number of characters
        if (hexString.length % 2 !== 0) {
            hexString = '0' + hexString;
        }
    
        // Convert hex to bytes
        let bytes = hexString.match(/.{1,2}/g) || [];
        
        // Convert bytes to ASCII characters
        let words = bytes.map(byte => {
            const value = parseInt(byte, 16);
            return value >= 32 && value <= 126 ? String.fromCharCode(value) : `0x${byte}`;
        });
    
        return words.join('');
    }
    useEffect(() => {
        console.log("data",data, isLoading)
        if(data!= undefined)
            campaigns2 = data[1]
        
      }, [isLoading])

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
            {isLoading ? (
            <Spinner />
          ) : !data?.[0] ? (
            <p className="font-medium text-sm"> No Organisations found </p>
          ) : (
            <SimpleGrid columns={{ base: 1, md: 3 }} spacing={6} mt={6}  px={5} justifyContent="center" alignItems="center">
                {data[1].map((campaign, i) => (
                    <Stack key={i} bg={bg} p={4} rounded="lg" shadow="base" spacing={4} w="100%" maxWidth="400px">
                        <HStack justifyContent="space-between" alignItems="center">
                            <HStack>
                                <RiBardFill size={30} color="gold" />
                                <Text fontSize="xl" fontWeight="bold">{bigIntToWords(campaign.name)}</Text>
                            </HStack>
                            <Button size="sm" colorScheme="teal">View</Button>
                        </HStack>
                        <Text>Token Allotted: {campaign.token_amount.toString()} USDC</Text>
                        <Text color="blue.500">{getDaysInfo(Number(campaign.start_time),Number(campaign.duration))}</Text>
                    </Stack>
                ))}
                
            </SimpleGrid>
            )}
        </Box>
        </Box>
    );
}
