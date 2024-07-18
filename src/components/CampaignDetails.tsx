import { Box, SimpleGrid, GridItem, Text, Heading, VStack, Divider, HStack, Button, Spinner, FormControl, Input, FormLabel, IconButton } from "@chakra-ui/react";
import React from "react";
import { AiOutlineFileText  } from "react-icons/ai";
import WalletManager from "./ConnectWallet";

import DownloadDataButton from "./DownloadCSV";
// import UploadCSVButton from "./UploadCSV";
import { useAccount } from "@starknet-react/core";
import { OrganisationABI, RegistryABI, CONTRACTS_ADDRESSES } from "../contracts/contracts";
import {
    UseContractReadResult,
    useContractRead
  } from "@starknet-react/core";
  import { Dispatch, Ref, SetStateAction, useRef, useEffect, useState } from 'react'
import { CheckIcon } from "@chakra-ui/icons";
import { useWriteOrganisationContract } from "../contracts/write";
import { toast } from "sonner";
import DownloadLocalCSVButton from "./DownloadFile";




export default function CampaignDetails() {
    const { account, address, status } = useAccount();
    // Dummy data for demonstration
    const [previewData, setPreviewData] = useState<ContributorData[]>([]);
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
        args: [1],
        watch: true,
    });

    const { data: data2, isLoading: isLoading2 } = useContractRead({
        abi: OrganisationABI,
        address: CONTRACTS_ADDRESSES.ORGANISATION,
        functionName: "owner",
        args: [],
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

    useEffect(() => {
        // console.log("data2",previewData, data2.toString(16))
        if (address && data2) {
            console.log("data2")
        }
        
      }, [isLoading2, address])

      type ContributorData = {
        user: string;
        likes: number;
        views: number;
        reply: number,
        retweet: number,
        followers: number,
        mentions: number,
      };
      
    const campaignData = {
        campaignId: "0x988923478237498230498234802384902384093843498092384",

        campaignName: "Spring Awareness",
        campaignDescription: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam eu auctor lorem, a dapibus felis. Aliquam purus quam, faucibus vel lacus et, interdum pharetra risus. Donec tempus ipsum a eleifend pulvinar. Nulla facilisi. In hac habitasse platea dictumst. Phasellus aliquam elit ut consectetur sodales. Nulla facilisi. Nam risus odio, volutpat vel semper non, finibus eget diam. Quisque et euismod magna. Praesent volutpat velit ac ex gravida finibus. Donec neque dolor, lacinia eu sem sed, convallis pharetra tortor. In faucibus orci sed diam ultrices vehicula. Duis porta arcu at purus sagittis consequat. Ut nec pulvinar ipsum. Maecenas eget dui non urna bibendum lacinia.",
        tokenAddress: "0x04730a1c577be4d4d4752b18e71b1fefbb91239cc4967ec2dbd89347e0e99bd9",
        tokenAllocation: "100,000 USDC",
        campaignStart: "2023-09-01",
        campaignEnd: "2023-09-30",
        likeWeight: "0.35",
        retweetWeight: "1.25",
        bookmarkWeight: "1.75",
        minFollowers: 0.35,
        minImpressions: 1.25,
        maxMentions: 1.75,
        viewExponent:  4,
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
                    {isLoading ? (
            <Spinner />
          ) : !data ? (
            <p className="font-medium text-sm"> Campaign Not found </p>
          ) : (<div>
                        <SimpleGrid columns={{ base: 1, md: 3 }} w="full" p={4} bg="white" _dark={{ bg: "gray.700" }} rounded="md" shadow="base">
                            <GridItem my={2}>
                                <Text fontWeight="bold">Campaign Name:</Text>
                                {/* <Text>{campaignData.campaignName}</Text> */}
                                <Text>{bigIntToWords(data.name)}</Text>
                            </GridItem>
                            <GridItem colSpan={{ base: 1, md: 3 }} my={3}>
                                <Text fontWeight="bold">Description:</Text>
                                <Text>{bigIntToWords(data.metadata)}</Text>
                            </GridItem>
                            <GridItem colSpan={{ base: 1, md: 2 }} my={3}>
                                <Text fontWeight="bold">Token Address:</Text>
                                <Text>{shortenAddress(data.token_address.toString(16))}</Text>
                            </GridItem>
                            <GridItem my={3}>
                                <Text fontWeight="bold">Budget Allocation:</Text>
                                <Text>{data.token_amount.toString()}</Text>
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
                                <Text fontWeight="bold">Like Weight:</Text>
                                <Text>{campaignData.likeWeight}</Text>
                                
                            <Text fontWeight="bold">Min Followers</Text>
                                <Text>{campaignData.minFollowers}</Text>
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
                        </div>
                        )}
                    </VStack>
                </VStack>
                {/* <VStack spacing={3} align="stretch" position="sticky" top={40} >
                    <WalletManager/>
                    <Button colorScheme="teal" size="md">Upload CSV</Button>
                    <Button colorScheme="teal" size="md">Distribute Rewards</Button> */}
                    {/* <Button colorScheme="teal" size="md">Delete Campaign</Button>
                    <Button colorScheme="teal" size="md">Export Data</Button> */}
                {/* </VStack> */}
                <Box position="relative"> {/* Encapsulating Box to hold the vertical divider */}
      <Divider orientation="vertical" height="100%" position="absolute" left={0} top={0} borderColor="gray.200" />
      {/* <VStack spacing={3} top={80}> */}
        {/* <UploadCSVButton /> */}
        {data2 && address ? data2.toString(16).toLocaleLowerCase() == address.substring(2,128).toLocaleLowerCase() ? 
        (<VStack spacing={3} top={80}> {previewData && previewData.length? 
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
     <DownloadLocalCSVButton />
        <Button colorScheme="teal" size="md" width="full">Settle Campaign</Button>
        <Button colorScheme="teal" size="md" width="full">Claim</Button>
      </VStack>)
        : (<><Button colorScheme="teal" size="md" width="full">Claim</Button></>):
        <></>}
         
         
        
        
    </Box>
                {/* <VStack spacing={3}  top={40} >
                    <WalletManager/>
                    {previewData && previewData.length? 
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
                        const pointsIndex = cols?.findIndex(
                          (v) => v === COLUMNS.points
                        );

                        if (
                          contributorAdrIndex === undefined ||
                          pointsIndex === undefined
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
                              contributor: cols[contributorAdrIndex].trim(),
                              point: Number(cols[pointsIndex].trim()),
                            };
                            console.log("3")
                            // validate
                            if (
                              contributorData.contributor &&
                              contributorData.contributor
                                .trim()
                                .startsWith("") &&
                            //   isAddress(contributorData.contributor) &&
                              contributorData.point >= 0
                            ) {
                                console.log("4")
                              return contributorData;
                            }

                            return undefined;
                          })
                          .filter(Boolean) as unknown as Array<ContributorData>;

                        if (!data.length) {
                          setPreviewData([]);
                          // @ts-expect-error - Component prop typing issue
                        //   form?.setError("pointsData", {
                        //     message: "No contributor data found.",
                        //   });

                          return;
                        }

                        // @ts-expect-error - Component prop typing issue
                        // form?.clearErrors("pointsData");
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
                    <Button colorScheme="teal" size="md">Distribute Rewards</Button>
                    {/* <Button colorScheme="teal" size="md">Delete Campaign</Button>
                    <Button colorScheme="teal" size="md">Export Data</Button> */}
                {/* </VStack> */} 
            </HStack>
        </Box>
    );
}
