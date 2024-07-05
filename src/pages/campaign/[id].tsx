import { useRouter } from 'next/router'
import { Box, SimpleGrid, GridItem, Text, Heading, VStack, Divider, HStack, Button, Spinner, IconButton, FormControl, Input } from "@chakra-ui/react";
import React from "react";
import { AiOutlineFileText } from "react-icons/ai";
import DownloadDataButton from '../../components/DownloadCSV';
import UploadCSVButton from '../../components/UploadCSV';
import { useAccount } from "@starknet-react/core";
import Header from "../../components/Header";
import dayjs from "dayjs";


import { OrganisationABI, RegistryABI, CONTRACTS_ADDRESSES } from "../../contracts/contracts";
import {
    UseContractReadResult,
    useContractRead
  } from "@starknet-react/core";
  import { Dispatch, Ref, SetStateAction, useRef, useEffect, useState } from 'react'

  import { useWriteOrganisationContract } from "../../contracts/write";
import { toast } from "sonner";
import { CheckIcon } from '@chakra-ui/icons';
import DownloadLocalCSVButton from '../../components/DownloadFile';

export default function CampaignDetails() {
    const { account, address, status } = useAccount();
    const router = useRouter()
    const id = router.query.id;

    const [previewData, setPreviewData] = useState<ContributorData[]>([]);
    const [ended, setIsEnded] = useState<Boolean>(false);
    const COLUMNS = {
        CONTRIBUTOR_USERNAME: "contributor_username",
        VIEWS: "views",
        LIKES: "likes",
        REPLIES: "replies",
        RETWEETS: "retweets",
        FOLLOWERS: "followers",
        MENTIONS: "mentions",

      } as const;


    const { data: data, isLoading, isError, isSuccess, error } = useContractRead({
        abi: OrganisationABI,
        address: CONTRACTS_ADDRESSES.ORGANISATION,
        functionName: "get_campaign",
        args: [id],
        watch: true,
    });

    const { data: data2, isLoading: isLoading2 } = useContractRead({
        abi: OrganisationABI,
        address: CONTRACTS_ADDRESSES.ORGANISATION,
        functionName: "owner",
        args: [],
        watch: true,
    });

    const { data: data3, isLoading: isLoading3 } = useContractRead({
        abi: OrganisationABI,
        address: CONTRACTS_ADDRESSES.ORGANISATION,
        functionName: "get_campaign_reward",
        args: [address, id],
        watch: true,
    });

    function unixTimestampToDate(unixTimestamp: number): string {
        // Create a new Date object using the Unix timestamp (in milliseconds)
        const date = new Date(unixTimestamp * 1000);
      
        // Format the date to a readable string
        const formattedDate = date.toLocaleDateString();;
      
        return formattedDate;
      }

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

    function shortenAddress(address: string): string {
        return address ? `0x${address.slice(0, 6)}...${address.slice(-4)}` : null;
    }

    const getDaysInfo = (endDate) => {
        const now = dayjs();
        const end = dayjs(unixTimestampToDate(endDate));
        if (now.isBefore(end)) {
            setIsEnded(false)
        } else {
            setIsEnded(true);
        }
    };
    useEffect(() => {
        if (address && data&& data3) {
            console.log("data", data3)
        }
        //     const now = dayjs();
        // const end = dayjs(unixTimestampToDate(data.duration.toString()));
        // if (now.isBefore(end)) {
        //     setIsEnded(false)
        // } else {
        //     setIsEnded(true);
        // }
        // }
        
      }, [isLoading3, address])

      type ContributorData = {
        user: string;
        likes: number;
        views: number;
        reply: number,
        retweet: number,
        followers: number,
        mentions: number,
      };

    // Dummy data for demonstration
    const campaignData = {
        campaignId: id,
        campaignName: "fetched campaign name",
        campaignDescription: "fetched desc",
        tokenAddress: "0x04730a1c577be4d4d4752b18e71b1fefbb91239cc4967ec2dbd89347e0e99bd9",
        tokenAllocation: 100000,
        campaignStart: "2023-09-01", // in datetime type
        campaignEnd: "2023-09-30",  // in datatime type
        minFollowers: 20,
        minImpressions: 50,
        maxMentions: 4,
        viewExponent: 4,
        twitterId: 12222222
    };

    const UsernameToaddressMapping = {
        "rgoyal": "0x8b4848564df4f427120198fb1844f49e7f7ec0c12513070bbb28d10f1034e8",
        "yashm001": "0x722f9bff02831f3b4713f70785f93d768a335f0759c4527225d40904c543e23",
       // Add more mappings here
     };
     const settleCampaignMutate = useWriteOrganisationContract(
       "settle_campaign",
       {
         successMessage: "Campaign Ended successfully",
       }
     );

     function upload() {
       if(!previewData) return;
       const updatedPreviewData = previewData.map(contributor => {
         const address = UsernameToaddressMapping[contributor.user];
         return {
           ...contributor,
           user: address || contributor.user // Fallback to the address if no username is found
         };
       });
       setPreviewData(updatedPreviewData);
       console.log("Updated Preview Data:", updatedPreviewData);
       toast.promise(
           settleCampaignMutate.writeAsyncAndWait(['1', updatedPreviewData]),
           {
             loading: "Creating campaign...",
             success: () => {
               return `Successfully added points. Data can take couple minutes to reflect`;
             },
             finally: () => {
             //   onClose();
             },
             error: (err) => {
               return err?.message || "Failed to create campaign";
             },
           }
         );
     }

    return (
        <VStack>
        <Header/>
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
                    <VStack spacing={5}>{isLoading ? (
            <Spinner />
          ) : !data ? (
            <p className="font-medium text-sm"> Campaign Not found </p>
          ) : (<div>
                        <SimpleGrid columns={{ base: 1, md: 3 }} w="full" p={4} bg="white" _dark={{ bg: "gray.700" }} rounded="md" shadow="base">
                            <GridItem my={2}>
                                <Text fontWeight="bold">Campaign Id:</Text>
                                <Text>{id}</Text>
                            </GridItem>
                            <GridItem my={2}>
                                <Text fontWeight="bold">Campaign Name:</Text>
                                <Text>{bigIntToWords(data.name)}</Text>
                            </GridItem>
                            <GridItem colSpan={{ base: 1, md: 3 }} my={3}>
                                <Text fontWeight="bold">Description:</Text>
                                <Text>{bigIntToWords(data.metadata)}</Text>
                            </GridItem>
                            <GridItem colSpan={{ base: 2, md: 2 }} my={3}>
                                <Text fontWeight="bold">Token Address:</Text>
                                <Text>0x{data.token_address.toString(16)}</Text>
                            </GridItem>
                            <GridItem marginLeft={10} my={3}>
                                <Text fontWeight="bold">Budget Allocation:</Text>
                                <Text > {data.token_amount.toString()} </Text>
                            </GridItem>
                            <GridItem my={3}>
                                <Text fontWeight="bold">Campaign Start:</Text>
                                <Text>{unixTimestampToDate(data.start_time.toString())}</Text>
                            </GridItem>
                            <GridItem my={3}>
                                <Text fontWeight="bold">Campaign End:</Text>
                                <Text>{unixTimestampToDate(data.duration.toString())}</Text>
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
                        {/* {ended? 
                        <div>
                        <Divider my={4} />
                        <Heading fontSize="lg" fontWeight="semibold" alignSelf="flex-start" color={"blue.600"}>
                            leaderboard
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
                        </div>
                        : (<></>)}  */}
                        </div>
                    )}
                    </VStack>
                </VStack>
                {data2 && address ? data2.toString(16).toLocaleLowerCase() == address.substring(2,128).toLocaleLowerCase() ?
                (<VStack spacing={3} align="stretch" position="sticky" top={50}> {previewData && previewData.length? 
                    <IconButton
                isRound={true}
                variant='solid'
                colorScheme='teal'
                aria-label='Done'
                fontSize='20px'
                icon={<CheckIcon />}
            /> : (
        <FormControl> 
      <Input
        className="hidden"
        type="file"
        accept=".csv"
        value=""
        onChange={async (event) => {
          try {
            const text = await event.target.files?.[0]?.text();
            console.log("text",text)

            const cols = text
              ?.split("\n")[0]
              .split(",")
              .map((c) => c.replace("\r", "").trim());

            const contributorAdrIndex = cols?.findIndex(
              (v) => v === COLUMNS.CONTRIBUTOR_USERNAME
            );
            const viewsIndex = cols?.findIndex(
              (v) => v === COLUMNS.VIEWS
            );
            const likesIndex = cols?.findIndex(
                (v) => v === COLUMNS.LIKES
            );
            const repliesIndex = cols?.findIndex(
                (v) => v === COLUMNS.REPLIES
            );
            const retweetsIndex = cols?.findIndex(
                (v) => v === COLUMNS.RETWEETS
            );
            const followersIndex = cols?.findIndex(
                (v) => v === COLUMNS.FOLLOWERS
            );
            const mentionsIndex = cols?.findIndex(
                (v) => v === COLUMNS.MENTIONS
            );

            if (
              contributorAdrIndex === undefined ||
              viewsIndex === undefined
            ) {
                console.log("1")
              setPreviewData([]);
              // @ts-expect-error - Component prop typing issue
            //   form?.setError("pointsData", {
            //     message: "Required columns not found.",
            //   });

              return;
            }
            console.log("2")
            const data = (text?.split("\n") || [])
              .map((line) => {
                const cols = line.split(",");

                const contributorData = {
                  user: cols[contributorAdrIndex].trim(),
                  views: Number(cols[viewsIndex].trim()),
                  likes: Number(cols[likesIndex].trim()),
                  reply: Number(cols[repliesIndex].trim()),
                  retweet: Number(cols[retweetsIndex].trim()),
                  followers: Number(cols[followersIndex].trim()),
                  mentions: Number(cols[mentionsIndex].trim()),
                };
                console.log("3")
                // validate
                if (
                  contributorData.user &&
                  contributorData.user
                    .trim()
                    .startsWith("") &&
                //   isAddress(contributorData.contributor) &&
                  contributorData.views >= 0
                ) {
                    console.log("4")
                    // setPreviewData(data);
                    console.log("contributordata", contributorData)
                  return contributorData;
                }

                return undefined;
              })
              .filter(Boolean) as unknown as Array<ContributorData>;
              setPreviewData(data);
              console.log("e")
            if (!data.length) {
                console.log("5")
              setPreviewData([]);
              // @ts-expect-error - Component prop typing issue
            //   form?.setError("pointsData", {
            //     message: "No contributor data found.",
            //   });

              return;
            }

            // @ts-expect-error - Component prop typing issue
            // form?.clearErrors("pointsData");
            console.log("6data")
            setPreviewData(data);
            // onChange(data);
          } catch (err) {
            // setPreviewData([]);
            // @ts-expect-error - Component prop typing issue
            // form?.setError("pointsData", {
            //   message: "Unable to parse contributor data.",
            // });
          }
        }}
      />
    </FormControl>
    )}
    <Button colorScheme="teal" size="md" onClick={upload}>Upload CSV</Button> 
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
        {/* <Button colorScheme="teal" size="md" width="full">Claim</Button> */}
      </VStack>)
        : (<VStack spacing={3} align="stretch" position="sticky" top={50}>
            {data3? <div><Text>Claimable Reward = {data3[0].toString()}</Text>
            <Button colorScheme="teal" size="md" width="full">Claim</Button>
            </div>: (<></>)}
        
        </VStack>):
        <></>}
            </HStack>
        </Box>
        </VStack>
    );
}
