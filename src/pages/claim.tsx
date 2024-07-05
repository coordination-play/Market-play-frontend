import { Flex, Box, chakra, Text, Stack, Button, Heading, VStack, Spinner } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useRouter } from 'next/router';
import { signIn, signOut, useSession } from "next-auth/react";
import Header from "../components/Header";
import { useAccount } from "@starknet-react/core";

export default function Claim() {
    const { data: session } = useSession();
    const { account, address, status } = useAccount();
    const [twitterID, setTwitterID] = useState(null);
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    useEffect(() => {
        console.log("Address:", address);
        console.log("Session object:", session);
        if (address && session) {
            setLoading(true);
            // Call the API route to save data
            fetch('/api/saveUser', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                // @ts-ignore
                body: JSON.stringify({ address, twitterID: session.user?.id })
            })
                .then(response => response.json())
                .then(data => {
                    setLoading(false);
                    if (data.message === 'Success') {
                        console.log('Data saved successfully');
                        router.push('/contributorSucess');
                    }
                })
                .catch(err => {
                    setLoading(false);
                    console.error('Error saving data:', err);
                });
        }
    }, [address, session, router]);

    useEffect(() => {
        if (address) {
            // Fetch the Twitter ID from your API or handle accordingly
            // For example:
            // fetchTwitterID(address).then(id => {
            //   setTwitterID(id);
            // }).catch((err) => {
            //   console.error('Error retrieving data:', err);
            // });
        }
    }, [address]);

    return (
        <VStack>
            <Header />
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
                                Hello, {session.user.name}.
                                {/* @ts-ignore */}
                                Your user ID is {session.user?.id!}
                            </Button>
                        ) : (
                            <Button colorScheme="teal" variant={"outline"} size="md" px={4} py={2} mt={2} onClick={() => signIn('twitter')}>
                                Verify Twitter
                            </Button>
                        )}
                    </Stack>
                    {twitterID && <Text>Your connected Twitter ID is: {twitterID}</Text>}
                    {loading && (
                        <Box textAlign="center" mt={4}>
                            <Text>Linking accounts</Text>
                            <Spinner />
                        </Box>
                    )}
                </VStack>
            </Flex>
        </VStack>
    );
}
